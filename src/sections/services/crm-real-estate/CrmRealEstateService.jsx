import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import CrmServiceHero from "./CrmServiceHero";
import CrmServiceProblems from "./CrmServiceProblems";
import CrmServiceSystem from "./CrmServiceSystem";
import CrmServiceAutomation from "./CrmServiceAutomation";
import CrmServiceMatching from "./CrmServiceMatching";
import CrmServiceIntegrations from "./CrmServiceIntegrations";
import CrmServiceArchitecture from "./CrmServiceArchitecture";
import CrmServiceProof from "./CrmServiceProof";
import CrmServiceFit from "./CrmServiceFit";
import CrmServiceScope from "./CrmServiceScope";
import CrmServiceProcess from "./CrmServiceProcess";
import CrmServiceCta from "./CrmServiceCta";

/**
 * Custom real-estate CRM — the service page. Commercial, not a case
 * study: why a real-estate company may need a custom CRM, what it can
 * solve, what we can build, how it adapts, why we are credible (the
 * real project, clearly separated from the claims) and the next step.
 */
export default function CrmRealEstateService({ lang = "es", service }) {
  const c = STRINGS[lang].crmService;
  const project = PROJECTS.find((p) => p.slug === service.project);
  const proofPath = langPath(lang, `/work/${project ? projectSlug(project, lang) : service.project}`);
  return (
    <article className="bg-background pt-24 md:pt-28">
      <CrmServiceHero lang={lang} c={c} proofPath={proofPath} />
      <CrmServiceProblems c={c} />
      <CrmServiceSystem c={c} />
      <CrmServiceAutomation c={c} />
      <CrmServiceMatching lang={lang} c={c} />
      <CrmServiceIntegrations c={c} />
      <CrmServiceArchitecture c={c} />
      <CrmServiceProof lang={lang} c={c} proofPath={proofPath} />
      <CrmServiceFit c={c} />
      <CrmServiceScope c={c} />
      <CrmServiceProcess c={c} />
      <CrmServiceCta lang={lang} c={c} proofPath={proofPath} />
    </article>
  );
}
