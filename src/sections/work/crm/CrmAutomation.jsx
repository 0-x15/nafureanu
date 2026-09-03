import Reveal from "@/components/Reveal";

/**
 * Automation — six capability modules as divided editorial
 * columns, not generic cards.
 */
export default function CrmAutomation({ c }) {
  const a = c.automation;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {a.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {a.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 md:grid-cols-3">
          {a.modules.map((m, i) => (
            <Reveal
              key={m.title}
              delay={(i % 3) * 0.06}
              className="border-t border-border py-7"
            >
              <p className="font-mono text-[10px] text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">
                {m.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {m.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}