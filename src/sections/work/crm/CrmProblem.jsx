import Reveal from "@/components/Reveal";

/**
 * The problem — an editorial list of the types of problems this
 * system is built to remove, so visitors recognize their own
 * operation. No client-specific claims.
 */
export default function CrmProblem({ c }) {
  const p = c.problem;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {p.kicker}
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
          {p.title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {p.intro}
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
        {p.pains.map((pain, i) => (
          <Reveal
            key={pain}
            delay={i * 0.04}
            className="border-t border-border"
          >
            <li className="flex items-baseline gap-5 py-5">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium leading-snug text-foreground md:text-lg">
                {pain}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}