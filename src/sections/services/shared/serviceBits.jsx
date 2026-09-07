import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Shared pieces of the service pages: chapters, heads, surfaces and small type. */
const TONES = { page: "bg-background", white: "bg-white", blue: "bg-[#F2F5FA]" };

export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";

/** A chapter: `id` lands on the section (anchor target) and labels it by its own h2. */
export function Chapter({ id = undefined, tone = "page", className = "", children, ...rest }) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn("scroll-mt-20 border-t border-border px-5 py-16 md:px-10 md:py-24 lg:scroll-mt-28", TONES[tone], className)}
      {...rest}
    >
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function ChapterHead({ kicker, title, titleMuted = undefined, intro = undefined, id = undefined, className = "" }) {
  return (
    <Reveal className={className}>
      <p className={KICKER}>{kicker}</p>
      <h2 id={id ? `${id}-title` : undefined} className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground md:text-5xl [text-wrap:balance]">
        {titleMuted && <span className="block text-muted-foreground">{titleMuted}</span>}
        <span className="block">{title}</span>
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function Num({ n, className = "" }) {
  return <span className={cn("font-mono text-[11px] tracking-[0.18em] text-accent", className)}>{String(n).padStart(2, "0")}</span>;
}

/** The closing line of a chapter — the "why it matters" beat. */
export function Closing({ children, className = "", delay = 0.1 }) {
  return (
    <Reveal delay={delay}>
      <p className={cn("mt-10 max-w-3xl font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl", className)}>{children}</p>
    </Reveal>
  );
}

/** Title + text points, in a thin-ruled grid. */
export function Points({ items, cols = 2, className = "" }) {
  return (
    <ul className={cn("grid border-t border-border", cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2", className)}>
      {items.map((it) => (
        <li key={it.title} className="border-b border-border py-5 pr-6">
          <p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{it.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** A framed, fictional interface surface: thin chrome bar + content. */
export function Surface({ title = undefined, meta = undefined, className = "", bodyClassName = "", children }) {
  return (
    <div className={cn("overflow-hidden rounded-[10px] border border-border bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_18px_40px_-28px_rgba(15,23,42,0.28)]", className)}>
      {(title || meta) && (
        <div className="flex items-center justify-between gap-4 border-b border-border bg-[#FAFBFD] px-4 py-2.5">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-border" /><i className="h-1.5 w-1.5 rounded-full bg-border" /><i className="h-1.5 w-1.5 rounded-full bg-border" /></span>
            {title && <span className={cn(MONO, "text-foreground/70")}>{title}</span>}
          </span>
          {meta && <span className={cn(MONO, "text-muted-foreground")}>{meta}</span>}
        </div>
      )}
      <div className={cn("p-4 md:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** A small state pill. tone: neutral | accent | done | warn | soft */
const PILLS = {
  neutral: "border-border bg-white text-foreground/75",
  accent: "border-accent bg-accent text-white",
  done: "border-accent/30 bg-[#EEF3FC] text-accent-deep",
  warn: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]",
  soft: "border-border bg-[#F6F8FB] text-muted-foreground",
};
export function Pill({ children, tone = "neutral", className = "" }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]", PILLS[tone], className)}>{children}</span>;
}

/** A horizontal state rail: steps before `active` are done, `active` is current. */
export function Rail({ steps, active = -1, className = "", size = "md" }) {
  return (
    <ol className={cn("flex items-start overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      {steps.map((s, i) => {
        const label = typeof s === "string" ? s : s.label;
        const done = i < active;
        const now = i === active;
        return (
          <li key={label} className={cn("relative flex min-w-[96px] flex-1 flex-col", size === "sm" ? "min-w-[76px]" : "")}>
            <span className="flex items-center">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 h-3 w-3 shrink-0 rounded-full border transition-colors",
                  now ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.14)]" : done ? "border-accent bg-accent" : "border-border bg-white"
                )}
              />
              {i < steps.length - 1 && <span aria-hidden="true" className={cn("h-px flex-1", done ? "bg-accent" : "bg-border")} />}
            </span>
            <span className={cn("mt-2 pr-2 font-mono text-[10px] uppercase leading-snug tracking-[0.12em]", now ? "text-accent" : done ? "text-foreground/80" : "text-muted-foreground")}>{label}</span>
            {typeof s !== "string" && s.text && <span className="mt-1 pr-3 text-[12px] leading-snug text-muted-foreground">{s.text}</span>}
          </li>
        );
      })}
    </ol>
  );
}
