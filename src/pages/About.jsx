import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import StudioHero from "@/sections/studio/StudioHero";
import StudioModel from "@/sections/studio/StudioModel";
import DecisionStandard from "@/sections/studio/DecisionStandard";
import EngineeringStandard from "@/sections/studio/EngineeringStandard";
import ResponsibilityMap from "@/sections/studio/ResponsibilityMap";
import FounderDirection from "@/sections/studio/FounderDirection";
import StudioEngagement from "@/sections/studio/StudioEngagement";
import StudioCta from "@/sections/studio/StudioCta";

/**
 * Estudio / Studio — the corporate profile of Nafureanu. Not services,
 * not work, not the founder's CV: how the company operates, how it makes
 * technical decisions, what standard it holds, who takes responsibility
 * and what it is like to work together. Six acts and a close.
 */
export default function About({ lang = "es" }) {
  const s = STRINGS[lang];
  const a = s.about;
  usePageMeta({
    lang,
    title: s.meta.about.title,
    description: s.meta.about.description,
    path: langPath(lang, "/about"),
    alternatePath: langPath(otherLang(lang), "/about"),
  });
  return (
    <article className="bg-background pt-24 md:pt-28">
      <StudioHero a={a} />
      <StudioModel a={a} />
      <DecisionStandard a={a} />
      <EngineeringStandard a={a} />
      <ResponsibilityMap a={a} />
      <FounderDirection a={a} />
      <StudioEngagement a={a} />
      <StudioCta lang={lang} a={a} />
    </article>
  );
}
