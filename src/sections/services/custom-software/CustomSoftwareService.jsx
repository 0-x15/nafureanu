import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import ServiceNav from "../shared/ServiceNav";
import CsHero from "./CsHero";
import CsDecide from "./CsDecide";
import CsGap from "./CsGap";
import CsAnatomy from "./CsAnatomy";
import CsBuild from "./CsBuild";
import CsBeneath from "./CsBeneath";
import CsPatterns from "./CsPatterns";
import CsLogic from "./CsLogic";
import CsStates from "./CsStates";
import CsAutomation from "./CsAutomation";
import CsAI from "./CsAI";
import CsIntegrations from "./CsIntegrations";
import CsStart from "./CsStart";
import CsArchitecture from "./CsArchitecture";
import CsQuality from "./CsQuality";
import CsProof from "./CsProof";
import CsRequest from "./CsRequest";
import CsDiscovery from "./CsDiscovery";
import CsResponsibility from "./CsResponsibility";
import CsProcess from "./CsProcess";
import CsFit from "./CsFit";
import CsCta from "./CsCta";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/**
 * Custom software — the service page: from ambiguity to working
 * software. Real proof is limited to three systems we built (each with
 * figures verified in its repository); every other surface is a clearly
 * fictional pattern.
 */
export default function CustomSoftwareService({ lang = "es" }) {
  const c = STRINGS[lang].customSoftwareService;
  const paths = { crm: workPath(lang, "crm-inmobiliario"), lifeAdmin: workPath(lang, "life-admin"), fivo: workPath(lang, "fivo") };
  return (
    <article className="bg-background pt-24 md:pt-28">
      <CsHero lang={lang} c={c} proofPath={langPath(lang, "/work")} />
      <ServiceNav items={c.nav.items} label={c.nav.label} />
      <CsDecide c={c} />
      <CsGap c={c} />
      <CsAnatomy c={c} />
      <CsBuild c={c} />
      <CsBeneath c={c} />
      <CsPatterns c={c} />
      <CsLogic c={c} />
      <CsStates c={c} />
      <CsAutomation c={c} />
      <CsAI c={c} />
      <CsIntegrations c={c} />
      <CsStart c={c} />
      <CsArchitecture c={c} />
      <CsQuality c={c} />
      <CsProof lang={lang} c={c} paths={paths} />
      <CsRequest c={c} />
      <CsDiscovery lang={lang} c={c} />
      <CsResponsibility c={c} />
      <CsProcess c={c} />
      <CsFit c={c} />
      <CsCta lang={lang} c={c} />
    </article>
  );
}
