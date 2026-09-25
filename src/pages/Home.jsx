import Hero from "@/sections/home/Hero";
import StatsBand from "@/components/StatsBand";
import HomeAbout from "@/sections/home/HomeAbout";
import WhatWeBuild from "@/sections/home/WhatWeBuild";
import HomeProcess from "@/sections/home/HomeProcess";
import WhyNafureanu from "@/sections/home/WhyNafureanu";
import HomeCta from "@/sections/home/HomeCta";

export default function Home({ lang = "es" }) {

  return (
    <>
      {/* The promise → who we are → what we build → how we work → proof → why → contact */}
      <Hero lang={lang} />
      <HomeAbout lang={lang} />
      <WhatWeBuild lang={lang} />
      <HomeProcess lang={lang} />
      <StatsBand lang={lang} />
      <WhyNafureanu lang={lang} />
      <HomeCta lang={lang} />
    </>
  );
}