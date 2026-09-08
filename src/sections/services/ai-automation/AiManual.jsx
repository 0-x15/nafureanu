import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Step, tabKey } from "./aiBits";

/** Where manual work hides — eight verbs; each one becomes a three-step flow with the right role at each step. */
export default function AiManual({ c }) {
  const m = c.manual;
  const [i, setI] = useState(1);
  const p = m.patterns[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-manual" tone="white">
      <ChapterHead id="ai-manual" kicker={m.kicker} title={m.title} intro={m.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <ol role="tablist" aria-label={m.kicker} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {m.patterns.map((x, k) => { const on = k === i; return <li key={x.id}><button type="button" role="tab" id={`ai-manual-${x.id}`} aria-selected={on} aria-controls="ai-manual-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, m.patterns.length, setI)} className={cn("w-full rounded-[8px] border bg-white px-4 py-4 text-left font-heading text-lg font-bold tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent text-accent-deep" : "border-border text-foreground hover:border-foreground/30")}>{x.label}</button></li>; })}
          </ol>
        </Reveal>
        <motion.div key={p.id} id="ai-manual-panel" role="tabpanel" aria-labelledby={`ai-manual-${p.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-6">
            <p className={cn(MONO, "text-muted-foreground")}>{m.labels.today}</p>
            <p className="mt-1.5 font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{p.today}</p>
            <p className={cn(MONO, "mt-6 text-accent")}>{m.labels.automation}</p>
            <ol className="mt-3 space-y-2">
              {p.flow.map((st, k) => <motion.li key={`${p.id}-${k}`} initial={reduced ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: k * 0.12, ease: EASE }} className="rounded-[8px] border border-border bg-white px-4 py-3"><Step who={st.who} label={c.roles.labels[st.who]} text={st.text} n={k + 1} /></motion.li>)}
            </ol>
          </div>
        </motion.div>
      </div>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
