import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Tag, tabKey } from "./csBits";

/**
 * Business logic — a rule engine. Pick an input; the engine evaluates
 * each rule in turn (once in view, replayable), then states its decision
 * and the action it triggers. Reduced motion shows the result at once.
 */
export default function CsLogic({ c }) {
  const l = c.logic;
  const [i, setI] = useState(0);
  const sc = l.scenarios[i];
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [step, setStep] = useState(reduced ? 99 : -1);
  const run = () => { if (reduced) { setStep(99); return; } setStep(0); };
  useEffect(() => { if (inView) run(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [inView, i]);
  useEffect(() => {
    if (reduced || step < 0 || step > sc.rules.length) return undefined;
    const id = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(id);
  }, [step, reduced, sc.rules.length]);
  const done = step > sc.rules.length;
  return (
    <Chapter id="cs-logic" tone="white">
      <ChapterHead id="cs-logic" kicker={l.kicker} title={l.title} intro={l.intro} />
      <Reveal delay={0.05} className="mt-10 md:mt-14">
        <div role="tablist" aria-label={l.labels.input} className="flex flex-wrap gap-1.5">
          {l.scenarios.map((s, k) => { const on = k === i; return <button key={s.id} type="button" role="tab" id={`cs-logic-${s.id}`} aria-selected={on} aria-controls="cs-logic-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, l.scenarios.length, setI)} className={cn("rounded-full border px-4 py-2 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>{s.label}</button>; })}
        </div>
      </Reveal>
      <div ref={ref} id="cs-logic-panel" role="tabpanel" aria-labelledby={`cs-logic-${sc.id}`} className="mt-6 grid gap-3 rounded-[12px] border border-border bg-[#FAFBFD] p-4 md:grid-cols-[1fr_1.4fr_1fr] md:gap-4 md:p-6">
        <div className="rounded-[8px] border border-border bg-white p-4">
          <p className={cn(MONO, "text-muted-foreground")}>{l.labels.input}</p>
          <dl className="mt-2 divide-y divide-border">{sc.input.map(([k, v]) => <div key={k} className="flex justify-between gap-3 py-1.5 text-[12px]"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-foreground">{v}</dd></div>)}</dl>
        </div>
        <div className="rounded-[8px] border border-accent/40 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className={cn(MONO, "text-muted-foreground")}>{l.labels.rule}</p>
            <button type="button" onClick={run} className={cn(MONO, "rounded-[5px] border border-border px-2.5 py-1 text-foreground outline-none transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent")}>▶ {l.labels.run}</button>
          </div>
          <ol className="mt-2 divide-y divide-border" aria-live="polite">
            {sc.rules.map((r, k) => {
              const evaluated = step > k;
              return (
                <li key={r.text} className="flex items-start justify-between gap-3 py-2 text-[12px]">
                  <span className={cn("leading-snug transition-colors", evaluated ? "text-foreground" : "text-muted-foreground")}>{r.text}</span>
                  <motion.span initial={false} animate={{ opacity: evaluated ? 1 : 0.25 }} transition={{ duration: 0.2 }} className="shrink-0"><Tag tone={evaluated ? (r.pass ? "ok" : "bad") : "muted"}>{evaluated ? (r.pass ? l.labels.pass : l.labels.fail) : "…"}</Tag></motion.span>
                </li>
              );
            })}
          </ol>
        </div>
        <motion.div initial={false} animate={{ opacity: done ? 1 : 0.35 }} transition={{ duration: 0.3 }} className="rounded-[8px] border border-border bg-white p-4">
          <p className={cn(MONO, "text-muted-foreground")}>{l.labels.decision}</p>
          <p className="mt-1.5 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{sc.decision}</p>
          <p className={cn(MONO, "mt-4 text-muted-foreground")}>{l.labels.action}</p>
          <p className="mt-1.5 text-[13px] leading-snug text-accent-deep">{sc.action}</p>
        </motion.div>
      </div>
      <Reveal delay={0.06} className="mt-8">
        <p className={cn(MONO, "text-muted-foreground")}>{l.encodesLabel}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">{l.encodes.map((e) => <li key={e}><Pill>{e}</Pill></li>)}</ul>
        <p className={cn(MONO, "mt-4 text-muted-foreground")}>{l.note}</p>
      </Reveal>
      <Closing>{l.closing}</Closing>
    </Chapter>
  );
}
