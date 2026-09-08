import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, DOT, MONO, Tone } from "./aiBits";

/** Human control — three outcomes (execute, review, escalate); pick a case and see where it goes. */
export default function AiControl({ c }) {
  const k = c.control;
  const [ci, setCi] = useState(1);
  const active = k.cases[ci].outcome;
  const tone = { ok: "border-[#B9DDC6]", warn: "border-[#E7C9A0]", danger: "border-[#EAB4B4]" };
  return (
    <Chapter id="ai-control" tone="white">
      <ChapterHead id="ai-control" kicker={k.kicker} title={k.title} intro={k.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{k.casesLabel}</p>
          <ol className="space-y-2">
            {k.cases.map((x, i) => { const on = i === ci; return <li key={x.label}><button type="button" aria-pressed={on} onClick={() => setCi(i)} className={cn("flex w-full items-center justify-between gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}><span className={cn("text-[14px]", on ? "font-semibold text-accent-deep" : "text-foreground")}>{x.label}</span><span aria-hidden="true" className={cn("h-2.5 w-2.5 shrink-0 rounded-full", DOT[k.outcomes.find((o) => o.id === x.outcome).tone])} /></button></li>; })}
          </ol>
        </Reveal>
        <div className="lg:col-span-7">
          <ol className="grid gap-3 sm:grid-cols-3" aria-live="polite">
            {k.outcomes.map((o) => {
              const on = o.id === active;
              return (
                <li key={o.id} className={cn("rounded-[10px] border-2 bg-white p-4 transition-[border-color,box-shadow,opacity] duration-300", on ? `${tone[o.tone]} shadow-[0_16px_36px_-24px_rgba(15,23,42,0.5)]` : "border-border opacity-60")}>
                  <Tone tone={o.tone}>{o.condition}</Tone>
                  <p className="mt-2 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{o.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{o.text}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-[13px] text-muted-foreground">{k.note}</p>
        </div>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
