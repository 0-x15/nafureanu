import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Tone, tabKey } from "./aiBits";

const VERDICT_TONE = { automate: "ok", assist: "warn", human: "danger" };

/** What to automate — an evaluation matrix: pick a process, read its six criteria, get a verdict. */
export default function AiFit({ c }) {
  const f = c.fit;
  const [i, setI] = useState(0);
  const p = f.processes[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-fit" tone="white">
      <ChapterHead id="ai-fit" kicker={f.kicker} title={f.titleB} titleMuted={f.titleA} intro={f.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{f.hint}</p>
          <ol role="tablist" aria-label={f.hint} className="space-y-2">
            {f.processes.map((x, k) => { const on = k === i; return <li key={x.id}><button type="button" role="tab" id={`ai-fit-${x.id}`} aria-selected={on} aria-controls="ai-fit-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, f.processes.length, setI)} className={cn("flex w-full items-center justify-between gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}><span className={cn("text-[14px] font-semibold", on ? "text-accent-deep" : "text-foreground")}>{x.label}</span><Tone tone={VERDICT_TONE[x.verdict]}>{f.verdicts[x.verdict]}</Tone></button></li>; })}
          </ol>
        </Reveal>
        <motion.div key={p.id} id="ai-fit-panel" role="tabpanel" aria-labelledby={`ai-fit-${p.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-6">
            <dl className="divide-y divide-border">
              {f.criteria.map((k, idx) => {
                const v = p.scores[k.id];
                return (
                  <div key={k.id} className="grid grid-cols-[1fr_auto] items-center gap-4 py-2.5 sm:grid-cols-[170px_1fr_auto]">
                    <dt><span className="block text-[13px] font-semibold text-foreground">{k.label}</span><span className="hidden text-[11px] text-muted-foreground sm:block">{k.text}</span></dt>
                    <dd className="hidden h-2 overflow-hidden rounded-full bg-[#EEF1F6] sm:block"><motion.span key={`${p.id}-${k.id}`} className="block h-full rounded-full bg-accent" initial={reduced ? { width: `${(v / 3) * 100}%` } : { width: 0 }} animate={{ width: `${(v / 3) * 100}%` }} transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE }} /></dd>
                    <dd className="flex gap-1" aria-label={`${v}/3`}>{[0, 1, 2].map((d) => <span key={d} aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-[2px]", d < v ? "bg-accent" : "bg-border")} />)}</dd>
                  </div>
                );
              })}
            </dl>
            <div className="mt-5 flex flex-wrap items-start gap-4 border-t border-border pt-5">
              <Tone tone={VERDICT_TONE[p.verdict]} className="mt-0.5 shrink-0">{f.verdicts[p.verdict]}</Tone>
              <p className="min-w-0 flex-1 text-[14px] leading-relaxed text-foreground/85">{p.why}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Closing>{f.closing}</Closing>
    </Chapter>
  );
}
