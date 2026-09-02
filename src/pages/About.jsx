import { usePageMeta } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

const PRINCIPLES = [
  {
    num: "01",
    title: "Systems over screens",
    text: "We design the whole process, not just the interface on top of it.",
  },
  {
    num: "02",
    title: "Automation by default",
    text: "If a task repeats, it should run without a person performing it.",
  },
  {
    num: "03",
    title: "Precision",
    text: "Engineering decisions are made deliberately, and we can explain every one of them.",
  },
  {
    num: "04",
    title: "Maintainability",
    text: "Systems are built to be operated, understood and evolved for years.",
  },
];

export default function About() {
  usePageMeta({
    title: "About — Nafureanu",
    description:
      "Nafureanu is a software engineering studio: custom software, AI systems and business automation designed around real business processes.",
    path: "/about",
  });

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">04</span> — Company
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          A software engineering studio.
        </h1>
        <Reveal>
          <p className="mt-10 max-w-3xl text-lg leading-[1.7] text-[#5C5C58] md:text-xl">
            Nafureanu designs and builds the technology companies run on — custom software,
            AI systems and automation designed around real business processes, not generic
            templates. We understand a business first, then remove its repetitive work with
            engineering.
          </p>
        </Reveal>
      </header>

      <section className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="principles-title">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          How we think
        </p>
        <h2
          id="principles-title"
          className="mt-6 font-heading text-3xl font-bold tracking-[-0.02em] md:text-5xl"
        >
          Four principles.
        </h2>
        <ul className="mt-12 border-t border-[#E0E0DE]">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.num}
              delay={i * 0.06}
              className="grid gap-3 border-b border-[#E0E0DE] py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="font-mono text-[11px] text-[#E63946] md:col-span-1">{p.num}</span>
              <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] md:col-span-5 md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-[#5C5C58] md:col-span-6 md:text-base">
                {p.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#E0E0DE] px-5 py-20 md:px-10 md:py-28" aria-labelledby="founder-title">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482] md:col-span-3">
            Founder
          </p>
          <div className="md:col-span-9">
            <h2 id="founder-title" className="font-heading text-2xl font-bold md:text-4xl">
              Nafureanu was founded by Daniel, a software engineer focused on custom
              software, AI and business automation.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#5C5C58]">
              The studio is built to grow beyond one person: every system we ship is
              documented, structured and maintainable by design.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Initiation"
        title="Work with the studio."
        note="Bring a problem, a broken process or a rough idea — we'll bring the engineering."
      />
    </>
  );
}