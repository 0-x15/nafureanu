import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/**
 * "Lo que escuchamos" — the phrases companies arrive with.
 */
export default function HeardList({ lang = "es" }) {
  const s = STRINGS[lang].servicesPage;
  const heard = STRINGS[lang].heard;

  return (
    <section
      className="bg-background px-5 pb-20 md:px-10 md:pb-32"
      aria-labelledby="heard-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {s.heardKicker}
        </p>
        <h2
          id="heard-title"
          className="mt-4 max-w-2xl font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl"
        >
          {s.heardTitle}
        </h2>
        <ul className="mt-12 border-t border-border">
          {heard.map((quote, i) => (
            <Reveal
              key={quote}
              delay={Math.min(i * 0.03, 0.25)}
              variant={i % 2 === 0 ? "left" : "up"}
              className="flex items-baseline gap-5 border-b border-border py-5"
            >
              <span className="font-mono text-[10px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-lg font-medium tracking-[-0.01em] text-foreground md:text-2xl">
                “{quote}”
              </span>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          {s.heardNote}
        </p>
      </div>
    </section>
  );
}