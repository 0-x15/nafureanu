import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import { STRINGS, langPath } from "@/i18n";
import { ProjectTag, ProofRow, CapLine, TechLine, Takeaway } from "./chapterBits";
import SettlementScene from "./SettlementScene";
import FivoIntegration from "./FivoIntegration";

/**
 * Chapter 02 — Fivo. A deep-navy infrastructure environment. The whole
 * narrative reads as one continuous left column — identity, headline,
 * copy, proof, capabilities, security and what-it-proves — while the
 * right side layers the product evidence with an intentional offset:
 * the one-integration script fragment above, the clean checkout slightly
 * lower in the foreground, and verification + cross-chain settlement
 * resolving quietly behind it. The client sees a simple payment
 * experience; the engineering handles the complexity behind.
 */
export default function FivoChapter({ lang = "es" }) {
  const s = STRINGS[lang].workSection.fivo;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["2.5%", "-2.5%"]);
  const to = langPath(lang, "/work/fivo");

  return (
    <div ref={ref} className="relative overflow-hidden bg-[#0B1220] text-white">
      {/* infrastructure atmosphere — depth behind the product */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[2%] top-[22%] h-[62%] w-[52%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.17),transparent)]" />
        <span className="absolute right-[-10%] bottom-[8%] h-[42%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgba(94,199,233,0.09),transparent)]" />
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-start md:gap-14 lg:gap-20">
          {/* left — the complete narrative, one continuous column */}
          <div className="contents md:block md:w-[40%] md:shrink-0 lg:w-[42%]">
            <Reveal variant="left" className="order-1">
              <ProjectTag dark index={s.index} name={s.name} role={s.role} />
            </Reveal>
            <Reveal className="order-2 mt-8">
              <h3 className="font-heading text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-white md:text-6xl">
                {s.headlineA}
                <br />
                {s.headlineB}
              </h3>
            </Reveal>
            <Reveal className="order-3 mt-6">
              <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                {s.copy}
              </p>
            </Reveal>
            <Reveal className="order-4 mt-9">
              <ProofRow dark items={s.proof} />
            </Reveal>
            <Reveal className="order-5 mt-9">
              <CapLine dark items={s.caps} />
            </Reveal>
            <Reveal className="order-6 mt-6">
              <p className="max-w-md font-mono text-[10.5px] leading-relaxed tracking-wide text-white/35">
                {s.security}
              </p>
            </Reveal>
            <Reveal className="order-8 mt-12">
              <Takeaway dark kicker={s.showsKicker} text={s.shows} to={to} cta={s.cta} />
            </Reveal>
            <Reveal className="order-9 mt-6">
              <TechLine dark>{s.tech}</TechLine>
            </Reveal>
          </div>

          {/* right — layered product evidence, offset lower than the narrative */}
          <motion.div style={{ y: sceneY }} className="order-7 mt-16 md:mt-12 md:flex-1">
            {/* one integration — the developer proof, small and quiet */}
            <div className="md:max-w-[340px]">
              <FivoIntegration lang={lang} />
            </div>

            {/* the product — clean checkout in the foreground,
                the engineering settling behind it */}
            <div className="mt-10 md:mt-14 md:pl-6">
              <div className="relative inline-block w-full max-w-[340px]">
                <div className="absolute -bottom-4 -right-2 z-0 hidden translate-x-8 translate-y-12 opacity-90 md:block lg:translate-x-10">
                  <SettlementScene lang={lang} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-[340px]"
                >
                  <FivoCheckout lang={lang} bare />
                </motion.div>
              </div>
            </div>

            {/* mobile — the settlement journey below the product */}
            <div className="mt-12 md:hidden">
              <SettlementScene lang={lang} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}