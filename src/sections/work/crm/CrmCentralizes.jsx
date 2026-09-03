import Reveal from "@/components/Reveal";

/**
 * Qué centraliza — the ten domains the system brings together, as
 * one scannable bordered registry. Simple, corporate, no cards.
 */
export default function CrmCentralizes({ c }) {
  const z = c.centralizes;

  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {z.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {z.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {z.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
            {z.list.map((name, i) => (
              <li key={name} className="flex items-center gap-3 bg-background px-4 py-5">
                <span className="font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold tracking-[-0.01em] text-foreground">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}