import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, Glyph, MONO } from "./csBits";

/** Patterns, not fake cases — need → system, each explicitly labelled as a pattern. */
export default function CsPatterns({ c }) {
  const p = c.patterns;
  return (
    <Chapter id="cs-patterns">
      <ChapterHead id="cs-patterns" kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal delay={0.06}>
        <ol className="mt-12 divide-y divide-border border-y border-border md:mt-16">
          {p.items.map((it, i) => (
            <li key={it.kind} className="grid items-center gap-3 py-4 md:grid-cols-[32px_1fr_48px_1fr_auto] md:gap-6">
              <span className={cn("font-mono text-[10px] tracking-[0.18em] text-accent")}>{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[15px] leading-snug text-foreground/85 md:text-base">{it.need}</p>
              <span aria-hidden="true" className="hidden items-center md:flex"><i className="block h-px w-8 bg-accent" /><i className="-ml-px block h-1.5 w-1.5 rotate-45 border-r border-t border-accent" /></span>
              <p className="flex items-center gap-3 font-heading text-[15px] font-bold tracking-[-0.01em] text-foreground md:text-base"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-accent/40 bg-[#EEF3FC] text-accent"><Glyph kind={it.kind} /></span>{it.system}</p>
              <span className={cn(MONO, "text-muted-foreground")}>{p.badge}</span>
            </li>
          ))}
        </ol>
      </Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
