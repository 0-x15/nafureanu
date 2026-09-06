import { useEffect } from "react";
import { STRINGS } from "@/i18n";
import BackToProjects from "@/components/work/BackToProjects";
import LifeAdminHero from "./LifeAdminHero";
import LifeAdminProblem from "./LifeAdminProblem";
import LifeAdminSystem from "./LifeAdminSystem";
import LifeAdminWorkflow from "./LifeAdminWorkflow";
import LifeAdminAutomation from "./LifeAdminAutomation";
import LifeAdminProductSurfaces from "./LifeAdminProductSurfaces";
import LifeAdminPlatform from "./LifeAdminPlatform";
import LifeAdminArchitecture from "./LifeAdminArchitecture";
import LifeAdminFinalCta from "./LifeAdminFinalCta";

const FRAUNCES = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap";

/**
 * Life Admin case-study page — a personal-administration product
 * designed around one workflow (document → structured obligation →
 * derived cycles → honest payment state), built on Base44. Chapters:
 * hero, the problem, what it centralises, the core workflow with a
 * micro-demo of the real payment-state logic, automation, product
 * surfaces, platform vs product, architecture and the final CTA.
 * Page metadata comes from CaseStudy.jsx (lifeAdmin.meta). Fraunces,
 * the product's display serif, is loaded only while this page is
 * mounted.
 */
export default function LifeAdminCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].lifeAdmin;

  useEffect(() => {
    if (document.querySelector(`link[href="${FRAUNCES}"]`)) return undefined;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FRAUNCES;
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return (
    <article className="bg-background">
      <div className="px-5 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <BackToProjects lang={lang} />
        </div>
      </div>
      <LifeAdminHero lang={lang} c={c} />
      <LifeAdminProblem c={c} />
      <LifeAdminSystem c={c} />
      <LifeAdminWorkflow c={c} />
      <LifeAdminAutomation c={c} />
      <LifeAdminProductSurfaces lang={lang} c={c} />
      <LifeAdminPlatform c={c} />
      <LifeAdminArchitecture c={c} />
      <LifeAdminFinalCta lang={lang} c={c} />
    </article>
  );
}
