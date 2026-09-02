import { STRINGS } from "@/i18n";

/**
 * Verified editorial statistics — hairline cells with oversized figures
 * and a signal-red "+" accent. Not a generic startup grid.
 */
export default function StatsBand({ lang }) {
  const s = STRINGS[lang].stats;

  return (
    <section className="border-y border-[#E0E0DE] px-5 py-14 md:px-10 md:py-20" aria-label={s.kicker}>
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-baseline justify-between gap-6">
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-[#E63946]" />
            {s.kicker}
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-[#848482] md:block">
            {s.note}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 border-l border-t border-[#E0E0DE] lg:grid-cols-4">
          {s.items.map((it) => (
            <div key={it.label} className="border-b border-r border-[#E0E0DE] px-6 py-8 md:py-10">
              <p className="font-heading text-5xl font-bold tracking-[-0.02em] md:text-7xl">
                {it.value.replace("+", "")}
                {it.value.includes("+") && <span className="text-[#E63946]">+</span>}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#848482]">
                {it.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[#848482] md:hidden">
          {s.note}
        </p>
      </div>
    </section>
  );
}