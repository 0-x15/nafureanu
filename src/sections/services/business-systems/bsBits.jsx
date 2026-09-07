import { cn } from "@/lib/utils";
import { MONO } from "../shared/serviceBits";

export { Chapter, ChapterHead, Closing, KICKER, MONO, Num, Pill, Points, Rail, Surface } from "../shared/serviceBits";

/** Small vocabulary of the business-systems page: entity cards, state chips, relation labels. */
export const EASE = [0.22, 1, 0.36, 1];

const STATE_TONES = {
  neutral: "border-border bg-white text-foreground/75",
  info: "border-[#BFD3F2] bg-[#EEF3FC] text-accent-deep",
  ok: "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]",
  warn: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]",
  danger: "border-[#EAB4B4] bg-[#FDECEC] text-[#9B2C2C]",
  muted: "border-border bg-[#F6F8FB] text-muted-foreground",
};

/** Tone for a state label by its meaning (works in both languages). */
export function stateTone(label) {
  const v = String(label).toLowerCase();
  if (/complet|aprobad|approv|firmad|signed|activ|done|ok\b/.test(v)) return "ok";
  if (/bloque|block|caduc|expir|rechaz|reject|vencid|overdue/.test(v)) return "danger";
  if (/revisi|review|pendien|pending|espera/.test(v)) return "warn";
  if (/curso|progress|nuevo|new|recib|received|solicit|request/.test(v)) return "info";
  return "neutral";
}

export function StateChip({ children, tone = undefined, className = "" }) {
  const t = tone || stateTone(children);
  return <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]", STATE_TONES[t], className)}><i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{children}</span>;
}

/** An entity card: label (type) + name + optional fields. */
export function Entity({ label, name = undefined, fields = [], active = false, muted = false, className = "", children, ...rest }) {
  return (
    <div className={cn("rounded-[8px] border bg-white px-3.5 py-3 text-left transition-[border-color,box-shadow] duration-300", active ? "border-accent shadow-[0_14px_32px_-20px_rgba(37,99,235,0.6)]" : muted ? "border-dashed border-foreground/25" : "border-border", className)} {...rest}>
      <span className={cn(MONO, "block", active ? "text-accent" : "text-muted-foreground")}>{label}</span>
      {name && <span className="mt-0.5 block text-[13px] font-semibold tracking-[-0.01em] text-foreground">{name}</span>}
      {fields.length > 0 && (
        <dl className="mt-2 space-y-0.5">
          {fields.map(([k, v]) => <div key={k} className="flex justify-between gap-3 text-[11px]"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-foreground/85">{v}</dd></div>)}
        </dl>
      )}
      {children}
    </div>
  );
}

/** A small labelled relation arrow (horizontal). */
export function Relation({ label, className = "" }) {
  return (
    <span className={cn("flex flex-col items-center gap-1", className)}>
      <span className={cn(MONO, "whitespace-nowrap text-accent")}>{label}</span>
      <span aria-hidden="true" className="flex items-center"><i className="block h-px w-8 bg-accent" /><i className="-ml-px block h-1.5 w-1.5 rotate-45 border-r border-t border-accent" /></span>
    </span>
  );
}
