import { motion, useReducedMotion } from "framer-motion";

const DRIFT_SLOW = { duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };
const DRIFT_MED = { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

/**
 * Environmental architecture for "Qué construimos" — the quiet
 * introduction to the studio's glass material language. Sits behind
 * the capability experience (z-0), never wraps it. Deliberately
 * calmer than ProblemCanvas, which continues the language with a
 * stronger, scroll-driven expression.
 */
export default function BuildAtmosphere() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Ambient light — cobalt bloom behind the scene, cyan reflection,
          warm counterpoint near the navigation side */}
      <span className="absolute right-[4%] top-[8%] h-[64%] w-[52%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
      <span className="absolute bottom-[4%] left-[2%] h-[44%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)]" />
      <span className="absolute left-[10%] top-[10%] h-[42%] w-[32%] rounded-full bg-[radial-gradient(closest-side,rgba(255,252,244,0.6),transparent)]" />

      {/* Plane 1 — broad surface behind the CapabilityScene */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={DRIFT_MED}
        className="absolute right-[1%] top-[30%] hidden h-[33vh] w-[52vw] -rotate-3 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(43,89,255,0.35)] backdrop-blur-[28px] md:block"
      />
      {/* Plane 2 — distant lower-left surface */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 12, 0], x: [0, -8, 0] }}
        transition={DRIFT_SLOW}
        className="absolute bottom-[6%] left-[-3%] hidden h-[32vh] w-[46vw] rotate-2 rounded-[42px] border border-white/60 bg-[linear-gradient(130deg,rgba(255,255,255,0.45),rgba(43,89,255,0.06),rgba(255,255,255,0.12))] backdrop-blur-[30px] md:block"
      />
      {/* Plane 3 — narrow light surface crossing the background */}
      <motion.div
        animate={reduce ? undefined : { rotate: [-6, -3, -6] }}
        transition={DRIFT_SLOW}
        className="absolute left-[34%] top-[52%] hidden h-[12vh] w-[44vw] rounded-full border border-white/50 bg-white/20 backdrop-blur-[18px] md:block"
      />

      {/* Mobile — simplified: one very faint plane over the blooms */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={DRIFT_MED}
        className="absolute left-[-10%] top-[12%] h-[24vh] w-[80vw] -rotate-3 rounded-[32px] border border-white/60 bg-white/25 backdrop-blur-[18px] md:hidden"
      />
    </div>
  );
}