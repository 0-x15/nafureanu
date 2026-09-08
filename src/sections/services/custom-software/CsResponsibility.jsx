import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Status } from "./csBits";

/** What we take responsibility for — one line from the problem to production, with the responsibilities placed along it. */
export default function CsResponsibility({ c }) {
  const r = c.responsibility;
  return (
    <Chapter id="cs-responsibility" tone="white">
      <ChapterHead id="cs-responsibility" kicker={r.kicker} title={r.title} intro={r.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-[6px] border border-dashed border-foreground/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/80">{r.startLabel}</span>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-accent/40 sm:block" />
          <Status>{r.endLabel}</Status>
        </div>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {r.phases.map((ph, i) => (
            <li key={ph.label} className="relative rounded-[8px] border border-border bg-white p-4">
              <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{ph.label}</p>
              <ul className="mt-3 space-y-1.5">{ph.items.map((it) => <li key={it} className="flex items-center gap-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>)}</ul>
            </li>
          ))}
        </ol>
      </Reveal>
      <Closing>{r.closing}</Closing>
    </Chapter>
  );
}
