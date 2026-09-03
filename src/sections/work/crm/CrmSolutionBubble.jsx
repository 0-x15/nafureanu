import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The solution bubble — an organic, slightly irregular floating
 * surface (asymmetric blob radii, soft cobalt tint, layered depth
 * shadow). It lives in a reserved zone ABOVE the problem list and
 * presents the solution of the hovered / focused / tapped problem.
 */
export default function CrmSolutionBubble({ pain, howLabel }) {
  return (
    <div
      id="crm-solutions"
      aria-live="polite"
      className="relative max-w-2xl border border-accent/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.95),rgba(49,87,246,0.06))] p-7 shadow-[0_40px_80px_-32px_rgba(49,87,246,0.35),0_12px_28px_-14px_rgba(12,18,32,0.12)] backdrop-blur-[3px] md:-rotate-1 md:p-9"
      style={{ borderRadius: "32% 26% 36% 30% / 30% 24% 40% 34%" }}
    >
      <span
        aria-hidden="true"
        className="absolute right-12 top-9 h-1.5 w-1.5 rounded-full bg-accent/50"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pain.title}
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {howLabel}
          </p>
          <p className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {pain.solutionTitle}
          </p>
          <p className="mt-4 text-sm leading-[1.75] text-muted-foreground">
            {pain.solution}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}