import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/*
 * A genuinely irregular organic blob — uneven, flowing curves on
 * every edge, no straight runs, no rectangular base. The whole
 * silhouette undulates: waves on top, a bulging right flank, a
 * rippled bottom and an asymmetric left side.
 */
const BLOB =
  "M84 38 C150 8 230 32 300 16 C370 0 452 8 522 30 C576 48 604 96 588 152 C576 198 600 246 552 286 C502 326 414 298 338 316 C262 334 162 328 98 294 C44 266 6 216 22 158 C36 110 2 66 52 42 C62 36 74 44 84 38 Z";

/**
 * The solution bubble — a real organic bubble: the shape, its edge
 * and its shadow are all the same SVG path, so the depth is cast by
 * the actual silhouette (no rectangular wrapper, no box shadow).
 * Generous interior padding keeps label, title and explanation
 * safely inside the flowing contour.
 */
export default function CrmSolutionBubble({ pain, howLabel }) {
  return (
    <div className="relative">
      {/* Organic shape + contour-following shadow */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 340"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="crm-blob-fill" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#E7EDFB" stopOpacity="0.94" />
          </linearGradient>
          <filter
            id="crm-blob-shadow"
            x="-25%"
            y="-25%"
            width="150%"
            height="160%"
          >
            {/* ambient depth hugging the silhouette */}
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="14"
              floodColor="#3157F6"
              floodOpacity="0.16"
            />
            {/* directional cobalt depth, also shape-matched */}
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="22"
              floodColor="#3157F6"
              floodOpacity="0.24"
            />
          </filter>
        </defs>
        <path
          d={BLOB}
          fill="url(#crm-blob-fill)"
          stroke="rgba(49,87,246,0.2)"
          strokeWidth="1"
          filter="url(#crm-blob-shadow)"
        />
      </svg>

      <div className="relative p-10 md:p-12">
        <span
          aria-hidden="true"
          className="absolute right-10 top-10 h-1.5 w-1.5 rounded-full bg-accent/50"
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