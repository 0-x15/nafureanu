import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import SystemLayers from "./why/SystemLayers";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Why Nafureanu — a differentiation section: the interface is only
 * the visible surface; the system behind the operation is the product.
 */
export default function WhyNafureanu({ lang = "es" }) {
  const s = STRINGS[lang].why;
  const [active, setActive] = useState(null);

  return (
    <section
      className="bg-background px-5 py-20 md:px-10 md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left — headline, copy and the three principles */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {s.kicker}
              </p>
              <h2
                id="why-heading"
                className="mt-5 max-w-xl font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl xl:text-[54px]"
              >
                {s.title}
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.sub}
              </p>
            </Reveal>
            <div className="mt-12 space-y-10">
              {s.points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 1.15 + i * 0.16, ease: EASE }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="group max-w-lg cursor-default"
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
          </div>

          {/* Right — the surface vs system composition */}
          <div className="lg:col-span-7">
            <SystemLayers t={s} active={active} />
          </div>
        </div>

        {/* Closing */}
        <Reveal delay={0.9} className="mt-16 md:mt-24">
          <p className="max-w-2xl font-heading text-xl font-bold leading-snug tracking-[-0.01em] md:text-2xl">
            <span className="text-muted-foreground">{s.closingA}</span>{" "}
            <span className="text-foreground">{s.closingB}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}