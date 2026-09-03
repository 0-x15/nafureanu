import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { STRINGS } from "@/i18n";
import SystemLayers from "./why/SystemLayers";
import SurfacePlane from "./why/SurfacePlane";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Why Nafureanu — a differentiation section: the interface is only
 * the visible surface; the system behind the operation is the product.
 * Intro across the page, principles in one horizontal band, then a
 * dominant system architecture with the small interface surface —
 * and the closing statement — on the right.
 */
export default function WhyNafureanu({ lang = "es" }) {
  const s = STRINGS[lang].why;
  const [active, setActive] = useState(null);

  return (
    <section
      className="bg-background px-5 py-16 md:px-10 md:pt-16 md:pb-20"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Intro — full width */}
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {s.kicker}
          </p>
          <h2
            id="why-heading"
            className="mt-5 max-w-4xl font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl xl:text-[54px]"
          >
            {s.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {s.sub}
          </p>
        </Reveal>

        {/* Principles — one horizontal editorial band */}
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {s.points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.14, ease: EASE }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "group cursor-default",
                i > 0 && "md:border-l md:border-foreground/10 md:pl-10",
                i < 2 && "md:pr-10"
              )}
            >
              <p className="font-mono text-[10px] text-muted-foreground/70">0{i + 1}</p>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.01em] text-foreground transition-colors duration-500 group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                {s.anchors[i]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* System architecture — dominant — with the interface on the right */}
        <div className="relative mt-16 md:mt-24">
          {/* quiet guides: the system produces the interface */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-foreground lg:block"
          >
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 1.1 }}
            >
              <line x1="58" y1="28" x2="72" y2="46" stroke="#2B59FF" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="62" y1="50" x2="72" y2="50" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="58" y1="72" x2="72" y2="54" stroke="#2B59FF" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </motion.g>
          </svg>

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            {/* The system */}
            <div className="lg:col-span-8">
              <SystemLayers t={s} active={active} />
            </div>

            {/* The visible interface + closing */}
            <div className="lg:col-span-4">
              <div aria-hidden="true" className="mx-auto h-10 w-px bg-foreground/15 lg:hidden" />
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.surfaceLabel}
                </p>
                <p className="mt-1 font-heading text-sm font-bold tracking-[-0.01em] text-foreground">
                  {s.surfaceName}
                </p>
                <div className="mt-5">
                  <SurfacePlane t={s} />
                </div>
                <p className="mt-8 font-heading text-lg font-bold leading-snug tracking-[-0.01em]">
                  <span className="text-muted-foreground">{s.closingA}</span>{" "}
                  <span className="text-foreground">{s.closingB}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}