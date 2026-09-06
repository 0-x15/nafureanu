import { useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 110, damping: 18, mass: 0.9 };
const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";

/* Where each operational fragment starts (scattered) before it aligns. */
const SCATTER = [
  { x: 22, y: -18, r: -6 },
  { x: -14, y: 14, r: 5 },
  { x: 18, y: 16, r: -4 },
  { x: -20, y: -14, r: 6 },
];

/* Geometry, authored in a 400 × 470 portrait box: inputs on top, the
   engineering field in the middle, the system layers below. */
const IN_W = 152;
const IN_H = 28;
const IN_POS = (i) => ({ x: i % 2 === 0 ? 34 : 214, y: 44 + Math.floor(i / 2) * 40 });
const FIELD = { x: 60, y: 168, w: 280, h: 118 };
const FIELD_MID_X = FIELD.x + FIELD.w / 2;
const LAYER_W = 250;
const LAYER_H = 26;
const LAYER_POS = (i) => ({ x: 66 + i * 6, y: 334 + i * 29 });

/**
 * The operating layer — an explanatory object beside the copy, no
 * longer the protagonist. Four fragments of a real operation appear
 * scattered, align, converge into one engineering field (process
 * first, technology second) and resolve into four system layers that
 * end in a system. The sequence plays once on entering the viewport
 * and then stays still, apart from a very slight pointer depth.
 * Reduced motion renders the structured state immediately.
 */
