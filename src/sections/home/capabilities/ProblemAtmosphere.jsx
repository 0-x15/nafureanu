import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const PLANE = "rounded-lg border border-white/60 bg-white/35 shadow-[0_30px_60px_-40px_rgba(12,18,32,0.3)] backdrop-blur-[3px]";

/*
 * Atmospheric metaphor: problem → system. Thin translucent planes
 * evolve from scattered fragments to an aligned, connected
 * structure as the visitor moves between situations. Abstract,
 * never a diagram.
 */
const STATES = [
  /* 01 — fragmented: scattered and disaligned */
  [
    "left-[5%] top-[8%] h-[18%] w-[32%] -rotate-6 opacity-70",
    "right-[10%] top-[22%] h-[15%] w-[26%] rotate-6 opacity-60",
    "left-[22%] top-[46%] h-[13%] w-[38%] rotate-3 opacity-50",
    "right-[4%] bottom-[12%] h-[17%] w-[30%] -rotate-3 opacity-65",
  ],
  /* 02 — alignment: turning toward each other, still separated */
  [
    "left-[7%] top-[12%] h-[19%] w-[32%] -rotate-2 opacity-75",
    "right-[13%] top-[12%] h-[19%] w-[30%] rotate-2 opacity-75",
    "left-[7%] top-[44%] h-[17%] w-[32%] rotate-1 opacity-70",
    "right-[13%] top-[44%] h-[17%] w-[30%] -rotate-1 opacity-70",
  ],
  /* 03 — structure: aligned, quiet gaps between planes */
  [
    "left-[7%] top-[14%] h-[21%] w-[36%] opacity-80",
    "right-[7%] top-[14%] h-[21%] w-[36%] opacity-80",
    "left-[7%] top-[46%] h-[21%] w-[36%] opacity-80",
    "right-[7%] top-[46%] h-[21%] w-[36%] opacity-80",
  ],
  /* 04 — connected system: structure plus a quiet thread */
  [
    "left-[7%] top-[14%] h-[21%] w-[36%] opacity-85",
    "right-[7%] top-[14%] h-[21%] w-[36%] opacity-85",
    "left-[7%] top-[46%] h-[21%] w-[36%] opacity-85",
    "right-[7%] top-[46%] h-[21%] w-[36%] opacity-85",
  ],
];

export default function ProblemAtmosphere({ active }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <AnimatePresence>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {STATES[active].map((cls, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.08 + i * 0.07, ease: EASE }}
              className={cn("absolute", PLANE, cls)}
            />
          ))}
          {active === 3 && (
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="absolute left-[7%] right-[7%] top-[38.5%] h-px origin-left bg-accent/40"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}