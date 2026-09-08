import { cn } from "@/lib/utils";
import { MONO } from "../shared/serviceBits";

export { Chapter, ChapterHead, Closing, KICKER, MONO, Num, Pill, Points, Rail, Surface } from "../shared/serviceBits";

/** Vocabulary of the AI & automation page: who does the work, state tones, keyboard helper. */
export const EASE = [0.22, 1, 0.36, 1];

/** Colour language for the three roles plus the system itself. */
export const WHO = {
  rules: { chip: "border-accent/40 bg-[#EEF3FC] text-accent-deep", dot: "bg-accent", line: "#2563EB" },
  ai: { chip: "border-[#9AD3C9] bg-[#E6F4F1] text-[#0F6B5E]", dot: "bg-[#14957F]", line: "#14957F" },
  human: { chip: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]", dot: "bg-[#D08A1D]", line: "#D08A1D" },
  system: { chip: "border-foreground/30 bg-white text-foreground", dot: "bg-foreground/70", line: "#2A2F3E" },
};

/** A role chip: "AI", "Rules", "Person" or "System". */
export function Who({ who, label, className = "" }) {
  const t = WHO[who] || WHO.system;
  return <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", t.chip, className)}><i aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />{label}</span>;
}

const TONES = {
  ok: "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]",
  warn: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]",
  danger: "border-[#EAB4B4] bg-[#FDECEC] text-[#9B2C2C]",
  info: "border-[#BFD3F2] bg-[#EEF3FC] text-accent-deep",
  accent: "border-accent bg-accent text-white",
  neutral: "border-border bg-white text-foreground/75",
  muted: "border-border bg-[#F6F8FB] text-muted-foreground",
};
export const DOT = { ok: "bg-[#2E9E5B]", warn: "bg-[#D08A1D]", danger: "bg-[#D9534F]", info: "bg-accent", accent: "bg-white", neutral: "bg-border", muted: "bg-border" };

/** A state pill by tone. */
export function Tone({ tone = "neutral", children, className = "" }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", TONES[tone], className)}><i aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} />{children}</span>;
}

/** A step in a flow: role chip + text. */
export function Step({ who, label, text, n = undefined, className = "" }) {
  return (
    <span className={cn("flex items-start gap-3", className)}>
      {n !== undefined && <span className={cn(MONO, "mt-1 w-6 shrink-0 text-muted-foreground")}>{String(n).padStart(2, "0")}</span>}
      <Who who={who} label={label} className="mt-0.5 shrink-0" />
      <span className="text-[13px] leading-snug text-foreground/85">{text}</span>
    </span>
  );
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
