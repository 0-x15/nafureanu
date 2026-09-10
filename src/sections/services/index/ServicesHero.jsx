import { motion, useReducedMotion } from "framer-motion";
import { EASE, KICKER } from "./servicesIndexBits";
import ServiceSection from "./ServiceSection";

/**
 * Act 01 — the statement, and beside it the technical drawing: an
 * isometric section of a company system with its layers pulled apart,
 * each one named by its callout (interface, product, data, automation,
 * integrations, foundation). Where the problem sits decides what gets
 * built. No service names: the catalogue comes next.
 */
export default function ServicesHero({ t }) {
  const reduced = useReducedMotion();
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });
  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-6">
          <motion.p {...up(0)} className={KICKER}>{t.hero.kicker}</motion.p>
          <motion.h1 {...up(1)} className="mt-5 max-w-[15ch] font-heading text-[clamp(2.5rem,4.6vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]">
            {t.hero.h1}
          </motion.h1>
          <motion.p {...up(2)} className="mt-7 max-w-[54ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px]">
            {t.hero.sub}
          </motion.p>
        </div>
        {/* the drawing crosses into the right margin and rides slightly above the text column */}
        <motion.div {...up(2)} aria-hidden="true" className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:-mt-6 lg:max-w-none">
          <ServiceSection labels={t.hero.layers} range={t.hero.range} material={t.hero.material} />
        </motion.div>
      </div>
    </header>
  );
}
