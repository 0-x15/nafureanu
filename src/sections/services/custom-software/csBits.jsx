import { cn } from "@/lib/utils";
import { MONO } from "../shared/serviceBits";

export { Chapter, ChapterHead, Closing, KICKER, MONO, Num, Pill, Points, Rail, Surface } from "../shared/serviceBits";

/** Vocabulary of the custom-software page: specification frames, tags, glyphs. */
export const EASE = [0.22, 1, 0.36, 1];

/** A dashed "specification" boundary with a mono tag in the corner. tone: dashed | solid | accent */
export function Frame({ tag = undefined, tone = "dashed", className = "", children }) {
  return (
    <div className={cn("relative rounded-[10px] border p-4 md:p-5", tone === "dashed" ? "border-dashed border-foreground/30" : tone === "accent" ? "border-accent bg-white" : "border-border bg-white", className)}>
      {tag && <span className={cn(MONO, "absolute -top-2 left-4 bg-background px-1.5", tone === "accent" ? "text-accent" : "text-muted-foreground")}>{tag}</span>}
      {children}
    </div>
  );
}

/** Small mono tag. */
export function Tag({ children, tone = "neutral", className = "" }) {
  const tones = { neutral: "border-border bg-white text-foreground/75", accent: "border-accent/40 bg-[#EEF3FC] text-accent-deep", solid: "border-accent bg-accent text-white", muted: "border-border bg-[#F6F8FB] text-muted-foreground", ok: "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]", bad: "border-[#EAB4B4] bg-[#FDECEC] text-[#9B2C2C]" };
  return <span className={cn("inline-flex items-center rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", tones[tone], className)}>{children}</span>;
}

/** Production-status pill with a live dot. */
export function Status({ children, className = "" }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-[#B9DDC6] bg-[#EAF6EE] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#1F6B3A]", className)}><i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" />{children}</span>;
}

/** Line glyphs for the shapes a need can take (decorative). */
export function Glyph({ kind, className = "" }) {
  const p = /** @type {const} */ ({ stroke: "currentColor", strokeWidth: 1.4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" });
  const body = {
    missing: <><rect x="3" y="4" width="14" height="12" rx="2" strokeDasharray="2 2" {...p} /><path d="M10 7v6M7 10h6" {...p} /></>,
    partial: <><rect x="3" y="4" width="14" height="12" rx="2" {...p} /><path d="M10 4v12" {...p} /><rect x="10" y="4" width="7" height="12" fill="currentColor" opacity="0.12" stroke="none" /></>,
    between: <><rect x="2" y="6" width="5" height="8" rx="1" {...p} /><rect x="13" y="6" width="5" height="8" rx="1" {...p} /><path d="M7 10h6" strokeDasharray="1.5 1.5" {...p} /></>,
    sheet: <><rect x="3" y="4" width="14" height="12" rx="1.5" {...p} /><path d="M3 8h14M3 12h14M8 4v12" {...p} /></>,
    people: <><circle cx="7" cy="7" r="2.5" {...p} /><path d="M2.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" {...p} /><path d="M13 6h5M13 9h5M13 12h3" {...p} /></>,
    ux: <><rect x="3" y="4" width="14" height="12" rx="2" {...p} /><path d="M6 9h8M6 12h5" {...p} /><circle cx="14" cy="12.5" r="1" fill="currentColor" stroke="none" /></>,
    rules: <><path d="M4 5h12M4 10h8M4 15h10" {...p} /><path d="M15 9l1.5 1.5L19 8" {...p} /></>,
    integrations: <><circle cx="10" cy="10" r="2.5" {...p} /><path d="M10 3v4.5M10 12.5V17M3 10h4.5M12.5 10H17" {...p} /></>,
    growth: <><path d="M3 15l4-5 3 3 4-6 3 2" {...p} /><path d="M3 17h14" {...p} /></>,
    idea: <><path d="M10 3a5 5 0 0 0-3 9v2h6v-2a5 5 0 0 0-3-9z" {...p} /><path d="M8 17h4" {...p} /></>,
    workflow: <><rect x="2" y="7" width="4" height="6" rx="1" {...p} /><rect x="8" y="7" width="4" height="6" rx="1" {...p} /><rect x="14" y="7" width="4" height="6" rx="1" {...p} /><path d="M6 10h2M12 10h2" {...p} /></>,
    portal: <><rect x="3" y="4" width="14" height="12" rx="2" {...p} /><circle cx="7" cy="8" r="1.5" {...p} /><path d="M11 7h4M11 10h4M5 13h10" {...p} /></>,
    data: <><path d="M4 15V9M8 15V5M12 15v-4M16 15V7" {...p} /><path d="M3 16h14" {...p} /></>,
    integration: <><rect x="2" y="8" width="4" height="4" rx="1" {...p} /><rect x="14" y="8" width="4" height="4" rx="1" {...p} /><rect x="8" y="3" width="4" height="4" rx="1" {...p} /><rect x="8" y="13" width="4" height="4" rx="1" {...p} /><path d="M6 10h8M10 7v6" {...p} /></>,
    logic: <><path d="M4 6h5l2 4-2 4H4" {...p} /><path d="M11 10h5" {...p} /><circle cx="17" cy="10" r="1.2" fill="currentColor" stroke="none" /></>,
    app: <><rect x="5" y="2.5" width="10" height="15" rx="2" {...p} /><path d="M8 14h4" {...p} /><path d="M8 6h4M8 9h3" {...p} /></>,
  }[kind];
  return <svg aria-hidden="true" viewBox="0 0 20 20" className={cn("h-5 w-5", className)}>{body}</svg>;
}

/** Roving-tabindex keyboard handler for tablists: selects the next tab and moves focus to it. */
export function tabKey(e, i, n, select) {
  const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 };
  if (!(e.key in map)) return;
  e.preventDefault();
  const j = Math.min(n - 1, Math.max(0, map[e.key]));
  select(j);
  const tabs = e.currentTarget.closest("[role=tablist]")?.querySelectorAll("[role=tab]");
  tabs?.[j]?.focus();
}
