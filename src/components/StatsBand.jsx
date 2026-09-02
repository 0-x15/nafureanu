import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import SpatialNumber from "@/components/production/SpatialNumber";
import StateText from "@/components/production/StateText";
import StateFragments from "@/components/production/StateFragments";

/**
 * "Nafureanu en producción" — a storytelling composition on the ivory
 * page itself. Zones: intro (top-left), stage (center), content
 * (bottom-left, one state at a time), navigation rail (right).
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
  const introY = useTransform(scrollYProgress, [0, 1], ["0vh", "-3vh"]);

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
        {/* Ambient atmosphere — soft light fields, kept quiet */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <span className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.06),transparent)]" />
          <span className="absolute -top-36 right-[6%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(122,142,255,0.09),transparent)] blur-[80px]" />
          <span className="absolute bottom-[8%] left-[28%] h-[360px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,246,0.06),transparent)] blur-[90px]" />
        </div>

        {/* Intro zone */}
        <motion.div
          style={{ y: introY }}
          className="absolute left-5 top-24 z-30 max-w-xs md:left-10 md:top-28"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {s.kicker}
          </p>
          <h2 className="mt-3 font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">
            {s.title}
          </h2>
          <p className="mt-2.5 hidden text-xs leading-relaxed text-muted-foreground md:block">
            {s.intro}
          </p>
        </motion.div>

        {/* Stage fragments (behind the numbers) */}
        {s.metrics.map((m, i) => (
          <StateFragments key={m.label} state={i} f={f} progress={scrollYProgress} />
        ))}

        {/* Stage zone — one dominant number at a time */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {s.metrics.map((m, i) => (
            <SpatialNumber key={m.label} metric={m} index={i} f={f} goTo={goTo} />
          ))}
        </div>

        {/* Content zone — one state at a time */}
        {s.metrics.map((m, i) => (
          <StateText key={m.label} metric={m} index={i} f={f} lang={lang} />
        ))}

        {/* Navigation zone — light rail with a progress line */}
        <nav
          aria-label={s.title}
          className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end md:right-10"
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
            {s.metrics.map((m, i) => (
              <button
                key={m.label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={m.label}
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

        {/* Accessible static list of all four proof points */}
        <ul className="sr-only">
          {s.metrics.map((m) => (
            <li key={m.label}>
              {m.value}
              {m.suffix} {m.label} —{" "}
              <a href={langPath(lang, m.to)}>{m.hint}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}