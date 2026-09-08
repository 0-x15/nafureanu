import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Vocabulary of the design page: a controlled type scale, registration marks, one designed control. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const SERIF = "font-[Fraunces,Georgia,serif]";
/* Section heading: strong, never huge. ~36–52px depending on viewport. */
export const H2 = "font-heading text-[clamp(1.85rem,3.2vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground [text-wrap:balance]";
export const H3 = "font-heading text-[clamp(1.25rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-foreground";

/** Semantic act wrapper. Spacing is the act's own decision, passed in className. */
export function Act({ id = undefined, tone = "page", className = "", children, ...rest }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("relative scroll-mt-20 px-5 md:px-10", tone === "white" && "bg-white", className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

/** The act index in the margin. */
export function Index({ children, className = "" }) {
  return <p className={cn(MONO, "text-muted-foreground", className)}>{children}</p>;
}

/** Registration mark: a small crosshair with a coordinate. Recurs across the page as visual continuity. */
export function Reg({ label = undefined, tone = "accent", className = "" }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-2", tone === "accent" ? "text-accent" : "text-foreground/50", className)}>
      <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" /><circle cx="6" cy="6" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
      {label && <span className={MONO}>{label}</span>}
    </span>
  );
}

/**
 * The page's one control: a typographic segmented selector. The active
 * item carries a cobalt underline that slides between items. Keyboard
 * roving tabindex, visible focus, hover, touch-sized targets.
 */
export function Segmented({ items, value, onChange, label, idPrefix, controls = undefined, size = "md", className = "" }) {
  const reduced = useReducedMotion();
  const k = items.findIndex((it) => it.id === value);
  const select = (i) => onChange(items[i].id);
  return (
    <div role="tablist" aria-label={label} className={cn("relative flex flex-wrap gap-x-6 gap-y-1 border-b border-foreground/12", className)}>
      {items.map((it, i) => {
        const on = i === k;
        return (
          <button key={it.id} type="button" role="tab" id={`${idPrefix}-${it.id}`} aria-selected={on} aria-controls={controls} tabIndex={on ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, i, items.length, select)} className={cn("group relative -mb-px flex min-h-[44px] items-baseline gap-2 pb-2.5 pt-2 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "text-foreground" : "text-foreground/45 hover:text-foreground/85")}>
            {it.n && <span className={cn(MONO, "transition-colors", on ? "text-accent" : "text-current")}>{it.n}</span>}
            <span className={cn("font-heading font-bold tracking-[-0.02em]", size === "lg" ? "text-xl md:text-2xl" : size === "sm" ? "text-[14px]" : "text-[17px]")}>{it.label}</span>
            {on && <motion.span layoutId={`${idPrefix}-underline`} transition={{ duration: reduced ? 0 : 0.45, ease: EASE }} className="absolute -bottom-px left-0 right-0 h-[2px] bg-accent" />}
          </button>
        );
      })}
    </div>
  );
}

/** Roving-tabindex keyboard handler for tablists; moves focus itself. */
export function tabKey(e, i, n, select) {
  const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 };
  if (!(e.key in map)) return;
  e.preventDefault();
  const j = Math.min(n - 1, Math.max(0, map[e.key]));
  select(j);
  e.currentTarget.closest("[role=tablist]")?.querySelectorAll("[role=tab]")?.[j]?.focus();
}
