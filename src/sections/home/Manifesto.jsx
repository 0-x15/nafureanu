import Reveal from "@/components/Reveal";

const TRIAD = [
  { left: "Technology", right: "Leverage" },
  { left: "Automation", right: "Infrastructure" },
  { left: "Software", right: "Advantage" },
];

export default function Manifesto() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="manifesto-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
        <span className="text-[#E63946]">01</span> — Positioning
      </p>
      <Reveal>
        <h2
          id="manifesto-title"
          className="mt-8 max-w-5xl font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] md:text-6xl"
        >
          We don't just write code. We study how a business actually operates, find the
          processes that drain its time, and build{" "}
          <span className="text-[#E63946]">the technology that removes them</span>.
        </h2>
      </Reveal>
      <div className="mt-16 grid border-t border-[#E0E0DE] md:mt-24 md:grid-cols-3">
        {TRIAD.map((t, i) => (
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
    </section>
  );
}