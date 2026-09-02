import Hero from "@/sections/home/Hero";
import Manifesto from "@/sections/home/Manifesto";
import ProblemTicker from "@/sections/home/ProblemTicker";
import StatsBand from "@/components/StatsBand";
import CapabilitiesBlade from "@/sections/home/CapabilitiesBlade";
import SelectedWork from "@/sections/home/SelectedWork";
import CtaBand from "@/components/CtaBand";
import { STRINGS, langPath, otherLang } from "@/i18n";
import { usePageMeta } from "@/lib/seo";

export default function Home({ lang = "es" }) {
  const s = STRINGS[lang];
  usePageMeta({
    lang,
    title: s.meta.home.title,
    description: s.meta.home.description,
    path: langPath(lang, "/"),
    alternatePath: langPath(otherLang(lang), "/"),
  });

  return (
    <>
      <Hero lang={lang} />
      <Manifesto lang={lang} />
      <ProblemTicker lang={lang} />
      <StatsBand lang={lang} />
      <CapabilitiesBlade lang={lang} />
      <SelectedWork lang={lang} />
      <CtaBand lang={lang} kicker={s.homeCta.kicker} title={s.homeCta.title} note={s.homeCta.note} />
    </>
  );
}