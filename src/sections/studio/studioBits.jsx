import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** The Studio's own visual system: a corporate dossier. Fine rules, small type, document surfaces. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const H1 = "font-heading text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground [text-wrap:balance]";
export const H2 = "font-heading text-[clamp(1.55rem,2.5vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground [text-wrap:balance]";
export const H3 = "font-heading text-[clamp(1.1rem,1.4vw,1.3rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground";

/** A hairline that draws itself when it enters the viewport. */
export function Rule({ className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: reduced ? 0 : 0.9, delay, ease: EASE }} className={cn("block h-px w-full origin-left bg-foreground/15", className)} />;
}

/** An act of the profile: index in the margin, a drawn rule, the act's own spacing. */
export function Act({ id, index, className = "", children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-20 px-5 md:px-10", className)}>
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-baseline justify-between gap-6">
          <p className={cn(MONO, "text-accent")}>{index.n} — {index.label}</p>
          <p className={cn(MONO, "hidden text-muted-foreground sm:block")}>{index.meta}</p>
        </div>
        <Rule className="mt-3" />
        {children}
      </div>
    </section>
  );
}

/** A document surface: white sheet, hairline frame, a header row of metadata. */
export function Sheet({ title, meta = undefined, className = "", bodyClassName = "", children }) {
  return (
    <div className={cn("border border-foreground/12 bg-white", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-foreground/12 px-5 py-3 md:px-6">
        <span className={cn(MONO, "text-foreground/80")}>{title}</span>
        {meta && <span className={cn(MONO, "text-muted-foreground")}>{meta}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Small reveal for rows and blocks: opacity and a short rise, no theatre. */
export function Fade({ delay = 0, className = "", children }) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: reduced ? 0 : 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}
