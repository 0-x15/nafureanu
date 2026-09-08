import { useEffect, useState } from "react";
import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import WebHero from "./WebHero";
import FirstSeconds from "./FirstSeconds";
import MessageStudio from "./MessageStudio";
import ArtDirectionStudio from "./ArtDirectionStudio";
import PageJourney from "./PageJourney";
import WebProof from "./WebProof";
import EngineeringOverlay from "./EngineeringOverlay";
import CreativeBrief from "./CreativeBrief";
import WebCta from "./WebCta";

const FRAUNCES = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/**
 * Web design & digital experiences — the design page. Eight acts: a
 * typographic first impression, the first seconds, the message before
 * the look, one business art-directed four ways, the page as a journey,
 * four real websites presented editorially, the engineering beneath the
 * surface, the creative desk, and the door. The art direction chosen in
 * the studio carries into the engineering act. Fraunces, the editorial
 * serif used in the demonstrations, loads only while this page is open.
 */
export default function WebDigitalService({ lang = "es" }) {
  const c = STRINGS[lang].webDigitalService;
  const wp = STRINGS[lang].webProjects;
  const [mode, setMode] = useState("editorial");
  const paths = { exhibition: workPath(lang, "web-projects") };

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
      <WebHero lang={lang} c={c} proofPath="#wd-proof" />
      <FirstSeconds c={c} />
      <MessageStudio c={c} />
      <ArtDirectionStudio c={c} mode={mode} setMode={setMode} />
      <PageJourney c={c} />
      <WebProof c={c} wp={wp} paths={paths} />
      <EngineeringOverlay c={c} mode={mode} />
      <CreativeBrief c={c} />
      <WebCta lang={lang} c={c} paths={paths} />
    </article>
  );
}
