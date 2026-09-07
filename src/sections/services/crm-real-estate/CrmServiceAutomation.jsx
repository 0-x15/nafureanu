import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./serviceBits";

/**
 * Automation — EVENT → RULE → ACTION → RESULT. Three groups of three
 * lanes, each verified in the system already built. Cells light up
 * left to right as the lane enters the viewport; none of it runs
 * off-screen or under reduced motion.
 */
export default function CrmServiceAutomation({ c }) {
  const a = c.automation;
  const reduced = useReducedMotion();
  return (
    <Chapter id="crm-service-automation" tone="blue">
      <ChapterHead id="crm-service-automation" kicker={a.kicker} title={a.titleB} titleMuted={a.titleA} intro={a.intro} />
      <Reveal delay={0.06} className="mt-12 hidden md:block">
        <div className="grid grid-cols-4 gap-3 border-b border-border pb-3">
          {a.stages.map((s, i) => <p key={s} className={cn(MONO, i === 2 ? "text-accent" : "text-muted-foreground")}>{s}</p>)}
        </div>
      </Reveal>
      <div className="mt-6 space-y-10">
        {a.groups.map((g) => (
          <Reveal key={g.title} delay={0.05}>
            <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{g.title}</p>
            <ul className="mt-4 space-y-3">
              {g.lanes.map((lane) => (
                <li key={lane.title} className="rounded-[10px] border border-border bg-white p-4">
                  <p className={cn(MONO, "mb-3 text-accent")}>{lane.title}</p>
                  <ol className="grid gap-2 md:grid-cols-4 md:gap-3">
                    {lane.flow.map((cell, i) => (
                      <motion.li
                        key={cell}
                        initial={reduced ? false : { opacity: 0.35, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.45, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className={cn("relative rounded-[6px] border px-3 py-2.5 text-[13px] leading-snug", i === 2 ? "border-accent bg-[#EEF3FC] text-accent-deep" : i === 3 ? "border-border bg-[#FAFBFD] font-medium text-foreground" : "border-border bg-white text-foreground/85")}
                      >
                        <span className={cn(MONO, "mb-1 block text-muted-foreground md:hidden")}>{a.stages[i]}</span>
                        {cell}
                        {i < 3 && <span aria-hidden="true" className="absolute -right-[7px] top-1/2 hidden h-px w-3 bg-accent/60 md:block" />}
                      </motion.li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.08}><p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{a.note}</p></Reveal>
    </Chapter>
  );
}
