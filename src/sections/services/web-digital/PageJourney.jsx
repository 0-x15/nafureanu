import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, MONO, Statement, tabKey } from "./webBits";

/* Silhouettes: what each section of a long page looks like from far away. */
const SIL = {
  promise: <span className="block space-y-1.5"><i className="block h-3 w-4/5 rounded-[1px] bg-current" /><i className="block h-3 w-3/5 rounded-[1px] bg-current" /><i className="mt-2 block h-1.5 w-2/5 rounded-[1px] bg-current opacity-50" /><i className="mt-2 block h-2.5 w-1/4 rounded-[1px] bg-current" /></span>,
  context: <span className="block space-y-1"><i className="block h-1 w-full rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-11/12 rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-4/5 rounded-[1px] bg-current opacity-60" /></span>,
  problem: <span className="grid grid-cols-2 gap-2"><i className="block h-8 rounded-[1px] bg-current opacity-30" /><span className="space-y-1"><i className="block h-1 w-full rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-5/6 rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-2/3 rounded-[1px] bg-current opacity-60" /></span></span>,
  solution: <span className="grid grid-cols-[1fr_1.2fr] gap-2"><span className="space-y-1"><i className="block h-2 w-3/4 rounded-[1px] bg-current" /><i className="block h-1 w-full rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-5/6 rounded-[1px] bg-current opacity-60" /></span><i className="block h-9 rounded-[1px] bg-current opacity-30" /></span>,
  proof: <span className="grid grid-cols-3 gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="space-y-1 border border-current/30 p-1.5"><i className="block h-1 w-5/6 rounded-[1px] bg-current opacity-60" /><i className="block h-1 w-2/3 rounded-[1px] bg-current opacity-60" /></span>)}</span>,
  detail: <span className="block space-y-1">{[0, 1, 2, 3].map((i) => <span key={i} className="flex items-center gap-1.5"><i className="block h-1 w-1 rounded-full bg-current" /><i className="block h-1 rounded-[1px] bg-current opacity-60" style={{ width: `${[80, 65, 72, 55][i]}%` }} /></span>)}</span>,
  objection: <span className="block divide-y divide-current/30">{[0, 1, 2].map((i) => <span key={i} className="flex items-center justify-between py-1"><i className="block h-1 w-1/2 rounded-[1px] bg-current opacity-70" /><i className="block h-1.5 w-1.5 rounded-[1px] border border-current opacity-60" /></span>)}</span>,
  action: <span className="block space-y-1.5 border border-current/40 p-2"><i className="block h-2 w-2/3 rounded-[1px] bg-current" /><i className="block h-1 w-1/2 rounded-[1px] bg-current opacity-60" /><i className="mt-1 block h-2.5 w-1/3 rounded-[1px] bg-current" /></span>,
};

/**
 * Act III — the page is a journey. One long fictional page as a strip of
 * silhouettes; select a section to read the question it answers and the
 * uncertainty it removes. Conversion as removed uncertainty, and the
 * action that follows the business rather than the template.
 */
export default function PageJourney({ c }) {
  const t = c.journey;
  const reduced = useReducedMotion();
  const [k, setK] = useState(4);
  const s = t.sections[k];
  const tr = { duration: reduced ? 0 : 0.3, ease: EASE };
  return (
    <Act id="wd-journey" tone="page">
      <Reveal>
        <Statement id="wd-journey-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div role="tablist" aria-label={t.stripLabel} aria-orientation="vertical" className="mx-auto max-w-[360px] border border-border bg-white p-2 shadow-[0_30px_70px_-50px_rgba(12,18,32,0.35)] lg:mx-0">
            {t.sections.map((x, i) => {
              const on = i === k;
              return (
                <button key={x.id} type="button" role="tab" id={`wd-sec-${x.id}`} aria-selected={on} aria-controls="wd-sec-panel" tabIndex={on ? 0 : -1} onClick={() => setK(i)} onKeyDown={(e) => tabKey(e, i, t.sections.length, setK)} className={cn("grid w-full grid-cols-[72px_1fr] items-center gap-3 border-b border-border/70 px-2 py-2.5 text-left outline-none transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "bg-[#EEF3FC] text-accent-deep" : "text-foreground/45 hover:bg-[#F7F6F2] hover:text-foreground/70")}>
                  <span className={cn(MONO, on ? "text-accent" : "text-muted-foreground")}>{x.label}</span>
                  <span aria-hidden="true" className={cn("block", on ? "text-accent" : "text-foreground/60")}>{SIL[x.id]}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-8">
          <div id="wd-sec-panel" role="tabpanel" aria-labelledby={`wd-sec-${s.id}`} className="min-h-[220px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
                <p className={cn(MONO, "text-accent")}>{s.label} · {t.answersLabel}</p>
                <p className="mt-3 font-heading text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]">{s.q}</p>
                <p className={cn(MONO, "mt-8 text-muted-foreground")}>{t.whyLabel}</p>
                <p className="mt-2 max-w-xl text-[15px] leading-[1.7] text-foreground/85">{s.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <p className={cn(MONO, "text-muted-foreground")}>{t.phasesLabel}</p>
            <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {t.phases.map((p) => {
                const on = p.id === s.phase;
                return <li key={p.id} className={cn("border-t-2 pt-2 font-heading text-lg font-bold tracking-[-0.02em] transition-colors", on ? "border-accent text-foreground" : "border-border text-foreground/35")}>{p.label}</li>;
              })}
            </ol>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.65] text-muted-foreground">{t.phasesText}</p>
          </div>
        </div>
      </div>

      <Reveal className="mt-24 grid gap-10 border-t border-border pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h3 className="font-heading text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.actionsA}</span><span className="block text-muted-foreground">{t.actionsB}</span></h3>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.7] text-foreground/85">{t.actionsIntro}</p>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {t.actions.map((a) => <li key={a.label} className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"><span className="font-heading text-lg font-bold tracking-[-0.02em] text-foreground">{a.label}</span><span className={cn(MONO, "text-right text-muted-foreground")}>{a.for}</span></li>)}
          </ul>
          <p className="mt-6 max-w-lg font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">{t.actionsNote}</p>
        </div>
      </Reveal>
    </Act>
  );
}
