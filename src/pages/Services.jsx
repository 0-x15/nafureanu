import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import ServicesHero from "@/sections/services/index/ServicesHero";
import ServiceArchitecture from "@/sections/services/index/ServiceArchitecture";
import ServicesTogether from "@/sections/services/index/ServicesTogether";
import ServicesClosing from "@/sections/services/index/ServicesClosing";

/**
 * /services — the map of entry points. Four acts: the statement with the
 * service material, the architecture of the seven services (the catalogue,
 * once), why services are entry points rather than compartments, and the
 * close. The dedicated pages do the explaining.
 */
export default function Services({ lang = "es" }) {
  const s = STRINGS[lang];
  const t = { ...s.servicesPage, closing: { ...s.servicesPage.closing, cta: s.nav.start } };
  usePageMeta({
    lang,
    title: s.meta.services.title,
    description: s.meta.services.description,
    path: langPath(lang, "/services"),
    alternatePath: langPath(otherLang(lang), "/services"),
  });
  return (
    <>
      <ServicesHero t={t} />
      <ServiceArchitecture lang={lang} t={t} />
      <ServicesTogether t={t} />
      <ServicesClosing lang={lang} t={t} />
    </>
  );
}
