import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Shared vocabulary of the project archive: mono labels, one easing, a rule that draws itself. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";

/** A hairline that draws itself when it enters the viewport. */
export function Rule({ className = "", delay = 0, vertical = false }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={reduced ? false : vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduced ? 0 : 0.9, delay, ease: EASE }}
      className={cn("block", vertical ? "h-full w-px origin-top" : "h-px w-full origin-left", className)}
    />
  );
}

/** Two mono labels on one line, the archive's way of annotating a moment. */
export function Meta({ left, right = undefined, className = "" }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6", className)}>
      <p className={cn(MONO, "text-muted-foreground")}>{left}</p>
      {right && <p className={cn(MONO, "hidden text-muted-foreground sm:block")}>{right}</p>}
    </div>
  );
}
