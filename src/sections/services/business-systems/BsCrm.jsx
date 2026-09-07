import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Surface } from "./bsBits";

/** CRM — a configurable lifecycle (select a stage) and what a custom CRM understands about each customer. */
export default function BsCrm({ c }) {
  const k = c.crm;
  const [i, setI] = useState(2);
  const st = k.stages[i];
  const reduced = useReducedMotion();
  const onKey = (e, idx) => {
    const map = { ArrowRight: idx + 1, ArrowLeft: idx - 1, Home: 0, End: k.stages.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(k.stages.length - 1, Math.max(0, map[e.key]));
    setI(j);
    document.getElementById(`bs-crm-stage-${j}`)?.focus();
  };
  return (
    <Chapter id="bs-crm" tone="white">
      <ChapterHead id="bs-crm" kicker={k.kicker} title={k.title} intro={k.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <Surface title={k.stagesLabel}>
          <ol role="tablist" aria-label={k.stagesLabel} className="flex items-start overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {k.stages.map((s, idx) => {
              const on = idx === i;
              const done = idx < i;
              return (
                <li key={s.label} className="relative flex min-w-[104px] flex-1 flex-col">
                  <span className="flex items-center">
                    <button type="button" role="tab" id={`bs-crm-stage-${idx}`} aria-selected={on} aria-controls="bs-crm-panel" tabIndex={on ? 0 : -1} onClick={() => setI(idx)} onKeyDown={(e) => onKey(e, idx)}
                      className={cn("relative z-10 h-4 w-4 shrink-0 rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent shadow-[0_0_0_5px_rgba(37,99,235,0.14)]" : done ? "border-accent bg-accent" : "border-border bg-white hover:border-accent")} aria-label={s.label} />
                    {idx < k.stages.length - 1 && <span aria-hidden="true" className={cn("h-px flex-1", done ? "bg-accent" : "bg-border")} />}
                  </span>
                  <button type="button" tabIndex={-1} onClick={() => setI(idx)} className={cn("mt-2 pr-2 text-left font-mono text-[10px] uppercase leading-snug tracking-[0.12em]", on ? "text-accent" : done ? "text-foreground/80" : "text-muted-foreground")}>{s.label}</button>
                </li>
              );
            })}
          </ol>
          <motion.dl key={i} id="bs-crm-panel" role="tabpanel" aria-labelledby={`bs-crm-stage-${i}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-[auto_1fr_1fr] sm:gap-8">
            <div><dt className={cn(MONO, "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</dt><dd className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{st.label}</dd></div>
            <div><dt className={cn(MONO, "text-muted-foreground")}>{k.labels.requires}</dt><dd className="mt-1 text-[14px] text-foreground/85">{st.requires}</dd></div>
            <div><dt className={cn(MONO, "text-muted-foreground")}>{k.labels.next}</dt><dd className="mt-1 text-[14px] text-foreground/85">{st.next}</dd></div>
          </motion.dl>
        </Surface>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{k.note}</p>
      </Reveal>
      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.06} className="lg:col-span-7">
          <p className={cn(MONO, "text-muted-foreground")}>{k.understandsLabel}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 border-t border-border sm:grid-cols-2">
            {k.understands.map((u, idx) => <li key={u} className="flex items-center gap-3 border-b border-border py-2.5 text-[14px] text-foreground/85"><span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(idx + 1).padStart(2, "0")}</span>{u}</li>)}
          </ul>
        </Reveal>
        <Reveal variant="left" delay={0.1} className="lg:col-span-5">
          <Surface title={k.record.label} meta="CRM">
            <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{k.record.name}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">{k.record.meta.map((x) => <Pill key={x} tone="soft">{x}</Pill>)}</div>
            <dl className="mt-4 divide-y divide-border">
              {k.record.rows.map(([a, b]) => <div key={a} className="flex items-center justify-between gap-4 py-2"><dt className="text-[12px] text-muted-foreground">{a}</dt><dd className="text-[13px] font-medium text-foreground">{b}</dd></div>)}
            </dl>
          </Surface>
        </Reveal>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
