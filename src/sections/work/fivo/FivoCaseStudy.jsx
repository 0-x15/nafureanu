import { STRINGS } from "@/i18n";
import BackToProjects from "@/components/work/BackToProjects";
import FivoCaseHero from "./FivoCaseHero";
import FivoProblem from "./FivoProblem";
import FivoIntegration from "./FivoIntegration";
import FivoCheckoutFlow from "./FivoCheckoutFlow";
import FivoCrossChain from "./FivoCrossChain";
import FivoNetworks from "./FivoNetworks";
import FivoMerchantPlatform from "./FivoMerchantPlatform";
import FivoOperations from "./FivoOperations";
import FivoDeveloper from "./FivoDeveloper";
import FivoSecurity from "./FivoSecurity";
import FivoCircle from "./FivoCircle";
import FivoEngineering from "./FivoEngineering";
import FivoProductSurfaces from "./FivoProductSurfaces";
import FivoFinalCta from "./FivoFinalCta";

/**
 * Fivo case-study page — a software engineering case study for a
 * stablecoin payment product, in three movements: what Fivo is
 * (hero, problem), how it works (integration, customer flow,
 * cross-chain, networks, merchant platform, operations) and what was
 * engineered (developer infrastructure, security, Circle, engineering,
 * real surfaces), closing on Nafureanu's offer. Every claim on this
 * page was verified against the platform repository. Page metadata
 * (title, description, canonical, alternate) is set by CaseStudy.jsx
 * from fivo.meta.
 */
export default function FivoCaseStudy({ lang = "es" }) {
  const c = STRINGS[lang].fivo;

  return (
    <article className="bg-background">
      <div className="px-5 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <BackToProjects lang={lang} />
        </div>
      </div>
      <FivoCaseHero lang={lang} c={c} />
      <FivoProblem c={c} />
      <FivoIntegration c={c} />
      <FivoCheckoutFlow c={c} />
      <FivoCrossChain c={c} />
      <FivoNetworks c={c} />
      <FivoMerchantPlatform c={c} />
      <FivoOperations c={c} />
      <FivoDeveloper c={c} />
      <FivoSecurity c={c} />
      <FivoCircle c={c} />
      <FivoEngineering c={c} />
      <FivoProductSurfaces c={c} />
      <FivoFinalCta lang={lang} c={c} />
    </article>
  );
}
