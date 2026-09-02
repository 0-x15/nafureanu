import { PROCESS } from "@/data/capabilities";
import Reveal from "@/components/Reveal";

export default function ProcessStrip() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-36" aria-labelledby="process-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
        <span className="text-[#E63946]">04</span> — Method
      </p>
      <h2
        id="process-title"
        className="mt-6 font-heading text-3xl font-bold tracking-[-0.02em] md:text-5xl"
      >
        How an engagement runs.
      </h2>
      <div className="mt-12 grid border-t border-[#E0E0DE] sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((step, i) => (
          <Reveal
            key={step.num}
            delay={i * 0.08}
            className="border-b border-[#E0E0DE] py-8 sm:border-l sm:first:border-l-0 sm:px-6 sm:first:pl-0 lg:border-b-0"
          >
            <p className="font-mono text-[11px] text-[#E63946]">{step.num}</p>
            <h3 className="mt-3 font-heading text-xl font-bold uppercase tracking-[-0.01em]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5C5C58]">{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}