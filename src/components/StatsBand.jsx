import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import MetricCell from "@/components/metrics/MetricCell";
import { STRINGS } from "@/i18n";

/**
 * "Nafureanu en producción" — a contained deep-navy panel of verified
 * production metrics, each one a quiet path into the related work.
 */
export default function StatsBand({ lang = "es" }) {
  const s = STRINGS[lang].stats;
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mx}px ${my}px, rgba(91,132,255,0.07), transparent 70%)`;

  const onMove = (e) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      className="bg-background px-5 py-20 md:px-10 md:py-28"
      aria-label={s.title}
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          ref={panelRef}
          onMouseMove={reduced ? undefined : onMove}
          className="relative overflow-hidden rounded-[28px] bg-[#0B1220] px-6 py-14 shadow-[0_40px_80px_-40px_rgba(12,18,32,0.45)] md:px-12 md:py-20 lg:px-16 lg:py-24"
        >
          {/* Ambient depth */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-44 right-[-8%] h-[440px] w-[680px] rounded-full bg-[#2B59FF]/[0.07] blur-[130px]"
          />
          {/* Very subtle pointer-follow spotlight */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0"
            />
          )}

          <div className="relative">
            {/* Intro */}
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8FA5E8]">
                {s.kicker}
              </p>
              <Reveal variant="mask">
                <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
                  {s.title}
                </h2>
              </Reveal>
              <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
                {s.intro}
              </p>
            </div>

            {/* Metrics — one system, four parts */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {s.metrics.map((m, i) => (
                <MetricCell
                  key={m.label}
                  metric={m}
                  index={i}
                  lang={lang}
                  separatorClass={
                    i === 2 ? "hidden lg:block" : i % 2 === 1 ? "sm:block" : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}