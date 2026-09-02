import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { STRINGS, langPath } from "@/i18n";
import SpatialNumber from "@/components/production/SpatialNumber";
import StateText from "@/components/production/StateText";
import StateFragments from "@/components/production/StateFragments";

/**
 * "Nafureanu en producción" — not a metrics grid. The warm page is
 * the canvas: one oversized number dominates at a time while the
 * others recede into depth, and each state carries its own floating
 * product fragments. Scroll (or the rail, or a neighbour number)
 * moves the composition through its four states.
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
        {/* Faint cobalt wash over the ivory canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_50%_at_70%_40%,rgba(43,89,255,0.05),transparent_70%)]"
        />

        {/* Section header */}
        <div className="absolute left-5 top-24 z-30 max-w-xs md:left-10 md:top-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {s.kicker}
          </p>
          <h2 className="mt-3 font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">
            {s.title}
          </h2>
          <p className="mt-2.5 hidden text-xs leading-relaxed text-muted-foreground md:block">
            {s.intro}
          </p>
        </div>

        {/* Floating product fragments */}
        {s.metrics.map((m, i) => (
          <StateFragments key={m.label} state={i} f={f} progress={scrollYProgress} />
        ))}

        {/* Numbers — four states of one spatial sequence */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {s.metrics.map((m, i) => (
            <SpatialNumber key={m.label} metric={m} index={i} f={f} goTo={goTo} />
          ))}
        </div>

        {/* Editorial text column */}
        {s.metrics.map((m, i) => (
          <StateText key={m.label} metric={m} index={i} f={f} lang={lang} />
        ))}

        {/* State rail */}
        <nav className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-4 md:right-10">
          {s.metrics.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={m.label}
              className="group flex items-center gap-2.5"
            >
              <span
                className={`font-mono text-[10px] transition-colors duration-500 ${
                  active === i
                    ? "text-accent"
                    : "text-muted-foreground/40 group-hover:text-muted-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  active === i
                    ? "w-8 bg-accent"
                    : "w-4 bg-foreground/20 group-hover:bg-foreground/40"
                }`}
              />
            </button>
          ))}
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