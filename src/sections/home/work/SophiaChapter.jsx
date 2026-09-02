import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import { STRINGS, langPath } from "@/i18n";
import { ProjectTag, ProofRow, CapLine, TechLine, Takeaway } from "./chapterBits";
import MatchingScene from "./MatchingScene";

/**
 * Chapter 01 — SophIA. A warm stone environment where the dashboard IS
 * the section: oversized, bleeding past the page edge, with a fainter
 * interface layer receding behind it and the AI matching activity
 * floating over the product. The result headline dominates; the product
 * name stays small.
 */
export default function SophiaChapter({ lang = "es" }) {
  const s = STRINGS[lang].workSection.sophia;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-2%", "4%"]);
  const to = langPath(lang, "/work/sophia");

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* warm environment — richer than plain white */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute right-[-10%] top-[14%] h-[72%] w-[68%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
        <span className="absolute left-[-14%] top-[-10%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(closest-side,rgba(214,197,163,0.4),transparent)]" />
        <span className="absolute bottom-[-18%] left-[22%] h-[46%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.75),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pb-28 md:pt-16">
        <div className="relative md:min-h-[112vh]">
          {/* mobile — headline first */}
          <div className="md:hidden">
            <ProjectTag index={s.index} name={s.name} role={s.role} />
            <h3 className="mt-6 font-heading text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
              {s.headlineA}
              <br />
              {s.headlineB}
            </h3>
          </div>

          {/* product environment — oversized, bleeding past the right edge */}
          <motion.div
            style={{ y: sceneY }}
            className="relative mt-10 md:absolute md:-right-[18%] md:top-[26%] md:mt-0 md:w-[106%] lg:-right-[22%] lg:w-[104%]"
          >
            {/* a fainter interface layer receding behind */}
            <motion.div
              style={{ y: ghostY }}
              aria-hidden="true"
              className="absolute inset-0 hidden md:block"
            >
              <div className="translate-x-[4%] translate-y-[3.5%] scale-[0.97] opacity-30 blur-[7px]">
                <SophIADashboard lang={lang} bare />
              </div>
            </motion.div>
            <div className="relative md:rotate-[0.6deg]">
              <SophIADashboard lang={lang} bare />
            </div>
            {/* the system reacting, floating over the product */}
            <div className="absolute -bottom-12 right-[7%] hidden w-60 md:block lg:right-[11%]">
              <MatchingScene lang={lang} />
            </div>
          </motion.div>

          {/* mobile — the system reacting, below the product */}
          <div className="mt-6 md:hidden">
            <MatchingScene lang={lang} />
          </div>

          {/* editorial stack */}
          <div className="relative z-10 mt-10 md:mt-0 md:max-w-[47%] md:pt-[3vh]">
            <Reveal className="hidden md:block">
              <ProjectTag index={s.index} name={s.name} role={s.role} />
            </Reveal>
            <Reveal>
              <h3 className="mt-6 hidden font-heading text-6xl font-bold leading-[0.98] tracking-[-0.035em] text-foreground md:block lg:text-8xl">
                {s.headlineA}
                <br />
                {s.headlineB}
              </h3>
            </Reveal>
            <Reveal delay={0.04}>
              <div className="md:mt-9">
                <ProofRow items={s.proof} />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[#5A6070] md:text-lg">
                {s.copy}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9">
                <CapLine items={s.caps} />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6">
                <TechLine>{s.tech}</TechLine>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-12">
                <Takeaway kicker={s.showsKicker} text={s.shows} to={to} cta={s.cta} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}