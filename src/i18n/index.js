import { ES } from "./es";
import { EN } from "./en";

export const STRINGS = { es: ES, en: EN };

export const LANGS = ["es", "en"];
export const DEFAULT_LANG = "es";

/** The other language code. */
export const otherLang = (lang) => (lang === "es" ? "en" : "es");

/** Prefix a route path with the active language prefix (only /en for now). */
export const langPath = (lang, path) =>
  lang === "en" ? (path === "/" ? "/en" : `/en${path}`) : path;

/** Resolve a bilingual value: string or { es, en }. */
export const pick = (value, lang) =>
  typeof value === "string" ? value : value?.[lang];