import { useEffect } from "react";
import { STRINGS, otherLang, pick } from "@/i18n";
import { SITE } from "@/data/site";
import { matchRoute } from "@/data/routes";

/**
 * The SEO model of a page — one function resolves a public route and a
 * language into everything the <head> needs. The build-time prerender
 * serialises it with `headHtml`; the browser applies the same object with
 * `applyHead` on every client-side navigation. There is no second copy.
 */
export const DOMAIN = "https://nafureanu.com";
const OG_LOCALE = { es: "es_ES", en: "en_GB" };
/* Case studies with their own metadata block in i18n; the rest derive it from PROJECTS. */
const CASE_META = { fivo: "fivo", "life-admin": "lifeAdmin", "web-projects": "webProjects" };

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
    case "service": return s[route.service.strings].meta;
    case "case-study": {
      const key = CASE_META[route.project.slug];
      if (key && s[key]?.meta) return s[key].meta;
      return { title: `${pick(route.project.title, lang)} — Nafureanu`, description: route.project.copy?.[lang]?.summary || s.meta.work.description };
    }
    default: return s.meta.home;
  }
}

/* The organisation as it is stated on the site today; only the home page carries it in this phase. */
function organization(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    name: SITE.name,
    url: `${DOMAIN}/`,
    logo: `${DOMAIN}/icon-512.png`,
    slogan: SITE.tagline[lang],
    description: SITE.description[lang],
  };
}

/** @returns {PageSeo} */
export function seoFor(route, lang) {
  const { title, description } = copyFor(route, lang);
  const path = route.paths[lang];
  return {
    lang,
    type: route.type,
    id: route.id,
    title,
    description,
    path,
    alternatePath: route.paths[otherLang(lang)],
    canonical: DOMAIN + path,
    alternates: { es: DOMAIN + route.paths.es, en: DOMAIN + route.paths.en, xDefault: DOMAIN + route.paths.es },
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlternate: OG_LOCALE[otherLang(lang)],
    robots: null,
    jsonLd: route.type === "home" ? organization(lang) : null,
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
