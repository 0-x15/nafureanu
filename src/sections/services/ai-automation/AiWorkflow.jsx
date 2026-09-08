import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Tone } from "./aiBits";

/** Workflow automation — EVENT → CONDITION → ACTION → STATE lanes, each with the system it comes from. */
export default function AiWorkflow({ c }) {
  const w = c.workflow;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-workflow" tone="white">
      <ChapterHead id="ai-workflow" kicker={w.kicker} title={w.title} intro={w.intro} />
      <Reveal delay={0.05} className="mt-12 md:mt-16">
        <div className="overflow-hidden rounded-[10px] border border-border bg-white">
          <div className="hidden grid-cols-[1fr_1fr_1.4fr_140px_150px] gap-4 border-b border-border bg-[#FAFBFD] px-5 py-2.5 md:grid">
            {w.columns.map((col, k) => <span key={col} className={cn(MONO, k === 2 ? "text-accent" : "text-muted-foreground")}>{col}</span>)}
            <span className={cn(MONO, "text-muted-foreground")}>{w.proofLabel}</span>
          </div>
          <ol>
            {w.lanes.map((l, i) => (
              <li key={l.event} className="grid gap-2 border-b border-border px-5 py-3.5 last:border-b-0 md:grid-cols-[1fr_1fr_1.4fr_140px_150px] md:items-center md:gap-4 md:py-3">
                {[l.event, l.condition, l.action].map((v, k) => (
                  <motion.span key={k} initial={reduced ? false : { opacity: 0.3 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: 0.35, delay: i * 0.05 + k * 0.25, ease: EASE }} className={cn("text-[13px] leading-snug", k === 2 ? "rounded-[5px] bg-[#EEF3FC] px-2 py-1 font-medium text-accent-deep md:-mx-2" : "text-foreground/85")}>
                    <span className={cn(MONO, "mr-2 text-muted-foreground md:hidden")}>{w.columns[k]}</span>{v}
                  </motion.span>
                ))}
                <motion.span initial={reduced ? false : { opacity: 0.3 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: 0.35, delay: i * 0.05 + 0.8, ease: EASE }}><span className={cn(MONO, "mr-2 text-muted-foreground md:hidden")}>{w.columns[3]}</span><Tone tone="ok">{l.state}</Tone></motion.span>
                <span className={cn(MONO, l.proof === "Patrón" || l.proof === "Pattern" ? "text-muted-foreground" : "text-[#1F6B3A]")}>{l.proof}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{w.note}</p>
      </Reveal>
      <Closing>{w.closing}</Closing>
    </Chapter>
  );
}
