import { langPath, otherLang } from "@/i18n";
import { SERVICES, servicePath } from "./services";
import { PROJECTS, projectSlug } from "./projects";

/**
 * The public route manifest — the one model behind prerendering, the
 * language switch, hreflang pairs and the generated redirects (and, later,
 * the sitemap). It is derived from the existing sources of truth: the
 * static pages, SERVICES and PROJECTS. Nothing here lists a URL by hand.
 * @typedef {{ type: string, id: string, paths: { es: string, en: string }, service?: any, project?: any }} PublicRoute
 */
export const LANGS = ["es", "en"];

const STATIC = [
  ["home", "/"],
  ["services-index", "/services"],
  ["work-index", "/work"],
  ["about", "/about"],
  ["contact", "/contact"],
];

/** @param {(lang: string) => string} fn */
const both = (fn) => ({ es: fn("es"), en: fn("en") });

/** @type {PublicRoute[]} */
export const PUBLIC_ROUTES = [
  ...STATIC.map(([type, path]) => ({ type, id: type, paths: both((lang) => langPath(lang, path)) })),
  ...SERVICES.map((service) => ({ type: "service", id: service.id, service, paths: both((lang) => servicePath(service, lang)) })),
  ...PROJECTS.map((project) => ({ type: "case-study", id: project.slug, project, paths: both((lang) => langPath(lang, `/work/${projectSlug(project, lang)}`)) })),
];

/** Every canonical public URL, one entry per language. */
export const PUBLIC_URLS = PUBLIC_ROUTES.flatMap((route) => LANGS.map((lang) => ({ route, lang, path: route.paths[lang] })));

/** Canonical form of a pathname: no query, no hash, no trailing slash, no index.html. */
export function normalizePath(pathname) {
  let p = (pathname || "/").split(/[?#]/)[0];
  p = p.replace(/\/index\.html$/, "/");
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
}

/** The public route and language for a pathname, or null when it is not a canonical public URL. */
export function matchRoute(pathname) {
  const p = normalizePath(pathname);
  for (const route of PUBLIC_ROUTES) {
    for (const lang of LANGS) if (route.paths[lang] === p) return { route, lang };
  }
  return null;
}

/**
 * The same page in the other language, with its translated slug. Paths
 * that are not public routes fall back to toggling the /en prefix.
 */
export function translatePath(pathname, toLang) {
  const match = matchRoute(pathname);
  if (match) return match.route.paths[toLang];
  const p = normalizePath(pathname);
  if (toLang === "en") return p === "/" ? "/en" : `/en${p}`;
  return p === "/en" ? "/" : p.replace(/^\/en(?=\/|$)/, "") || "/";
}

/** Known aliases — the other language's slug under a language prefix — and the canonical path each one must redirect to. */
export const ALIASES = [
  ...SERVICES.flatMap((service) => LANGS.map((lang) => ({ from: langPath(lang, `/services/${service.slug[otherLang(lang)]}`), to: servicePath(service, lang) }))),
  ...PROJECTS.filter((project) => project.slugEn).flatMap((project) => LANGS.map((lang) => ({ from: langPath(lang, `/work/${projectSlug(project, otherLang(lang))}`), to: langPath(lang, `/work/${projectSlug(project, lang)}`) }))),
].filter((alias) => alias.from !== alias.to);
