import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/**
 * Why Nafureanu — the strategic-value statement, on deep navy.
 */
export default function WhyNafureanu({ lang = "es" }) {
  const s = STRINGS[lang].why;

  return (
    <section
      className="bg-[#0B1220] px-5 py-20 text-white md:px-10 md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8FA5E8]">
          {s.kicker}
        </p>
        <Reveal variant="mask">
          <h2
            id="why-heading"
            className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-[1.12] tracking-[-0.02em] md:text-5xl"
          >
            {s.title}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {s.points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              variant={i % 2 === 0 ? "up" : "scale"}
              className="border-t border-white/15 pt-6"
            >
              <h3 className="font-heading text-xl font-bold tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}