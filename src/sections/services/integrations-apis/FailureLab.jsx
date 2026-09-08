import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, MONO, Note, Stamp, Statement, Sys, tabKey } from "./intBits";

const STAGES = ["receive", "validate", "map", "rule", "deliver", "confirm"];

/**
 * Act II — reality starts after the happy path. The same trace, broken on
 * purpose: the visitor picks a failure and sees where it breaks, how a
 * production integration handles it, and why not every strategy applies.
 * Source of truth and identities live in this act, not in chapters of
 * their own.
 */
export default function FailureLab({ c }) {
  const t = c.failure;
  const reduced = useReducedMotion();
  const [k, setK] = useState(0);
  const f = t.failures[k];
  const where = STAGES.indexOf(f.where);
  const tr = { duration: reduced ? 0 : 0.35, ease: EASE };
  return (
    <Act id="in-failure" tone="lab">
      <Reveal>
        <Statement id="in-failure-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{t.controlsLabel}</p>
          <div role="tablist" aria-label={t.controlsLabel} aria-orientation="vertical" className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {t.failures.map((x, i) => {
              const on = i === k;
              return (
                <button key={x.id} type="button" role="tab" id={`in-fail-${x.id}`} aria-selected={on} aria-controls="in-fail-panel" tabIndex={on ? 0 : -1} onClick={() => setK(i)} onKeyDown={(e) => tabKey(e, i, t.failures.length, setK)} className={cn("flex items-center gap-3 rounded-[8px] border px-3.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-[#E39A91] bg-white" : "border-border bg-white/60 hover:border-foreground/30")}>
                  <span aria-hidden="true" className={cn("font-mono text-[12px]", on ? "text-[#A4261B]" : "text-muted-foreground")}>×</span>
                  <span className={cn("text-[13px] font-semibold", on ? "text-foreground" : "text-foreground/75")}>{x.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="in-fail-panel" role="tabpanel" aria-labelledby={`in-fail-${f.id}`} className="rounded-[14px] border border-border bg-white p-4 md:p-6 lg:col-span-8">
          <ol className="relative grid gap-1 sm:grid-cols-6 sm:gap-0">
            <span aria-hidden="true" className="absolute bottom-2 left-[13px] top-2 w-px bg-foreground/15 sm:bottom-auto sm:left-0 sm:right-0 sm:top-[13px] sm:h-px sm:w-auto" />
            {t.stagesShort.map((label, i) => {
              const broken = i === where;
              const past = i < where;
              return (
                <li key={label} className="flex items-center gap-3 py-1 sm:flex-col sm:gap-2 sm:py-0 sm:text-center">
                  <span aria-hidden="true" className={cn("relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[11px]", broken ? "border-[#A4261B] bg-[#FEF1F0] text-[#A4261B] ring-4 ring-[#A4261B]/15" : past ? "border-accent bg-accent text-white" : "border-foreground/25 text-muted-foreground")}>{broken ? "×" : past ? "✓" : `0${i + 1}`}</span>
                  <span className={cn("text-[12px] font-semibold", broken ? "text-[#A4261B]" : past ? "text-foreground" : "text-muted-foreground")}>{label}{broken && <span className="sr-only"> · {t.brokenHere}</span>}</span>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={f.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr} className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Stamp tone="fail">{f.error}</Stamp>
                <span className={cn(MONO, "text-muted-foreground")}>{t.atStage} {t.stagesShort[where]}</span>
              </div>
              <p className={cn(MONO, "mt-6 text-muted-foreground")}>{t.handlingLabel}</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                {f.handling.map((h, i) => (
                  <motion.li key={h} initial={reduced ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ ...tr, delay: reduced ? 0 : 0.12 * (i + 1) }} className="relative rounded-[8px] border border-accent/40 bg-[#EEF3FC] px-3.5 py-3">
                    <span className={cn(MONO, "text-accent")}>0{i + 1}</span>
                    <span className="mt-1 block text-[13px] font-semibold leading-snug text-foreground">{h}</span>
                    {i < f.handling.length - 1 && <span aria-hidden="true" className="absolute -right-[9px] top-1/2 hidden font-mono text-[12px] text-accent sm:block">→</span>}
                  </motion.li>
                ))}
              </ol>
              <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...tr, delay: reduced ? 0 : 0.5 }} className="mt-5 flex flex-wrap items-center gap-3">
                <span className={cn(MONO, "text-muted-foreground")}>{t.outcomeLabel}</span>
                <Stamp tone={f.outcomeTone}>{f.outcome}</Stamp>
              </motion.div>
              <p className="mt-5 text-[15px] leading-[1.7] text-foreground/85">{f.decision}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Note className="mt-6">{t.caveat}</Note>

      {/* Source of truth · identities */}
      <div className="mt-20 grid gap-12 border-t border-foreground/10 pt-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl [text-wrap:balance]"><span className="block">{t.truthA}</span><span className="block text-muted-foreground">{t.truthB}</span></h3>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-muted-foreground">{t.truthIntro}</p>
          <ul className="mt-8 divide-y divide-border rounded-[10px] border border-border bg-white">
            {t.truths.map((x) => (
              <li key={x.field} className="grid gap-2 px-4 py-3 sm:grid-cols-[1.1fr_1fr_1fr] sm:items-center">
                <span className="text-[14px] font-semibold text-foreground">{x.field}</span>
                <span className="flex items-center gap-2"><Stamp tone="transit" glyph={false}><span aria-hidden="true">●</span> {x.owner}</Stamp><span className={cn(MONO, "text-[9px] text-accent")}>{t.truthOwner}</span></span>
                <span className="flex items-center gap-2"><Stamp tone="muted" glyph={false}><span aria-hidden="true">○</span> {x.other}</Stamp><span className={cn(MONO, "text-[9px] text-muted-foreground")}>{t.truthCopy}</span></span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl [text-wrap:balance]"><span className="block">{t.idA}</span><span className="block text-muted-foreground">{t.idB}</span></h3>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-muted-foreground">{t.idIntro}</p>
          <div className="mt-8 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <Sys label={t.idSystemA}><p className="font-mono text-[12px]"><span className="text-muted-foreground">{t.idKeyA}</span> <span className="text-foreground">= {t.idValA}</span></p></Sys>
            <span className="flex flex-col items-center gap-1 px-2 text-center" aria-hidden="true"><span className="font-mono text-[14px] text-accent">=</span></span>
            <Sys label={t.idSystemB}><p className="font-mono text-[12px]"><span className="text-muted-foreground">{t.idKeyB}</span> <span className="text-foreground">= {t.idValB}</span></p></Sys>
          </div>
          <Note tone="accent" className="mt-3">{t.idLink}</Note>
          <ul className="mt-6 space-y-2">
            {t.idPoints.map((p) => <li key={p} className="flex items-start gap-3 text-[14px] leading-[1.6] text-foreground/85"><span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent" />{p}</li>)}
          </ul>
        </Reveal>
      </div>
    </Act>
  );
}
