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
  /* glass architecture — much slower than the stage parallax */
  const plane1Y = useTransform(scrollYProgress, [0, 1], [10, -22]);
  const plane2X = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const plane2Y = useTransform(scrollYProgress, [0, 1], [-8, 14]);
  const plane3R = useTransform(scrollYProgress, [0, 1], [-6, -3]);

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
      className="relative h-[420vh] bg-[#F2F5FA]"
      aria-label={s.title}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient light — cobalt bloom around the stage, cyan reflection,
            warm counterpoint so the canvas never turns cold */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <span className="absolute right-[2%] top-[6%] h-[78%] w-[56%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
          <span className="absolute bottom-[0%] left-[4%] h-[46%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)]" />
          <span className="absolute left-[8%] top-[16%] h-[44%] w-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(255,252,244,0.6),transparent)]" />
        </div>

        {/* Per-state atmospheric tint */}
        {s.states.map((state, i) => (
          <StateAtmosphere key={state.headline} index={i} f={f} />
        ))}

        {/* Architectural glass planes — environmental depth behind the story */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
          <motion.div
            style={{ y: plane1Y }}
            className="absolute right-[-2%] top-[18%] h-[34vh] w-[54vw] -rotate-3 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(43,89,255,0.35)] backdrop-blur-[28px]"
          />
          <motion.div
            style={{ x: plane2X, y: plane2Y }}
            className="absolute bottom-[2%] left-[-4%] h-[36vh] w-[48vw] rotate-2 rounded-[42px] border border-white/60 bg-[linear-gradient(130deg,rgba(255,255,255,0.45),rgba(43,89,255,0.06),rgba(255,255,255,0.12))] backdrop-blur-[30px]"
          />
          <motion.div
            style={{ rotate: plane3R }}
            className="absolute left-[30%] top-[44%] h-[12vh] w-[46vw] rounded-full border border-white/50 bg-white/20 backdrop-blur-[18px]"
          />
        </div>

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