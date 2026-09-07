import { Navigate, useParams } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { usePageMeta } from "@/lib/seo";
import { STRINGS, otherLang } from "@/i18n";
import { findService, servicePath, serviceSlug } from "@/data/services";
import CrmRealEstateService from "@/sections/services/crm-real-estate/CrmRealEstateService";

const PAGES = { "crm-real-estate": CrmRealEstateService };

/**
 * /services/:slug — one dedicated, commercial page per service. The
 * slug is language-specific; a slug from the other language redirects
 * to the canonical one for the current language.
 */
export default function ServicePage({ lang = "es" }) {
  const { slug } = useParams();
  const service = findService(slug);
  const meta = service ? STRINGS[lang][service.strings].meta : null;

  usePageMeta({
    lang,
    title: meta?.title,
    description: meta?.description,
    path: service ? servicePath(service, lang) : undefined,
    alternatePath: service ? servicePath(service, otherLang(lang)) : undefined,
  });

  if (!service) return <PageNotFound />;
  if (slug !== serviceSlug(service, lang)) return <Navigate replace to={servicePath(service, lang)} />;
  const Page = PAGES[service.id];
  return <Page lang={lang} service={service} />;
}
