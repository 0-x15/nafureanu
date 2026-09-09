import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import CrmServiceNav from "./CrmServiceNav";
import CrmServiceHero from "./CrmServiceHero";
import CrmServiceOperation from "./CrmServiceOperation";
import CrmServiceSystem from "./CrmServiceSystem";
import CrmServiceProperties from "./CrmServiceProperties";
import CrmServiceProspecting from "./CrmServiceProspecting";
import CrmServiceClients from "./CrmServiceClients";
import CrmServiceLeads from "./CrmServiceLeads";
import CrmServiceMatching from "./CrmServiceMatching";
import CrmServiceVisits from "./CrmServiceVisits";
import CrmServiceOperations from "./CrmServiceOperations";
import CrmServiceDocuments from "./CrmServiceDocuments";
import CrmServiceCommunication from "./CrmServiceCommunication";
import CrmServiceAgenda from "./CrmServiceAgenda";
import CrmServiceAutomation from "./CrmServiceAutomation";
import CrmServiceAI from "./CrmServiceAI";
import CrmServiceIntegrations from "./CrmServiceIntegrations";
import CrmServiceManagement from "./CrmServiceManagement";
import CrmServiceComparison from "./CrmServiceComparison";
import CrmServiceTechnology from "./CrmServiceTechnology";
import CrmServiceProof from "./CrmServiceProof";
import CrmServiceFit from "./CrmServiceFit";
import CrmServiceScope from "./CrmServiceScope";
import CrmServiceProcess from "./CrmServiceProcess";
import CrmServiceCta from "./CrmServiceCta";

/**
 * Custom real-estate CRM — the service page as a complete product
 * experience. Every chapter follows the same hierarchy: business
 * problem → system response → visual → why it matters. Everything
 * described exists in the system already built; the proof chapter is
 * the only place where that system is named as a project.
 */
export default function CrmRealEstateService({ lang = "es", service }) {
  const c = STRINGS[lang].crmService;
  const project = PROJECTS.find((p) => p.slug === service.project);
  const proofPath = langPath(lang, `/work/${project ? projectSlug(project, lang) : service.project}`);
  return (
    <article className="pt-24 md:pt-28">
      <CrmServiceHero lang={lang} c={c} proofPath={proofPath} />
      <CrmServiceNav items={c.nav.items} label={c.nav.label} />
      <CrmServiceOperation c={c} />
      <CrmServiceSystem c={c} />
      <CrmServiceProperties c={c} />
      <CrmServiceProspecting c={c} />
      <CrmServiceClients c={c} />
      <CrmServiceLeads c={c} />
      <CrmServiceMatching lang={lang} c={c} />
      <CrmServiceVisits c={c} />
      <CrmServiceOperations c={c} />
      <CrmServiceDocuments c={c} />
      <CrmServiceCommunication c={c} />
      <CrmServiceAgenda c={c} />
      <CrmServiceAutomation c={c} />
      <CrmServiceAI c={c} />
      <CrmServiceIntegrations c={c} />
      <CrmServiceManagement c={c} />
      <CrmServiceComparison c={c} />
      <CrmServiceTechnology c={c} />
      <CrmServiceProof lang={lang} c={c} proofPath={proofPath} />
      <CrmServiceFit c={c} />
      <CrmServiceScope c={c} />
      <CrmServiceProcess c={c} />
      <CrmServiceCta lang={lang} c={c} proofPath={proofPath} />
    </article>
  );
}
