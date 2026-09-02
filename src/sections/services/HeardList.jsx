import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

export default function HeardList({ lang = "es" }) {
  const s = STRINGS[lang].servicesPage;
  const heard = STRINGS[lang].heard;

  return (
    <section className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="heard-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
        <span className="text-[#E63946]">{s.heardKicker.split(" — ")[0]}</span> —{" "}
        {s.heardKicker.split(" — ")[1]}
      </p>
      <Reveal>
        <h2
          id="heard-title"
          className="mt-6 max-w-4xl font-heading text-3xl font-bold tracking-[-0.02em] md:text-5xl"
        >
          {s.heardTitle}
        </h2>
      </Reveal>
      <ul className="mt-12 border-t border-[#E0E0DE]">
        {heard.map((quote, i) => (
          <Reveal
            key={quote}
            delay={Math.min(i * 0.04, 0.3)}
            className="flex items-baseline gap-6 border-b border-[#E0E0DE] py-5"
          >
            <span className="font-mono text-[10px] text-[#E63946]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-lg font-medium tracking-[-0.01em] md:text-2xl">
              {quote}
            </span>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5C5C58]">{s.heardNote}</p>
    </section>
  );
}