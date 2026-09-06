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
import SystemsField, { FieldAtmosphere } from "@/components/work/SystemsField";
import SystemsFieldCompact from "@/components/work/SystemsFieldCompact";
import BackToHome from "@/components/work/BackToHome";
import WorkClosingFlow from "@/components/work/WorkClosingFlow";

/**
 * The project index — an editorial catalogue of systems already at
 * work. Presentation order is explicit here, independent of the
 * PROJECTS array order.
 */
const ORDER = [
  { slug: "crm-inmobiliario", visual: (lang) => <CrmCardVisual lang={lang} /> },
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
      <div className="px-5 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1280px]">
          <BackToHome lang={lang} />
        </div>
      </div>
      <header className="relative overflow-hidden px-5 pt-8 md:px-10 md:pt-12">
        {/* atmosphere — the systems field's own: a technical grid fragment, a soft cobalt glow, a faint cyan reflection and thin traces leaving the map */}
        <FieldAtmosphere />
        <div className="relative mx-auto max-w-[1280px] xl:grid xl:grid-cols-12 xl:items-center xl:gap-6">
          <div className="xl:col-span-5">
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
          {/* The systems field begins around the centre and bleeds past the right edge */}
          <div className="mt-12 lg:mx-auto lg:mt-14 lg:max-w-[1000px] xl:col-span-7 xl:-ml-4 xl:-mr-[3vw] xl:mt-0 xl:max-w-none 2xl:-mr-[5vw]">
            <div className="hidden lg:block">
              <SystemsField lang={lang} />
            </div>
            <div className="lg:hidden">
              <SystemsFieldCompact lang={lang} />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="h-10 md:h-16" />
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

      {/* Closing — the projects just seen become the visitor's own question: a real process → understand · design → a system in production */}
      <section aria-labelledby="work-close" className="relative overflow-hidden border-t border-border px-5 py-24 md:px-10 md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute bottom-[18%] right-[8%] h-px w-[26%] bg-gradient-to-r from-transparent via-[rgba(23,180,205,0.35)] to-transparent" />
          <span className="absolute right-[26%] top-[16%] h-[50%] w-[26%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.07),transparent)]" />
        </div>
        {/* Mobile order: kicker · statement · support · process rail · action. Desktop: copy and action left, rail right. */}
        <div className="relative mx-auto grid max-w-[1280px] gap-12 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
          <Reveal className="md:col-start-1 md:col-end-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{wp.close.kicker}</p>
            <h2 id="work-close" className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground md:text-5xl [text-wrap:balance]">
              {wp.close.line}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{wp.close.support}</p>
          </Reveal>
          <div className="md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-3 md:flex md:justify-end">
            <div className="w-full max-w-[380px] md:pt-2">
              <WorkClosingFlow labels={wp.close.stages} status={wp.close.status} title={wp.close.flowLabel} />
            </div>
          </div>
          <Reveal delay={0.1} className="md:col-start-1 md:col-end-8 md:self-start">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{wp.close.cta}</ActionLink>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{wp.close.reassure}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}