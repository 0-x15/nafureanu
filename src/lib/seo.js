import { useEffect } from "react";
import { STRINGS, langPath, otherLang, pick } from "@/i18n";
import { SITE } from "@/data/site";
import { matchRoute } from "@/data/routes";

/**
 * The SEO model of a page — one function resolves a public route and a
 * language into everything the <head> needs. The build-time prerender
 * serialises it with `headHtml`; the browser applies the same object with
 * `applyHead` on every client-side navigation. There is no second copy.
 * The JSON-LD graph (organisation, website, page, breadcrumb and, on the
 * seven service pages, the service) comes from the same model.
 */
export const DOMAIN = "https://nafureanu.com";
const OG_LOCALE = { es: "es_ES", en: "en_GB" };
/**
 * @typedef {{ lang: string, type: string, id: string, title: string, description: string, path: string | null, alternatePath: string | null, canonical: string | null, alternates: { es: string, en: string, xDefault: string } | null, ogLocale: string, ogLocaleAlternate: string, robots: string | null, jsonLd: Record<string, any> | null }} PageSeo
 */

function copyFor(route, lang) {
  const s = STRINGS[lang];
  switch (route.type) {
    case "home": return s.meta.home;
    case "services-index": return s.meta.services;
    case "work-index": return s.meta.work;
    case "about": return s.meta.about;
    case "contact": return s.meta.contact;
    case "service": return s.meta[route.service.strings];
    case "case-study": {
      /* case studies with their own copy block carry their metadata in meta.<block>; the rest derive it from PROJECTS */
      const key = route.project.strings;
      if (key && s.meta[key]) return s.meta[key];
      return { title: `${pick(route.project.title, lang)} — ${lang === "en" ? "Projects" : "Proyectos"} · Nafureanu`, description: route.project.copy?.[lang]?.summary || s.meta.work.description };
    }
    default: return s.meta.home;
  }
}

/* --- structured data: one @graph per page, from the same model ------------ */

const ORG_ID = `${DOMAIN}/#organization`;
const SITE_ID = `${DOMAIN}/#website`;
const PAGE_TYPE = { home: "WebPage", "services-index": "CollectionPage", "work-index": "CollectionPage", service: "WebPage", "case-study": "WebPage", about: "AboutPage", contact: "ContactPage" };

/* The organisation as it is stated on the site: name, site, logo, slogan and description. The home page carries the full node; other pages only reference it. */
function organizationNode(lang, full) {
  const node = { "@type": "Organization", "@id": ORG_ID, name: SITE.name, url: `${DOMAIN}/` };
  if (full) Object.assign(node, { logo: `${DOMAIN}/icon-512.png`, slogan: SITE.tagline[lang], description: SITE.description[lang] });
  return node;
}

const websiteNode = () => ({ "@type": "WebSite", "@id": SITE_ID, url: `${DOMAIN}/`, name: SITE.name, publisher: { "@id": ORG_ID }, inLanguage: ["es", "en"] });

/* The real hierarchy of the site, in the page's language and with canonical URLs. */
function breadcrumbNode(route, lang, canonical) {
  const s = STRINGS[lang];
  const home = { name: s.nav.home, url: DOMAIN + langPath(lang, "/") };
  const trails = {
    "services-index": [home, { name: s.nav.services, url: canonical }],
    service: [home, { name: s.nav.services, url: DOMAIN + langPath(lang, "/services") }, { name: s.servicesPage.names[route.id], url: canonical }],
    "work-index": [home, { name: s.nav.work, url: canonical }],
    "case-study": [home, { name: s.nav.work, url: DOMAIN + langPath(lang, "/work") }, { name: route.project ? pick(route.project.title, lang) : route.id, url: canonical }],
    about: [home, { name: s.nav.about, url: canonical }],
    contact: [home, { name: s.contact.kicker, url: canonical }],
  };
  const trail = trails[route.type];
  if (!trail) return null;
  return { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: trail.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) };
}

