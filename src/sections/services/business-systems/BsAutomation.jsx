import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, EASE, MONO } from "./bsBits";

const TONES = ["border-border bg-white text-foreground/85", "border-dashed border-foreground/35 bg-white text-foreground/85", "border-accent/50 bg-white text-accent-deep", "border-accent bg-[#EEF3FC] text-accent-deep", "border-border bg-[#FAFBFD] font-medium text-foreground"];

/**
 * Automation anatomy — EVENT → CONDITION → RULE → ACTION → RESULT.
 * Six example lanes; a signal travels each lane once when it enters the
 * viewport and the cells light up in order. Static under reduced motion.
 */
export default function BsAutomation({ c }) {
  const a = c.automation;
  const reduced = useReducedMotion();
  return (
    <Chapter id="bs-automation" tone="blue">
      <ChapterHead id="bs-automation" kicker={a.kicker} title={a.title} intro={a.intro} />
      <Reveal delay={0.06} className="mt-12 hidden md:block">
        <div className="grid grid-cols-5 gap-3 border-b border-border pb-3">
          {a.anatomy.map((s, i) => <p key={s} className={cn(MONO, i === 3 ? "text-accent" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")} · {s}</p>)}
        </div>
      </Reveal>
      <ul className="mt-6 space-y-3">
        {a.lanes.map((lane, li) => (
          <Reveal key={lane.title} delay={0.03 * li}>
            <li className="relative rounded-[10px] border border-border bg-white p-4">
              <div className="mb-3 flex items-center gap-3">
                <p className={cn(MONO, "text-accent")}>{lane.title}</p>
                <span aria-hidden="true" className="relative hidden h-px flex-1 bg-border md:block">
                  <motion.i className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-accent" initial={reduced ? { left: "100%", opacity: 0 } : { left: "0%", opacity: 0 }} whileInView={reduced ? { left: "100%", opacity: 0 } : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: 1.6, ease: "linear", delay: 0.2 }} />
                </span>
              </div>
              <ol className="grid gap-2 md:grid-cols-5 md:gap-3">
                {lane.cells.map((cell, i) => (
                  <motion.li key={cell} initial={reduced ? false : { opacity: 0.3 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.32, ease: EASE }}
                    className={cn("relative rounded-[6px] border px-3 py-2.5 text-[13px] leading-snug", TONES[i])}>
                    <span className={cn(MONO, "mb-1 block text-muted-foreground md:hidden")}>{a.anatomy[i]}</span>
                    {cell}
                    {i < 4 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent/60 md:block" />}
                  </motion.li>
                ))}
              </ol>
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.08}><p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{a.note}</p></Reveal>
    </Chapter>
  );
}
