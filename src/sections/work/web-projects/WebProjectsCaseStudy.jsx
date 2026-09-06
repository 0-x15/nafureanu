import { STRINGS } from "@/i18n";
import BackToProjects from "@/components/work/BackToProjects";
import WebProjectsHero from "./WebProjectsHero";
import WebProjectsIndex from "./WebProjectsIndex";
import WebProjectChapter from "./WebProjectChapter";
import WebProjectsPrinciples from "./WebProjectsPrinciples";
import WebProjectsFinalCta from "./WebProjectsFinalCta";

const LAYOUTS = { "dd-evecom": "A", "dental-goya": "B", "reformas-octavian": "C", "mp-monitor": "D" };

/**
 * Web & digital products — not one product but a curated collection:
 * a hero that states the positioning, a compact index, one editorial
 * chapter per live project (real captures, deliberate compositions),
 * the principles this work shares with the rest of the practice, and
 * the final CTA. Page metadata is set by CaseStudy.jsx from
 * webProjects.meta.
 */
export default function WebProjectsCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].webProjects;
  return (
    <article className="bg-background">
      <div className="px-5 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <BackToProjects lang={lang} />
        </div>
      </div>
      <WebProjectsHero c={c} />
      <WebProjectsIndex c={c} />
      {c.projects.map((p, i) => (
        <WebProjectChapter key={p.id} n={i + 1} p={p} c={c} layout={LAYOUTS[p.id]} />
      ))}
      <WebProjectsPrinciples c={c} />
      <WebProjectsFinalCta lang={lang} c={c} />
    </article>
  );
}
