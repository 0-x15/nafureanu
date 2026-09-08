import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./aiBits";

/** What we deliver — manual process → designed automation → production system, with responsibilities along the path. */
export default function AiDeliver({ c }) {
  const d = c.deliver;
  return (
    <Chapter id="ai-deliver" tone="blue">
      <ChapterHead id="ai-deliver" kicker={d.kicker} title={d.title} intro={d.intro} />
      <Reveal delay={0.06}>
        <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {d.stages.map((st, i) => (
            <li key={st.label} className={cn("relative rounded-[10px] border bg-white p-5", i === 1 ? "border-accent" : "border-border")}>
              <p className={cn(MONO, i === 1 ? "text-accent" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{st.label}</p>
              <ul className="mt-3 space-y-1.5">{st.items.map((it) => <li key={it} className="flex items-start gap-2 text-[13px] leading-snug text-foreground/85"><span aria-hidden="true" className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>)}</ul>
              {i < 2 && <span aria-hidden="true" className="absolute -right-[10px] top-8 hidden h-px w-4 bg-accent md:block" />}
            </li>
          ))}
        </ol>
      </Reveal>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
