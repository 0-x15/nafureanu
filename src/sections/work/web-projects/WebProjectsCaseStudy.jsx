import { Suspense, lazy } from "react";
import { STRINGS } from "@/i18n";
import Gallery from "./gallery/Gallery";
import HeroStatic from "./HeroStatic";
import useExperienceMode from "./useExperienceMode";

const Exhibition = lazy(() => import("./exhibition/Exhibition"));

/**
 * Web & digital products — a digital exhibition of four live sites.
 * Desktop pointers with WebGL get the immersive scroll-driven stage
 * (loaded on demand so the rest of the site never pays for three.js);
 * everything else gets the DOM gallery. Metadata is set by CaseStudy.jsx.
 */
export default function WebProjectsCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].webProjects;
  const [mode, forceGallery] = useExperienceMode();
  if (mode === "gallery") return <Gallery lang={lang} c={c} />;
  return (
    <Suspense fallback={<HeroStatic lang={lang} c={c} />}>
      <Exhibition lang={lang} c={c} onFallback={forceGallery} />
    </Suspense>
  );
}
