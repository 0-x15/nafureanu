import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/**
 * Understand → Architect → Build → Integrate → Automate → Deploy.
 * Shared by the homepage and the services page.
 */
export default function ProcessStrip({ lang = "es", kicker, title }) {
  const steps = STRINGS[lang].process;

  return (
    <section className="bg-background px-5 py-20 md:px-10 md:py-32" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {kicker}
        </p>
        <h2
          id="process-heading"
          className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.num}
              delay={i * 0.06}
              variant={i % 3 === 1 ? "scale" : "up"}
              className="border-t border-border pt-6"
            >
              <p className="font-mono text-[11px] text-accent">{step.num}</p>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.01em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}