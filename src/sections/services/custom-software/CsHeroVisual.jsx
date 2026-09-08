import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, Frame, MONO, Status } from "./csBits";

const TILT = [-2.5, 1.5, -1, 2];

/**
 * From need to software. Phase 0: the requirement as loose quotes in a
 * dashed frame. Phase 1: the quotes resolve into six system layers.
 * Phase 2: the layers compress into one card in production. Plays once
 * in view (final state under reduced motion); the reader can step back.
 */
export default function CsHeroVisual({ h }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const [auto, setAuto] = useState(!reduced);
  useEffect(() => {
    if (!inView || !auto || reduced) return undefined;
    if (phase >= 2) { setAuto(false); return undefined; }
    const id = setTimeout(() => setPhase((p) => Math.min(2, p + 1)), phase === 0 ? 1700 : 2100);
    return () => clearTimeout(id);
  }, [inView, auto, phase, reduced]);
  const dur = reduced ? 0 : 0.5;

  return (
    <figure ref={ref} aria-label={h.visualLabel} className="m-0">
      <Frame tag={h.phases[phase]} tone={phase === 0 ? "dashed" : phase === 1 ? "solid" : "accent"} className={cn("min-h-[380px] transition-[border-color,background-color,box-shadow] duration-500 sm:min-h-[420px]", phase === 2 && "shadow-[0_30px_60px_-40px_rgba(37,99,235,0.45)]")}>
        <div className="relative min-h-[340px] sm:min-h-[380px]">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 0 && (
              <motion.ul key="need" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: reduced ? "none" : "blur(4px)" }} transition={{ duration: dur, ease: EASE }} className="absolute inset-0 flex flex-col justify-center gap-3 p-2 sm:p-4">
                {h.fragments.map((f, i) => (
                  <motion.li key={f} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.18, ease: EASE }} style={{ rotate: reduced ? 0 : TILT[i % TILT.length] }} className={cn("max-w-[86%] rounded-[6px] border border-border bg-white px-4 py-2.5 font-heading text-[15px] font-medium leading-snug text-foreground/85 shadow-sm", i % 2 ? "self-end" : "self-start")}>
                    <span aria-hidden="true" className="mr-1.5 text-accent">“</span>{f}<span aria-hidden="true" className="ml-0.5 text-accent">”</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
            {phase === 1 && (
              <motion.ol key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }} transition={{ duration: dur, ease: EASE }} className="absolute inset-0 flex flex-col justify-center gap-1.5 p-2 sm:p-4">
                {h.layers.map((l, i) => (
                  <motion.li key={l.id} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.12, ease: EASE }} className="grid grid-cols-[112px_1fr] items-center gap-3 rounded-[6px] border border-accent/40 bg-white px-3 py-2 sm:grid-cols-[140px_1fr]" style={{ marginLeft: `${i * 3}%`, marginRight: `${(5 - i) * 2}%` }}>
                    <span className="flex items-center gap-2"><span aria-hidden="true" className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">{l.label}</span></span>
                    <span className="truncate text-[12px] text-muted-foreground">{l.hint}</span>
                  </motion.li>
                ))}
              </motion.ol>
            )}
            {phase === 2 && (
              <motion.div key="prod" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: dur, ease: EASE }} className="absolute inset-0 flex flex-col justify-center p-2 sm:p-4">
                <div className="rounded-[10px] border border-accent bg-white p-5 shadow-[0_24px_48px_-30px_rgba(37,99,235,0.5)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{h.final}</p>
                    <Status>{h.finalMeta[0]}</Status>
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {h.layers.map((l) => <li key={l.id} className="rounded-[5px] border border-border bg-[#FAFBFD] px-2.5 py-1.5 text-[12px] font-medium text-foreground/85">{l.label}</li>)}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5">{h.finalMeta.map((m) => <li key={m}><Status>{m}</Status></li>)}</ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Frame>
      <ol className="mt-4 grid grid-cols-3 gap-2" aria-label={h.visualLabel}>
        {h.phases.map((p, i) => {
          const on = i === phase;
          return (
            <li key={p}>
              <button type="button" aria-pressed={on} onClick={() => { setAuto(false); setPhase(i); }} className={cn("w-full rounded-[6px] border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-white" : "border-border hover:border-foreground/30")}>
                <span className={cn(MONO, "block", on ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span>
                <span className="mt-0.5 block text-[13px] font-semibold text-foreground">{p}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <figcaption className={cn(MONO, "mt-3 text-muted-foreground")}>{h.note}</figcaption>
    </figure>
  );
}
