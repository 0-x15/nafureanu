import Reveal from "@/components/Reveal";
import MatchingDemo from "./MatchingDemo";

/**
 * Matching — its own product moment: what it does, how it works in
 * both directions, and a sanitized matching workspace where the visitor
 * can switch between demand → properties and property → interested
 * clients. No invented counts or private scoring logic.
 */
export default function CrmMatching({ c }) {
  const m = c.matching;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {m.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {m.title}
          </h2>
          <div className="mt-7 max-w-2xl space-y-4">
            {m.paras.map((para) => (
              <p key={para} className="text-base leading-[1.75] text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <MatchingDemo m={m} />
        </Reveal>

        <Reveal delay={0.12} className="mt-8 md:mt-10">
          <p className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
            <span className="max-w-3xl">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {m.relation}
              </span>
              <span className="mt-2 block font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-lg">
                {m.closing}
              </span>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
