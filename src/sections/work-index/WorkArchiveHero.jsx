import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";

/**
 * Act 01 — the archive opens. A line of metadata along the top edge,
 * the statement across the page, one sentence at the bottom, and one
 * abstract visual integrated into the composition: a production field
 * where three surfaces resolve from faint to solid — drafted, built,
 * operating — with registration lines, status marks and the
 * production-state words as atmosphere. No diagram, no project.
 */
function ProductionField({ words, reduced }) {
  const appear = (delay, from = {}) => ({
    initial: reduced ? false : { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: reduced ? 0 : 1.1, delay, ease: EASE },
  });
  return (
    <svg viewBox="0 0 760 520" aria-hidden="true" className="h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="wk-live" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3157F6" />
          <stop offset="1" stopColor="#5B7AFF" />
        </linearGradient>
        <linearGradient id="wk-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* registration lines: the sheet the surfaces are drawn on */}
      <motion.g {...appear(0.2)} stroke="#1B1F2A" strokeOpacity="0.14" strokeWidth="1">
        <line x1="0" y1="96" x2="760" y2="96" />
        <line x1="0" y1="424" x2="760" y2="424" />
        <line x1="88" y1="0" x2="88" y2="520" />
        <line x1="672" y1="0" x2="672" y2="520" />
      </motion.g>

      {/* drafted: the first surface, only an outline */}
      <motion.g {...appear(0.35, { x: -18 })}>
        <rect x="88" y="150" width="344" height="216" fill="none" stroke="#1B1F2A" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="6 5" />
        <rect x="88" y="150" width="8" height="8" fill="#F9F7F0" stroke="#1B1F2A" strokeOpacity="0.4" />
        <text x="100" y="140" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill="#1B1F2A" fillOpacity="0.55">{words[0].toUpperCase()}</text>
      </motion.g>

      {/* built: the second surface, a solid hairline and a first fill */}
      <motion.g {...appear(0.6, { x: -12, y: 8 })}>
        <rect x="196" y="122" width="344" height="216" fill="url(#wk-glass)" stroke="#1B1F2A" strokeOpacity="0.5" strokeWidth="1" />
        <rect x="196" y="122" width="8" height="8" fill="#FFFFFF" stroke="#1B1F2A" strokeOpacity="0.55" />
        <line x1="212" y1="306" x2="524" y2="306" stroke="#1B1F2A" strokeOpacity="0.18" />
        <line x1="212" y1="290" x2="404" y2="290" stroke="#1B1F2A" strokeOpacity="0.18" />
        <text x="208" y="112" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill="#1B1F2A" fillOpacity="0.7">{words[1].toUpperCase()}</text>
      </motion.g>

      {/* operating: the third surface, white and precise, and the one solid cobalt segment */}
      <motion.g {...appear(0.9, { x: -8, y: 12 })}>
        <rect x="304" y="94" width="344" height="216" fill="#FFFFFF" stroke="#3157F6" strokeOpacity="0.75" strokeWidth="1" />
        <rect x="304" y="94" width="8" height="8" fill="#3157F6" />
        <rect x="324" y="258" width="128" height="14" fill="url(#wk-live)" />
        <line x1="464" y1="265" x2="628" y2="265" stroke="#3157F6" strokeOpacity="0.4" />
        <circle cx="632" cy="265" r="3" fill="#FFFFFF" stroke="#3157F6" strokeWidth="1.2" />
        <text x="316" y="84" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill="#3157F6">{words[2].toUpperCase()}</text>
      </motion.g>

      {/* status marks along the bottom rule: the production-state words */}
      <motion.g {...appear(1.15)}>
        {words.slice(3).map((w, i) => (
          <g key={w} transform={`translate(${104 + i * 190} 448)`}>
            <rect x="0" y="-4" width="7" height="7" fill={i === words.length - 4 ? "#3157F6" : "none"} stroke="#3157F6" strokeOpacity="0.8" />
            <text x="16" y="3" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill="#1B1F2A" fillOpacity="0.6">{w.toUpperCase()}</text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

export default function WorkArchiveHero({ lang, t }) {
  const reduced = useReducedMotion();
  const h = t.hero;
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });

  return (
    <header className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-24">
      {/* atmosphere: cool light and one oversized cropped mark; the site's canvas does the rest */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[8%] -top-[30%] h-[90%] w-[54%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.085),transparent)] blur-2xl" />
        <span className="absolute -left-[10%] bottom-[-20%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)] blur-2xl" />
        <span className="absolute -right-6 top-[12%] hidden select-none font-heading text-[22rem] font-bold leading-none tracking-[-0.06em] text-foreground/[0.035] lg:block">04</span>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the top edge */}
        <motion.div {...up(0)} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-foreground/12 pb-3">
          <div className="flex items-baseline gap-6">
            <BackToHome lang={lang} />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</p>
          </div>
          <p className={cn(MONO, "text-muted-foreground")}>{h.selected}</p>
          <p className={cn(MONO, "hidden text-muted-foreground md:block")}>{h.discipline}</p>
        </motion.div>

        <div className="relative mt-12 flex flex-col md:mt-16 lg:block lg:min-h-[520px]">
          {/* the production field, integrated on the right, behind the end of the statement */}
          <motion.div {...up(2)} className="order-2 mt-10 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[54%] xl:w-[50%]">
            <ProductionField words={h.words} reduced={Boolean(reduced)} />
          </motion.div>
          <motion.h1 {...up(1)} className="relative order-1 max-w-[14ch] font-heading text-[clamp(2.75rem,5.6vw,5.6rem)] font-bold leading-[0.96] tracking-[-0.04em] text-foreground [text-wrap:balance] lg:max-w-[11ch]">
            {t.h1}
          </motion.h1>
          <motion.p {...up(3)} className="relative order-3 mt-8 max-w-[40ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
            {t.intro}
          </motion.p>
        </div>
      </div>
    </header>
  );
}
