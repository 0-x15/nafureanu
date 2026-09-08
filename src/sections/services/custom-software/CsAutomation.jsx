import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO } from "./csBits";

/** Automation inside the product — an event log from one morning; entries land in order as the chapter enters the viewport. */
export default function CsAutomation({ c }) {
  const a = c.automation;
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-automation" tone="white">
      <ChapterHead id="cs-automation" kicker={a.kicker} title={a.title} intro={a.intro} />
      <Reveal delay={0.05} className="mt-12 md:mt-16">
        <div className="overflow-hidden rounded-[10px] border border-border bg-white">
          <div className="hidden grid-cols-[64px_1fr_1fr_1.3fr_1fr] gap-4 border-b border-border bg-[#FAFBFD] px-5 py-2.5 md:grid">
            <span className={cn(MONO, "text-muted-foreground")}>—</span>
            {a.columns.map((col, k) => <span key={col} className={cn(MONO, k === 2 ? "text-accent" : "text-muted-foreground")}>{col}</span>)}
          </div>
          <ol>
            {a.log.map((row, i) => (
              <motion.li key={row.t} initial={reduced ? false : { opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.4, delay: i * 0.22, ease: EASE }} className="grid gap-2 border-b border-border px-5 py-3.5 last:border-b-0 md:grid-cols-[64px_1fr_1fr_1.3fr_1fr] md:gap-4 md:py-3">
                <span className="font-mono text-[11px] text-accent">{row.t}</span>
                {[["event", row.event], ["condition", row.condition], ["action", row.action], ["result", row.result]].map(([k, v], ci) => (
                  <span key={k} className={cn("text-[13px] leading-snug", ci === 2 ? "rounded-[5px] bg-[#EEF3FC] px-2 py-1 font-medium text-accent-deep md:-mx-2" : ci === 3 ? "text-muted-foreground" : "text-foreground/85")}>
                    <span className={cn(MONO, "mr-2 text-muted-foreground md:hidden")}>{a.columns[ci]}</span>{v}
                  </span>
                ))}
              </motion.li>
            ))}
          </ol>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{a.note}</p>
      </Reveal>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
