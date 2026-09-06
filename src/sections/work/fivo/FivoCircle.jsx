import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead } from "./fivoBits";

/** Circle — the verified components Fivo builds on, stated without endorsement. */
export default function FivoCircle({ c }) {
  const k = c.circle;
  return (
    <Chapter tone="tint" aria-labelledby="fivo-circle">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <ChapterHead kicker={k.kicker} title={k.title} intro={k.intro} />
          <Reveal delay={0.08} className="mt-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-deep">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {k.badge}
            </span>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-muted-foreground">{k.disclaimer}</p>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.06} className="min-w-0 lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2">
            {k.components.map((comp, i) => (
              <li key={comp.title} className="rounded-xl border border-white/90 bg-white/80 p-5 backdrop-blur">
                <p className="font-mono text-[10px] text-accent">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{comp.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5A6070]">{comp.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Chapter>
  );
}
