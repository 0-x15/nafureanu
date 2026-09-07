import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, StateChip, stateTone } from "./bsBits";

/**
 * The model at work — a fictional case travels through six entities;
 * five lenses reveal what the system understands about each of them.
 * The chain never changes: only the annotations do, which is the point.
 */
export default function BsModel({ c }) {
  const m = c.model;
  const [lens, setLens] = useState(m.lenses[0].id);
  const active = m.lenses.find((l) => l.id === lens) || m.lenses[0];
  const reduced = useReducedMotion();
  const onKey = (e, i) => {
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: m.lenses.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(m.lenses.length - 1, Math.max(0, map[e.key]));
    setLens(m.lenses[j].id);
    document.getElementById(`bs-lens-${m.lenses[j].id}`)?.focus();
  };
  return (
    <Chapter id="bs-model">
      <ChapterHead id="bs-model" kicker={m.kicker} title={m.title} intro={m.intro} />
      <Reveal delay={0.05} className="mt-10 md:mt-14">
        <p className={cn(MONO, "mb-2 text-muted-foreground")}>{m.lensesLabel}</p>
        <div role="tablist" aria-label={m.lensesLabel} className="flex flex-wrap gap-1.5">
          {m.lenses.map((l, i) => {
            const on = l.id === lens;
            return (
              <button key={l.id} type="button" role="tab" id={`bs-lens-${l.id}`} aria-selected={on} aria-controls="bs-model-panel" tabIndex={on ? 0 : -1} onClick={() => setLens(l.id)} onKeyDown={(e) => onKey(e, i)}
                className={cn("rounded-full border px-4 py-2 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>{l.label}</button>
            );
          })}
        </div>
      </Reveal>
      <div id="bs-model-panel" role="tabpanel" aria-labelledby={`bs-lens-${active.id}`} className="mt-6">
        <motion.p key={active.id} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">{active.text}</motion.p>
        <Reveal variant="scale" delay={0.06} className="mt-6">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {m.chain.map((e, i) => {
              const notes = m.facets[active.id]?.[e.id] || [];
              return (
                <li key={e.id} className="relative flex lg:pr-6">
                  <div className="flex-1 rounded-[8px] border border-border bg-white p-3.5">
                    <span className={cn(MONO, "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-1 block font-heading text-base font-bold tracking-[-0.01em] text-foreground">{e.label}</span>
                    <ul className="mt-3 min-h-[64px] space-y-1.5">
                      {notes.map((n, k) => (
                        <motion.li key={`${active.id}-${n}`} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * i + 0.04 * k, ease: EASE }} className="text-[12px] leading-snug text-foreground/85">
                          {stateTone(n) !== "neutral" && n.length < 26 ? <StateChip>{n}</StateChip> : <span className="flex gap-2"><i aria-hidden="true" className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{n}</span>}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  {i < m.chain.length - 1 && <span aria-hidden="true" className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-accent lg:block" />}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
      <Reveal delay={0.08}><p className={cn(MONO, "mt-4 text-muted-foreground")}>{m.note}</p></Reveal>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
