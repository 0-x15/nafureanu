import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Pill, Tone } from "./aiBits";

/** Impact — outcomes without invented numbers, and a qualitative opportunity equation. */
export default function AiImpact({ c }) {
  const m = c.impact;
  const [levels, setLevels] = useState(() => ({ repetition: 2, volume: 1, steps: 1, dependencies: 1 }));
  const total = Object.values(levels).reduce((a, b) => a + b, 0);
  const idx = total <= 2 ? 0 : total <= 5 ? 1 : 2;
  const tone = ["muted", "warn", "ok"][idx];
  return (
    <Chapter id="ai-impact" tone="white">
      <ChapterHead id="ai-impact" kicker={m.kicker} title={m.title} intro={m.intro} />
      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5"><ul className="flex flex-wrap gap-1.5">{m.outcomes.map((o) => <li key={o}><Pill>{o}</Pill></li>)}</ul></Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-6">
            <p className={cn(MONO, "text-muted-foreground")}>{m.equation.title}</p>
            <dl className="mt-3 space-y-3">
              {m.equation.factors.map((f) => (
                <div key={f.id} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center">
                  <dt className="text-[13px] font-semibold text-foreground">{f.label}</dt>
                  <dd className="grid grid-cols-3 gap-1.5" role="group" aria-label={f.label}>{f.levels.map((l, k) => <button key={l} type="button" aria-pressed={levels[f.id] === k} onClick={() => setLevels((p) => ({ ...p, [f.id]: k }))} className={cn("rounded-[6px] border px-2 py-1.5 text-[12px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", levels[f.id] === k ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/30")}>{l}</button>)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4" aria-live="polite">
              <span className={cn(MONO, "text-muted-foreground")}>{m.equation.resultLabel}</span>
              <Tone tone={tone}>{m.equation.results[idx]}</Tone>
            </div>
            <p className={cn(MONO, "mt-3 text-muted-foreground")}>{m.equation.note}</p>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
