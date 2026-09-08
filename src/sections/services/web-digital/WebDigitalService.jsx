import { useEffect, useState } from "react";
import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import WebCanvasHero from "./WebCanvasHero";
import StructureAct from "./StructureAct";
import DirectionStudio from "./DirectionStudio";
import ResponsiveLab from "./ResponsiveLab";
import BuildReveal from "./BuildReveal";
import WebBrief from "./WebBrief";
import WebCta from "./WebCta";
import "./webDigital.css";

const FRAUNCES = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/**
 * Web design & development — a page that designs itself in front of the
 * visitor. Six acts, each a designed object that fits one viewport: the
 * canvas being composed, information becoming structure, one landing
 * under three art directions (still or interactive), a responsive lab
 * with a continuous resizer, the construction layer beneath a finished
 * page, and the brief. Fraunces loads only while this page is open.
 */
export default function WebDigitalService({ lang = "es" }) {
  const c = STRINGS[lang].webDigitalService;
  const [dir, setDir] = useState("editorial");
  const paths = { work: workPath(lang, "web-projects") };

  useEffect(() => {
    if (document.querySelector(`link[href="${FRAUNCES}"]`)) return undefined;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FRAUNCES;
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return (
    <article className="bg-background pt-24 md:pt-28">
      <WebCanvasHero lang={lang} c={c} />
      <StructureAct c={c} />
      <DirectionStudio c={c} dir={dir} setDir={setDir} />
      <ResponsiveLab c={c} />
      <BuildReveal c={c} />
      <WebBrief c={c} />
      <WebCta lang={lang} c={c} paths={paths} />
    </article>
  );
}
