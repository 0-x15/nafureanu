import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tone } from "./aiBits";

/** Assistants — generic chatbot versus business assistant, and the read / suggest / act levels. */
export default function AiAssistants({ c }) {
  const a = c.assistants;
  return (
    <Chapter id="ai-assistants" tone="white">
      <ChapterHead id="ai-assistants" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        <Reveal delay={0.05}><div className="h-full rounded-[10px] border border-dashed border-foreground/30 p-5 md:p-6"><p className={cn(MONO, "text-muted-foreground")}>{a.generic.label}</p><ul className="mt-3 divide-y divide-border">{a.generic.items.map((x) => <li key={x} className="flex gap-3 py-2 text-[14px] text-foreground/70"><span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-border" />{x}</li>)}</ul></div></Reveal>
        <Reveal delay={0.08}><div className="h-full rounded-[10px] border border-accent/40 bg-[#F7F9FD] p-5 md:p-6"><p className={cn(MONO, "text-accent")}>{a.business.label}</p><ul className="mt-3 divide-y divide-border">{a.business.items.map((x) => <li key={x} className="flex gap-3 py-2 text-[14px] text-foreground"><span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{x}</li>)}</ul></div></Reveal>
      </div>
      <Reveal delay={0.08} className="mt-8">
        <ol className="grid gap-3 sm:grid-cols-3">
          {a.levels.map((l, i) => <li key={l.id} className="rounded-[8px] border border-border bg-white p-4"><span className="flex items-center justify-between"><span className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{String(i + 1).padStart(2, "0")} · {l.label}</span><Tone tone={l.tone}>{l.label}</Tone></span><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{l.text}</p></li>)}
        </ol>
        <p className="mt-3 text-[13px] text-muted-foreground">{a.levelsNote}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-8"><div className="rounded-[10px] border border-[#B9DDC6] bg-[#EAF6EE]/60 p-5"><Tone tone="ok">{a.proof.label}</Tone><p className="mt-2 max-w-4xl text-[14px] leading-relaxed text-foreground/85">{a.proof.text}</p></div></Reveal>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
