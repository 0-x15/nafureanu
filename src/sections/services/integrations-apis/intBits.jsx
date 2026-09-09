import { cn } from "@/lib/utils";

/** Vocabulary of the Integrations page: acts, statements, and the marks of data in transit. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";

const ACTS = {
  page: "",
  white: "bg-white",
  ledger: "bg-white [background-image:repeating-linear-gradient(180deg,transparent_0,transparent_39px,rgba(15,23,42,0.045)_39px,rgba(15,23,42,0.045)_40px)]",
  lab: "bg-[#F3F4F7]",
};

/** An act of the story: wider vertical rhythm than a chapter, four backgrounds on the whole page. */
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

/** Delivery tones. Each carries a glyph, so the meaning never depends on colour alone. */
const TONES = {
  neutral: { cls: "border-border bg-white text-foreground/75", glyph: "·" },
  transit: { cls: "border-accent/40 bg-[#EEF3FC] text-accent-deep", glyph: "→" },
  ok: { cls: "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]", glyph: "✓" },
  warn: { cls: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]", glyph: "!" },
  fail: { cls: "border-[#F1B3AC] bg-[#FEF1F0] text-[#A4261B]", glyph: "×" },
  muted: { cls: "border-border bg-[#F6F8FB] text-muted-foreground", glyph: "" },
};

/** A delivery state: RECEIVED, DELIVERED, FAILED… */
export function Stamp({ children, tone = "neutral", glyph = true, className = "" }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", t.cls, className)}>
      {glyph && t.glyph && <span aria-hidden="true">{t.glyph}</span>}
      {children}
    </span>
  );
}

/** A system: a boxed surface with a mono label in its header. tone: neutral | accent | fail */
export function Sys({ label, meta = undefined, tone = "neutral", className = "", bodyClassName = "", children }) {
  return (
    <div className={cn("rounded-[10px] border bg-white transition-colors", tone === "accent" ? "border-accent" : tone === "fail" ? "border-[#E39A91]" : "border-border", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border/80 px-3 py-2">
        <span className={cn(MONO, "text-foreground/80")}>{label}</span>
        {meta}
      </div>
      <div className={cn("p-3", bodyClassName)}>{children}</div>
    </div>
  );
}

/** One key/value line of a payload. tone: neutral | changed | ghost | error */
export function Field({ k, v, tone = "neutral" }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3 py-1 font-mono text-[11px]", tone === "ghost" && "opacity-40")}>
      <span className="text-muted-foreground">{k}</span>
      <span className={cn("truncate text-right", tone === "changed" ? "font-semibold text-accent-deep" : tone === "error" ? "text-[#A4261B]" : "text-foreground")}>{v}</span>
    </div>
  );
}

/** The travelling unit of data. */
export function Packet({ className = "" }) {
  return <i aria-hidden="true" className={cn("block h-2.5 w-2.5 rounded-[2px] bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.15)]", className)} />;
}

/** A small annotation: a dash and mono text. */
export function Note({ children, tone = "muted", className = "" }) {
  return (
    <p className={cn(MONO, "flex items-center gap-2", tone === "accent" ? "text-accent" : "text-muted-foreground", className)}>
      <span aria-hidden="true" className={cn("h-px w-4", tone === "accent" ? "bg-accent" : "bg-foreground/30")} />
      {children}
    </p>
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
