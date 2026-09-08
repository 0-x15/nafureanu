import { Suspense, lazy } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { usePageMeta } from "@/lib/seo";
import { STRINGS, otherLang } from "@/i18n";
import { findService, servicePath, serviceSlug } from "@/data/services";
/* One lazy chunk per service: a visitor only downloads the page they open. */
const PAGES = {
  "crm-real-estate": lazy(() => import("@/sections/services/crm-real-estate/CrmRealEstateService")),
  "business-systems": lazy(() => import("@/sections/services/business-systems/BusinessSystemsService")),
  "custom-software": lazy(() => import("@/sections/services/custom-software/CustomSoftwareService")),
  "ai-automation": lazy(() => import("@/sections/services/ai-automation/AiAutomationService")),
  saas: lazy(() => import("@/sections/services/saas-product/SaasProductService")),
  "integrations-apis": lazy(() => import("@/sections/services/integrations-apis/IntegrationsApiService")),
};

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
  return (
    <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
      <Page lang={lang} service={service} />
    </Suspense>
  );
}
