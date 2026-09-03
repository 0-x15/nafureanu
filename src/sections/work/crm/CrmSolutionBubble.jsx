import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/*
 * The organic blob — uneven flowing curves on every edge: waves on
 * top, a bulging right flank, a rippled bottom and an asymmetric
 * left side with an inward pinch. No straight runs anywhere.
 */
export const CRM_BLOB =
  "M88 44 C120 12 180 30 232 18 C268 10 258 34 312 14 C376 -8 448 6 518 32 C572 52 606 92 590 148 C578 194 602 240 556 284 C506 328 420 296 342 318 C268 338 170 330 100 296 C42 266 8 218 24 156 C36 106 0 64 46 40 C60 32 76 52 88 44 Z";

/**
 * The big solution bubble — a real organic bubble: only the shape,
 * its gradient fill and its subtle outline. No shadow of any kind.
 * Generous interior padding keeps everything comfortably inside.
 */
export default function CrmSolutionBubble({ pain, howLabel }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 600 340"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crm-blob-fill" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#E7EDFB" stopOpacity="0.94" />
          </linearGradient>
        </defs>
        <path
          d={CRM_BLOB}
          fill="url(#crm-blob-fill)"
          stroke="rgba(49,87,246,0.2)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative p-12 md:p-14">
        <span
          aria-hidden="true"
          className="absolute right-11 top-11 h-1.5 w-1.5 rounded-full bg-accent/50"
        />
        <motion.div
          key={pain.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {howLabel}
          </p>
          <p className="mt-3 font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
            {pain.solutionTitle}
          </p>
          <p className="mt-3 text-[13px] leading-[1.7] text-muted-foreground md:text-sm">
            {pain.solution}
          </p>
        </motion.div>
      </div>
    </div>
  );
}