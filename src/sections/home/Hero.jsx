import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import AutomationCard from "@/components/mockups/AutomationCard";
import { STRINGS, langPath } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Commercial hero — what Nafureanu builds, why it matters, what to do next.
 * The visual is a layered composition of real product surfaces.
 */
export default function Hero({ lang = "es" }) {
  const s = STRINGS[lang].hero;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -30]);
  /* glass architecture — slower, subtler than the product parallax */
  const plane1Y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const plane2Y = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const plane2X = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const plane3R = useTransform(scrollYProgress, [0, 1], [-6, -3]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F2F5FA] px-5 pt-32 md:px-10 md:pt-44"
    >
      {/* ambient light — cobalt bloom, cyan reflection, warm counterpoint */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <span className="absolute right-[2%] top-[6%] h-[70%] w-[56%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
        <span className="absolute bottom-[2%] left-[6%] h-[40%] w-[38%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)]" />
        <span className="absolute left-[10%] top-[30%] h-[46%] w-[34%] rounded-full bg-[radial-gradient(closest-side,rgba(255,251,240,0.5),transparent)]" />
      </div>

      {/* architectural glass planes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <motion.div
          style={{ y: plane1Y }}
          className="absolute right-[1%] top-[16%] h-[32vh] w-[54vw] -rotate-3 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(43,89,255,0.35)] backdrop-blur-[28px]"
        />
        <motion.div
          style={{ y: plane2Y, x: plane2X }}
          className="absolute bottom-[4%] left-[-6%] h-[30vh] w-[46vw] rotate-2 rounded-[42px] border border-white/60 bg-[linear-gradient(130deg,rgba(255,255,255,0.45),rgba(43,89,255,0.05),rgba(255,255,255,0.12))] backdrop-blur-[30px]"
        />
        <motion.div
          style={{ rotate: plane3R }}
          className="absolute bottom-[10%] right-[8%] h-[10vh] w-[44vw] rounded-full border border-white/50 bg-white/25 backdrop-blur-[18px]"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            {s.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-6 font-heading text-5xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-7xl"
          >
            {s.titleA} <span className="text-accent">{s.titleB}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {s.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to={langPath(lang, "/contact")}
              className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-[#1E44D6]"
            >
              {s.ctaPrimary}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to={langPath(lang, "/work")}
              className="inline-flex items-center gap-2 border border-foreground/20 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              {s.ctaSecondary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Product composition */}
        <motion.div style={{ y: yMain }} className="relative lg:col-span-6">
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative z-10"
          >
            <SophIADashboard
              lang={lang}
              className="hidden [transform:perspective(1600px)_rotateY(-8deg)] sm:block"
            />
            <SophIADashboard lang={lang} className="sm:hidden" />
            {/* faint cobalt reflection beneath the main mockup */}
            <span
              aria-hidden="true"
              className="absolute -bottom-8 left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.14),transparent)] blur-md"
            />
          </motion.div>
          <motion.div
            style={{ y: ySide }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="absolute -bottom-16 -left-1 z-20 hidden md:block lg:-left-12"
          >
            <FivoCheckout lang={lang} className="w-64 -rotate-3" />
          </motion.div>
          <motion.div
            style={{ y: ySide }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="absolute -top-8 left-0 z-0 hidden lg:block"
          >
            <AutomationCard lang={lang} className="-rotate-2" />
          </motion.div>
        </motion.div>
      </div>
      {/* Room for the overlapping mockup cards */}
      <div aria-hidden="true" className="h-20 md:h-28" />
    </section>
  );
}