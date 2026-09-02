import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

export default function Manifesto({ lang = "es" }) {
  const s = STRINGS[lang].manifesto;

  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="manifesto-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
        <span className="text-[#E63946]">{s.kicker.split(" — ")[0]}</span> — {s.kicker.split(" — ")[1]}
      </p>
      <Reveal>
        <h2
          id="manifesto-title"
          className="mt-8 max-w-5xl font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] md:text-6xl"
        >
          {s.statementA}
          <span className="text-[#E63946]">{s.statementHighlight}</span>
          {s.statementB}
        </h2>
      </Reveal>
      <div className="mt-16 grid border-t border-[#E0E0DE] md:mt-24 md:grid-cols-3">
        {s.triad.map((t, i) => (
          <Reveal
            key={t.left}
            delay={i * 0.1}
            className="border-b border-[#E0E0DE] py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#848482]">
              {t.left} =
            </p>
            <p className="mt-2 font-heading text-xl font-bold uppercase tracking-[-0.02em] md:text-2xl">
              {t.right}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16 border-t border-[#E0E0DE] pt-10 md:mt-20">
        <p className="flex max-w-3xl items-baseline gap-4 font-heading text-2xl font-bold tracking-[-0.02em] md:text-4xl">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 self-center bg-[#E63946]" />
          {s.automation}
        </p>
      </Reveal>
    </section>
  );
}