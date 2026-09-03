import { STRINGS } from "@/i18n";
import BackToProjects from "@/components/work/BackToProjects";
import CrmCaseHero from "./CrmCaseHero";
import CrmProblem from "./CrmProblem";
import CrmCentralizes from "./CrmCentralizes";
import CrmAutomation from "./CrmAutomation";
import CrmMatching from "./CrmMatching";
import CrmIntegrations from "./CrmIntegrations";
import CrmOdoo from "./CrmOdoo";
import CrmGallery from "./CrmGallery";
import CrmFinalCta from "./CrmFinalCta";

/**
 * CRM case-study page — a corporate product page in eight scannable
 * movements: qué resuelve, qué centraliza, automatizaciones,
 * matching, integraciones, Odoo a medida, superficies del sistema
 * and a light final CTA. Back navigation sits at the very top.
 */
export default function CrmCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].crm;

  return (
    <article className="bg-background">
      <div className="px-5 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <BackToProjects lang={lang} />
        </div>
      </div>

      <CrmCaseHero lang={lang} c={c} />
      <CrmProblem c={c} />
      <CrmCentralizes c={c} />
      <CrmAutomation c={c} />
      <CrmMatching c={c} />
      <CrmIntegrations c={c} />
      <CrmOdoo c={c} />
      <CrmGallery c={c} />
      <CrmFinalCta lang={lang} c={c} />
    </article>
  );
}