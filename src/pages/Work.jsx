import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import ProjectCard from "@/components/work/ProjectCard";
import CrmCardVisual from "@/components/work/visuals/CrmCardVisual";
import LifeAdminCardVisual from "@/components/work/visuals/LifeAdminCardVisual";
import WebCardVisual from "@/components/work/visuals/WebCardVisual";
import FivoCheckout from "@/components/mockups/FivoCheckout";

/**
 * The project index — an editorial catalogue of systems already at
 * work. Presentation order is explicit here, independent of the
 * PROJECTS array order.
 */
const ORDER = [
  { slug: "sophia", span: "md:col-span-7", visual: (lang) => <CrmCardVisual lang={lang} /> },
  {
    slug: "fivo",
    span: "md:col-span-5",
    visual: (lang) => <FivoCheckout lang={lang} bare className="scale-105 md:scale-110" />,
  },
  { slug: "life-admin", span: "md:col-span-5", visual: () => <LifeAdminCardVisual /> },
  { slug: "web-projects", span: "md:col-span-7", visual: () => <WebCardVisual /> },
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
    <>
      <header className="bg-background px-5 pt-36 md:px-10 md:pt-44">
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
      </header>

      <section
        aria-label={wp.kicker}
        className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20"
      >
        <div className="grid gap-6 md:grid-cols-12">
          {ORDER.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.05} className={entry.span}>
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
    </>
  );
}