import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { cn } from "@/lib/utils";
import { Act, EASE, MONO, Note, Stamp, Statement, tabKey } from "./intBits";

/**
 * Act V — two real systems, two live traces. Not proof cards: the same
 * trace grammar the visitor has been reading, filled with verified steps
 * from Fivo (payments and events) and the real-estate CRM (operations and
 * external platforms). The visitor switches between them.
 */
export default function IntegrationProof({ c, paths }) {
  const t = c.proof;
  const reduced = useReducedMotion();
  const [k, setK] = useState(0);
  const traces = [{ ...t.fivo, id: "fivo", to: paths.fivo }, { ...t.crm, id: "crm", to: paths.crm }];
  const x = traces[k];
  const tr = { duration: reduced ? 0 : 0.35, ease: EASE };
  return (
    <Act id="in-proof" tone="page" className="border-t border-border">
      <Reveal>
        <Statement id="in-proof-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div role="tablist" aria-label={t.tabsLabel} className="mt-10 flex flex-wrap gap-2">
        {traces.map((y, i) => {
          const on = i === k;
          return (
            <button key={y.id} type="button" role="tab" id={`in-proof-${y.id}`} aria-selected={on} aria-controls="in-proof-panel" tabIndex={on ? 0 : -1} onClick={() => setK(i)} onKeyDown={(e) => tabKey(e, i, traces.length, setK)} className={cn("flex items-center gap-3 rounded-[8px] border px-4 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-white" : "border-border bg-white/60 hover:border-foreground/30")}>
              <span className={cn(MONO, on ? "text-accent" : "text-muted-foreground")}>{y.kicker}</span>
              <span className={cn("text-[14px] font-semibold", on ? "text-foreground" : "text-foreground/75")}>{y.name}</span>
            </button>
          );
        })}
      </div>
      <div id="in-proof-panel" role="tabpanel" aria-labelledby={`in-proof-${x.id}`} className="mt-6 rounded-[14px] border border-border bg-white p-5 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={x.id} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tr}>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className={cn(MONO, "text-accent")}>{x.kicker}</p>
                <h3 className="mt-3 font-heading text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-foreground md:text-3xl">{x.line}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{x.text}</p>
                <ul className="mt-6 space-y-2">
                  {x.facts.map((f) => <li key={f} className="flex items-start gap-2 text-[14px] leading-[1.55] text-foreground/85"><span aria-hidden="true" className="mt-[2px] font-mono text-[12px] text-[#1F6B3A]">✓</span>{f}</li>)}
                </ul>
                <div className="mt-7"><ActionLink to={x.to} variant="secondary" icon="right">{x.cta}</ActionLink></div>
              </div>
              <ol className="relative grid gap-2 lg:col-span-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
                <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-accent/40 lg:hidden" />
                {x.steps.map((s, i) => (
                  <motion.li key={s.label} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tr, delay: reduced ? 0 : 0.08 * i }} className="relative flex gap-3 lg:block">
                    <span aria-hidden="true" className={cn("relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px]", i === x.steps.length - 1 ? "border-[#1F6B3A] bg-[#EAF6EE] text-[#1F6B3A]" : "border-accent text-accent")}>{i === x.steps.length - 1 ? "✓" : `0${i + 1}`}</span>
                    <span className="min-w-0 lg:mt-3 lg:block">
                      <span className={cn(MONO, "block text-muted-foreground")}>{s.who}</span>
                      <span className="mt-1 block text-[14px] font-semibold leading-snug text-foreground">{s.label}</span>
                      <span className="mt-1.5 block font-mono text-[10px] leading-relaxed text-accent-deep/80 [overflow-wrap:anywhere]">{s.tech}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
            {x.more && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                <span className={cn(MONO, "mr-2 text-muted-foreground")}>{x.moreLabel}</span>
                {x.more.map((m) => <Stamp key={m} tone="neutral" glyph={false}>{m}</Stamp>)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Note className="mt-6">{t.note}</Note>
    </Act>
  );
}
