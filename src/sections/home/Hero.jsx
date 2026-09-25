import { useRef } from "react";
import ActionLink from "@/components/ActionLink";
import { m as motion, useScroll, useTransform } from "framer-motion";
import { rise } from "@/lib/rise";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import AutomationCard from "@/components/mockups/AutomationCard";
import { STRINGS, langPath } from "@/i18n";

/**
 * Commercial hero — what Nafureanu builds, why it matters, what to do next.
 * The visual is a layered composition of real product surfaces. The
 * entrance is CSS (`rise`), so the copy and the surfaces paint with the
 * static HTML; only the scroll parallax needs JavaScript.
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

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-32 md:px-10 md:pt-44">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="rise font-mono text-[11px] uppercase tracking-[0.22em] text-accent" style={rise(16, 0.7, 0)}>
            {s.eyebrow}
          </p>
          <h1 className="rise mt-6 font-heading text-5xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-7xl" style={rise(26, 0.8, 0.08)}>
            {s.titleA} <span className="text-accent">{s.titleB}</span>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground" style={rise(22, 0.8, 0.16)}>
            {s.sub}
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={rise(18, 0.8, 0.24)}>
            <ActionLink to={langPath(lang, "/contact")}>
              {s.ctaPrimary}
            </ActionLink>
            <ActionLink
              to={langPath(lang, "/work")}
              variant="secondary"
              icon="right"
            >
              {s.ctaSecondary}
            </ActionLink>
          </div>
        </div>

        {/* Product composition */}
        <motion.div style={{ y: yMain }} className="relative lg:col-span-6">
          <motion.div style={{ y: yCard }} className="relative z-10">
            <div className="rise" style={rise(40, 0.9, 0.15)}>
              <SophIADashboard
                lang={lang}
                className="hidden [transform:perspective(1600px)_rotateY(-8deg)] sm:block"
              />
              <SophIADashboard lang={lang} className="sm:hidden" />
            </div>
          </motion.div>
          <motion.div style={{ y: ySide }} className="absolute -bottom-16 -left-1 z-20 hidden md:block lg:-left-12">
            <div className="rise" style={rise(30, 0.9, 0.3)}>
              <FivoCheckout lang={lang} className="w-64 -rotate-3" />
            </div>
          </motion.div>
          <motion.div style={{ y: ySide }} className="absolute -top-8 z-0 hidden lg:-left-16 lg:block xl:-left-32 min-[1360px]:-left-40 min-[1536px]:-left-16">
            <div className="rise" style={rise(20, 0.9, 0.4)}>
              <AutomationCard lang={lang} className="-rotate-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Room for the overlapping mockup cards */}
      <div aria-hidden="true" className="h-20 md:h-28" />
    </section>
  );
}