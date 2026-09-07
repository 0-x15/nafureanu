import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Num } from "./bsBits";

/** Service process — six steps that build up, each leaving a deliverable behind. */
export default function BsProcess({ c }) {
  const p = c.process;
  return (
    <Chapter id="bs-process">
      <ChapterHead id="bs-process" kicker={p.kicker} title={p.title} />
      <Reveal delay={0.06}>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-6 lg:gap-3">
          {p.steps.map((st, i) => (
            <li key={st.label} className="flex flex-col" style={{ marginTop: `calc(var(--stair, 0px) * ${i})` }}>
              <div className="flex-1 rounded-[10px] border border-border bg-white p-4 lg:[--stair:10px]">
                <Num n={i + 1} />
                <p className="mt-1.5 font-heading text-lg font-bold uppercase tracking-[0.02em] text-foreground">{st.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{st.text}</p>
              </div>
              <p className={cn(MONO, "mt-2 flex items-center gap-2 text-accent")}><span aria-hidden="true" className="h-px w-4 bg-accent" />{st.out}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Chapter>
  );
}
