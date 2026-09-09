import { STRINGS, langPath } from "@/i18n";
import { PROJECTS, projectSlug } from "@/data/projects";
import ProductProgress from "./ProductProgress";
import ProductHero from "./ProductHero";
import ProductDefinition from "./ProductDefinition";
import ProductStudio from "./ProductStudio";
import ProductShell from "./ProductShell";
import ProductAfterLaunch from "./ProductAfterLaunch";
import ProductProof from "./ProductProof";
import ProductCollaboration from "./ProductCollaboration";
import ProductCta from "./ProductCta";

const workPath = (lang, slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : slug}`);
};

const PROGRESS = { idea: ["sp-hero", "sp-definition"], product: ["sp-studio"], build: ["sp-shell"], launch: ["sp-launch"], evolve: ["sp-proof", "sp-collab", "sp-cta"] };

/**
 * SaaS & digital products — eight acts, one product gaining definition:
 * an idea, the decision of what deserves to exist, the studio where a
 * fictional product forms, the shell behind the interface, what changes
 * after launch, two real products, the shared table, and the door.
 */
export default function SaasProductService({ lang = "es" }) {
  const c = STRINGS[lang].saasProductService;
  const paths = { fivo: workPath(lang, "fivo"), lifeAdmin: workPath(lang, "life-admin"), web: workPath(lang, "web-projects") };
  return (
    <article className="pt-24 md:pt-28">
      <ProductProgress items={c.progress.items} map={PROGRESS} label={c.progress.label} />
      <ProductHero lang={lang} c={c} proofPath="#sp-proof" />
      <ProductDefinition c={c} />
      <ProductStudio c={c} />
      <ProductShell c={c} />
      <ProductAfterLaunch c={c} />
      <ProductProof lang={lang} c={c} paths={paths} />
      <ProductCollaboration c={c} />
      <ProductCta lang={lang} c={c} />
    </article>
  );
}
