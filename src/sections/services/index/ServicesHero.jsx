import { rise } from "@/lib/rise";
import { KICKER } from "./servicesIndexBits";
import ServiceSection from "./ServiceSection";

/**
 * Act 01 — the statement, and beside it the technical drawing: an
 * isometric section of a company system with its layers pulled apart,
 * each one named by its callout (interface, product, data, automation,
 * integrations, foundation). Where the problem sits decides what gets
 * built. No service names: the catalogue comes next. The entrance is
 * CSS (`rise`): the statement paints with the static HTML.
 */
export default function ServicesHero({ t }) {
  const up = (i) => rise(14, 0.7, 0.1 + i * 0.08);
  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-6">
          <p className={`rise ${KICKER}`} style={up(0)}>{t.hero.kicker}</p>
          <h1 className="rise mt-5 max-w-[15ch] font-heading text-[clamp(2.5rem,4.6vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]" style={up(1)}>
            {t.hero.h1}
          </h1>
          <p className="rise mt-7 max-w-[54ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px]" style={up(2)}>
            {t.hero.sub}
          </p>
        </div>
        {/* the drawing crosses into the right margin and rides slightly above the text column */}
        <div aria-hidden="true" className="rise relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:-mt-6 lg:max-w-none" style={up(2)}>
          <ServiceSection labels={t.hero.layers} range={t.hero.range} material={t.hero.material} />
        </div>
      </div>
    </header>
  );
}
