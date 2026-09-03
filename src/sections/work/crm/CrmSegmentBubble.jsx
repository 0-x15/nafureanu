import { motion } from "framer-motion";
import { CRM_BLOB } from "./CrmSolutionBubble";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The small segment bubble for the conceptual "El problema" visual —
 * the same organic silhouette as the big solution bubble, scaled
 * down: translucent white with a soft cobalt tint, and a shadow cast
 * by the blurred duplicate of the real blob contour (never a box).
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