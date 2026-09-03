import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang, pick } from "@/i18n";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import FlowDiagram from "@/components/diagrams/FlowDiagram";
import RadialDiagram from "@/components/diagrams/RadialDiagram";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import RealEstateCrmCaseStudy from "@/sections/work/crm/RealEstateCrmCaseStudy";
import BackToProjects from "@/components/work/BackToProjects";
import { usePageMeta } from "@/lib/seo";

const MOCKUPS = { sophia: SophIADashboard, fivo: FivoCheckout };

export default function CaseStudy({ lang = "es" }) {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const reduced = useReducedMotion();
  const s = STRINGS[lang];
  const c = project?.copy?.[lang];
  const cs = s.caseStudy;

  usePageMeta({
    lang,
    title: project
      ? `${pick(project.title, lang)} — Nafureanu`
      : s.meta.work.title,
    description: c?.summary,
    path: langPath(lang, `/work/${slug}`),
    alternatePath: langPath(otherLang(lang), `/work/${slug}`),
  });

  if (!project || !c) {
    return (
      <div className="bg-background px-5 pb-24 pt-40 md:px-10">
        <p className="text-sm text-muted-foreground">{cs.notFound}</p>
        <Link
          to={langPath(lang, "/work")}
          className="mt-4 inline-block font-heading text-3xl font-bold tracking-[-0.02em] text-foreground underline underline-offset-8 transition-colors hover:text-accent"
        >
          {cs.back}
        </Link>
      </div>
    );
  }

  if (slug === "sophia") {
    return <RealEstateCrmCaseStudy lang={lang} />;
  }

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const specs = [
    { key: cs.specs[0], value: pick(project.client, lang) },
    { key: cs.specs[1], value: pick(project.status, lang) },
    { key: cs.specs[2], value: pick(project.discipline, lang) },
  ];
  const Visual = MOCKUPS[project.slug];
  const chips = project.diagram
    ? project.diagram.nodes.map((n) => pick(n.label, lang))
    : [];
  const diagramTitle = project.diagram ? pick(project.diagram.title, lang) : "";

  return (
    <article className="bg-background">
      {/* Header */}
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <BackToProjects lang={lang} className="mb-8" />
        <p className="text-sm font-medium text-accent">{c.type}</p>
        <h1 className="mt-4 font-heading text-6xl font-bold tracking-[-0.03em] text-foreground md:text-8xl">
          {pick(project.title, lang)}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {c.summary}
        </p>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.key} className="bg-background p-5">
              <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {spec.key}
              </dt>
              <dd className="mt-2 font-heading text-base font-bold text-foreground">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Product band */}
      {Visual && (
        <section className="mt-20 bg-[#0B1220] px-5 py-20 text-white md:px-10 md:py-28" aria-label={cs.product}>
          <div className="mx-auto max-w-[1440px]">
            <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-[#8FA5E8]">
              {cs.product}
            </p>
            <Reveal variant="scale" className="mx-auto mt-12 max-w-4xl pb-10">
              <Visual lang={lang} />
            </Reveal>
            {chips.length > 0 && (
              <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/70"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Narrative sections */}
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        {c.sections.map((sec, i) => (
          <Reveal
            key={sec.label}
            variant={i % 3 === 1 ? "left" : "up"}
            className="grid gap-4 border-t border-border py-12 md:grid-cols-12 md:py-16"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
              {sec.label}
            </h2>
            <div className="md:col-span-9">
              {sec.body.map((p, j) => (
                <p
                  key={j}
                  className="mb-4 max-w-2xl text-base leading-[1.75] text-[#333A4A] last:mb-0 md:text-lg"
                >
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {sec.list.map((li) => (
                    <li
                      key={li}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#5A6070]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Architecture band */}
      {project.diagram && (
        <section
          className="bg-[#0B1220] px-5 py-20 text-white md:px-10 md:py-28"
          aria-label={cs.architecture}
        >
          <p className="mx-auto max-w-[1440px] text-xs font-medium uppercase tracking-[0.22em] text-[#8FA5E8]">
            {cs.architecture} — {diagramTitle}
          </p>
          <div className="mt-12">
            {project.diagram.variant === "flow" ? (
              <FlowDiagram
                steps={project.diagram.nodes.map((n) => ({
                  label: pick(n.label, lang),
                  active: n.active,
                }))}
                reduced={reduced}
                label={`${pick(project.title, lang)} — ${diagramTitle}`}
              />
            ) : (
              <RadialDiagram
                centerLabel={project.diagram.center}
                nodes={project.diagram.nodes.map((n) => ({
                  label: pick(n.label, lang),
                  active: n.active,
                }))}
                reduced={reduced}
                label={`${pick(project.title, lang)} — ${diagramTitle}`}
              />
            )}
          </div>
        </section>
      )}

      {/* Stack */}
      <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
          {cs.stack}
        </h2>
        <ul className="flex flex-wrap gap-2 md:col-span-9">
          {project.stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Next project */}
      <Link
        to={langPath(lang, `/work/${next.slug}`)}
        className="group block border-t border-border px-5 py-16 md:px-10 md:py-24"
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {cs.next}
        </p>
        <span className="mt-4 inline-flex items-baseline gap-4 font-heading text-4xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent md:text-6xl">
          {pick(next.title, lang)}
          <ArrowUpRight className="h-8 w-8 self-center md:h-12 md:w-12" />
        </span>
      </Link>

      <CtaBand
        lang={lang}
        kicker={cs.cta.kicker}
        title={cs.cta.title}
        note={cs.cta.note}
        button={s.nav.start}
      />
    </article>
  );
}