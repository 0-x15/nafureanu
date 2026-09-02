import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed 12-column drafting grid with hairline separators.
 * Lines "draw" themselves from top to bottom on first load.
 * Desktop only; hidden on touch-sized screens.
 */
export default function GridOverlay() {
  const reduce = useReducedMotion();
  const lines = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="h-full border-l border-[#1E2530]/60 last:border-r" />
  ));
  const innerClass =
    "absolute inset-0 mx-auto hidden max-w-[1440px] grid-cols-12 px-5 md:grid md:px-10";

  if (reduce) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className={innerClass}>{lines}</div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className={innerClass}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {lines}
      </motion.div>
    </div>
  );
}