import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./aiBits";

/** From a task to a system — four nested scopes. */
export default function AiScopes({ c }) {
  const s = c.scopes;
  const [i, setI] = useState(1);
  return (
    <Chapter id="ai-scopes">
      <ChapterHead id="ai-scopes" kicker={s.kicker} title={s.title} intro={s.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10 lg:items-center">
        <Reveal variant="scale" className="lg:col-span-6">
          <div className="p-1">
            {[...s.levels].reverse().reduce((inner, l, idx) => {
              const k = s.levels.length - 1 - idx;
              const on = k === i;
              return (
                <div key={l.id} className={cn("rounded-[10px] border p-3 transition-colors md:p-4", on ? "border-accent bg-[#F7F9FD]" : "border-border bg-white")}>
                  <button type="button" aria-pressed={on} onClick={() => setI(k)} className={cn("mb-2 flex w-full items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-accent", on ? "text-accent-deep" : "text-foreground")}><span className="text-[13px] font-semibold">{String(k + 1).padStart(2, "0")} · {l.label}</span><span aria-hidden="true" className={cn("h-2 w-2 rounded-full", on ? "bg-accent" : "bg-border")} /></button>
                  {inner}
                </div>
              );
            }, null)}
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">{s.levels[i].label}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/85">{s.levels[i].text}</p>
          <p className="mt-4 rounded-[6px] border border-border bg-white px-3 py-2 text-[13px] text-muted-foreground">{s.levels[i].example}</p>
        </div>
      </div>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
