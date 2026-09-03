import Reveal from "@/components/Reveal";
import MatchingDemo from "./MatchingDemo";

/**
 * Matching — its own product moment: what it does, how it works in
 * both directions, and a generic animated demo. No invented counts
 * or private scoring logic.
 */
export default function CrmMatching({ c }) {
  const m = c.matching;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
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

        <Reveal variant="scale" className="mt-14">
          <MatchingDemo demo={m.demo} />
        </Reveal>
      </div>
    </section>
  );
}