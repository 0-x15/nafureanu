import { useEffect } from "react";

const DOMAIN = "https://nafureanu.com";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-page, per-language SEO. Updates title, description, Open Graph /
 * Twitter metadata, canonical URL, og:url and hreflang alternates
 * (es / en / x-default), plus the <html lang> attribute.
 */
export function usePageMeta({ lang = "es", title, description, path, alternatePath }) {
  useEffect(() => {
    document.documentElement.lang = lang;

    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    if (path) {
      const url = DOMAIN + path;
      setLink("canonical", url);
      setMeta("property", "og:url", url);
      const esPath = lang === "es" ? path : alternatePath || "/";
      const enPath = lang === "en" ? path : alternatePath || "/en";
      setLink("alternate", DOMAIN + esPath, "es");
      setLink("alternate", DOMAIN + enPath, "en");
      setLink("alternate", DOMAIN + esPath, "x-default");
    }
  }, [lang, title, description, path, alternatePath]);
}