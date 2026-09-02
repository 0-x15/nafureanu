import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/** FROM PROBLEM TO SYSTEM — Understand → Architect → Build → Integrate → Automate → Deploy. */
export default function ProcessStrip({ lang = "es" }) {
  const s = STRINGS[lang].servicesPage;
  const steps = STRINGS[lang].process;

  return (
    <section className="px-5 pb-24 md:px-10 md:pb-36" aria-labelledby="process-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
        <span className="text-[#3D7BFF]">{s.processKicker.split(" — ")[0]}</span> —{" "}
        {s.processKicker.split(" — ")[1]}
      </p>
      <h2
        id="process-title"
        className="mt-6 font-heading text-3xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-5xl"
      >
        {s.processTitle}
      </h2>
      <div className="mt-12 grid border-t border-[#1E2530] sm:grid-cols-2 lg:grid-cols-6">
        {steps.map((step, i) => (
          <Reveal
            key={step.num}
            delay={i * 0.06}
            variant={i % 3 === 1 ? "scale" : "up"}
            className="border-b border-[#1E2530] py-8 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0 lg:border-b-0"
          >
            <p className="font-mono text-[11px] text-[#3D7BFF]">{step.num}</p>
            <h3 className="mt-3 font-heading text-lg font-bold uppercase tracking-[-0.01em] text-[#F0EFEA]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A6AEBD]">{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}