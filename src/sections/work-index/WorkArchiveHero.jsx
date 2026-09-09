import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projectSlug } from "@/data/projects";
import { langPath, pick } from "@/i18n";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";

/**
 * The archive opens. A small line of metadata, the statement, one
 * sentence — and the project register: four entries with number,
 * name, discipline and status. Hovering or focusing an entry sharpens
 * it, quietens the others, lifts a huge faded number behind the hero
 * and reveals one verified fact (who the system was built for). Every
 * entry is a link to its case study. On phones the register is a
 * compact numbered list with everything visible.
 */
export default function WorkArchiveHero({ lang, t, projects }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });
  const a = t.archive;

  return (
    <header className="relative overflow-hidden bg-[#EEF2F8]/60 px-5 pb-14 pt-24 md:px-10 md:pb-16 md:pt-24">
      {/* atmosphere: a faint cobalt field, a cyan reflection, registration lines and two glass surfaces */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[10%] -top-[20%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)]" />
        <span className="absolute -left-[12%] bottom-[-30%] h-[70%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)]" />
        <span className="absolute right-[6%] top-[14%] h-[30vh] w-[36vw] -rotate-2 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(49,87,246,0.35)] backdrop-blur-[28px]" />
        <span className="absolute -left-[6%] bottom-[8%] h-[22vh] w-[30vw] rotate-2 rounded-[42px] border border-white/60 bg-[linear-gradient(130deg,rgba(255,255,255,0.45),rgba(49,87,246,0.06),rgba(255,255,255,0.12))] backdrop-blur-[32px]" />
        <span className="absolute inset-x-0 top-[calc(7rem+40px)] hidden h-px bg-foreground/[0.08] md:block" />
        <span className="absolute bottom-0 left-[58%] top-0 hidden w-px bg-foreground/[0.07] lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div {...up(0)} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pb-3">
          <BackToHome lang={lang} />
          <p className={cn(MONO, "text-muted-foreground")}>
            <span className="text-foreground">{a.brand}</span> · {a.label}
          </p>
          <p className={cn(MONO, "text-muted-foreground")}>{a.count} · {a.selection}</p>
        </motion.div>

        <div className="mt-8 grid gap-12 md:mt-10 lg:grid-cols-12 lg:gap-x-10">
          {/* the statement */}
          <div className="lg:col-span-7">
            <motion.p {...up(1)} className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</motion.p>
            <motion.h1 {...up(2)} className="mt-5 max-w-[12ch] font-heading text-[clamp(2.6rem,5.2vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-foreground [text-wrap:balance]">
              {t.h1}
            </motion.h1>
            <motion.p {...up(3)} className="mt-7 max-w-[44ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px]">{t.intro}</motion.p>
          </div>

          {/* the register */}
          <motion.div {...up(2)} className="relative lg:col-span-5 lg:self-end">
            {/* the huge faded number behind the register: the active entry */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-4 top-[22%] hidden select-none lg:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block font-heading text-[12rem] font-bold leading-none tracking-[-0.06em] text-foreground/[0.045]"
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className={cn(MONO, "relative text-muted-foreground")}>{a.registerLabel}</p>
            <ol className="relative mt-3 border-t border-foreground/15" onMouseLeave={() => setActive(0)}>
              {projects.map((p, i) => {
                const on = active === i;
                return (
                  <li key={p.slug} className="border-b border-foreground/12">
                    <Link
                      to={langPath(lang, `/work/${projectSlug(p, lang)}`)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-4 outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F4F6] md:grid-cols-[2.75rem_1fr_auto] md:py-5",
                        on ? "opacity-100" : "opacity-70 hover:opacity-100 lg:opacity-55"
                      )}
                    >
                      <span className={cn(MONO, on ? "text-accent" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className={cn("block font-heading text-[22px] font-bold leading-tight tracking-[-0.02em] transition-colors md:text-[26px]", on ? "text-foreground" : "text-foreground/80")}>{pick(p.title, lang)}</span>
                        <span className={cn(MONO, "mt-1.5 block text-muted-foreground")}>{pick(p.discipline, lang)}</span>
                        {/* one verified fact: who it was built for — always visible on phones, on the active entry on desktop */}
                        <span className={cn(MONO, "mt-1 block text-foreground/60 lg:hidden")}>{pick(p.client, lang)}</span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={reduced ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduced ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: reduced ? 0 : 0.3 }}
                              className={cn(MONO, "hidden overflow-hidden text-foreground/60 lg:block")}
                            >
                              <span className="block pt-1">{pick(p.client, lang)}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className={cn(MONO, "col-start-2 mt-2 md:col-start-3 md:mt-0 md:text-right", on ? "text-accent" : "text-muted-foreground")}>{pick(p.status, lang)}</span>
                    </Link>
                    {/* the active entry's rule */}
                    <span aria-hidden="true" className={cn("block h-[2px] origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", on ? "scale-x-100" : "scale-x-0")} />
                  </li>
                );
              })}
            </ol>
            <p className={cn(MONO, "mt-3 hidden text-muted-foreground lg:block")}>{a.hint}</p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
