import { useEffect, useState } from "react";
import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import WebCanvasHero from "./WebCanvasHero";
import StructureAct from "./StructureAct";
import DirectionStudio from "./DirectionStudio";
import ResponsiveAct from "./ResponsiveAct";
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
 * visitor. Six acts: the blank canvas, structure before style (the page
 * drops its styling), design changes perception (this page's opening in
 * four directions), a website has to behave (the same surface across
 * contexts), design becomes software (the construction layer beneath),
 * and the brief that lets us start. The direction chosen in act three
 * carries through acts four and five. Fraunces, the editorial serif of
 * the demonstrations, loads only while this page is open.
 */
export default function WebDigitalService({ lang = "es" }) {
  const c = STRINGS[lang].webDigitalService;
  const [mode, setMode] = useState("editorial");
  const [wire, setWire] = useState(false);
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
    <article className="wd-article bg-background pt-24 md:pt-28" data-wire={wire ? "on" : "off"}>
      <WebCanvasHero lang={lang} c={c} />
      <StructureAct c={c} wire={wire} setWire={setWire} />
      <DirectionStudio c={c} mode={mode} setMode={setMode} />
      <ResponsiveAct c={c} mode={mode} />
      <BuildReveal c={c} mode={mode} />
      <WebBrief c={c} />
      <WebCta lang={lang} c={c} paths={paths} />
    </article>
  );
}
