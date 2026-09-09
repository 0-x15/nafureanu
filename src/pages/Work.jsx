import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import CrmCardVisual from "@/components/work/visuals/CrmCardVisual";
import LifeAdminCardVisual from "@/components/work/visuals/LifeAdminCardVisual";
import WebCardVisual from "@/components/work/visuals/WebCardVisual";
import FivoCardVisual from "@/components/work/visuals/FivoCardVisual";
import WorkArchiveHero from "@/sections/work-index/WorkArchiveHero";
import ProjectStage from "@/sections/work-index/ProjectStage";
import WorkRange from "@/sections/work-index/WorkRange";
import WorkNextSlot from "@/sections/work-index/WorkNextSlot";

/**
 * The project index — a living archive of the systems already built.
 * Four acts: the archive opens with the project register; the four
 * cards on their stage; the range of the work as a classification
 * spread; and the empty fifth entry that closes the register.
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
  const projects = entries.map((e) => e.project);

  usePageMeta({
    lang,
    title: s.meta.work.title,
    description: s.meta.work.description,
    path: langPath(lang, "/work"),
    alternatePath: langPath(otherLang(lang), "/work"),
  });

  return (
    <div>
      <WorkArchiveHero lang={lang} t={wp} projects={projects} />
      <ProjectStage lang={lang} t={wp} entries={entries} viewProject={wp.viewProject} />
      <WorkRange t={wp} />
      <WorkNextSlot lang={lang} t={wp} projects={projects} />
    </div>
  );
}
