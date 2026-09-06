import { useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 110, damping: 18, mass: 0.9 };
const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";

/* Where each operational fragment starts (scattered) before it aligns. */
const SCATTER = [
  { x: 46, y: -34, r: -7 },
  { x: -18, y: 26, r: 5 },
  { x: 62, y: 18, r: -4 },
  { x: -26, y: -22, r: 8 },
  { x: 34, y: 40, r: -6 },
  { x: -12, y: -46, r: 4 },
];

/* Geometry, authored in an 800 × 520 box. */
const IN_X = 40;
const IN_W = 122;
const IN_Y = (i) => 96 + i * 56;
const FIELD = { x: 300, y: 118, w: 200, h: 284 };
const LAYER_X = 560;
const LAYER_W = 176;
const LAYER_Y = (i) => 150 + i * 58;
const FIELD_MID = FIELD.y + FIELD.h / 2;

/**
 * The operating layer — the desktop composition. Fragments of a real
 * operation appear scattered on the left, align into ordered signals,
 * converge into one engineering field (process first, technology
 * second) and resolve into four system layers that end in a system.
 * The sequence plays once when the section enters the viewport, then
 * the composition stays still apart from a very slight pointer depth.
 * Reduced motion renders the final structured state immediately.
 */
export function OperatingLayer({ t, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const on = reduce || inView;
  const T = (delay, duration = 0.6) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE });

  /* Pointer depth: the three planes drift by a few pixels at different rates. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const inputsX = useTransform(sx, (v) => v * -6);
  const inputsY = useTransform(sy, (v) => v * -4);
  const layersX = useTransform(sx, (v) => v * 8);
  const layersY = useTransform(sy, (v) => v * 5);
  const fieldY = useTransform(sy, (v) => v * 2);
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <svg
      ref={ref}
      viewBox="0 0 800 520"
      role="img"
      aria-label={t.visualLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      <title>{t.visualLabel}</title>
      <defs>
        <pattern id="ha-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#3157F6" strokeOpacity="0.12" strokeWidth="0.8" />
        </pattern>
        <pattern id="ha-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#3157F6" fillOpacity="0.22" />
        </pattern>
        <linearGradient id="ha-field" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2F5FA" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* the pale spatial field and drafting-grid fragments */}
      <rect x="16" y="36" width="768" height="452" rx="22" fill="url(#ha-field)" />
      <rect x="16" y="36" width="768" height="452" rx="22" fill="none" stroke="#3157F6" strokeOpacity="0.1" />
      <rect x="230" y="60" width="330" height="200" fill="url(#ha-dots)" opacity="0.7" />
      <rect x="520" y="300" width="240" height="170" fill="url(#ha-dots)" opacity="0.5" />

      {/* ── inputs: the real operation, scattered → aligned ── */}
      <motion.g style={{ x: inputsX, y: inputsY }}>
        <text x={IN_X} y={72} className={cn(MONO, "fill-[#4A5164]")}>{t.inputsLabel}</text>
        {t.inputs.map((label, i) => {
          const s = SCATTER[i % SCATTER.length];
          const y = IN_Y(i);
          return (
            <motion.g
              key={label}
              initial={reduce ? false : { opacity: 0, x: s.x, y: s.y, rotate: s.r }}
              animate={on ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
              transition={reduce ? { duration: 0 } : { opacity: { duration: 0.45, delay: 0.1 + i * 0.07 }, x: { ...SPRING, delay: 0.75 + i * 0.06 }, y: { ...SPRING, delay: 0.75 + i * 0.06 }, rotate: { ...SPRING, delay: 0.75 + i * 0.06 } }}
              style={{ originX: `${IN_X + IN_W / 2}px`, originY: `${y + 15}px` }}
            >
              <rect x={IN_X} y={y} width={IN_W} height="30" rx="5" fill="#FFFFFF" stroke="#C9D3EC" />
              <rect x={IN_X + 10} y={y + 12} width="6" height="6" rx="1.2" fill="#3157F6" fillOpacity={0.35 + (i % 3) * 0.2} />
              <text x={IN_X + 24} y={y + 19.5} className={cn(MONO, "fill-[#1E2233]")}>{label}</text>
              <circle cx={IN_X + IN_W} cy={y + 15} r="2.6" fill="#3157F6" />
            </motion.g>
          );
        })}
      </motion.g>

      {/* connectors converging into the engineering field */}
      {t.inputs.map((label, i) => {
        const y = IN_Y(i) + 15;
        return (
          <motion.path
            key={label}
            d={`M${IN_X + IN_W + 3} ${y} C ${IN_X + IN_W + 70} ${y}, ${FIELD.x - 60} ${FIELD_MID}, ${FIELD.x} ${FIELD_MID}`}
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.55"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={reduce ? { duration: 0 } : { pathLength: { duration: 0.8, delay: 1.25 + i * 0.05, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 1.25 + i * 0.05 } }}
          />
        );
      })}

      {/* ── the engineering field ── */}
      <motion.g style={{ y: fieldY }} initial={reduce ? false : { opacity: 0 }} animate={on ? { opacity: 1 } : undefined} transition={T(1.5, 0.7)}>
        <rect x={FIELD.x} y={FIELD.y} width={FIELD.w} height={FIELD.h} rx="10" fill="#FFFFFF" fillOpacity="0.72" stroke="#3157F6" strokeOpacity="0.35" />
        <rect x={FIELD.x + 1} y={FIELD.y + 1} width={FIELD.w - 2} height={FIELD.h - 2} rx="9" fill="url(#ha-grid)" />
        <text x={FIELD.x + 16} y={FIELD.y + 24} className={cn(MONO, "fill-accent")}>{t.fieldLabel}</text>
        <line x1={FIELD.x + 16} x2={FIELD.x + FIELD.w - 16} y1={FIELD.y + 34} y2={FIELD.y + 34} stroke="#3157F6" strokeOpacity="0.25" />
        <circle cx={FIELD.x} cy={FIELD_MID} r="4" fill="#FFFFFF" stroke="#3157F6" strokeWidth="1.25" />
        <circle cx={FIELD.x + FIELD.w} cy={FIELD_MID} r="4" fill="#3157F6" />
        <text x={FIELD.x + FIELD.w / 2} y={FIELD_MID - 6} textAnchor="middle" className="font-heading text-[15px] font-bold tracking-[-0.01em] fill-foreground">{t.statement[0]}</text>
        <text x={FIELD.x + FIELD.w / 2} y={FIELD_MID + 16} textAnchor="middle" className="font-heading text-[15px] font-bold tracking-[-0.01em] fill-accent">{t.statement[1]}</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={FIELD.x + 16} y={FIELD.y + FIELD.h - 46 + i * 11} width={[92, 60, 118][i]} height="3" rx="1.5" fill="#3157F6" fillOpacity={0.35 - i * 0.08} />
        ))}
      </motion.g>

      {/* connectors from the field to the four layers */}
      {t.layers.map((label, i) => {
        const y = LAYER_Y(i) + 17;
        const x0 = LAYER_X + i * 8;
        return (
          <motion.path
            key={label}
            d={`M${FIELD.x + FIELD.w + 4} ${FIELD_MID} C ${FIELD.x + FIELD.w + 36} ${FIELD_MID}, ${x0 - 36} ${y}, ${x0 - 2} ${y}`}
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.55"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={reduce ? { duration: 0 } : { pathLength: { duration: 0.7, delay: 2.0 + i * 0.08, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 2.0 + i * 0.08 } }}
          />
        );
      })}

      {/* ── the four system layers ── */}
      <motion.g style={{ x: layersX, y: layersY }}>
        <text x={LAYER_X} y={128} className={cn(MONO, "fill-[#4A5164]")}>{t.layersLabel}</text>
        {t.layers.map((label, i) => {
          const y = LAYER_Y(i);
          const x = LAYER_X + i * 8;
          return (
            <motion.g
              key={label}
              initial={reduce ? false : { opacity: 0, x: -14 }}
              animate={on ? { opacity: 1, x: 0 } : undefined}
              transition={T(2.25 + i * 0.12, 0.55)}
            >
              <rect x={x} y={y} width={LAYER_W} height="34" rx="5" fill="#FFFFFF" stroke="#C9D3EC" />
              <rect x={x} y={y} width="3" height="34" rx="1.5" fill="#3157F6" fillOpacity={1 - i * 0.18} />
              <text x={x + 16} y={y + 21.5} className="font-heading text-[13px] font-bold tracking-[-0.01em] fill-foreground">{label}</text>
              <text x={x + LAYER_W - 12} y={y + 21} textAnchor="end" className="font-mono text-[9px] tracking-[0.16em] fill-[#8A8FA0]">0{i + 1}</text>
            </motion.g>
          );
        })}
        {/* the result */}
        <motion.g initial={reduce ? false : { opacity: 0, y: 6 }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={T(2.85, 0.5)}>
          <path d={`M${LAYER_X + 24} ${LAYER_Y(3) + 34} V${LAYER_Y(3) + 58} H${LAYER_X + 3 * 8 + LAYER_W - 24}`} fill="none" stroke="#3157F6" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx={LAYER_X + 24} cy={LAYER_Y(3) + 82} r="11" fill="#3157F6" fillOpacity="0.1" />
          <circle cx={LAYER_X + 24} cy={LAYER_Y(3) + 82} r="5" fill="#3157F6" />
          <text x={LAYER_X + 46} y={LAYER_Y(3) + 86} className="font-mono text-[11px] uppercase tracking-[0.18em] fill-foreground">{t.result}</text>
        </motion.g>
      </motion.g>
    </svg>
  );
}

