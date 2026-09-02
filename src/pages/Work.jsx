import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import CaseRow from "@/components/CaseRow";
import PracticeRow from "@/components/PracticeRow";
import CtaBand from "@/components/CtaBand";

export default function Work() {
  usePageMeta({
    title: "Work — Nafureanu",
    description:
      "Case studies and engineering practice: payment infrastructure, real-estate CRM & operations, custom management systems, Odoo engineering and web work.",
    path: "/work",
  });

  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">03</span> — Work
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          Selected work.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#5C5C58] md:text-lg">
          Case studies and engineering practice. Results are described qualitatively — we
          don't publish invented numbers.
        </p>
      </header>
      <section className="px-5 pb-24 md:px-10 md:pb-36" aria-label="Case studies">
        {featured.map((p, i) => (
          <CaseRow key={p.slug} project={p} index={i} />
        ))}
        <div className="mt-16 border-t border-[#E0E0DE] pt-2">
          {secondary.map((p) => (
            <PracticeRow key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <CtaBand
        kicker="Initiation"
        title="Want a system like this?"
        note="Every case here started as a conversation about a process that wasn't working."
      />
    </>
  );
}