import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import CapabilityList from "@/sections/services/CapabilityList";
import HeardList from "@/sections/services/HeardList";
import ProcessStrip from "@/components/ProcessStrip";
import CtaBand from "@/components/CtaBand";

export default function Services({ lang = "es" }) {
  const s = STRINGS[lang];
  const sp = s.servicesPage;
  usePageMeta({
    lang,
    title: s.meta.services.title,
    description: s.meta.services.description,
    path: langPath(lang, "/services"),
    alternatePath: langPath(otherLang(lang), "/services"),
  });

  return (
    <>
      <header className="bg-background px-5 pt-36 md:px-10 md:pt-48">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {sp.kicker}
        </p>
        <h1 className="mt-5 font-heading text-5xl font-bold tracking-[-0.03em] text-foreground md:text-8xl">
          {sp.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {sp.intro}
        </p>
      </header>
      <div className="mt-16 md:mt-24">
        <CapabilityList lang={lang} />
      </div>
      <HeardList lang={lang} />
      <ProcessStrip lang={lang} kicker={sp.processKicker} title={sp.processTitle} />
      <CtaBand
        lang={lang}
        kicker={sp.cta.kicker}
        title={sp.cta.title}
        note={sp.cta.note}
        button={s.nav.start}
      />
    </>
  );
}