import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The solution bubble — a soft, slightly asymmetric organic surface
 * that presents the solution of the hovered / focused / tapped
 * problem. Calm premium motion, no jelly.
 */
export default function CrmSolutionBubble({ pain, howLabel }) {
  return (
    <div
      id="crm-solutions"
      aria-live="polite"
      className="relative rounded-[44px_60px_48px_68px] border border-accent/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.94),rgba(49,87,246,0.05))] p-7 shadow-[0_36px_70px_-28px_rgba(49,87,246,0.35)] backdrop-blur-[3px] md:p-9"
    >
      <span
        aria-hidden="true"
        className="absolute right-10 top-7 h-1.5 w-1.5 rounded-full bg-accent/50"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pain.title}
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: EASE }}
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