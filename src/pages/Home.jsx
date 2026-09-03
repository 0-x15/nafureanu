import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Hero from "@/sections/home/Hero";
import StatsBand from "@/components/StatsBand";
import WhatWeBuild from "@/sections/home/WhatWeBuild";
import FeaturedWork from "@/sections/home/FeaturedWork";
import HomeProcess from "@/sections/home/HomeProcess";
import WhyNafureanu from "@/sections/home/WhyNafureanu";
import HomeCta from "@/sections/home/HomeCta";

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
      <StatsBand lang={lang} />
      <WhatWeBuild lang={lang} />
      <FeaturedWork lang={lang} />
      <HomeProcess lang={lang} />
      <WhyNafureanu lang={lang} />
      <HomeCta lang={lang} />
    </>
  );
}