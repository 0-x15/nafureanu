import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./bsBits";

/** What we take responsibility for — the system's lifecycle in five phases, art-directed as one continuous line. */
export default function BsResponsibility({ c }) {
  const r = c.responsibility;
  return (
    <Chapter id="bs-responsibility" tone="white">
      <ChapterHead id="bs-responsibility" kicker={r.kicker} title={r.title} intro={r.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <span aria-hidden="true" className="absolute left-0 top-[6px] hidden h-px w-full bg-accent/30 lg:block" />
          {r.phases.map((ph, i) => (
            <li key={ph.label} className="relative lg:pt-7">
              <span aria-hidden="true" className="absolute left-0 top-0 hidden h-[13px] w-[13px] rounded-full border border-accent bg-white lg:block" />
              <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{ph.label}</p>
              <ul className="mt-3 space-y-1.5">{ph.items.map((it) => <li key={it} className="flex items-center gap-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>)}</ul>
            </li>
          ))}
        </ol>
      </Reveal>
      <Closing>{r.message}</Closing>
    </Chapter>
  );
}
