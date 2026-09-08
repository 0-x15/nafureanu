import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./csBits";

/** Process — seven steps on one delivery track. */
export default function CsProcess({ c }) {
  const p = c.process;
  return (
    <Chapter id="cs-process">
      <ChapterHead id="cs-process" kicker={p.kicker} title={p.title} />
      <Reveal delay={0.06}>
        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-7 lg:gap-3">
          <span aria-hidden="true" className="absolute left-0 top-[6px] hidden h-px w-full bg-accent/30 lg:block" />
          {p.steps.map((st, i) => (
            <li key={st.label} className="relative lg:pt-7">
              <span aria-hidden="true" className={cn("absolute left-0 top-0 hidden h-[13px] w-[13px] rounded-full border border-accent lg:block", i === p.steps.length - 1 ? "bg-accent" : "bg-white")} />
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
