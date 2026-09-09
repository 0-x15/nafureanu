import { cn } from "@/lib/utils";

/** Vocabulary of the SaaS page: acts, editorial statements, sketch marks. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";

const ACTS = {
  page: "",
  white: "bg-white",
  studio: "bg-[#F7F8FB] [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:48px_48px]",
  proof: "bg-[#F2F5FA]",
};

/** An act of the story: wider vertical rhythm than a chapter, and only four backgrounds on the whole page. */
export function Act({ id = undefined, tone = "page", className = "", children, ...rest }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("scroll-mt-20 px-5 py-20 md:px-10 md:py-28", ACTS[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

/** A large two-line editorial statement; the second line is muted. */
export function Statement({ id = undefined, a, b = undefined, as = "h2", className = "" }) {
  const Tag = /** @type {any} */ (as);
  return (
    <Tag id={id} className={cn("max-w-4xl font-heading text-3xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground md:text-5xl lg:text-[3.4rem] [text-wrap:balance]", className)}>
      <span className="block">{a}</span>
      {b && <span className="block text-muted-foreground">{b}</span>}
    </Tag>
  );
}

/** A small product annotation: a dash and mono text. */
export function Note({ children, tone = "muted", className = "" }) {
  return <p className={cn(MONO, "flex items-center gap-2", tone === "accent" ? "text-accent" : "text-muted-foreground", className)}><span aria-hidden="true" className={cn("h-px w-4", tone === "accent" ? "bg-accent" : "bg-foreground/30")} />{children}</p>;
}

/** Selection handles around a sketched element. */
export function Handles({ className = "" }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => <i key={p} className={cn("absolute h-2 w-2 border border-accent bg-white", p)} />)}
    </span>
  );
}

/** A wireframe block: grey bars standing in for content. */
export function Wire({ lines = 2, className = "" }) {
  return (
    <span aria-hidden="true" className={cn("block space-y-1.5", className)}>
      {Array.from({ length: lines }).map((_, i) => <i key={i} className="block h-1.5 rounded-[2px] bg-foreground/15" style={{ width: `${[72, 48, 60, 40][i % 4]}%` }} />)}
    </span>
  );
}

/** A version or state tag. tone: neutral | accent | ok */
export function Tag({ children, tone = "neutral", className = "" }) {
  const t = { neutral: "border-border bg-white text-foreground/75", accent: "border-accent/40 bg-[#EEF3FC] text-accent-deep", solid: "border-accent bg-accent text-white", ok: "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]", warn: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]", muted: "border-border bg-[#F6F8FB] text-muted-foreground" }[tone];
  return <span className={cn("inline-flex items-center rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", t, className)}>{children}</span>;
}

/** Roving-tabindex keyboard handler for tablists. */
export function tabKey(e, i, n, select) {
  const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 };
  if (!(e.key in map)) return;
  e.preventDefault();
  const j = Math.min(n - 1, Math.max(0, map[e.key]));
  select(j);
  e.currentTarget.closest("[role=tablist]")?.querySelectorAll("[role=tab]")?.[j]?.focus();
}
