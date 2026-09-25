import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { notFoundSeo, seoForPath, usePageMeta } from "@/lib/seo";

/**
 * Resolves the current URL to its SEO model and keeps <head> in sync on
 * client-side navigation. The prerender writes the same model into the
 * static HTML, so on the first load this only confirms what is there.
 */
export default function RouteHead({ lang = "es" }) {
  const { pathname } = useLocation();
  const seo = useMemo(() => seoForPath(pathname) || notFoundSeo(lang), [pathname, lang]);
  usePageMeta(seo);
  return null;
}
