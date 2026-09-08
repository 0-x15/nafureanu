import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag } from "./csBits";

/** Quality — the lifecycle loop, then verified facts from real systems (never generic claims). */
export default function CsQuality({ c }) {
  const q = c.quality;
  return (
    <Chapter id="cs-quality" tone="blue">
      <ChapterHead id="cs-quality" kicker={q.kicker} title={q.title} intro={q.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          <span aria-hidden="true" className="absolute left-0 top-[7px] hidden h-px w-full bg-accent/30 lg:block" />
          {q.lifecycle.map((st, i) => (
            <li key={st.id} className="relative rounded-[8px] border border-border bg-white p-4 lg:mt-6">
              <span aria-hidden="true" className="absolute -top-[31px] left-4 hidden h-[13px] w-[13px] rounded-full border border-accent bg-white lg:block" />
              <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-lg font-bold uppercase tracking-[0.02em] text-foreground">{st.label}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{st.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={0.08} className="mt-10">
        <p className={cn(MONO, "text-muted-foreground")}>{q.factsLabel}</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {q.facts.map((f) => (
            <li key={f.value + f.label} className="flex items-start gap-4 rounded-[8px] border border-border bg-white p-4">
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground">{f.value}</span>
              <span className="min-w-0"><span className="block text-[13px] leading-snug text-foreground/85">{f.label}</span><Tag tone="accent" className="mt-2">{f.project}</Tag></span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Closing>{q.closing}</Closing>
    </Chapter>
  );
}
