import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/**
 * Dark trust band — production metrics, presented with confidence.
 */
export default function StatsBand({ lang }) {
  const s = STRINGS[lang].stats;

  return (
    <section className="bg-[#0B1220] px-5 py-16 md:px-10 md:py-24" aria-label={s.kicker}>
      <div className="mx-auto max-w-[1440px]">
        <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-white/40">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-[#5B84FF]" />
          {s.kicker}
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {s.items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08}>
              <p className="font-heading text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
                {it.value.replace("+", "")}
                {it.value.includes("+") && <span className="text-[#5B84FF]">+</span>}
              </p>
              <p className="mt-3 text-sm text-white/50">{it.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}