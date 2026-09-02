import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import StateAtmosphere from "@/components/production/StateAtmosphere";
import StageVisual from "@/components/production/StageVisual";
import StateContent from "@/components/production/StateContent";
import ProofMark from "@/components/production/ProofMark";
import DeliveryVisual from "@/components/production/visuals/DeliveryVisual";
import SophiaVisual from "@/components/production/visuals/SophiaVisual";
import OdooVisual from "@/components/production/visuals/OdooVisual";
import FivoVisual from "@/components/production/visuals/FivoVisual";

const VISUALS = [DeliveryVisual, SophiaVisual, OdooVisual, FivoVisual];

/**
 * "Nafureanu en producción" — a four-chapter story of what has
 * actually been built. Zones: intro (top-left), stage (right),
 * content (left, one state at a time), proof mark (between both
 * worlds), navigation rail (right edge).
 */
export default function StatsBand({ lang = "es" }) {
  const s = STRINGS[lang].stats;
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const f = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const introY = useTransform(scrollYProgress, [0, 1], ["0vh", "-2vh"]);

  useMotionValueEvent(f, "change", (v) => {
    const idx = Math.max(0, Math.min(3, Math.round(v)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const goTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    window.scrollTo({
      top: rect.top + window.scrollY + (i / 3) * travel,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] bg-background"
      aria-label={s.title}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Quiet neutral base bloom under the per-state atmosphere */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.05),transparent)]"
        />

        {/* Per-state atmospheric tint */}
        {s.states.map((state, i) => (
          <StateAtmosphere key={state.headline} index={i} f={f} />
        ))}

        {/* Intro zone */}
        <motion.div
          style={{ y: introY }}
          className="absolute left-5 top-24 z-30 max-w-md md:left-10 md:top-28"
        >
          <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">
            {s.title}
          </h2>
          <p className="mt-3 hidden max-w-sm text-sm leading-relaxed text-muted-foreground md:block">
            {s.intro}
          </p>
        </motion.div>

        {/* Stage zone — the built system, one per chapter */}
        {s.states.map((state, i) => {
          const Visual = VISUALS[i];
          return (
            <StageVisual
              key={state.headline}
              index={i}
              f={f}
              progress={scrollYProgress}
            >
              <Visual />
            </StageVisual>
          );
        })}

        {/* Content zone — one state readable at a time */}
        {s.states.map((state, i) => (
          <StateContent
            key={state.headline}
            state={state}
            index={i}
            f={f}
            lang={lang}
          />
        ))}

        {/* Proof marks — evidence between copy and product */}
        {s.states.map((state, i) => (
          <ProofMark key={state.headline} proof={state.proof} index={i} f={f} />
        ))}

        {/* Navigation zone — light rail with a progress line */}
        <nav
          aria-label={s.title}
          className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end md:right-6"
        >
          <div className="relative flex h-40 flex-col justify-between py-1">
            <span
              aria-hidden="true"
              className="absolute right-[3px] top-0 h-full w-px bg-foreground/10"
            />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute right-[3px] top-0 h-full w-px origin-top bg-accent/70"
            />
            {s.states.map((state, i) => (
              <button
                key={state.headline}
                type="button"
                onClick={() => goTo(i)}
                aria-label={state.headline}
                className="group flex items-center gap-2.5"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] transition-colors duration-500",
                    active === i
                      ? "text-accent"
                      : "text-muted-foreground/40 group-hover:text-muted-foreground"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-500",
                    active === i
                      ? "bg-accent shadow-[0_0_10px_rgba(43,89,255,0.6)]"
                      : "bg-foreground/20 group-hover:bg-foreground/40"
                  )}
                />
              </button>
            ))}
          </div>
        </nav>

        {/* Accessible static list of all four chapters */}
        <ul className="sr-only">
          {s.states.map((state) => (
            <li key={state.headline}>
              {state.headline} {state.copy} {state.proof.value}
              {state.proof.suffix} {state.proof.label}{" "}
              <a href={langPath(lang, state.to)}>{state.cta}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}