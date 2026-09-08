import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Vocabulary of the design page: acts that breathe, marks in the margins, real shots. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";
export const SERIF = "font-[Fraunces,Georgia,serif]";

const ACTS = { page: "bg-background", white: "bg-white", paper: "bg-[#F3F1EA]", ink: "bg-[#111111] text-white" };

/** An act: more vertical air than any chapter, and only four grounds on the page. */
export function Act({ id = undefined, tone = "page", className = "", children, ...rest }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("scroll-mt-20 px-5 py-24 md:px-10 md:py-36", ACTS[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

/** Oversized editorial statement; the second line is muted. */
export function Statement({ id = undefined, a, b = undefined, as = "h2", className = "", muted = "text-muted-foreground" }) {
  const Tag = /** @type {any} */ (as);
  return (
    <Tag id={id} className={cn("max-w-5xl font-heading text-[clamp(2.1rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em] [text-wrap:balance]", className)}>
      <span className="block">{a}</span>
      {b && <span className={cn("block", muted)}>{b}</span>}
    </Tag>
  );
}

/** A mark in the margin: number, label, a short note. The page annotates itself. */
export function Mark({ n = undefined, label, children = undefined, tone = "accent", className = "" }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <span aria-hidden="true" className={cn("mt-[6px] h-px w-5 shrink-0", tone === "accent" ? "bg-accent" : "bg-current opacity-40")} />
      <div className="min-w-0">
        <p className={cn(MONO, tone === "accent" ? "text-accent" : "opacity-70")}>{n ? `${n} · ${label}` : label}</p>
        {children && <p className="mt-1 text-[13px] leading-[1.55] opacity-80">{children}</p>}
      </div>
    </div>
  );
}

/** Small caption under a visual. */
export function Caption({ children, className = "" }) {
  return <p className={cn(MONO, "text-muted-foreground", className)}>{children}</p>;
}

const SHOTS = { desktop: [2400, 1500, true], detail: [2000, 1250, true], detail2: [2000, 1250, false], mobile: [780, 1688, false], tall: [2000, 3750, false] };
const asset = (id, file) => `/work/web-projects/${id}/${file}.webp`;

/** A real project capture: responsive sources, stable dimensions, lazy by default. */
export function Shot({ id, file, alt, sizes = "(min-width: 1024px) 60vw, 92vw", priority = false, className = "", height = undefined }) {
  const [w, h, md] = SHOTS[file] || [2400, 1500, false];
  return (
    <img
      src={md ? asset(id, `${file}-md`) : asset(id, file)}
      srcSet={md ? `${asset(id, `${file}-md`)} 1200w, ${asset(id, file)} ${w}w` : undefined}
      sizes={md ? sizes : undefined}
      width={w}
      height={height ?? h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-auto w-full", className)}
    />
  );
}

/** External link to a live site: opens in a new tab and says so. */
export function Ext({ href, label, hint, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground underline decoration-foreground/30 underline-offset-4 outline-none transition-colors hover:decoration-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", className)}>
      {label}
      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
      <span className="sr-only">· {hint}</span>
    </a>
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
