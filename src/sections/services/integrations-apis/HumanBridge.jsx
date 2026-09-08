import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, Field, MONO, Stamp, Statement, Sys, tabKey } from "./intBits";

/**
 * Act I — the human integration. The before state on the left (the same
 * record twice, states already apart) and the manual pattern the visitor
 * picks on the right; the pattern rewrites the steps between the systems.
 */
export default function HumanBridge({ c }) {
  const t = c.bridge;
  const reduced = useReducedMotion();
  const [k, setK] = useState(0);
  const p = t.patterns[k];
  const tr = { duration: reduced ? 0 : 0.35, ease: EASE };
  return (
    <Act id="in-bridge" tone="white">
      <Reveal>
        <Statement id="in-bridge-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal variant="scale" className="lg:col-span-5">
          <div className="mx-auto max-w-[440px]">
            <Sys label={t.systemA} meta={<Stamp tone="muted" glyph={false}>{t.kindA}</Stamp>}>
              <Field k={t.record.customer} v={t.name} />
              <Field k={t.record.ref} v={t.ref} />
              <div className="mt-2 flex items-center justify-between font-mono text-[11px]"><span className="text-muted-foreground">{t.record.status}</span><Stamp tone="ok">{t.statusA}</Stamp></div>
            </Sys>
            <div className="ml-6 border-l border-dashed border-foreground/35 py-2 pl-5" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ol key={p.id} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr} className="space-y-1.5">
                  {p.steps.map((s, i) => (
                    <li key={s} className="relative flex items-center gap-3">
                      <i aria-hidden="true" className="absolute -left-[26px] h-1.5 w-1.5 rounded-full border border-foreground/50 bg-white" />
                      <span className={cn(MONO, "text-muted-foreground")}>0{i + 1}</span>
                      <span className={cn(MONO, "rounded-[4px] border border-dashed border-foreground/35 bg-white px-2 py-0.5 text-foreground/80")}>{s}</span>
                    </li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </div>
            <Sys label={t.systemB} tone="fail" meta={<Stamp tone="muted" glyph={false}>{t.kindB}</Stamp>}>
              <Field k={t.record.customer} v={t.name} />
              <Field k={t.record.ref} v={t.ref} />
              <div className="mt-2 flex items-center justify-between font-mono text-[11px]"><span className="text-muted-foreground">{t.record.status}</span><Stamp tone="warn">{t.statusB}</Stamp></div>
            </Sys>
            <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-[#A4261B]"><span aria-hidden="true" className="font-mono">×</span>{t.diverge}</p>
            <p className="mt-3"><Stamp tone="muted" glyph={false}>{t.note}</Stamp></p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <p className={cn(MONO, "text-muted-foreground")}>{t.patternsLabel}</p>
          <div role="tablist" aria-label={t.patternsLabel} className="mt-3 flex flex-wrap gap-2">
            {t.patterns.map((x, i) => {
              const on = i === k;
              return <button key={x.id} type="button" role="tab" id={`in-pattern-${x.id}`} aria-selected={on} aria-controls="in-pattern-panel" tabIndex={on ? 0 : -1} onClick={() => setK(i)} onKeyDown={(e) => tabKey(e, i, t.patterns.length, setK)} className={cn(MONO, "rounded-full border px-3.5 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground/75 hover:border-foreground/35")}>{x.label}</button>;
            })}
          </div>
          <div role="tabpanel" id="in-pattern-panel" aria-labelledby={`in-pattern-${p.id}`} className="mt-5 rounded-[10px] border border-border bg-[#FAFBFD] p-5 md:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={p.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
                <p className="font-heading text-lg font-semibold tracking-[-0.01em] text-foreground md:text-xl">{p.title}</p>
                <p className="mt-2 text-[15px] leading-[1.7] text-foreground/80">{p.cost}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.problems.map((x, i) => (
              <li key={x} className="rounded-[8px] border border-border bg-white p-4">
                <span className={cn(MONO, "text-accent")}>0{i + 1}</span>
                <span className="mt-1 block text-[14px] font-semibold leading-snug text-foreground">{x}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-xl font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">{t.closing}</p>
        </Reveal>
      </div>
    </Act>
  );
}
