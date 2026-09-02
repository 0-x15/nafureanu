import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import ProblemAtmosphere from "./capabilities/ProblemAtmosphere";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Conversion bridge — "you bring the problem, we figure out the
 * system." Left: reassurance and the dominant CTA. Right: four
 * business situations as large typographic statements; the one in
 * focus becomes dominant, shows what we would look at, and the
 * atmosphere behind evolves from fragments to a connected system.
 */
export default function ProblemBridge({ lang = "es" }) {
  const c = STRINGS[lang].build.close;
  const [active, setActive] = useState(0);

  return (
    <div className="relative mt-16 border-t border-border/70 pt-14 md:mt-24 md:pt-20">
      <ProblemAtmosphere active={active} />

      <div className="relative z-10 grid gap-14 md:grid-cols-[42%_1fr] lg:gap-24">
        {/* Left — reassurance + conversion */}
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {c.kicker}
          </p>
          <h3 className="mt-5 max-w-md font-heading text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-foreground md:text-[2.6rem]">
            {c.title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {c.copy}
          </p>

          <div className="mt-10">
            <Link
              to={langPath(lang, "/contact")}
              className="group inline-flex items-center gap-3 text-lg font-medium text-accent md:text-xl"
            >
              {c.cta}
              <motion.span
                key={active}
                initial={{ x: -6, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.span>
            </Link>
            <div className="mt-4">
              <Link
                to={langPath(lang, "/services")}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.all}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <p className="mt-14 max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted-foreground/55">
            {c.trust}
          </p>
        </Reveal>

        {/* Right — the problem selector */}
        <Reveal delay={0.1}>
          <div className="flex items-start justify-between gap-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
              {c.question}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="hidden shrink-0 rounded-lg border border-white/70 bg-white/60 px-4 py-2.5 shadow-[0_20px_40px_-24px_rgba(12,18,32,0.35)] backdrop-blur-md md:block"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/55">
                  {c.situations[active].layer.label}
                </p>
                <p className="mt-0.5 text-xs font-medium text-foreground/80">
                  {c.situations[active].layer.value}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4">
            {c.situations.map((sit, i) => {
              const isActive = i === active;
              return (
                <button
                  key={sit.text}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="group block w-full border-b border-border/60 py-5 text-left md:py-6"
                >
                  <span
                    className={cn(
                      "flex items-baseline gap-4 font-heading font-bold tracking-[-0.02em] transition-all duration-500",
                      isActive
                        ? "translate-x-1 text-2xl text-foreground md:text-3xl"
                        : "text-xl text-muted-foreground/35 group-hover:text-muted-foreground/75 md:text-2xl"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] font-normal transition-colors duration-500",
                        isActive ? "text-accent" : "text-muted-foreground/30"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {sit.text}
                  </span>
                  <span className="mt-2.5 block min-h-[16px] pl-8">
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-muted-foreground"
                        >
                          <span aria-hidden="true" className="text-accent">→</span>
                          {sit.hint}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}