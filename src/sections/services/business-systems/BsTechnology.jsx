import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Num } from "./bsBits";

/** Technology after the process — decision criteria, then what we build with. No logo wall. */
export default function BsTechnology({ c }) {
  const t = c.technology;
  return (
    <Chapter id="bs-technology" tone="blue">
      <ChapterHead id="bs-technology" kicker={t.kicker} title={t.title} intro={t.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "text-muted-foreground")}>{t.criteriaLabel}</p>
          <ol className="mt-3 divide-y divide-border border-t border-border">
            {t.criteria.map((k, i) => <li key={k.label} className="grid grid-cols-[32px_1fr] gap-3 py-3"><Num n={i + 1} className="pt-[3px]" /><span><span className="block text-[14px] font-semibold text-foreground">{k.label}</span><span className="block text-[13px] leading-snug text-muted-foreground">{k.text}</span></span></li>)}
          </ol>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <p className={cn(MONO, "text-muted-foreground")}>{t.basesLabel}</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {t.bases.map((b, i) => <li key={b.label} className={cn("rounded-[10px] border bg-white p-4", i === 0 ? "border-accent/40 sm:col-span-2" : "border-border")}><p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{b.label}</p><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{b.text}</p></li>)}
          </ul>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <p className="mt-12 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl"><span className="block">{t.principle[0]}</span><span className="block text-muted-foreground">{t.principle[1]}</span></p>
      </Reveal>
    </Chapter>
  );
}
