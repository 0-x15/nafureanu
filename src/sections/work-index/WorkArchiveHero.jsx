import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";

/**
 * Act 01 — the archive opens, typographically. Metadata along the top
 * edge, the statement at full scale with its last word in cobalt, one
 * sentence — and a single line of state: a hairline with three marks
 * that light up in sequence, the three words that are literally true
 * of the systems below (deployed, connected, in production). No
 * diagram, no invented register, no project.
 */
export default function WorkArchiveHero({ lang, t }) {
  const reduced = useReducedMotion();
  const h = t.hero;
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });

  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-24 md:px-10 md:pb-16 md:pt-24">
      {/* atmosphere: cool light; the site's canvas does the rest */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[8%] -top-[30%] h-[90%] w-[54%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)] blur-2xl" />
        <span className="absolute -left-[10%] bottom-[-20%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)] blur-2xl" />
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

        {/* the statement */}
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-x-8">
          <motion.h1 {...up(1)} className="font-heading text-[clamp(3rem,7.4vw,7.6rem)] font-bold leading-[0.94] tracking-[-0.045em] text-foreground [text-wrap:balance] lg:col-span-12">
            {h.h1a} <span className="text-accent">{h.h1b}</span>
          </motion.h1>
          <motion.p {...up(2)} className="max-w-[40ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px] lg:col-span-5 lg:col-start-8">
            {t.intro}
          </motion.p>
        </div>

        {/* the line of state: three marks lighting up in sequence */}
        <motion.div {...up(3)} className="mt-12 md:mt-16" role="list" aria-label={h.stateLabel}>
          <div className="relative h-px bg-foreground/15">
            <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0 : 1.4, delay: 0.5, ease: EASE }} className="absolute inset-y-0 left-0 w-full origin-left bg-accent/60" />
          </div>
          <ol className="mt-3 grid grid-cols-3 gap-4">
            {h.marks.map((w, i) => (
              <li key={w} className="flex items-center gap-2.5">
                <motion.span aria-hidden="true" initial={reduced ? false : { backgroundColor: "rgba(49,87,246,0)" }} animate={{ backgroundColor: "rgba(49,87,246,1)" }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.9 + i * 0.35 }} className="h-[7px] w-[7px] shrink-0 border border-accent" />
                <span className={cn(MONO, "text-foreground/75")}>{w}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </header>
  );
}
