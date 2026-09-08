import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./aiBits";

/** When it makes sense — a tactful qualification. */
export default function AiWho({ c }) {
  const w = c.who;
  return (
    <Chapter id="ai-who" tone="white">
      <ChapterHead id="ai-who" kicker={w.kicker} title={w.title} />
      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-7"><p className={cn(MONO, "text-accent")}>{w.goodLabel}</p><ul className="mt-3 divide-y divide-border border-t border-border">{w.good.map((g) => <li key={g} className="flex items-start gap-3 py-3 text-[15px] leading-relaxed text-foreground/85"><span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] bg-accent" />{g}</li>)}</ul></Reveal>
        <Reveal delay={0.08} className="lg:col-span-5"><p className={cn(MONO, "text-muted-foreground")}>{w.badLabel}</p><ul className="mt-3 divide-y divide-border border-t border-border">{w.bad.map((g) => <li key={g} className="flex items-start gap-3 py-3 text-[15px] leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] border border-foreground/40 bg-white" />{g}</li>)}</ul></Reveal>
      </div>
      <Closing>{w.closing}</Closing>
    </Chapter>
  );
}
