import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import { SERVICES, servicePath } from "@/data/services";
import ServiceNav from "../shared/ServiceNav";
import AiHero from "./AiHero";
import AiFit from "./AiFit";
import AiRoles from "./AiRoles";
import AiAnatomy from "./AiAnatomy";
import AiManual from "./AiManual";
import AiDocuments from "./AiDocuments";
import AiMessages from "./AiMessages";
import AiAssistants from "./AiAssistants";
import AiAgents from "./AiAgents";
import AiWorkflow from "./AiWorkflow";
import AiFollowup from "./AiFollowup";
import AiIntegrations from "./AiIntegrations";
import AiControl from "./AiControl";
import AiExceptions from "./AiExceptions";
import AiReliability from "./AiReliability";
import AiPermissions from "./AiPermissions";
import AiModels from "./AiModels";
import AiNotAi from "./AiNotAi";
import AiProof from "./AiProof";
import AiExplorer from "./AiExplorer";
import AiDiscovery from "./AiDiscovery";
import AiScopes from "./AiScopes";
import AiImpact from "./AiImpact";
import AiDeliver from "./AiDeliver";
import AiProcess from "./AiProcess";
import AiWho from "./AiWho";
import AiCta from "./AiCta";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/**
 * AI & automation — the service page: work in motion. Work enters,
 * gets understood, decided and executed by rules, AI or a person, with
 * control, exceptions and a trail. Real proof is limited to three
 * systems we built; every other surface is a labelled pattern.
 */
export default function AiAutomationService({ lang = "es" }) {
  const c = STRINGS[lang].aiAutomationService;
  const paths = { crm: workPath(lang, "crm-inmobiliario"), lifeAdmin: workPath(lang, "life-admin"), fivo: workPath(lang, "fivo") };
  const self = SERVICES.find((s) => s.id === "ai-automation");
  const proofPath = `${self ? servicePath(self, lang) : langPath(lang, "/services")}#ai-proof`;
  return (
    <article className="bg-background pt-24 md:pt-28">
      <AiHero lang={lang} c={c} proofPath={proofPath} />
      <ServiceNav items={c.nav.items} label={c.nav.label} />
      <AiFit c={c} />
      <AiRoles c={c} />
      <AiAnatomy c={c} />
      <AiManual c={c} />
      <AiDocuments c={c} />
      <AiMessages c={c} />
      <AiAssistants c={c} />
      <AiAgents c={c} />
      <AiWorkflow c={c} />
      <AiFollowup c={c} />
      <AiIntegrations c={c} />
      <AiControl c={c} />
      <AiExceptions c={c} />
      <AiReliability c={c} />
      <AiPermissions c={c} />
      <AiModels c={c} />
      <AiNotAi c={c} />
      <AiProof c={c} paths={paths} />
      <AiExplorer lang={lang} c={c} />
      <AiDiscovery c={c} />
      <AiScopes c={c} />
      <AiImpact c={c} />
      <AiDeliver c={c} />
      <AiProcess c={c} />
      <AiWho c={c} />
      <AiCta lang={lang} c={c} proofPath={proofPath} />
    </article>
  );
}
