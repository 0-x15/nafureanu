import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang, pick } from "@/i18n";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import FlowDiagram from "@/components/diagrams/FlowDiagram";
import RadialDiagram from "@/components/diagrams/RadialDiagram";
import { usePageMeta } from "@/lib/seo";

export default function CaseStudy({ lang = "es" }) {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const reduced = useReducedMotion();
  const s = STRINGS[lang];
  const c = project?.copy?.[lang];

  usePageMeta({
    lang,
    title: project ? `${project.title} — Nafureanu` : s.meta.work.title,
    description: c?.summary,
    path: langPath(lang, `/work/${slug}`),
    alternatePath: langPath(otherLang(lang), `/work/${slug}`),
  });

  if (!project || !c) {
    return (
      <div className="px-5 py-48 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A93A6]">
          {s.caseStudy.notFound}
        </p>
        <Link
          to={langPath(lang, "/work")}
          className="mt-6 inline-block font-heading text-3xl font-bold text-[#F0EFEA] underline underline-offset-8 hover:text-[#3D7BFF]"
        >
          {s.caseStudy.back}
        </Link>
      </div>
    );
  }

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const cs = s.caseStudy;

  const specCells = [
    { key: cs.specs[0], value: pick(project.client, lang) },
    { key: cs.specs[1], value: pick(project.status, lang) },
    { key: cs.specs[2], value: pick(project.discipline, lang) },
    { key: cs.specs[3], value: project.code },
  ];
  const diagramNodes = project.diagram
    ? project.diagram.nodes.map((n) => ({ label: pick(n.label, lang), active: n.active }))
    : null;

  return (
    <article>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
          <span className="text-[#3D7BFF]">{project.code}</span> — {c.type}
        </p>
        <h1 className="mt-6 overflow-hidden font-heading text-6xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA] md:text-9xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-[#A6AEBD]">{c.summary}</p>

        <dl className="mt-14 grid gap-px border border-[#1E2530] bg-[#1E2530] sm:grid-cols-2 lg:grid-cols-4">
          {specCells.map((spec) => (
            <div key={spec.key} className="bg-[#0D1117] p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A93A6]">
                {spec.key}
              </dt>
              <dd className="mt-2 font-heading text-base font-bold text-[#F0EFEA]">
                {spec.value}
              </dd>
            </div>
          ))}
          {project.stats.map((stat) => (
            <div key={pick(stat.label, lang)} className="bg-[#0D1117] p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A93A6]">
                {pick(stat.label, lang)}
              </dt>
              <dd className="mt-2 font-heading text-2xl font-bold text-[#3D7BFF]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-16 px-5 md:px-10">
        <Reveal variant="scale">
          <Image
            src={project.image}
            alt={`${project.title} — ${c.summary}`}
            className="aspect-[16/10] w-full border border-[#1E2530] md:aspect-[21/9]"
            fittingType="fill"
          />
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        {c.sections.map((sec, i) => (
          <Reveal
            key={sec.label}
            variant={i % 3 === 1 ? "left" : "up"}
            className="grid gap-6 border-t border-[#1E2530] py-12 md:grid-cols-12 md:py-16"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6] md:col-span-3">
              {sec.label}
            </h2>
            <div className="md:col-span-9">
              {sec.body.map((p, j) => (
                <p
                  key={j}
                  className="mb-4 max-w-2xl text-base leading-[1.7] text-[#C6CCD9] last:mb-0 md:text-lg"
                >
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {sec.list.map((li) => (
                    <li
                      key={li}
                      className="flex items-center gap-2.5 font-mono text-xs text-[#A6AEBD]"
                    >
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-[#3D7BFF]" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        {project.diagram && diagramNodes && (
          <div className="border-t border-[#1E2530] py-12 md:py-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
              {cs.architecture} — {pick(project.diagram.title, lang)}
            </h2>
            <div className="mt-10">
              {project.diagram.variant === "flow" ? (
                <FlowDiagram
                  steps={diagramNodes}
                  reduced={reduced}
                  label={`${project.title} — ${pick(project.diagram.title, lang)}`}
                />
              ) : (
                <RadialDiagram
                  centerLabel={project.diagram.center}
                  nodes={diagramNodes}
                  reduced={reduced}
                  label={`${project.title} — ${pick(project.diagram.title, lang)}`}
                />
              )}
            </div>
          </div>
        )}

        <div className="grid gap-6 border-t border-[#1E2530] py-12 md:grid-cols-12">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6] md:col-span-3">
            {cs.stack}
          </h2>
          <ul className="flex flex-wrap gap-2 md:col-span-9">
            {project.stack.map((t) => (
              <li
                key={t}
                className="border border-[#2A3550] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A93A6]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={langPath(lang, `/work/${next.slug}`)}
        data-cursor="view"
        className="group block border-t border-[#1E2530] px-5 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
          {cs.next}
        </p>
        <span className="mt-4 inline-flex items-baseline gap-4 font-heading text-4xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA] transition-colors group-hover:text-[#3D7BFF] md:text-6xl">
          {next.title}
          <ArrowUpRight className="h-8 w-8 self-center md:h-12 md:w-12" />
        </span>
      </Link>

      <CtaBand lang={lang} kicker={cs.cta.kicker} title={cs.cta.title} note={cs.cta.note} />
    </article>
  );
}