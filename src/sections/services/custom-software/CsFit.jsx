import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./csBits";

/** Who it's for — a tactful qualification: when it fits, when it doesn't. */
export default function CsFit({ c }) {
  const f = c.fit;
  return (
    <Chapter id="cs-fit" tone="white">
      <ChapterHead id="cs-fit" kicker={f.kicker} title={f.title} />
      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-7"><p className={cn(MONO, "text-accent")}>{f.goodLabel}</p><ul className="mt-3 divide-y divide-border border-t border-border">{f.good.map((g) => <li key={g} className="flex items-start gap-3 py-3 text-[15px] leading-relaxed text-foreground/85"><span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] bg-accent" />{g}</li>)}</ul></Reveal>
        <Reveal delay={0.08} className="lg:col-span-5"><p className={cn(MONO, "text-muted-foreground")}>{f.badLabel}</p><ul className="mt-3 divide-y divide-border border-t border-border">{f.bad.map((g) => <li key={g} className="flex items-start gap-3 py-3 text-[15px] leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] border border-foreground/40 bg-white" />{g}</li>)}</ul></Reveal>
      </div>
      <Closing>{f.closing}</Closing>
    </Chapter>
  );
}
