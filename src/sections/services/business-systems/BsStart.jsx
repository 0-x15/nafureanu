import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./bsBits";

/** The starting point — a discovery map: eight questions, what each answer becomes in the system, and the door to a conversation. */
export default function BsStart({ lang, c }) {
  const s = c.start;
  const [i, setI] = useState(0);
  const q = s.questions[i];
  const reduced = useReducedMotion();
  const onKey = (e, idx) => {
    const map = { ArrowRight: idx + 1, ArrowDown: idx + 1, ArrowLeft: idx - 1, ArrowUp: idx - 1, Home: 0, End: s.questions.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(s.questions.length - 1, Math.max(0, map[e.key]));
    setI(j);
    document.getElementById(`bs-q-${j}`)?.focus();
  };
  return (
    <Chapter id="bs-start" tone="blue">
      <ChapterHead id="bs-start" kicker={s.kicker} title={s.title} intro={s.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-7">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{s.hint}</p>
          <ol role="tablist" aria-label={s.hint} className="grid gap-2 sm:grid-cols-2">
            {s.questions.map((x, idx) => {
              const on = idx === i;
              return (
                <li key={x.q}>
                  <button type="button" role="tab" id={`bs-q-${idx}`} aria-selected={on} aria-controls="bs-q-panel" tabIndex={on ? 0 : -1} onClick={() => setI(idx)} onKeyDown={(e) => onKey(e, idx)}
                    className={cn("flex w-full items-center gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}>
                    <span className={cn("font-mono text-[10px] tracking-[0.18em]", on ? "text-accent" : "text-muted-foreground")}>{String(idx + 1).padStart(2, "0")}</span>
                    <span className={cn("text-[14px] font-medium", on ? "text-accent-deep" : "text-foreground")}>{x.q}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <motion.div key={i} id="bs-q-panel" role="tabpanel" aria-labelledby={`bs-q-${i}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-5">
          <div className="flex h-full flex-col rounded-[12px] border border-border bg-white p-6 md:p-7">
            <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{q.q}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-foreground/85">{q.why}</p>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{s.becomesLabel}</p>
            <p className="mt-1.5"><span className="inline-block rounded-[6px] border border-accent bg-[#EEF3FC] px-3 py-1.5 text-[13px] font-medium text-accent-deep">{q.becomes}</span></p>
            <div className="mt-auto pt-8"><ActionLink to={langPath(lang, "/contact")} size="md">{s.cta}</ActionLink></div>
          </div>
        </motion.div>
      </div>
    </Chapter>
  );
}
