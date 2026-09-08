import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Tone } from "./aiBits";

/** Agents — a goal inside a bounded perimeter of allowed tools; forbidden actions stay outside; controls surround it. */
export default function AiAgents({ c }) {
  const a = c.agents;
  return (
    <Chapter id="ai-agents" tone="blue">
      <ChapterHead id="ai-agents" kicker={a.kicker} title={a.titleB} titleMuted={a.titleA} intro={a.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-8">
          <div className="rounded-[12px] border border-border bg-white p-4 md:p-6">
            <ul className="flex flex-wrap gap-1.5">{a.controls.map((k) => <li key={k}><Pill tone="soft">{k}</Pill></li>)}</ul>
            <div className="relative mt-4 rounded-[12px] border-2 border-dashed border-accent bg-[#F7F9FD] p-5 md:p-7">
              <span className={cn(MONO, "absolute -top-2.5 left-5 bg-white px-1.5 text-accent")}>{a.insideLabel}</span>
              <p className="rounded-[8px] border border-accent bg-white px-4 py-3 font-heading text-base font-bold tracking-[-0.01em] text-foreground md:text-lg">{a.goal}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{a.inside.map((t) => <li key={t} className="rounded-[6px] border border-accent/40 bg-white px-3 py-2.5 text-center text-[12px] font-medium text-accent-deep">{t}</li>)}</ul>
            </div>
            <div className="mt-4">
              <span className={cn(MONO, "text-muted-foreground")}>{a.outsideLabel}</span>
              <ul className="mt-2 flex flex-wrap gap-2">{a.outside.map((t) => <li key={t} className="rounded-[6px] border border-[#EAB4B4] bg-[#FDECEC] px-3 py-2 text-[12px] font-medium text-[#9B2C2C] line-through decoration-[#9B2C2C]/50">{t}</li>)}</ul>
            </div>
          </div>
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{a.note}</p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{a.controlsLabel}</p>
          <ul className="mt-2 divide-y divide-border border-t border-border">{a.controls.map((k, i) => <li key={k} className="flex items-center gap-3 py-2 text-[14px] text-foreground/85"><span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span>{k}</li>)}</ul>
          <div className="mt-6 rounded-[10px] border border-[#B9DDC6] bg-[#EAF6EE]/60 p-5"><Tone tone="ok">{a.proof.label}</Tone><p className="mt-2 text-[13px] leading-relaxed text-foreground/85">{a.proof.text}</p></div>
        </Reveal>
      </div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