/**
 * The mobile interpretation: the same idea as a compact vertical
 * composition — a row of operational fragments, the engineering field
 * with the statement, four thin layers and the system — readable at
 * any width, without the desktop node field.
 */
export function OperatingLayerCompact({ t }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const on = reduce || inView;
  const show = (delay) => ({ initial: reduce ? false : { opacity: 0, y: 8 }, animate: on ? { opacity: 1, y: 0 } : undefined, transition: reduce ? { duration: 0 } : { duration: 0.5, delay, ease: EASE } });
  const rail = <span aria-hidden="true" className="mx-auto block h-7 w-px bg-accent/40" />;

  return (
    <div ref={ref} aria-label={t.visualLabel} role="img" className="rounded-[18px] bg-[linear-gradient(160deg,#F2F5FA,#FFFFFF)] px-4 py-6 ring-1 ring-accent/10">
      <p className={cn(MONO, "text-[#4A5164]")}>{t.inputsLabel}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {t.inputs.map((label, i) => (
          <motion.li key={label} {...show(0.1 + i * 0.07)} className="flex items-center gap-2 rounded-md border border-[#C9D3EC] bg-white px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1E2233]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px] bg-accent" style={{ opacity: 0.4 + (i % 3) * 0.2 }} />
            {label}
          </motion.li>
        ))}
      </ul>
      {rail}
      <motion.div {...show(0.7)} className="rounded-xl border border-accent/30 bg-white/80 px-4 py-4 [background-image:linear-gradient(#3157F61a_0.8px,transparent_0.8px),linear-gradient(90deg,#3157F61a_0.8px,transparent_0.8px)] [background-size:20px_20px]">
        <p className={cn(MONO, "text-accent")}>{t.fieldLabel}</p>
        <p className="mt-2 font-heading text-[17px] font-bold leading-snug tracking-[-0.01em] text-foreground">
          {t.statement[0]} <span className="text-accent">{t.statement[1]}</span>
        </p>
      </motion.div>
      {rail}
      <p className={cn(MONO, "text-[#4A5164]")}>{t.layersLabel}</p>
      <ol className="mt-3 space-y-1.5">
        {t.layers.map((label, i) => (
          <motion.li key={label} {...show(1.0 + i * 0.1)} className="flex items-center justify-between rounded-md border border-[#C9D3EC] bg-white py-2 pl-3 pr-3" style={{ marginLeft: i * 6 }}>
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-4 w-[3px] rounded-full bg-accent" style={{ opacity: 1 - i * 0.18 }} />
              <span className="font-heading text-[13px] font-bold tracking-[-0.01em] text-foreground">{label}</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.16em] text-[#8A8FA0]">0{i + 1}</span>
          </motion.li>
        ))}
      </ol>
      <motion.p {...show(1.5)} className="mt-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
        <span aria-hidden="true" className="relative flex h-3.5 w-3.5 items-center justify-center"><span className="absolute inset-0 rounded-full bg-accent/15" /><span className="h-2 w-2 rounded-full bg-accent" /></span>
        {t.result}
      </motion.p>
    </div>
  );
}
