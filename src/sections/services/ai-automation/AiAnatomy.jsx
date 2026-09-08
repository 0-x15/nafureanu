import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Surface, tabKey } from "./aiBits";

/** Anatomy of an automation — an eight-stage pipeline; each stage explains its role and leaves a trace. */
export default function AiAnatomy({ c }) {
  const a = c.anatomy;
  const [i, setI] = useState(3);
  const st = a.stages[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-anatomy">
      <ChapterHead id="ai-anatomy" kicker={a.kicker} title={a.title} intro={a.intro} />
      <Reveal delay={0.05} className="mt-12 md:mt-16">
        <p className={cn(MONO, "mb-3 text-muted-foreground")}>{a.hint}</p>
        <ol role="tablist" aria-label={a.hint} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8 lg:gap-0">
          {a.stages.map((s, k) => {
            const on = k === i;
            return (
              <li key={s.id} className="relative lg:pr-3">
                <button type="button" role="tab" id={`ai-stage-${s.id}`} aria-selected={on} aria-controls="ai-stage-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, a.stages.length, setI)} className={cn("w-full rounded-[8px] border bg-white px-3 py-3 text-left outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent shadow-[0_12px_28px_-18px_rgba(37,99,235,0.7)]" : k < i ? "border-accent/40" : "border-border hover:border-foreground/40")}>
                  <span className={cn("block font-mono text-[10px] tracking-[0.18em]", on || k < i ? "text-accent" : "text-muted-foreground")}>{String(k + 1).padStart(2, "0")}</span>
                  <span className={cn("mt-1 block text-[13px] font-semibold tracking-[-0.01em]", on ? "text-accent-deep" : "text-foreground")}>{s.label}</span>
                </button>
                {k < a.stages.length - 1 && <span aria-hidden="true" className={cn("absolute right-0 top-1/2 hidden h-px w-3 lg:block", k < i ? "bg-accent" : "bg-border")} />}
              </li>
            );
          })}
        </ol>
      </Reveal>
      <motion.div key={st.id} id="ai-stage-panel" role="tabpanel" aria-labelledby={`ai-stage-${st.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")} · {st.label}</p>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-foreground/85 md:text-lg">{st.text}</p>
        </div>
        <div className="lg:col-span-5">
          <Surface title={a.note} bodyClassName="p-4">
            <ol className="space-y-1 font-mono text-[11px]">
              {a.stages.slice(0, i + 1).map((s, k) => <li key={s.id} className={cn("flex gap-3", k === i ? "text-accent" : "text-muted-foreground")}><span className="w-6 shrink-0">{String(k + 1).padStart(2, "0")}</span><span>{s.trace}</span></li>)}
            </ol>
          </Surface>
        </div>
      </motion.div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
