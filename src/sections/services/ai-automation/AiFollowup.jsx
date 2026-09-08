import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, DOT, MONO, Pill, Surface, Tone } from "./aiBits";

/** Follow-up — what the system reasons about, the queue it produces, and the real mechanisms behind it. */
export default function AiFollowup({ c }) {
  const f = c.followup;
  return (
    <Chapter id="ai-followup" tone="blue">
      <ChapterHead id="ai-followup" kicker={f.kicker} title={f.title} intro={f.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{f.signalsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">{f.signals.map((s) => <li key={s}><Pill>{s}</Pill></li>)}</ul>
          <div className="mt-6 rounded-[10px] border border-[#B9DDC6] bg-[#EAF6EE]/60 p-5"><Tone tone="ok">{f.proof.label}</Tone><ul className="mt-2 space-y-1.5">{f.proof.items.map((x) => <li key={x} className="flex gap-2 text-[13px] leading-snug text-foreground/85"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E9E5B]" />{x}</li>)}</ul></div>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-8">
          <Surface title={f.queueTitle} meta={String(f.queue.length)}>
            <ol className="divide-y divide-border">
              {f.queue.map((q) => (
                <li key={q.item} className="grid grid-cols-[12px_1fr_auto] items-center gap-3 py-2.5">
                  <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", DOT[q.tone])} />
                  <span><span className="block text-[13px] font-semibold text-foreground">{q.item}</span><span className="block text-[12px] text-muted-foreground">{q.reason}</span></span>
                  <Tone tone={q.tone}>{q.due}</Tone>
                </li>
              ))}
            </ol>
          </Surface>
        </Reveal>
      </div>
      <Closing>{f.closing}</Closing>
    </Chapter>
  );
}
