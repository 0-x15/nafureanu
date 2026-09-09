import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import TraceSpine from "./TraceSpine";
import IntegrationHero from "./IntegrationHero";
import HumanBridge from "./HumanBridge";
import IntegrationTrace from "./IntegrationTrace";
import FailureLab from "./FailureLab";
import ApiContract from "./ApiContract";
import ExistingStack from "./ExistingStack";
import IntegrationProof from "./IntegrationProof";
import IntegrationDiagnostic from "./IntegrationDiagnostic";
import IntegrationCta from "./IntegrationCta";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

/* Which state of the travelling data each act shows; drives the trace spine. */
const SPINE = { manual: ["in-hero", "in-bridge"], transit: ["in-trace"], retry: ["in-failure"], contract: ["in-contract"], connected: ["in-stack"], delivered: ["in-proof", "in-diagnostic", "in-cta"] };

/**
 * Integrations & APIs — the journey of one piece of data between systems.
 * Eight acts: the person in the middle, the human integration, the live
 * trace, what happens when it fails, the API as a contract, keeping the
 * stack, two real traces, the diagnostic, and the door.
 */
export default function IntegrationsApiService({ lang = "es" }) {
  const c = STRINGS[lang].integrationsApiService;
  const paths = { fivo: workPath(lang, "fivo"), crm: workPath(lang, "crm-inmobiliario") };
  return (
    <article id="in-article" className="pt-24 md:pt-28">
      <TraceSpine c={c.spine} map={SPINE} articleId="in-article" />
      <IntegrationHero lang={lang} c={c} proofPath="#in-proof" />
      <HumanBridge c={c} />
      <IntegrationTrace c={c} />
      <FailureLab c={c} />
      <ApiContract c={c} />
      <ExistingStack c={c} />
      <IntegrationProof c={c} paths={paths} />
      <IntegrationDiagnostic c={c} />
      <IntegrationCta lang={lang} c={c} />
    </article>
  );
}
