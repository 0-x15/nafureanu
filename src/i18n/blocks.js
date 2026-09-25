/**
 * The copy of the pages that load on demand — the seven service pages and
 * the four case studies — kept out of the core dictionaries (es.js, en.js)
 * so the initial bundle only carries what every page needs. Each block is
 * one module per language, fetched alongside the page's own chunk; once
 * loaded it is read synchronously. While it loads, the component suspends
 * behind the route's Suspense boundary (during hydration the prerendered
 * HTML simply stays on screen). Page metadata (title, description) stays
 * in the core `meta` object, where the SEO model needs it.
 */
const LOADERS = {
  es: {
    crm: () => import("./es/crm.js"),
    fivo: () => import("./es/fivo.js"),
    lifeAdmin: () => import("./es/lifeAdmin.js"),
    webProjects: () => import("./es/webProjects.js"),
    crmService: () => import("./es/crmService.js"),
    businessSystemsService: () => import("./es/businessSystemsService.js"),
    customSoftwareService: () => import("./es/customSoftwareService.js"),
    aiAutomationService: () => import("./es/aiAutomationService.js"),
    saasProductService: () => import("./es/saasProductService.js"),
    integrationsApiService: () => import("./es/integrationsApiService.js"),
    webDigitalService: () => import("./es/webDigitalService.js"),
  },
  en: {
    crm: () => import("./en/crm.js"),
    fivo: () => import("./en/fivo.js"),
    lifeAdmin: () => import("./en/lifeAdmin.js"),
    webProjects: () => import("./en/webProjects.js"),
    crmService: () => import("./en/crmService.js"),
    businessSystemsService: () => import("./en/businessSystemsService.js"),
    customSoftwareService: () => import("./en/customSoftwareService.js"),
    aiAutomationService: () => import("./en/aiAutomationService.js"),
    saasProductService: () => import("./en/saasProductService.js"),
    integrationsApiService: () => import("./en/integrationsApiService.js"),
    webDigitalService: () => import("./en/webDigitalService.js"),
  },
};

const loaded = new Map();
const pending = new Map();
const failed = new Map();

/** Starts loading one block (idempotent) and resolves with its object. */
export function loadBlock(lang, key) {
  const id = `${lang}/${key}`;
  if (loaded.has(id)) return Promise.resolve(loaded.get(id));
  if (!pending.has(id)) {
    const loader = LOADERS[lang]?.[key];
    if (!loader) throw new Error(`i18n: unknown block ${id}`);
    pending.set(
      id,
      loader().then(
        (mod) => { loaded.set(id, mod.default); pending.delete(id); return mod.default; },
        (err) => { pending.delete(id); failed.set(id, err); throw err; }
      )
    );
  }
  return pending.get(id);
}

/** The block, synchronously; suspends the component until it has loaded. */
export function useBlock(lang, key) {
  const id = `${lang}/${key}`;
  if (loaded.has(id)) return loaded.get(id);
  if (failed.has(id)) { const err = failed.get(id); failed.delete(id); throw err; }
  throw loadBlock(lang, key);
}
