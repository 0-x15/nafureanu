import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import VISUALS from "./visuals";
import CapabilityFacts from "./CapabilityFacts";

const EASE = [0.22, 1, 0.36, 1];

/* Subtle light field per capability — same ivory, one quiet accent. */
const TINTS = [
  "bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)]",
  "bg-[radial-gradient(closest-side,rgba(20,160,190,0.10),transparent)]",
  "bg-[radial-gradient(closest-side,rgba(24,40,90,0.10),transparent)]",
  "bg-[radial-gradient(closest-side,rgba(14,165,190,0.10),transparent)]",
  "bg-[radial-gradient(closest-side,rgba(139,124,246,0.10),transparent)]",
  "bg-[radial-gradient(closest-side,rgba(24,40,90,0.12),transparent)]",
];

/* Choreography: previous scene leaves blurred and rising; the next
   assembles in layers — headline, copy, visual, facts (evidence and
   CTA settle last). */
const rise = (delay) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.55, delay, ease: EASE },
});

export default function CapabilityScene({ capabilities, active, lang, labels }) {
  const cap = capabilities[active];
  const Visual = VISUALS[active];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -16,
            filter: "blur(8px)",
            transition: { duration: 0.3, ease: EASE },
          }}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -top-10 right-0 z-0 h-[360px] w-[420px] rounded-full blur-[90px]",
              TINTS[active]
            )}
          />
          <motion.h3
            {...rise(0)}
            className="relative z-10 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground"
          >
            {cap.headline}
          </motion.h3>
          <motion.p
            {...rise(0.06)}
            className="relative z-10 mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {cap.copy}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            aria-hidden="true"
            className="relative z-10 mt-8 h-[280px] w-full"
          >
            <Visual />
          </motion.div>
          <motion.div {...rise(0.24)} className="relative z-10">
            <CapabilityFacts cap={cap} lang={lang} labels={labels} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}