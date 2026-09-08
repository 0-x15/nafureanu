import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./aiBits";

/** Process — seven steps as a signal line: observe, decompose, decide, connect, automate, control, evolve. */
export default function AiProcess({ c }) {
  const p = c.process;
  return (
    <Chapter id="ai-process">
      <ChapterHead id="ai-process" kicker={p.kicker} title={p.title} />
      <Reveal delay={0.06}>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-7">
          {p.steps.map((st, i) => (
            <li key={st.label} className="relative rounded-[8px] border border-border bg-white p-4 lg:rounded-none lg:border-0 lg:border-l lg:bg-transparent lg:pl-4">
              <span aria-hidden="true" className="absolute -left-[5px] top-4 hidden h-[9px] w-[9px] rounded-full border border-accent bg-white lg:block" />
              <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-base font-bold uppercase tracking-[0.02em] text-foreground">{st.label}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{st.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Chapter>
  );
}