function graphFor(route, lang, { title, description, canonical }) {
  const s = STRINGS[lang];
  const breadcrumb = breadcrumbNode(route, lang, canonical);
  const service = route.type === "service"
    ? { "@type": "Service", "@id": `${canonical}#service`, name: s.servicesPage.names[route.id], description, url: canonical, provider: { "@id": ORG_ID }, mainEntityOfPage: { "@id": `${canonical}#webpage` } }
    : null;
  const page = {
    "@type": PAGE_TYPE[route.type] || "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { "@id": SITE_ID },
    ...(route.type === "home" ? { about: { "@id": ORG_ID } } : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
    ...(service ? { mainEntity: { "@id": service["@id"] } } : {}),
  };
  return { "@context": "https://schema.org", "@graph": [organizationNode(lang, route.type === "home"), websiteNode(), page, ...(breadcrumb ? [breadcrumb] : []), ...(service ? [service] : [])] };
}

/** @returns {PageSeo} */
export function seoFor(route, lang) {
  const { title, description } = copyFor(route, lang);
  const path = route.paths[lang];
  const canonical = DOMAIN + path;
  return {
    lang,
    type: route.type,
    id: route.id,
    title,
    description,
    path,
    alternatePath: route.paths[otherLang(lang)],
    canonical,
    alternates: { es: DOMAIN + route.paths.es, en: DOMAIN + route.paths.en, xDefault: DOMAIN + route.paths.es },
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlternate: OG_LOCALE[otherLang(lang)],
    robots: null,
    jsonLd: graphFor(route, lang, { title, description, canonical }),
  };
}

/** @returns {PageSeo | null} */
export function seoForPath(pathname) {
  const match = matchRoute(pathname);
  return match ? seoFor(match.route, match.lang) : null;
}

/** @returns {PageSeo} */
export function notFoundSeo(lang = "es") {
  return {
    lang,
    type: "not-found",
    id: "not-found",
    title: lang === "en" ? "Page not found — Nafureanu" : "Página no encontrada — Nafureanu",
    description: "",
    path: null,
    alternatePath: null,
    canonical: null,
    alternates: null,
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlternate: OG_LOCALE[otherLang(lang)],
    robots: "noindex",
    jsonLd: null,
  };
}

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The <head> tags of a page as HTML, for the build-time prerender. */
export function headHtml(seo) {
  const tags = [`<title>${esc(seo.title)}</title>`];
  if (seo.description) tags.push(`<meta name="description" content="${esc(seo.description)}" />`);
  if (seo.robots) tags.push(`<meta name="robots" content="${esc(seo.robots)}" />`);
  if (seo.canonical && seo.alternates) {
    tags.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`);
    tags.push(`<link rel="alternate" hreflang="es" href="${esc(seo.alternates.es)}" />`);
    tags.push(`<link rel="alternate" hreflang="en" href="${esc(seo.alternates.en)}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(seo.alternates.xDefault)}" />`);
    tags.push(`<meta property="og:url" content="${esc(seo.canonical)}" />`);
  }
  tags.push(`<meta property="og:title" content="${esc(seo.title)}" />`);
  if (seo.description) tags.push(`<meta property="og:description" content="${esc(seo.description)}" />`);
  tags.push(`<meta property="og:locale" content="${esc(seo.ogLocale)}" />`);
  tags.push(`<meta property="og:locale:alternate" content="${esc(seo.ogLocaleAlternate)}" />`);
  tags.push(`<meta name="twitter:title" content="${esc(seo.title)}" />`);
  if (seo.description) tags.push(`<meta name="twitter:description" content="${esc(seo.description)}" />`);
  if (seo.jsonLd) tags.push(`<script type="application/ld+json" data-page="">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`);
  return tags.join("\n    ");
}

/* --- browser side: update the same tags on navigation ------------------- */

function setMeta(attr, key, content) {
  const head = document.head;
  let el = head.querySelector(`meta[${attr}="${key}"]`);
  if (content == null || content === "") {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href, hreflang) {
  const head = document.head;
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = head.querySelector(selector);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Applies a page's SEO model to document.head, updating the prerendered tags in place. */
export function applyHead(seo) {
  document.documentElement.lang = seo.lang;
  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta("name", "robots", seo.robots);
  setLink("canonical", seo.canonical);
  setLink("alternate", seo.alternates?.es ?? null, "es");
  setLink("alternate", seo.alternates?.en ?? null, "en");
  setLink("alternate", seo.alternates?.xDefault ?? null, "x-default");
  setMeta("property", "og:url", seo.canonical);
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:locale", seo.ogLocale);
  setMeta("property", "og:locale:alternate", seo.ogLocaleAlternate);
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  document.head.querySelectorAll('script[type="application/ld+json"][data-page]').forEach((el) => el.remove());
  if (seo.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page", "");
    script.textContent = JSON.stringify(seo.jsonLd);
    document.head.appendChild(script);
  }
}

/** Keeps document.head in sync with the page's SEO model. */
export function usePageMeta(seo) {
  useEffect(() => {
    if (seo) applyHead(seo);
  }, [seo]);
}
