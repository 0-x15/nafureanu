import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Typography and a few marks shared by the Studio rooms. Each room composes its own layout. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const H1 = "font-heading text-[clamp(2.1rem,3.8vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]";
export const H2 = "font-heading text-[clamp(1.6rem,2.6vw,2.5rem)] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]";
export const STATEMENT = "font-heading text-[clamp(1.5rem,2.4vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.025em] [text-wrap:balance]";

/** The act index: a mono coordinate, no rule attached. */
export function Index({ children, meta = undefined, className = "" }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6", className)}>
      <p className={cn(MONO, "text-accent")}>{children}</p>
      {meta && <p className={cn(MONO, "hidden text-muted-foreground sm:block")}>{meta}</p>}
    </div>
  );
}

/** A quiet reveal for a block. Used sparingly: the compositions must stand still. */
export function Fade({ delay = 0, className = "", children }) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: reduced ? 0 : 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

/** A line that draws itself (horizontal by default). */
export function Draw({ vertical = false, delay = 0, className = "" }) {
  const reduced = useReducedMotion();
  return <motion.span aria-hidden="true" initial={reduced ? false : (vertical ? { scaleY: 0 } : { scaleX: 0 })} whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: reduced ? 0 : 0.9, delay, ease: EASE }} className={cn("block", vertical ? "h-full w-px origin-top" : "h-px w-full origin-left", className)} />;
}
