import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Num } from "./serviceBits";

/**
 * The real problem — eight situations a real-estate team recognises,
 * each with the capability a custom system can answer them with. An
 * editorial list in two columns, no cards.
 */
export default function CrmServiceProblems({ c }) {
  const p = c.problems;
  const half = Math.ceil(p.items.length / 2);
  const columns = [p.items.slice(0, half), p.items.slice(half)];
  return (
    <Chapter tone="white" aria-labelledby="crm-service-problems">
      <ChapterHead id="crm-service-problems" kicker={p.kicker} titleMuted={p.titleA} title={p.titleB} intro={p.intro} />
      <div className="mt-12 grid gap-x-14 md:mt-16 md:grid-cols-2">
        {columns.map((col, ci) => (
          <ol key={ci} className="border-t border-border">
            {col.map((it, i) => (
              <li key={it.problem} className="border-b border-border">
                <Reveal delay={0.04 * i}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 md:py-7">
                    <Num n={ci * half + i + 1} className="pt-1.5" />
                    <div>
                      <p className="font-heading text-lg font-bold leading-snug tracking-[-0.015em] text-foreground md:text-xl">{it.problem}</p>
                      <p className="mt-2.5 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-accent" />
                        <span><span className="sr-only">{p.capabilityLabel}: </span>{it.capability}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </Chapter>
  );
}
