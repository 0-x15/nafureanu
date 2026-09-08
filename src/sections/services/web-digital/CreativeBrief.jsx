import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Statement } from "./webBits";

/**
 * Act VI — working together. First the kinds of websites, as one
 * typographic spread rather than a catalogue. Then the creative desk:
 * eight questions whose answers become the website. What a client can
 * arrive with, the starting situations, and where our scope stops.
 */
export default function CreativeBrief({ c }) {
  const t = c.brief;
  const k = c.kinds;
  return (
    <Act id="wd-brief" tone="white">
      <Reveal>
        <p className={cn(MONO, "text-muted-foreground")}>{k.label}</p>
        <ol className="mt-4 divide-y divide-border border-y border-border">
          {k.items.map((x, i) => (
            <li key={x.label} className="grid gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-8">
              <span className={cn(MONO, "text-muted-foreground md:col-span-1")}>0{i + 1}</span>
              <span className="font-heading text-[clamp(1.6rem,3.4vw,3.2rem)] font-bold leading-[1] tracking-[-0.035em] text-foreground md:col-span-5">{x.label}</span>
              <span className="text-[15px] leading-[1.6] text-foreground/80 md:col-span-6">{x.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-xl text-[13px] leading-[1.6] text-muted-foreground">{k.note}</p>
      </Reveal>

      <Reveal className="mt-28 md:mt-36">
        <Statement id="wd-brief-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 overflow-hidden border border-border bg-[#F6F3EC]">
        <div className={cn(MONO, "hidden grid-cols-12 gap-6 border-b border-border px-6 py-3 text-muted-foreground md:grid")}>
          <span className="col-span-3">{t.colLabel}</span><span className="col-span-5">{t.colQuestion}</span><span className="col-span-4">{t.becomesLabel}</span>
        </div>
        <ol className="divide-y divide-border">
          {t.rows.map((r) => (
            <li key={r.id} className="grid gap-2 px-6 py-5 md:grid-cols-12 md:gap-6">
              <span className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:col-span-3">{r.label}</span>
              <span className="text-[15px] leading-[1.6] text-foreground/85 md:col-span-5">{r.q}</span>
              <span className="flex items-start gap-2 text-[14px] leading-[1.6] text-accent-deep md:col-span-4"><span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-accent" />{r.becomes}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-24 grid gap-12 border-t border-border pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className={cn(MONO, "text-muted-foreground")}>{t.arriveLabel}</p>
          <p className="mt-4 font-heading text-[clamp(1.3rem,2.4vw,2rem)] font-bold leading-[1.3] tracking-[-0.03em] text-foreground/40">
            {t.arrive.map((a, i) => <span key={a}><span className={cn(i % 2 === 0 && "text-foreground")}>{a}</span>{i < t.arrive.length - 1 && <span className="text-foreground/25"> · </span>}</span>)}
          </p>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.7] text-foreground/85">{t.arriveNote}</p>
        </div>
        <div className="lg:col-span-6">
          <p className={cn(MONO, "text-muted-foreground")}>{t.startLabel}</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {t.starts.map((s) => <li key={s.label} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-6"><span className="font-heading text-lg font-bold tracking-[-0.02em] text-foreground">{s.label}</span><span className="text-[14px] leading-[1.6] text-foreground/80">{s.text}</span></li>)}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-20 grid gap-10 border-t border-border pt-12 md:grid-cols-2 md:gap-16">
        {[t.scope.identity, t.scope.content].map((s) => (
          <div key={s.label}>
            <p className={cn(MONO, "text-accent")}>{s.label}</p>
            <p className="mt-3 text-[15px] leading-[1.7] text-foreground/85">{s.text}</p>
            <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">{s.limit}</p>
          </div>
        ))}
      </Reveal>
      <p className="mt-16 max-w-2xl font-heading text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground [text-wrap:balance]">{t.closing}</p>
    </Act>
  );
}
