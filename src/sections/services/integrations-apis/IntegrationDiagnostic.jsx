import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, MONO, Note, Statement, tabKey } from "./intBits";

/**
 * Act VI — what do you actually need? An integration diagnostic instead
 * of a "when this makes sense" list: pick what happens today between the
 * two systems, read the likely pattern and what we would inspect first.
 * Then the six things that are enough to start.
 */
export default function IntegrationDiagnostic({ c }) {
  const t = c.diagnostic;
  const reduced = useReducedMotion();
  const [k, setK] = useState(2);
  const o = t.options[k];
  const tr = { duration: reduced ? 0 : 0.35, ease: EASE };
  return (
    <Act id="in-diagnostic" tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <Statement id="in-diagnostic-title" a={t.a} b={t.b} className="lg:text-[2.6rem]" />
          <p className="mt-6 max-w-lg text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
          <div role="tablist" aria-label={t.optionsLabel} aria-orientation="vertical" className="mt-8 grid gap-1.5">
            {t.options.map((x, i) => {
              const on = i === k;
              return (
                <button key={x.id} type="button" role="tab" id={`in-diag-${x.id}`} aria-selected={on} aria-controls="in-diag-panel" tabIndex={on ? 0 : -1} onClick={() => setK(i)} onKeyDown={(e) => tabKey(e, i, t.options.length, setK)} className={cn("flex items-center gap-3 rounded-[8px] border px-3.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-[#EEF3FC]" : "border-border bg-white hover:border-foreground/30")}>
                  <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-[1px]", on ? "bg-accent" : "bg-foreground/25")} />
                  <span className={cn("text-[14px] font-semibold", on ? "text-accent-deep" : "text-foreground/80")}>{x.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <div id="in-diag-panel" role="tabpanel" aria-labelledby={`in-diag-${o.id}`} className="rounded-[14px] border border-border bg-[#FAFBFD] p-6 md:p-8 lg:sticky lg:top-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={o.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
                <p className={cn(MONO, "text-muted-foreground")}>{t.situationLabel}</p>
                <p className="mt-2 font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{o.label}</p>
                <p className={cn(MONO, "mt-7 text-accent")}>{t.patternLabel}</p>
                <p className="mt-2 text-[15px] leading-[1.7] text-foreground/85">{o.pattern}</p>
                <p className={cn(MONO, "mt-7 text-accent")}>{t.inspectLabel}</p>
                <ol className="mt-2 space-y-2">
                  {o.inspect.map((x, i) => <li key={x} className="flex items-start gap-3 text-[14px] leading-[1.6] text-foreground/85"><span className={cn(MONO, "mt-[3px] text-muted-foreground")}>0{i + 1}</span>{x}</li>)}
                </ol>
              </motion.div>
            </AnimatePresence>
            <Note className="mt-8">{t.caveat}</Note>
          </div>
        </div>
      </div>

      <Reveal className="mt-24 grid gap-10 border-t border-border pt-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h3 className="font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl [text-wrap:balance]"><span className="block">{t.startA}</span><span className="block text-muted-foreground">{t.startB}</span></h3>
          <p className="mt-5 max-w-lg text-base leading-[1.7] text-foreground/85 md:text-lg">{t.startIntro}</p>
        </div>
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7">
          {t.fields.map((f, i) => (
            <li key={f.label} className="border-b border-dashed border-foreground/30 pb-3">
              <span className={cn(MONO, "text-accent")}>0{i + 1}</span>
              <span className="mt-1 block text-[15px] font-semibold text-foreground">{f.label}</span>
              <span className="mt-0.5 block text-[13px] text-muted-foreground">{f.hint}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Act>
  );
}
