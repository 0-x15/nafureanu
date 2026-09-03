import { useState, useRef, useCallback, useLayoutEffect } from "react";
import {
  easeInOut,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import CrmSegmentBubble from "./CrmSegmentBubble";

const EASE = [0.22, 1, 0.36, 1];

const T = {
  es: {
    center: "CRM genérico",
    blockRows: ["Contactos", "Registros", "Datos"],
    status: "Datos guardados",
    nodes: ["Leads", "Inmuebles", "Agenda", "Portales", "Documentos", "WhatsApp"],
    annotation: "Datos dentro · operación fuera",
    segments: [
      "Control del primer contacto, seguimiento y alertas para que una oportunidad no quede sin atender.",
      "La ficha del inmueble centraliza datos, estado, documentación, alertas y relación con portales y operaciones.",
      "Tareas, visitas y devoluciones de llamada conectadas con la operativa diaria del CRM.",
      "Publicación y actualización conectadas con la ficha del inmueble para evitar trabajo duplicado.",
      "Estados, revisión, aprobación y requisitos documentales integrados en el proceso.",
      "Mensajes vinculados al contacto y al contexto operativo dentro del propio CRM.",
    ],
  },
  en: {
    center: "Generic CRM",
    blockRows: ["Contacts", "Records", "Data"],
    status: "Data stored",
    nodes: ["Leads", "Properties", "Calendar", "Portals", "Documents", "WhatsApp"],
    annotation: "Data inside · operations outside",
    segments: [
      "First-contact SLA, follow-up and alerts so an opportunity is never left unattended.",
      "The property record centralizes data, status, documentation, alerts and its relation to portals and operations.",
      "Tasks, visits and call-backs connected to the CRM's daily operation.",
      "Publishing and updates connected to the property record to avoid duplicated work.",
      "Document states, review, approval and requirements built into the process.",
      "Messages linked to the contact and the operational context inside the CRM itself.",
    ],
  },
};

/*
 * SEGMENTED SYSTEM — each operational piece is a staggered rail of
 * modular slices: intelligent segments of the same business, none of
 * them integrated. Every rail trails an interrupted technical lead
 * that stops short of the muted "CRM genérico" block.
 */
const RAILS = [
  { ml: "0%", slices: [[46, "cobalt"], [26], [58], [18]] },
  { ml: "10%", slices: [[30], [50, "cobalt"], [22], [42]] },
  { ml: "4%", slices: [[56], [20], [44, "cobalt"]] },
  { ml: "14%", slices: [[24], [40], [34, "cobalt"], [16]] },
  { ml: "7%", slices: [[50, "cobalt"], [28], [62]] },
  { ml: "16%", slices: [[34, "cyan"], [44], [26]] },
];

const TONES = {
  cobalt: "bg-[#3157F6]",
  cyan: "bg-[#17B4CD]",
};

/* Horizontal drift of the data slices — colored segments travel a
   little further than the neutral ones, like data in transit. */
const AMP_TONE = [0, 12, 24, 9, 0];
const AMP_NEUTRAL = [0, 5, 13, 4, 0];

/* Position along a looping, per-segment eased keyframe drift after
   `elapsed` ms of motion (an initial `delay` holds the first value). */
function driftAt(elapsed, keyframes, duration, delay) {
  const t = elapsed - delay;
  if (t <= 0) return keyframes[0];
  const segments = keyframes.length - 1;
  const p = ((t % duration) / duration) * segments;
  const i = Math.min(Math.floor(p), segments - 1);
  return keyframes[i] + (keyframes[i + 1] - keyframes[i]) * easeInOut(p - i);
}

/**
 * One slice of a rail. Its drift is computed every frame from a clock
 * that only advances while the rail is not engaged, so on hover it
 * freezes exactly where it is and afterwards continues from that same
 * point — no jump either way. (framer-motion's own pause() misplaces
 * delayed keyframe animations, which is why the clock is ours.) Only
 * the coloured slice of a rail is interactive; neutral slices are
 * inert.
 */
function Slice({ w, tone, rail, index, still, reduce, label, onEngage, onRelease }) {
  const x = useMotionValue(0);
  const elapsed = useRef(0);
  const stillRef = useRef(still);
  stillRef.current = still;

  const keyframes = tone ? AMP_TONE : AMP_NEUTRAL;
  const duration = (5.5 + rail * 0.8 + index * 0.9) * 1000;
  const delay = (rail * 0.6 + index * 0.4) * 1000;

  const tick = useCallback(
    (_time, delta) => {
      if (reduce || stillRef.current) return;
      elapsed.current += delta;
      x.set(driftAt(elapsed.current, keyframes, duration, delay));
    },
    [reduce, x, keyframes, duration, delay]
  );
  useAnimationFrame(tick);

  const base = cn(
    "block h-3.5 shadow-[0_6px_14px_-8px_rgba(12,18,32,0.3)]",
    tone ? TONES[tone] : "bg-[#E9E4D8]"
  );

  if (!tone) {
    return <motion.span aria-hidden="true" className={base} style={{ width: w, x }} />;
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-describedby="crm-segment-bubble"
      onMouseEnter={onEngage}
      onMouseLeave={onRelease}
      onFocus={onEngage}
      onBlur={onRelease}
      onClick={(e) => (still ? onRelease() : onEngage(e))}
      className={cn(
        base,
        "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3157F6]"
      )}
      style={{ width: w, x }}
    />
  );
}

/**
 * "El problema" supporting visual — the segmented composition with
 * continuous life: the slices drift slowly along each rail (data
 * moving through the process), the interrupted connectors flow
 * toward the generic CRM and stop, the endpoint dots pulse, and the
 * generic block shows quiet internal storage activity. Hovering or
 * focusing the coloured slice of a rail reveals its small organic
 * bubble; leaving that slice clears it at once, so the neutral slices,
 * the labels, the connectors and the muted generic block never show
 * or inherit a bubble.
 */
export default function CrmProblemVisual({ lang = "es", className = "" }) {
  const t = T[lang];
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(null);
  const [pos, setPos] = useState({ y: 24, w: 232 });
  const stageRef = useRef(null);
  const miniRef = useRef(null);
  const railRef = useRef(null);
  const lastRef = useRef(0);

  const engage = (i, el) => {
    railRef.current = el;
    setHover(i);
  };

  /* Anchor the mini bubble to the engaged segment's row, clamped. */
  useLayoutEffect(() => {
    if (hover === null) return;
    lastRef.current = hover;
    const stage = stageRef.current;
    const bubble = miniRef.current;
    const rail = railRef.current;
    if (!stage || !bubble || !rail) return;

    const sR = stage.getBoundingClientRect();
    const rR = rail.getBoundingClientRect();
    const bH = bubble.offsetHeight;
    const bW = Math.min(232, sR.width * 0.88);
    const y = Math.min(
      Math.max(rR.top - sR.top + rR.height / 2 - bH / 2, 8),
      Math.max(sR.height - bH - 8, 8)
    );
    setPos({ y, w: bW });
  }, [hover]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={stageRef}
        onMouseLeave={() => setHover(null)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHover(null);
        }}
        className="relative h-[380px] md:h-[400px]"
      >
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -top-6 h-44 w-44 rounded-full bg-[#3157F6]/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-4 -left-6 h-44 w-44 rounded-full bg-[#17B4CD]/[0.05] blur-3xl"
        />

        {/* The segmented operational system — interactive rails */}
        <div className="absolute inset-0 flex h-full flex-col justify-center gap-[26px] md:gap-[30px]">
          {RAILS.map((rail, i) => {
            const still = hover === i;
            return (
              <div
                key={t.nodes[i]}
                style={{ marginLeft: rail.ml }}
                className="flex items-center gap-3"
              >
                <span className="w-16 shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-[#4A5164]">
                  {t.nodes[i]}
                </span>
                <span className="flex items-center gap-1.5">
                  {rail.slices.map(([w, tone], j) => (
                    <Slice
                      key={j}
                      w={w}
                      tone={tone}
                      rail={i}
                      index={j}
                      still={still}
                      reduce={reduce}
                      label={t.nodes[i]}
                      onEngage={(e) => engage(i, e.currentTarget)}
                      onRelease={() => setHover(null)}
                    />
                  ))}
                </span>
                {/* Interrupted technical lead — data flows toward the
                    generic block and never reaches it */}
                <span aria-hidden="true" className="flex items-center">
                  <svg width="28" height="2" className="overflow-visible">
                    <motion.line
                      x1="0"
                      y1="1"
                      x2="28"
                      y2="1"
                      stroke="#C2BCAC"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      animate={
                        reduce
                          ? { strokeDashoffset: 0 }
                          : { strokeDashoffset: [0, -14] }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 1.8, repeat: Infinity, ease: "linear" }
                      }
                    />
                  </svg>
                  <motion.span
                    className="ml-px h-1 w-1 rounded-full bg-[#9A94A6]"
                    animate={
                      reduce
                        ? { opacity: 0.6, scale: 1 }
                        : {
                            opacity: [0.35, 1, 0.35],
                            scale: [0.8, 1.25, 0.8],
                          }
                    }
                    transition={{
                      duration: 2.2 + i * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>

        {/* The muted block nothing reaches — it only stores */}
        <div className="absolute right-[2%] top-1/2 w-[17%] max-w-[130px] -translate-y-1/2 -rotate-1 rounded-lg border border-dashed border-[#D8D3C6] bg-[#F5F3ED]/90 px-2.5 py-3">
          <p className="text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8FA0]">
            {t.center}
          </p>
          <div className="mt-2 space-y-1">
            {t.blockRows.map((row, r) => (
              <motion.div
                key={row}
                className="flex items-center justify-between gap-1"
                animate={
                  reduce || r !== 1
                    ? { opacity: 1 }
                    : { opacity: [1, 0.45, 1] }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.1,
                      }
                }
              >
                <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#8A8FA0]">
                  {row}
                </span>
                <span className="h-[3px] w-4 rounded-full bg-[#E3DFD2]" />
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1 border-t border-[#E3DFD2] pt-2">
            <motion.span
              className="h-1 w-1 rounded-full bg-[#9A94A6]"
              animate={
                reduce
                  ? { opacity: 0.6 }
                  : { opacity: [0.35, 1, 0.35] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-[#8A8FA0]">
              {t.status}
            </span>
          </div>
        </div>

        {/* Mini organic bubble — anchored to the engaged segment's row */}
        <motion.div
          id="crm-segment-bubble"
          aria-live="polite"
          ref={miniRef}
          className="pointer-events-none absolute right-[3%] top-0 z-30"
          style={{ width: pos.w }}
          initial={false}
          animate={{
            y: pos.y,
            opacity: hover === null ? 0 : 1,
            scale: hover === null ? 0.96 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <CrmSegmentBubble text={t.segments[hover ?? lastRef.current]} />
        </motion.div>
      </div>

      {/* Minimal annotation */}
      <div className="mt-7 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full bg-[#9A94A6]"
        />
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9A94A6]">
          {t.annotation}
        </p>
      </div>
    </div>
  );
}