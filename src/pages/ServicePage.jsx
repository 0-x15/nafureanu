import { Suspense, lazy } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { findService, servicePath, serviceSlug } from "@/data/services";
import { loadBlock } from "@/i18n";
/* One lazy chunk per service: a visitor only downloads the page they open. */
const PAGES = {
  "crm-real-estate": lazy(() => import("@/sections/services/crm-real-estate/CrmRealEstateService")),
  "business-systems": lazy(() => import("@/sections/services/business-systems/BusinessSystemsService")),
  "custom-software": lazy(() => import("@/sections/services/custom-software/CustomSoftwareService")),
  "ai-automation": lazy(() => import("@/sections/services/ai-automation/AiAutomationService")),
  saas: lazy(() => import("@/sections/services/saas-product/SaasProductService")),
  "integrations-apis": lazy(() => import("@/sections/services/integrations-apis/IntegrationsApiService")),
  "web-digital": lazy(() => import("@/sections/services/web-digital/WebDigitalService")),
};

/**
 * /services/:slug — one dedicated, commercial page per service. The
 * slug is language-specific; a slug from the other language redirects
 * to the canonical one for the current language (the server does this
 * first — see the generated vercel.json — this is the client fallback).
 */
export default function ServicePage({ lang = "es" }) {
  const { slug } = useParams();
  const service = findService(slug);

  if (!service) return <PageNotFound />;
  if (slug !== serviceSlug(service, lang)) return <Navigate replace to={servicePath(service, lang)} />;
  /* the page's copy travels in its own module: start it now, in parallel with the code (the CRM page also shows the case study's matching demo) */
  loadBlock(lang, service.strings);
  if (service.id === "crm-real-estate") loadBlock(lang, "crm");
  const Page = PAGES[service.id];
  return (
    <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
      <Page lang={lang} service={service} />
    </Suspense>
  );
}
