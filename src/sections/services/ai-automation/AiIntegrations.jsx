import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, tabKey } from "./aiBits";

/** Automation across tools — select a flow and watch the work move through the tools that already exist. */
export default function AiIntegrations({ c }) {
  const g = c.integrations;
  const [i, setI] = useState(0);
  const fl = g.flows[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-integrations">
      <ChapterHead id="ai-integrations" kicker={g.kicker} title={g.title} intro={g.intro} />
      <Reveal delay={0.05} className="mt-10 md:mt-14">
        <div role="tablist" aria-label={g.kicker} className="flex flex-wrap gap-1.5">
          {g.flows.map((f, k) => { const on = k === i; return <button key={f.id} type="button" role="tab" id={`ai-flow-${f.id}`} aria-selected={on} aria-controls="ai-flow-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, g.flows.length, setI)} className={cn("rounded-full border px-4 py-2 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>{f.label}</button>; })}
        </div>
      </Reveal>
      <div id="ai-flow-panel" role="tabpanel" aria-labelledby={`ai-flow-${fl.id}`} className="mt-6 rounded-[12px] border border-border bg-white p-5 md:p-8">
        <ol className="relative grid gap-3 md:grid-cols-4 md:gap-6">
          {!reduced && <motion.span key={fl.id} aria-hidden="true" className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-accent md:block" initial={{ left: "2%", opacity: 0 }} animate={{ left: ["2%", "98%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.8, ease: "linear", delay: 0.2 }} />}
          {fl.steps.map((s, k) => (
            <motion.li key={`${fl.id}-${k}`} initial={reduced ? false : { opacity: 0.35 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 + k * 0.45 }} className="relative rounded-[8px] border border-border bg-[#FAFBFD] px-4 py-3">
              <span className={cn(MONO, "text-accent")}>{String(k + 1).padStart(2, "0")} · {s.tool}</span>
              <span className="mt-1 block text-[13px] leading-snug text-foreground/85">{s.action}</span>
              {k < fl.steps.length - 1 && <span aria-hidden="true" className="absolute -right-[14px] top-1/2 hidden h-px w-4 bg-accent/60 md:block" />}
            </motion.li>
          ))}
        </ol>
        <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">{g.tools.map((t) => <li key={t}><Pill tone={fl.steps.some((s) => s.tool === t) ? "done" : "soft"}>{t}</Pill></li>)}</ul>
      </div>
      <Reveal delay={0.06}><p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{g.note}</p></Reveal>
      <Closing>{g.closing}</Closing>
    </Chapter>
  );
}
