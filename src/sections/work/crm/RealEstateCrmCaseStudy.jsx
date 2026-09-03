import { STRINGS } from "@/i18n";
import CrmHero from "./CrmHero";
import CrmProblem from "./CrmProblem";
import CrmFlow from "./CrmFlow";
import CrmAutomation from "./CrmAutomation";
import CrmMatching from "./CrmMatching";
import CrmDocuments from "./CrmDocuments";
import CrmOperations from "./CrmOperations";
import CrmIntegrations from "./CrmIntegrations";
import CrmAi from "./CrmAi";
import CrmOdoo from "./CrmOdoo";
import CrmGallery from "./CrmGallery";
import CrmCta from "./CrmCta";

/**
 * The dedicated case study for the custom real-estate CRM — a
 * narrative built around business problems and outcomes, not
 * technical documentation. Confidential by design: no client
 * names, no private interfaces, no unverified metrics.
 */
export default function RealEstateCrmCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].crm;

  return (
    <article className="bg-background">
      <CrmHero lang={lang} c={c} />
      <CrmProblem c={c} />
      <CrmFlow c={c} />
      <CrmAutomation c={c} />
      <CrmMatching c={c} />
      <CrmDocuments c={c} />
      <CrmOperations c={c} />
      <CrmIntegrations c={c} />
      <CrmAi c={c} />
      <CrmOdoo c={c} />
      <CrmGallery c={c} />
      <CrmCta lang={lang} c={c} />
    </article>
  );
}