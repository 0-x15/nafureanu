import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* A genuinely irregular, asymmetric soft blob — not a rounded rect */
const BLOB =
  "M62 26 C168 -2 330 4 438 30 C546 56 604 108 591 178 C578 250 512 298 414 311 C316 324 186 316 102 287 C18 258 -10 194 10 130 C28 76 40 40 62 26 Z";

/**
 * The solution bubble — an organic blob-shaped overlay drawn as a
 * real SVG path (soft white with a subtle cobalt tint, layered
 * depth shadow, thin edge), carrying the real CRM solution of the
 * hovered / focused / tapped problem.
 */
export default function CrmSolutionBubble({ pain, howLabel }) {
  return (
    <div className="relative">
      {/* Blob shape */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 320"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="crm-blob-fill" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#E8EEFC" stopOpacity="0.94" />
          </linearGradient>
          <filter
            id="crm-blob-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="150%"
          >
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="18"
              floodColor="#3157F6"
              floodOpacity="0.26"
            />
          </filter>
        </defs>
        <path
          d={BLOB}
          fill="url(#crm-blob-fill)"
          stroke="rgba(49,87,246,0.18)"
          strokeWidth="1"
          filter="url(#crm-blob-shadow)"
        />
      </svg>

      <div className="relative p-7 md:p-10">
        <span
          aria-hidden="true"
          className="absolute right-8 top-9 h-1.5 w-1.5 rounded-full bg-accent/50"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pain.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
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
        </AnimatePresence>
      </div>
    </div>
  );
}