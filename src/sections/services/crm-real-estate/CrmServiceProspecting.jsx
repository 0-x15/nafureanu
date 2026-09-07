import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Points, Rail, Surface } from "./serviceBits";

/* Quick follow-up → funnel stage, as the real system maps it (forward only). */
const QUICK_TO_STEP = [null, null, 1, 1, 2, 3];

/**
 * Acquisition — the prospect pipeline and the quick follow-up actions
 * that move it. The buttons behave like the system: some advance the
 * funnel, "to call" and "no answer" never do, and undo goes back.
 */
export default function CrmServiceProspecting({ c }) {
  const p = c.prospecting;
  const [history, setHistory] = useState([p.pipelineActive]);
  const [last, setLast] = useState(null);
  const active = history[history.length - 1];
  const press = (i) => {
    const target = QUICK_TO_STEP[i];
    setLast(i);
    if (target === null || target <= active) return;
    setHistory((h) => [...h, target]);
  };
  const undo = () => { setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h)); setLast(null); };
  return (
    <Chapter id="crm-service-prospecting">
      <ChapterHead id="crm-service-prospecting" kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <Surface title={p.kicker} meta="PROS-00912">
          <Rail steps={p.pipeline} active={active} />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <div>
              <p className={cn(MONO, "text-muted-foreground")}>{p.quickLabel}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.quick.map((q, i) => (
                  <button key={q} type="button" onClick={() => press(i)} aria-pressed={last === i} className={cn("rounded-full border px-3 py-1.5 text-[12px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", last === i ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>{q}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span aria-live="polite" className={cn(MONO, "text-muted-foreground")}>{last !== null && QUICK_TO_STEP[last] === null ? p.noAdvance : last !== null ? `→ ${p.pipeline[active]}` : ""}</span>
              <button type="button" onClick={undo} disabled={history.length <= 1} className={cn(MONO, "rounded-[6px] border border-border px-3 py-2 text-foreground outline-none transition-colors hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40")}>↩ {p.undo}</button>
            </div>
          </div>
        </Surface>
      </Reveal>
      <Reveal delay={0.08}><Points items={p.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
