import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Closing, Num } from "./bsBits";

/** When a custom system makes sense — nine signals, numbered, no thresholds. */
export default function BsWhen({ c }) {
  const w = c.when;
  return (
    <Chapter id="bs-when">
      <ChapterHead id="bs-when" kicker={w.kicker} title={w.title} />
      <Reveal delay={0.06}>
        <ol className="mt-10 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {w.signals.map((s, i) => <li key={s} className="flex items-start gap-4 border-b border-border py-5"><Num n={i + 1} className="pt-[5px]" /><p className="text-[15px] leading-relaxed text-foreground/85">{s}</p></li>)}
        </ol>
      </Reveal>
      <Closing>{w.closing}</Closing>
    </Chapter>
  );
}
