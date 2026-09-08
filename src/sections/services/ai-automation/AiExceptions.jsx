import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, DOT, EASE, MONO, Pill } from "./aiBits";

/** Exceptions are part of the system — what can fail, what the system does, and one recovery trace. */
export default function AiExceptions({ c }) {
  const e = c.exceptions;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-exceptions" tone="blue">
      <ChapterHead id="ai-exceptions" kicker={e.kicker} title={e.title} intro={e.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-7">
          <p className={cn(MONO, "text-muted-foreground")}>{e.failuresLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">{e.failures.map((f) => <li key={f}><Pill tone="warn">{f}</Pill></li>)}</ul>
          <p className={cn(MONO, "mt-6 text-muted-foreground")}>{e.responsesLabel}</p>
          <ul className="mt-2 grid gap-x-8 border-t border-border sm:grid-cols-2">{e.responses.map((r) => <li key={r.label} className="border-b border-border py-3"><p className="text-[14px] font-semibold text-foreground">{r.label}</p><p className="mt-1 text-[13px] leading-snug text-muted-foreground">{r.text}</p></li>)}</ul>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-5">
          <div className="rounded-[10px] border border-border bg-white p-5">
            <p className={cn(MONO, "text-muted-foreground")}>{e.example.title}</p>
            <ol className="mt-3 border-l border-border pl-5">
              {e.example.steps.map((s, i) => (
                <motion.li key={s.t + s.text} initial={reduced ? false : { opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.35, delay: i * 0.3, ease: EASE }} className="relative pb-4 last:pb-0">
                  <span aria-hidden="true" className={cn("absolute -left-[25px] top-[5px] h-[9px] w-[9px] rounded-full", DOT[s.tone])} />
                  <span className="font-mono text-[11px] text-muted-foreground">{s.t}</span>
                  <p className="text-[13px] leading-snug text-foreground/85">{s.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
      <Closing>{e.closing}</Closing>
    </Chapter>
  );
}
