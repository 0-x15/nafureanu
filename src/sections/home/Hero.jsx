import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";

const SystemCore = lazy(() => import("@/components/systemcore/SystemCore"));

const EASE = [0.22, 1, 0.36, 1];

/** One module line in the "system separation" HUD — lights up in sequence. */
function ModuleChip({ label, index, progress }) {
  const start = 0.22 + index * 0.035;
  const opacity = useTransform(progress, [start, start + 0.07], [0, 1]);
  const x = useTransform(progress, [start, start + 0.07], [28, 0]);
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-center gap-3 border-b border-[#1E2530] py-2.5"
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#3D7BFF]" />
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0EFEA]">
        {label}
      </span>
      <span className="ml-auto font-mono text-[9px] text-[#8A93A6]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

/**
 * Scroll-driven hero experience. A 380vh track pins the 3D System Core
 * to the viewport while scrolling navigates through system states:
 * living core → module separation → signal flow → output.
 */
export default function Hero({ lang = "es" }) {
  const s = STRINGS[lang];
  const targetRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const st = Math.min(5, Math.floor(v * 6));
    setStage((prev) => (prev === st ? prev : st));
  });

  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* Overlay choreography — each system state owns a scroll window */
  const headOpacity = useTransform(scrollYProgress, [0, 0.13, 0.19], [1, 1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.19], [0, -140]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0]);
  const sepOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.44, 0.52], [0, 1, 1, 0]);
  const flowOpacity = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.8], [0, 1, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const pct = useTransform(scrollYProgress, (v) =>
    `SYS.${String(Math.round(v * 99)).padStart(3, "0")}`
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[380vh] supports-[height:100svh]:h-[380svh]"
      aria-label={s.hero.eyebrow}
    >
      <div className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-[100svh]">
        {/* Living System Core */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SystemCore progressRef={progressRef} pointerRef={pointerRef} />
          </Suspense>
        </div>

        {/* Depth vignettes for readability */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(7,9,14,0.5)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07090E] via-[#07090E]/60 to-transparent"
        />

        {/* Top HUD */}
        <div className="absolute inset-x-5 top-24 z-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A93A6] md:inset-x-10">
          <span className="max-w-[45%]">{s.hero.eyebrow}</span>
          <span className="hidden md:inline">{s.hero.meta}</span>
          <span className="hidden md:inline">{s.hero.version}</span>
        </div>

        {/* STATE 01 — statement */}
        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="absolute inset-x-5 bottom-14 z-10 md:inset-x-10 md:bottom-20"
        >
          <h1 className="font-heading text-[length:clamp(2.6rem,8vw,8.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-[#F0EFEA]">
            {s.hero.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {i === 2 ? (
                    <>
                      <span
                        className="text-transparent"
                        style={{ WebkitTextStroke: "1.5px rgba(138,147,166,0.85)" }}
                      >
                        {line.replace(".", "")}
                      </span>
                      <span className="text-[#3D7BFF]">.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            style={{ opacity: introOpacity }}
            className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-[#A6AEBD] md:text-lg">
              {s.hero.sub}
            </p>
            <div className="pointer-events-auto flex flex-wrap items-center gap-6">
              <Link
                to={langPath(lang, "/contact")}
                data-cursor="start"
                className="inline-flex items-center gap-2 bg-[#F0EFEA] px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#07090E] transition-colors hover:bg-[#3D7BFF] hover:text-[#F0EFEA]"
              >
                {s.hero.ctaPrimary} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to={langPath(lang, "/work")}
                className="group font-mono text-xs uppercase tracking-[0.15em] text-[#F0EFEA]"
              >
                <span className="border-b border-[#8A93A6] pb-1 transition-colors group-hover:border-[#3D7BFF] group-hover:text-[#3D7BFF]">
                  {s.hero.ctaSecondary}
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* STATE 02 — system separation / modules */}
        <motion.div
          style={{ opacity: sepOpacity }}
          className="pointer-events-none absolute inset-x-5 top-[15%] z-10 md:inset-x-auto md:right-20 md:top-1/2 md:w-[340px] md:-translate-y-1/2 lg:right-28"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#3D7BFF]">
            {s.hero.states.sepKicker}
          </p>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-[-0.02em] text-[#F0EFEA] lg:text-3xl">
            {s.hero.states.sepTitle}
          </h2>
          <ul className="mt-6 border-t border-[#1E2530]">
            {s.hero.states.modules.map((m, i) => (
              <ModuleChip key={m} label={m} index={i} progress={scrollYProgress} />
            ))}
          </ul>
        </motion.div>

        {/* STATE 03 — signals run the system */}
        <motion.div
          style={{ opacity: flowOpacity }}
          className="pointer-events-none absolute inset-x-5 top-[16%] z-10 md:top-1/2 md:-translate-y-1/2"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5CDBEA]">
            {s.hero.states.flowKicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-6xl">
            {s.hero.states.flowTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm text-[#A6AEBD] md:text-base">
            {s.hero.states.flowNote}
          </p>
        </motion.div>

        {/* STATE 04 — output */}
        <motion.div
          style={{ opacity: finalOpacity }}
          className="pointer-events-none absolute inset-x-5 top-1/2 z-10 -translate-y-1/2"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#3D7BFF]">
            {s.hero.states.finalKicker}
          </p>
          <h2 className="mt-4 font-heading text-5xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA] md:text-8xl">
            {s.hero.states.finalTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm text-[#A6AEBD] md:text-base">
            {s.hero.states.finalNote}
          </p>
        </motion.div>

        {/* Bottom HUD — pipeline stages + progress readout */}
        <div className="absolute inset-x-5 bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] md:inset-x-10 md:bottom-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {s.hero.stages.map((st, i) => (
              <span
                key={st}
                className={`flex items-center gap-1.5 transition-colors duration-300 ${
                  i === stage
                    ? "text-[#5CDBEA]"
                    : i < stage
                      ? "text-[#8A93A6]"
                      : "text-[#3A4358]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1 w-1 ${
                    i === stage ? "bg-[#5CDBEA]" : i < stage ? "bg-[#3D7BFF]" : "bg-[#2A3550]"
                  }`}
                />
                {st}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-[#8A93A6]">
            <motion.span aria-hidden="true">{pct}</motion.span>
            <motion.span style={{ opacity: cueOpacity }} className="flex items-center gap-2">
              <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
              {s.hero.scroll}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}