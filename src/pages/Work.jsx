import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import ProjectCard from "@/components/work/ProjectCard";
import CrmCardVisual from "@/components/work/visuals/CrmCardVisual";
import LifeAdminCardVisual from "@/components/work/visuals/LifeAdminCardVisual";
import WebCardVisual from "@/components/work/visuals/WebCardVisual";
import FivoCardVisual from "@/components/work/visuals/FivoCardVisual";
import WorkSystemsOverview from "@/components/work/WorkSystemsOverview";
import BackToPrevious from "@/components/work/BackToPrevious";

/**
 * The project index — an editorial catalogue of systems already at
 * work. Presentation order is explicit here, independent of the
 * PROJECTS array order.
 */
const ORDER = [
  { slug: "sophia", visual: (lang) => <CrmCardVisual lang={lang} /> },
  { slug: "fivo", visual: (lang) => <FivoCardVisual lang={lang} /> },
  { slug: "life-admin", visual: () => <LifeAdminCardVisual /> },
  { slug: "web-projects", visual: () => <WebCardVisual /> },
];

export default function Work({ lang = "es" }) {
  const s = STRINGS[lang];
  const wp = s.workPage;

  usePageMeta({
    lang,
    title: s.meta.work.title,
    description: s.meta.work.description,
    path: langPath(lang, "/work"),
    alternatePath: langPath(otherLang(lang), "/work"),
  });

  return (
    <div className="bg-[#F2F5FA]">
      <header className="relative overflow-hidden px-5 pt-32 md:px-10 md:pt-40">
        {/* atmosphere — restrained cobalt bloom, cyan reflection, one glass plane */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <span className="absolute right-[6%] top-[4%] h-[76%] w-[64%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.08),transparent)]" />
          <span className="absolute bottom-[0%] left-[6%] h-[48%] w-[44%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)]" />
          <div className="absolute right-[-8%] top-[12%] h-[32vh] w-[46vw] -rotate-2 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(49,87,246,0.3)] backdrop-blur-[26px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] md:grid md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-6">
            <BackToPrevious lang={lang} className="mb-6" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {wp.kicker}
            </p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground md:text-7xl">
              {wp.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {wp.intro}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
              {wp.secondary}
            </p>
          </div>
          <div className="mt-14 md:col-span-6 md:mt-0">
            <WorkSystemsOverview lang={lang} />
          </div>
        </div>
        {/* Room for the overlapping product surfaces */}
        <div aria-hidden="true" className="h-16 md:h-24" />
      </header>

      <section
        aria-label={wp.kicker}
        className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 md:px-10 md:pb-20 md:pt-14"
      >
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.05}>
              <ProjectCard
                project={PROJECTS.find((p) => p.slug === entry.slug)}
                index={String(i + 1).padStart(2, "0")}
                lang={lang}
                viewProject={wp.viewProject}
              >
                {entry.visual(lang)}
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-xl font-heading text-2xl font-bold leading-snug tracking-[-0.02em] text-foreground md:text-3xl">
              {wp.close.line}
            </h2>
          </Reveal>
          <Reveal variant="left" delay={0.1} className="shrink-0">
            <ActionLink to={langPath(lang, "/contact")} size="lg">
              {wp.close.cta}
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}