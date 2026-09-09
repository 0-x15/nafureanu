import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import { SERVICES, servicePath } from "@/data/services";
import ServiceNav from "../shared/ServiceNav";
import BsHero from "./BsHero";
import BsFit from "./BsFit";
import BsAnatomy from "./BsAnatomy";
import BsModel from "./BsModel";
import BsCrm from "./BsCrm";
import BsOperations from "./BsOperations";
import BsStates from "./BsStates";
import BsAutomation from "./BsAutomation";
import BsDocuments from "./BsDocuments";
import BsCommunication from "./BsCommunication";
import BsPermissions from "./BsPermissions";
import BsIntegrations from "./BsIntegrations";
import BsVisibility from "./BsVisibility";
import BsAI from "./BsAI";
import BsScopes from "./BsScopes";
import BsComparison from "./BsComparison";
import BsTechnology from "./BsTechnology";
import BsProof from "./BsProof";
import BsWhen from "./BsWhen";
import BsResponsibility from "./BsResponsibility";
import BsStart from "./BsStart";
import BsProcess from "./BsProcess";
import BsCta from "./BsCta";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/**
 * Custom CRM & business systems — the service page: a business being
 * modelled into software. Every chapter has its own visual reason to
 * exist; the only real system named is the real-estate CRM (proof), and
 * every other interface is a clearly fictional example of a pattern.
 */
export default function BusinessSystemsService({ lang = "es", service }) {
  const c = STRINGS[lang].businessSystemsService;
  const crmService = SERVICES.find((s) => s.id === "crm-real-estate");
  const proofPath = crmService ? servicePath(crmService, lang) : workPath(lang, service.project);
  const casePath = workPath(lang, service.project);
  const lifeAdminPath = workPath(lang, "life-admin");
  return (
    <article className="pt-24 md:pt-28">
      <BsHero lang={lang} c={c} proofPath={proofPath} />
      <ServiceNav items={c.nav.items} label={c.nav.label} />
      <BsFit c={c} />
      <BsAnatomy c={c} />
      <BsModel c={c} />
      <BsCrm c={c} />
      <BsOperations c={c} />
      <BsStates c={c} />
      <BsAutomation c={c} />
      <BsDocuments c={c} />
      <BsCommunication c={c} />
      <BsPermissions c={c} />
      <BsIntegrations c={c} />
      <BsVisibility c={c} />
      <BsAI c={c} />
      <BsScopes c={c} />
      <BsComparison c={c} />
      <BsTechnology c={c} />
      <BsProof c={c} servicePath={proofPath} casePath={casePath} lifeAdminPath={lifeAdminPath} />
      <BsWhen c={c} />
      <BsResponsibility c={c} />
      <BsStart lang={lang} c={c} />
      <BsProcess c={c} />
      <BsCta lang={lang} c={c} proofPath={proofPath} />
    </article>
  );
}
