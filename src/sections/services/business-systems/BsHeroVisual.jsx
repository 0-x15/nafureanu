import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, MONO, StateChip } from "./bsBits";

/* Scattered positions (phase 0) and modelled positions (phase ≥ 1), in % of the field. */
const SCATTER = { customer: [14, 22], case: [58, 12], document: [82, 40], task: [30, 62], operation: [62, 58], approval: [86, 78], message: [12, 84] };
const MODEL = { customer: [14, 30], case: [40, 30], operation: [66, 30], document: [66, 66], task: [40, 66], approval: [88, 66], message: [14, 66] };
const STATE_AT = { case: 1, operation: 3, document: 0, task: 0, approval: 2 };

/**
 * The business model becomes software. Four phases: entities appear
 * scattered, relationships resolve them into a model, states and rules
 * are layered on, and a frame encloses everything as one system. Plays
 * once when in view (never under reduced motion, where the final state
 * is shown), then the reader can step through it.
 */
export default function BsHeroVisual({ h }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [auto, setAuto] = useState(!reduced);
  useEffect(() => {
    if (!inView || !auto || reduced) return undefined;
    if (phase >= 3) { setAuto(false); return undefined; }
    const id = setTimeout(() => setPhase((p) => Math.min(3, p + 1)), phase === 0 ? 1400 : 1900);
    return () => clearTimeout(id);
  }, [inView, auto, phase, reduced]);
  const pos = phase === 0 ? SCATTER : MODEL;
  const byId = Object.fromEntries(h.entities.map((e) => [e.id, e]));
  const dur = reduced ? 0 : 0.9;

  return (
    <figure ref={ref} aria-label={h.visualLabel} className="m-0">
      <div className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border transition-[border-color,box-shadow] duration-700 sm:aspect-[16/11]", phase === 3 ? "border-accent/60 bg-white shadow-[0_30px_60px_-40px_rgba(37,99,235,0.45)]" : "border-border/70 bg-[#FAFBFD]")}>
        {/* grid paper */}
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* relationships */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {h.relations.map(([a, b]) => {
            const [x1, y1] = MODEL[a]; const [x2, y2] = MODEL[b];
            return (
              <motion.line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2563EB" strokeWidth="1.1" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                initial={false} animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.7 : 0 }} transition={{ duration: dur, ease: EASE, delay: phase === 1 ? 0.3 : 0 }} />
            );
          })}
        </svg>
        {/* relation labels */}
        {h.relations.map(([a, b, label]) => {
          const [x1, y1] = MODEL[a]; const [x2, y2] = MODEL[b];
          return (
            <motion.span key={`${a}-${b}-l`} aria-hidden="true" initial={false} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.5 }}
              className={cn(MONO, "absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-white/90 px-1 py-0.5 text-[9px] text-accent")} style={{ left: `${(x1 + x2) / 2}%`, top: `${(y1 + y2) / 2}%` }}>{label}</motion.span>
          );
        })}
        {/* entities */}
        {h.entities.map((e, i) => {
          const [x, y] = pos[e.id];
          const st = STATE_AT[e.id];
          return (
            <motion.div key={e.id} initial={false} animate={{ left: `${x}%`, top: `${y}%`, opacity: inView || reduced ? 1 : 0 }} transition={{ duration: dur, ease: EASE, delay: phase === 0 ? i * 0.08 : 0 }}
              className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-[7px] border bg-white px-3 py-2 shadow-sm transition-colors duration-500", phase >= 1 ? "border-accent/50" : "border-border")}>
              <span className={cn("block whitespace-nowrap text-[12px] font-semibold tracking-[-0.01em]", phase >= 1 ? "text-foreground" : "text-foreground/80")}>{byId[e.id].label}</span>
              {st !== undefined && (
                <motion.span initial={false} animate={{ opacity: phase >= 2 ? 1 : 0, height: phase >= 2 ? "auto" : 0 }} transition={{ duration: 0.4 }} className="block overflow-hidden">
                  <StateChip className="mt-1.5">{h.states[st]}</StateChip>
                </motion.span>
              )}
            </motion.div>
          );
        })}
        {/* rules */}
        <motion.ul initial={false} animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 8 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 sm:left-auto sm:max-w-[60%]">
          {h.rules.map((r) => <li key={r} className={cn(MONO, "rounded-[4px] border border-dashed border-accent/60 bg-white/95 px-2 py-1 text-[9px] text-accent-deep")}>{r}</li>)}
        </motion.ul>
        {/* system frame label */}
        <motion.span initial={false} animate={{ opacity: phase >= 3 ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.2 }} className={cn(MONO, "absolute left-3 top-3 rounded-[4px] bg-accent px-2 py-1 text-white")}>{h.system}</motion.span>
      </div>
      {/* stepper */}
      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label={h.visualLabel}>
        {h.steps.map((s, i) => {
          const on = i === phase;
          return (
            <li key={s.id}>
              <button type="button" aria-pressed={on} onClick={() => { setAuto(false); setPhase(i); }} className={cn("w-full rounded-[6px] border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-white" : "border-border bg-transparent hover:border-foreground/30")}>
                <span className={cn(MONO, "block", on ? "text-accent" : "text-muted-foreground")}>0{i + 1} · {s.label}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-foreground/75">{s.text}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <figcaption className={cn(MONO, "mt-3 text-muted-foreground")}>{h.note}</figcaption>
    </figure>
  );
}
