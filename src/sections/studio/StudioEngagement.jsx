import { cn } from "@/lib/utils";
import { Draw, H2, Index, MONO } from "./studioBits";

/**
 * Room 06 — the working agreement. Two columns of reciprocal
 * expectations on one charter surface; the rules lock into place. A
 * capacity note, not scarcity marketing. Soft grey, compact, before the close.
 */
export default function StudioEngagement({ a }) {
  const t = a.engagement;
  const cols = [[t.charter.expectLabel, t.charter.expect], [t.charter.weLabel, t.charter.we]];
  return (
    <section id="studio-engagement" aria-labelledby="studio-engagement-title" className="scroll-mt-20 bg-[#F1F1EE] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <Index meta={t.meta}>{t.index}</Index>
        <h2 id="studio-engagement-title" className={cn(H2, "mt-6 text-foreground")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
        <div className="mt-8 border border-foreground/15 bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-foreground/15 px-5 py-3 md:px-8">
            <span className="flex items-center gap-3"><span aria-hidden="true" className="h-2 w-2 bg-accent" /><span className={cn(MONO, "text-foreground/80")}>{t.charter.title}</span></span>
            <span className={cn(MONO, "text-muted-foreground")}>{t.charter.meta}</span>
          </div>
          <div className="grid md:grid-cols-2 md:divide-x md:divide-foreground/15">
            {cols.map(([label, items], c) => (
              <div key={label} className={cn("px-5 py-5 md:px-8 md:py-7", c === 0 && "border-b border-foreground/15 md:border-b-0")}>
                <p className={cn(MONO, "text-accent")}>{label}</p>
                <ol className="mt-3">
                  {items.map((x, i) => (
                    <li key={x} className="relative py-3">
                      <span className="grid grid-cols-[28px_1fr] items-baseline gap-3"><span className={cn(MONO, "text-muted-foreground")}>0{i + 1}</span><span className="text-[15px] leading-[1.5] text-foreground">{x}</span></span>
                      <Draw delay={0.08 * i + c * 0.1} className="absolute bottom-0 left-0 bg-foreground/12" />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="grid gap-4 border-t border-foreground/15 bg-[#FAF9F5] px-5 py-4 md:grid-cols-12 md:items-baseline md:px-8">
            <p className={cn(MONO, "text-muted-foreground md:col-span-3")}>{t.charter.both}</p>
            <p className="font-heading text-[16px] font-bold tracking-[-0.02em] text-foreground md:col-span-4">{t.capacity.label}</p>
            <p className="text-[14px] leading-[1.6] text-foreground/75 md:col-span-5">{t.capacity.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
