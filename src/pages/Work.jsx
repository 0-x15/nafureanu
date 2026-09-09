import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import CrmCardVisual from "@/components/work/visuals/CrmCardVisual";
import LifeAdminCardVisual from "@/components/work/visuals/LifeAdminCardVisual";
import WebCardVisual from "@/components/work/visuals/WebCardVisual";
import FivoCardVisual from "@/components/work/visuals/FivoCardVisual";
import WorkArchiveHero from "@/sections/work-index/WorkArchiveHero";
import WorkCardStage from "@/sections/work-index/WorkCardStage";
import WorkNext from "@/sections/work-index/WorkNext";

/**
 * The project index — a curated archive of built systems, in three
 * acts: the abstract hero, the four cards (the only place the projects
 * appear) on their stage, and the forward-looking close, entry 05.
 * Presentation order is explicit here, independent of PROJECTS.
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
  const entries = ORDER.map((entry) => ({ ...entry, project: PROJECTS.find((p) => p.slug === entry.slug) }));

  usePageMeta({
    lang,
    title: s.meta.work.title,
    description: s.meta.work.description,
    path: langPath(lang, "/work"),
    alternatePath: langPath(otherLang(lang), "/work"),
  });

  return (
    <div>
      <WorkArchiveHero lang={lang} t={wp} />
      <WorkCardStage lang={lang} t={wp} entries={entries} viewProject={wp.viewProject} />
      <WorkNext lang={lang} t={wp} />
    </div>
  );
}
