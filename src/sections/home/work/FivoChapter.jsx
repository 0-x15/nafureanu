import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { ProjectTag, ProofRow, CapLine, TechLine, Takeaway } from "./chapterBits";
import SettlementScene from "./SettlementScene";

/**
 * Chapter 02 — Fivo. A deep-navy infrastructure environment: the clean
 * checkout stays in the foreground while the engineering — verification,
 * cross-chain settlement, nine networks — resolves quietly behind it.
 * The user sees simplicity; the engineering handles complexity.
 */
export default function FivoChapter({ lang = "es" }) {
  const s = STRINGS[lang].workSection.fivo;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const to = langPath(lang, "/work/fivo");

  return (
    <div ref={ref} className="relative overflow-hidden bg-[#0B1220] text-white">
      {/* infrastructure atmosphere — depth behind the product */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[2%] top-[22%] h-[62%] w-[52%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.17),transparent)]" />
        <span className="absolute right-[-10%] bottom-[8%] h-[42%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgba(94,199,233,0.09),transparent)]" />
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      {/* soft settlement routes sweeping behind the checkout */}
      {[46, 54].map((top, i) => (
        <motion.span
          key={top}
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0.3, rotate: -7 }}
          whileInView={{ opacity: i === 0 ? 1 : 0.6, scaleX: 1, rotate: -7 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute left-[2%] h-px w-[54%] origin-left bg-[linear-gradient(to_right,transparent,rgba(43,89,255,0.5),transparent)] blur-[1px]",
            top === 46 ? "top-[46%]" : "top-[54%]"
          )}
        />
      ))}

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="relative md:min-h-[106vh]">
          {/* mobile — headline first */}
          <div className="md:hidden">
            <ProjectTag dark index={s.index} name={s.name} role={s.role} />
            <h3 className="mt-6 font-heading text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              {s.headlineA}
              <br />
              {s.headlineB}
            </h3>
          </div>

          {/* product scene — simplicity in the foreground */}
          <motion.div
            style={{ y: sceneY }}
            className="relative mt-10 md:absolute md:left-[4%] md:top-[22%] md:mt-0 lg:left-[8%]"
          >
            <div className="w-full max-w-[340px] md:rotate-[-0.5deg] md:scale-[1.12] md:origin-top-left">
              <FivoCheckout lang={lang} bare />
            </div>
            {/* the engineering settling behind the product */}
            <div className="absolute -bottom-10 -left-2 hidden md:block md:-left-6">
              <SettlementScene lang={lang} />
            </div>
          </motion.div>

          {/* mobile — settlement status below the product */}
          <div className="mt-8 md:hidden">
            <SettlementScene lang={lang} />
          </div>

          {/* editorial stack — right */}
          <div className="relative z-10 mt-10 md:ml-auto md:mt-0 md:max-w-[44%] md:pt-[10vh]">
            <Reveal className="hidden md:block">
              <ProjectTag dark index={s.index} name={s.name} role={s.role} />
            </Reveal>
            <Reveal>
              <h3 className="mt-6 hidden font-heading text-6xl font-bold leading-[0.98] tracking-[-0.035em] text-white md:block lg:text-8xl">
                {s.headlineA}
                <br />
                {s.headlineB}
              </h3>
            </Reveal>
            <Reveal delay={0.04}>
              <div className="md:mt-9">
                <ProofRow dark items={s.proof} />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                {s.copy}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9">
                <CapLine dark items={s.caps} />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6">
                <TechLine dark>{s.tech}</TechLine>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-12">
                <Takeaway dark kicker={s.showsKicker} text={s.shows} to={to} cta={s.cta} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}