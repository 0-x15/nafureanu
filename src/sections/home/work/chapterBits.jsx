import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small shared primitives for the proof chapters. Each chapter keeps its
 * own art direction — these are quiet typographic atoms, not cards.
 */

/** Corner identification: index, product name and its role. */
export function ProjectTag({ index, name, role, dark = false }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono text-xs tracking-widest text-accent">{index}</span>
      <span
        className={cn(
          "font-heading text-lg font-bold tracking-tight",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {name}
      </span>
      <span className={cn("text-sm", dark ? "text-white/50" : "text-muted-foreground")}>
        {role}
      </span>
    </div>
  );
}

/** Proof figures — large numbers, quiet labels. */
export function ProofRow({ items, dark = false }) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-5">
      {items.map((p) => (
        <p key={p.label}>
          <span
            className={cn(
              "block font-heading text-4xl font-bold tracking-[-0.03em] md:text-5xl",
              dark ? "text-white" : "text-foreground"
            )}
          >
            {p.value}
          </span>
          <span
            className={cn(
              "mt-1 block text-xs",
              dark ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {p.label}
          </span>
        </p>
      ))}
    </div>
  );
}

/** Capabilities as a quiet inline list — never feature cards. */
export function CapLine({ items, dark = false }) {
  return (
    <p
      className={cn(
        "max-w-xl text-[13px] leading-relaxed",
        dark ? "text-white/55" : "text-[#5A6070]"
      )}
    >
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && (
            <span aria-hidden="true" className="mx-2 text-accent">
              ·
            </span>
          )}
          {item}
        </span>
      ))}
    </p>
  );
}

/** Technology as supporting evidence, in monospace, kept quiet. */
export function TechLine({ children, dark = false }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-wide",
        dark ? "text-white/35" : "text-muted-foreground/70"
      )}
    >
      {children}
    </p>
  );
}

/** Commercial takeaway — why this project matters to a potential client. */
export function Takeaway({ kicker, text, to, cta, dark = false }) {
  return (
    <div className="max-w-md border-l-2 border-accent pl-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
        {kicker}
      </p>
      <p
        className={cn(
          "mt-3 text-base leading-relaxed",
          dark ? "text-white/75" : "text-foreground/80"
        )}
      >
        {text}
      </p>
      {to && (
        <Link
          to={to}
          className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}