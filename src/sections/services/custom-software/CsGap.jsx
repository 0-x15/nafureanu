import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, Glyph, MONO } from "./csBits";

/**
 * The gap between what exists and what the business needs. Left, a
 * generic tool with its standard modules; right, the same modules plus
 * the specific pieces; between them, the ten shapes the gap takes.
 */
export default function CsGap({ c }) {
  const g = c.gap;
  const half = Math.ceil(g.situations.length / 2);
  const Box = ({ label, extra = [] }) => (
    <div className={cn("rounded-[10px] border p-4", extra.length ? "border-accent bg-white" : "border-border bg-[#FAFBFD]")}>
      <p className={cn(MONO, extra.length ? "text-accent" : "text-muted-foreground")}>{label}</p>
      <ul className="mt-3 grid grid-cols-2 gap-1.5">
        {g.generic.map((m) => <li key={m} className="rounded-[5px] border border-border bg-white px-2.5 py-1.5 text-[12px] text-foreground/70">{m}</li>)}
        {extra.map((m) => <li key={m.kind} className="flex items-center gap-1.5 rounded-[5px] border border-accent/50 bg-[#EEF3FC] px-2.5 py-1.5 text-[12px] font-medium text-accent-deep"><Glyph kind={m.kind} className="h-4 w-4 shrink-0" /><span className="truncate">{m.label}</span></li>)}
      </ul>
    </div>
  );
  return (
    <Chapter id="cs-gap">
      <ChapterHead id="cs-gap" kicker={g.kicker} title={g.title} intro={g.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-8">
        <Reveal variant="left"><Box label={g.existsLabel} /></Reveal>
        <Reveal delay={0.06} className="order-last lg:order-none">
          <p className={cn(MONO, "mb-3 text-center text-accent")}>{g.gapLabel}</p>
          <ol className="grid gap-x-6 sm:grid-cols-2">
            {[g.situations.slice(0, half), g.situations.slice(half)].map((col, ci) => (
              <div key={ci} className="border-t border-dashed border-foreground/30">
                {col.map((s) => (
                  <li key={s.kind} className="flex items-start gap-3 border-b border-dashed border-foreground/20 py-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-border bg-white text-accent"><Glyph kind={s.kind} /></span>
                    <p className="text-[14px] leading-snug text-foreground/85">{s.title}</p>
                  </li>
                ))}
              </div>
            ))}
          </ol>
        </Reveal>
        <Reveal variant="scale" delay={0.1}><Box label={g.needsLabel} extra={g.specific} /></Reveal>
      </div>
      <Closing>{g.closing}</Closing>
    </Chapter>
  );
}
