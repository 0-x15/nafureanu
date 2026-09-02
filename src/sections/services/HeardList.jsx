import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

export default function HeardList({ lang = "es" }) {
  const s = STRINGS[lang].servicesPage;
  const heard = STRINGS[lang].heard;

  return (
    <section className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="heard-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
        <span className="text-[#3D7BFF]">{s.heardKicker.split(" — ")[0]}</span> —{" "}
        {s.heardKicker.split(" — ")[1]}
      </p>
      <Reveal variant="mask">
        <h2
          id="heard-title"
          className="mt-6 max-w-4xl font-heading text-3xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-5xl"
        >
          {s.heardTitle}
        </h2>
      </Reveal>
      <ul className="mt-12 border-t border-[#1E2530]">
        {heard.map((quote, i) => (
          <Reveal
            key={quote}
            delay={Math.min(i * 0.04, 0.3)}
            variant={i % 2 === 0 ? "left" : "up"}
            className="flex items-baseline gap-6 border-b border-[#1E2530] py-5"
          >
            <span className="font-mono text-[10px] text-[#3D7BFF]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-lg font-medium tracking-[-0.01em] text-[#F0EFEA] md:text-2xl">
              {quote}
            </span>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-[#A6AEBD]">{s.heardNote}</p>
    </section>
  );
}