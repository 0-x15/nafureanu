import { cn } from "@/lib/utils";

/** Vocabulary of the design page: acts that breathe, one type system, no boxes. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const SERIF = "font-[Fraunces,Georgia,serif]";

const ACTS = { page: "bg-background", white: "bg-white" };

/**
 * An act of the page. It carries a quiet index in its margin and the
 * label the wireframe state prints on it (message, context, proof…):
 * in that state the page annotates its own hierarchy.
 */
export function Act({ id = undefined, tone = "page", index = undefined, wireLabel = undefined, className = "", children, ...rest }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} data-wire-label={wireLabel} className={cn("wd-act relative scroll-mt-20 px-5 py-24 md:px-10 md:py-40", ACTS[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">
        {index && <p className={cn(MONO, "mb-10 text-muted-foreground md:mb-14")}>{index}</p>}
        {children}
      </div>
    </section>
  );
}

/** Oversized editorial statement; the second line is muted. */
export function Statement({ id = undefined, a, b = undefined, as = "h2", className = "", size = "text-[clamp(2.2rem,5.4vw,5rem)]" }) {
  const Tag = /** @type {any} */ (as);
  return (
    <Tag id={id} className={cn("font-heading font-bold leading-[0.98] tracking-[-0.04em] text-foreground [text-wrap:balance]", size, className)}>
      <span className="block">{a}</span>
      {b && <span className="block text-muted-foreground">{b}</span>}
    </Tag>
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
