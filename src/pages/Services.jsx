import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import CapabilityList from "@/sections/services/CapabilityList";
import HeardList from "@/sections/services/HeardList";
import ProcessStrip from "@/sections/services/ProcessStrip";
import StatsBand from "@/components/StatsBand";
import CtaBand from "@/components/CtaBand";

export default function Services({ lang = "es" }) {
  const s = STRINGS[lang];
  usePageMeta({
    lang,
    title: s.meta.services.title,
    description: s.meta.services.description,
    path: langPath(lang, "/services"),
    alternatePath: langPath(otherLang(lang), "/services"),
  });

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">{s.servicesPage.kicker.split(" — ")[0]}</span> —{" "}
          {s.servicesPage.kicker.split(" — ")[1]}
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          {s.servicesPage.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#5C5C58] md:text-lg">
          {s.servicesPage.intro}
        </p>
      </header>
      <div className="mt-16 md:mt-24">
        <CapabilityList lang={lang} />
      </div>
      <HeardList lang={lang} />
      <ProcessStrip lang={lang} />
      <StatsBand lang={lang} />
      <CtaBand
        kicker={s.servicesPage.cta.kicker}
        title={s.servicesPage.cta.title}
        note={s.servicesPage.cta.note}
      />
    </>
  );
}