import { langPath } from "@/i18n";

/**
 * Dedicated service pages. Slugs differ per language, so paths must be
 * built through `servicePath` — never with a naive langPath of the
 * Spanish slug. `project` points at the case study that proves the
 * service; `strings` names the i18n namespace with the page copy.
 */
export const SERVICES = [
  {
    id: "crm-real-estate",
    slug: { es: "crm-inmobiliario", en: "real-estate-crm" },
    project: "crm-inmobiliario",
    strings: "crmService",
  },
  {
    id: "business-systems",
    slug: { es: "crm-sistemas-gestion", en: "custom-crm-business-systems" },
    project: "crm-inmobiliario",
    strings: "businessSystemsService",
  },
  {
    id: "custom-software",
    slug: { es: "software-a-medida", en: "custom-software" },
    project: "crm-inmobiliario",
    strings: "customSoftwareService",
  },
  {
    id: "ai-automation",
    slug: { es: "ia-automatizacion", en: "ai-automation" },
    project: "crm-inmobiliario",
    strings: "aiAutomationService",
  },
  {
    id: "saas",
    slug: { es: "saas-productos-digitales", en: "saas-digital-products" },
    project: "fivo",
    strings: "saasProductService",
  },
];

export const findService = (slug) => SERVICES.find((s) => s.slug.es === slug || s.slug.en === slug);

export const serviceSlug = (service, lang) => service.slug[lang] || service.slug.es;

export const servicePath = (service, lang) => langPath(lang, `/services/${serviceSlug(service, lang)}`);
