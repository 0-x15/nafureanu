import { Suspense, lazy, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";

const SystemCore = lazy(() => import("@/components/systemcore/SystemCore"));

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ lang = "es" }) {
  const s = STRINGS[lang];
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
      <div className="pointer-events-none absolute inset-x-5 top-24 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#848482] md:inset-x-10">
        <span>{s.hero.eyebrow}</span>
        <span className="hidden md:inline">{s.hero.meta}</span>
        <span className="hidden md:inline">{s.hero.version}</span>
      </div>

      <h1 className="font-heading text-[length:clamp(3rem,9vw,9.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em]">
        {s.hero.lines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
            >
              {i === 2 ? (
                <>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #121212" }}>
                    {line.replace(".", "")}
                  </span>
                  <span className="text-[#E63946]">.</span>
                </>
              ) : (
                line
              )}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Nafureanu System Core — INPUT → LOGIC → AUTOMATION → OUTPUT */}
      <div className="relative mt-8 h-[32vh] min-h-[220px] md:mt-10 md:h-[40vh]">
        <Suspense fallback={null}>
          <SystemCore scrollRef={scrollRef} />
        </Suspense>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#848482]">
        {s.hero.stages.map((stage, i) => (
          <span key={stage} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-[#121212]/40">
                →
              </span>
            )}
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#E63946]" />
            {stage}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-[#5C5C58] md:text-lg">
          {s.hero.sub}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            to={langPath(lang, "/contact")}
            className="inline-flex items-center gap-2 bg-[#121212] px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#F9F9F7] transition-colors hover:bg-[#E63946]"
          >
            {s.hero.ctaPrimary} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to={langPath(lang, "/work")}
            className="group font-mono text-xs uppercase tracking-[0.15em] text-[#121212]"
          >
            <span className="border-b border-[#121212] pb-1 transition-colors group-hover:border-[#E63946] group-hover:text-[#E63946]">
              {s.hero.ctaSecondary}
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#848482]">
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
        {s.hero.scroll}
      </div>
    </section>
  );
}