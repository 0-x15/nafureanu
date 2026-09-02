import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { usePageMeta } from "@/lib/seo";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  usePageMeta({
    title: project ? `${project.title} — Nafureanu case study` : "Case study — Nafureanu",
    description: project?.summary,
    path: `/work/${slug}`,
  });

  if (!project) {
    return (
      <div className="px-5 py-48 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#848482]">
          404 — Case not found
        </p>
        <Link to="/work" className="mt-6 inline-block font-heading text-3xl font-bold underline">
          Back to work
        </Link>
      </div>
    );
  }

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const specs = [
    ["Client", project.client],
    ["Status", project.status],
    ["Discipline", project.discipline],
    ["Reference", project.code],
  ];

  return (
    <article>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
          <span className="text-[#E63946]">{project.code}</span> — {project.type}
        </p>
        <h1 className="mt-6 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-9xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-[#5C5C58]">{project.summary}</p>
        <dl className="mt-14 grid gap-px border border-[#E0E0DE] bg-[#E0E0DE] sm:grid-cols-2 lg:grid-cols-4">
          {specs.map(([k, v]) => (
            <div key={k} className="bg-[#F9F9F7] p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#848482]">
                {k}
              </dt>
              <dd className="mt-2 font-heading text-base font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-16 px-5 md:px-10">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.summary}`}
          className="aspect-[16/10] w-full border border-[#E0E0DE] md:aspect-[21/9]"
          fittingType="fill"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        {project.sections.map((s) => (
          <Reveal
            key={s.label}
            className="grid gap-6 border-t border-[#E0E0DE] py-12 md:grid-cols-12 md:py-16"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482] md:col-span-3">
              {s.label}
            </h2>
            <div className="md:col-span-9">
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="mb-4 max-w-2xl text-base leading-[1.7] text-[#3D3D3A] last:mb-0 md:text-lg"
                >
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {s.list.map((li) => (
                    <li
                      key={li}
                      className="flex items-center gap-2.5 font-mono text-xs text-[#5C5C58]"
                    >
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-[#E63946]" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        <div className="grid gap-6 border-t border-[#E0E0DE] py-12 md:grid-cols-12">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482] md:col-span-3">
            Stack & concepts
          </h2>
          <ul className="flex flex-wrap gap-2 md:col-span-9">
            {project.stack.map((s) => (
              <li
                key={s}
                className="border border-[#E0E0DE] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#848482]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/work/${next.slug}`}
        className="group block border-t border-[#E0E0DE] px-5 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
          Next case
        </p>
        <span className="mt-4 inline-flex items-baseline gap-4 font-heading text-4xl font-bold uppercase tracking-[-0.02em] transition-colors group-hover:text-[#E63946] md:text-6xl">
          {next.title}
          <ArrowUpRight className="h-8 w-8 self-center md:h-12 md:w-12" />
        </span>
      </Link>

      <CtaBand
        kicker="Initiation"
        title="Have a process like the one you just read about?"
        note="The next case study on this site could describe your operation."
      />
    </article>
  );
}