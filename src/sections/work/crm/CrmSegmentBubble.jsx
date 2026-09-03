import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/*
 * The organic blob — uneven flowing curves on every edge: waves on
 * top, a bulging right flank, a rippled bottom and an asymmetric
 * left side with an inward pinch. No straight runs anywhere.
 */
const CRM_BLOB =
  "M88 44 C120 12 180 30 232 18 C268 10 258 34 312 14 C376 -8 448 6 518 32 C572 52 606 92 590 148 C578 194 602 240 556 284 C506 328 420 296 342 318 C268 338 170 330 100 296 C42 266 8 218 24 156 C36 106 0 64 46 40 C60 32 76 52 88 44 Z";

/**
 * The small segment bubble for the conceptual "El problema" visual —
 * an organic silhouette in translucent white with a soft cobalt tint,
 * and a shadow cast by the blurred duplicate of the real blob contour
 * (never a box).
 */
export default function CrmSegmentBubble({ text }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 600 340"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crm-seg-fill" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#E9EFFC" stopOpacity="0.94" />
          </linearGradient>
          <filter
            id="crm-seg-soften"
            x="-30%"
            y="-30%"
            width="160%"
            height="170%"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        {/* Shape-true shadow — the same silhouette, blurred and offset */}
        <path
          d={CRM_BLOB}
          transform="translate(1,9)"
          fill="rgba(49,87,246,0.22)"
          filter="url(#crm-seg-soften)"
        />
        <path
          d={CRM_BLOB}
          fill="url(#crm-seg-fill)"
          stroke="rgba(49,87,246,0.16)"
          strokeWidth="1.6"
        />
      </svg>

      <div className="relative p-6">
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="text-[12px] font-medium leading-[1.6] text-[#3A4254]"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}