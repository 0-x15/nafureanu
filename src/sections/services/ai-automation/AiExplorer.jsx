import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Step, tabKey } from "./aiBits";

/** Opportunity explorer — what consumes time today, and the possible system pattern for it. */
export default function AiExplorer({ lang, c }) {
  const x = c.explorer;
  const [i, setI] = useState(1);
  const cat = x.categories[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-explorer" tone="white">
      <ChapterHead id="ai-explorer" kicker={x.kicker} title={x.title} intro={x.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-6">
          <ol role="tablist" aria-label={x.title} className="grid gap-2 sm:grid-cols-2">
            {x.categories.map((k, idx) => { const on = idx === i; return <li key={k.id}><button type="button" role="tab" id={`ai-explore-${k.id}`} aria-selected={on} aria-controls="ai-explore-panel" tabIndex={on ? 0 : -1} onClick={() => setI(idx)} onKeyDown={(e) => tabKey(e, idx, x.categories.length, setI)} className={cn("w-full rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}><span className={cn(MONO, "block", on ? "text-accent" : "text-muted-foreground")}>{k.label}</span><span className={cn("mt-1 block text-[14px] leading-snug", on ? "font-semibold text-foreground" : "text-foreground/85")}>“{k.quote}”</span></button></li>; })}
          </ol>
        </Reveal>
        <motion.div key={cat.id} id="ai-explore-panel" role="tabpanel" aria-labelledby={`ai-explore-${cat.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-6">
          <div className="flex h-full flex-col rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-6">
            <p className={cn(MONO, "text-accent")}>{x.patternLabel}</p>
            <ol className="mt-3 space-y-2">{cat.pattern.map((s, k) => <motion.li key={`${cat.id}-${k}`} initial={reduced ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: k * 0.12, ease: EASE }} className="rounded-[8px] border border-border bg-white px-4 py-3"><Step who={s.who} label={c.roles.labels[s.who]} text={s.text} n={k + 1} /></motion.li>)}</ol>
            <div className="mt-auto pt-6"><ActionLink to={langPath(lang, "/contact")} size="md">{x.cta}</ActionLink></div>
          </div>
        </motion.div>
      </div>
      <Closing>{x.closing}</Closing>
    </Chapter>
  );
}