export function OperatingLayer({ t, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const on = reduce || inView;
  const T = (delay, duration = 0.55) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const inputsX = useTransform(sx, (v) => v * -3);
  const inputsY = useTransform(sy, (v) => v * -3);
  const layersX = useTransform(sx, (v) => v * 4);
  const layersY = useTransform(sy, (v) => v * 3);
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
      viewBox="0 0 400 490"
      role="img"
      aria-label={t.visualLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      <title>{t.visualLabel}</title>
      <defs>
        <pattern id="ha-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 H0 V16" fill="none" stroke="#3157F6" strokeOpacity="0.1" strokeWidth="0.8" />
        </pattern>
        <pattern id="ha-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#3157F6" fillOpacity="0.2" />
        </pattern>
        <linearGradient id="ha-field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2F5FA" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* the pale spatial field */}
      <rect x="10" y="12" width="380" height="466" rx="18" fill="url(#ha-field)" />
      <rect x="10" y="12" width="380" height="466" rx="18" fill="none" stroke="#3157F6" strokeOpacity="0.1" />
      <rect x="220" y="110" width="150" height="60" fill="url(#ha-dots)" opacity="0.6" />
      <rect x="30" y="300" width="120" height="120" fill="url(#ha-dots)" opacity="0.45" />

      {/* ── inputs: the real operation, scattered → aligned ── */}
      <motion.g style={{ x: inputsX, y: inputsY }}>
        <text x="34" y="32" className={cn(MONO, "fill-[#4A5164]")}>{t.inputsLabel}</text>
        {t.inputs.map((label, i) => {
          const s = SCATTER[i % SCATTER.length];
          const p = IN_POS(i);
          return (
            <motion.g
              key={label}
              initial={reduce ? false : { opacity: 0, x: s.x, y: s.y, rotate: s.r }}
              animate={on ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
              transition={reduce ? { duration: 0 } : { opacity: { duration: 0.4, delay: 0.1 + i * 0.08 }, x: { ...SPRING, delay: 0.7 + i * 0.07 }, y: { ...SPRING, delay: 0.7 + i * 0.07 }, rotate: { ...SPRING, delay: 0.7 + i * 0.07 } }}
              style={{ originX: `${p.x + IN_W / 2}px`, originY: `${p.y + IN_H / 2}px` }}
            >
              <rect x={p.x} y={p.y} width={IN_W} height={IN_H} rx="5" fill="#FFFFFF" stroke="#C9D3EC" />
              <rect x={p.x + 10} y={p.y + 11} width="6" height="6" rx="1.2" fill="#3157F6" fillOpacity={0.4 + (i % 3) * 0.2} />
              <text x={p.x + 24} y={p.y + 18.5} className={cn(MONO, "fill-[#1E2233]")}>{label}</text>
            </motion.g>
          );
        })}
      </motion.g>

      {/* connectors converging into the engineering field */}
      {t.inputs.map((label, i) => {
        const p = IN_POS(i);
        const x0 = p.x + IN_W / 2;
        const y0 = p.y + IN_H;
        return (
          <motion.path
            key={label}
            d={`M${x0} ${y0} C ${x0} ${y0 + 34}, ${FIELD_MID_X} ${FIELD.y - 44}, ${FIELD_MID_X} ${FIELD.y}`}
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.45"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={reduce ? { duration: 0 } : { pathLength: { duration: 0.7, delay: 1.15 + i * 0.05, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 1.15 + i * 0.05 } }}
          />
        );
      })}

      {/* ── the engineering field ── */}
      <motion.g initial={reduce ? false : { opacity: 0 }} animate={on ? { opacity: 1 } : undefined} transition={T(1.4, 0.6)}>
        <rect x={FIELD.x} y={FIELD.y} width={FIELD.w} height={FIELD.h} rx="9" fill="#FFFFFF" fillOpacity="0.75" stroke="#3157F6" strokeOpacity="0.32" />
        <rect x={FIELD.x + 1} y={FIELD.y + 1} width={FIELD.w - 2} height={FIELD.h - 2} rx="8" fill="url(#ha-grid)" />
        <text x={FIELD.x + 14} y={FIELD.y + 22} className={cn(MONO, "fill-accent")}>{t.fieldLabel}</text>
        <line x1={FIELD.x + 14} x2={FIELD.x + FIELD.w - 14} y1={FIELD.y + 31} y2={FIELD.y + 31} stroke="#3157F6" strokeOpacity="0.22" />
        <circle cx={FIELD_MID_X} cy={FIELD.y} r="3.5" fill="#FFFFFF" stroke="#3157F6" strokeWidth="1.2" />
        <circle cx={FIELD_MID_X} cy={FIELD.y + FIELD.h} r="3.5" fill="#3157F6" />
        <text x={FIELD_MID_X} y={FIELD.y + 64} textAnchor="middle" className="font-heading text-[14px] font-bold tracking-[-0.01em] fill-foreground">{t.statement[0]}</text>
        <text x={FIELD_MID_X} y={FIELD.y + 84} textAnchor="middle" className="font-heading text-[14px] font-bold tracking-[-0.01em] fill-accent">{t.statement[1]}</text>
      </motion.g>

      {/* connectors from the field to the four layers */}
      {t.layers.map((label, i) => {
        const p = LAYER_POS(i);
        const y1 = p.y + LAYER_H / 2;
        return (
          <motion.path
            key={label}
            d={`M${FIELD_MID_X} ${FIELD.y + FIELD.h + 4} C ${FIELD_MID_X} ${FIELD.y + FIELD.h + 30}, ${p.x - 30} ${y1}, ${p.x - 2} ${y1}`}
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.45"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={reduce ? { duration: 0 } : { pathLength: { duration: 0.6, delay: 1.85 + i * 0.08, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 1.85 + i * 0.08 } }}
          />
        );
      })}

      {/* ── the four system layers and the result ── */}
      <motion.g style={{ x: layersX, y: layersY }}>
        <text x="66" y="322" className={cn(MONO, "fill-[#4A5164]")}>{t.layersLabel}</text>
        {t.layers.map((label, i) => {
          const p = LAYER_POS(i);
          return (
            <motion.g key={label} initial={reduce ? false : { opacity: 0, x: -10 }} animate={on ? { opacity: 1, x: 0 } : undefined} transition={T(2.05 + i * 0.1, 0.5)}>
              <rect x={p.x} y={p.y} width={LAYER_W} height={LAYER_H} rx="4" fill="#FFFFFF" stroke="#C9D3EC" />
              <rect x={p.x} y={p.y} width="3" height={LAYER_H} rx="1.5" fill="#3157F6" fillOpacity={1 - i * 0.18} />
              <text x={p.x + 14} y={p.y + 17.5} className="font-heading text-[12px] font-bold tracking-[-0.01em] fill-foreground">{label}</text>
              <text x={p.x + LAYER_W - 10} y={p.y + 17} textAnchor="end" className="font-mono text-[8.5px] tracking-[0.16em] fill-[#8A8FA0]">0{i + 1}</text>
            </motion.g>
          );
        })}
        <motion.g initial={reduce ? false : { opacity: 0, y: 6 }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={T(2.55, 0.5)}>
          <circle cx={66 + 18} cy={464} r="9" fill="#3157F6" fillOpacity="0.1" />
          <circle cx={66 + 18} cy={464} r="4" fill="#3157F6" />
          <text x={66 + 36} y={468} className="font-mono text-[10.5px] uppercase tracking-[0.18em] fill-foreground">{t.result}</text>
        </motion.g>
      </motion.g>
    </svg>
  );
}

/**
 * The compact interpretation for tablets and phones: a row of
 * operational fragments, the engineering field with the statement,
 * four thin layers and the system — readable at any width.
 */
export function OperatingLayerCompact({ t }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const on = reduce || inView;
  const show = (delay) => ({ initial: reduce ? false : { opacity: 0, y: 8 }, animate: on ? { opacity: 1, y: 0 } : undefined, transition: reduce ? { duration: 0 } : { duration: 0.5, delay, ease: EASE } });
  const rail = <span aria-hidden="true" className="mx-auto block h-6 w-px bg-accent/40" />;

  return (
    <div ref={ref} aria-label={t.visualLabel} role="img" className="rounded-[18px] bg-[linear-gradient(160deg,#F2F5FA,#FFFFFF)] px-4 py-5 ring-1 ring-accent/10">
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
      <motion.div {...show(0.6)} className="rounded-xl border border-accent/30 bg-white/80 px-4 py-3.5 [background-image:linear-gradient(#3157F61a_0.8px,transparent_0.8px),linear-gradient(90deg,#3157F61a_0.8px,transparent_0.8px)] [background-size:16px_16px]">
        <p className={cn(MONO, "text-accent")}>{t.fieldLabel}</p>
        <p className="mt-1.5 font-heading text-[16px] font-bold leading-snug tracking-[-0.01em] text-foreground">
          {t.statement[0]} <span className="text-accent">{t.statement[1]}</span>
        </p>
      </motion.div>
      {rail}
      <p className={cn(MONO, "text-[#4A5164]")}>{t.layersLabel}</p>
      <ol className="mt-3 space-y-1.5">
        {t.layers.map((label, i) => (
          <motion.li key={label} {...show(0.9 + i * 0.1)} className="flex items-center justify-between rounded-md border border-[#C9D3EC] bg-white py-1.5 pl-3 pr-3" style={{ marginLeft: i * 6 }}>
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-3.5 w-[3px] rounded-full bg-accent" style={{ opacity: 1 - i * 0.18 }} />
              <span className="font-heading text-[13px] font-bold tracking-[-0.01em] text-foreground">{label}</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.16em] text-[#8A8FA0]">0{i + 1}</span>
          </motion.li>
        ))}
      </ol>
      <motion.p {...show(1.4)} className="mt-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
        <span aria-hidden="true" className="relative flex h-3.5 w-3.5 items-center justify-center"><span className="absolute inset-0 rounded-full bg-accent/15" /><span className="h-2 w-2 rounded-full bg-accent" /></span>
        {t.result}
      </motion.p>
    </div>
  );
}
