import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./bsBits";

/** Generic versus custom — a mature comparison, plus the mismatch itself drawn once: the software's shape and the business's shape. */
export default function BsComparison({ c }) {
  const k = c.comparison;
  const Col = ({ side, tone }) => (
    <div className={cn("h-full rounded-[10px] border p-5 md:p-6", tone === "custom" ? "border-accent/40 bg-[#F7F9FD]" : "border-border bg-white")}>
      <p className={cn(MONO, tone === "custom" ? "text-accent" : "text-muted-foreground")}>{side.label}</p>
      <p className="mt-2 font-heading text-lg font-bold leading-snug tracking-[-0.01em] text-foreground">{side.text}</p>
      <p className={cn(MONO, "mt-5 text-muted-foreground")}>{side.whenLabel}</p>
      <ul className="mt-2 divide-y divide-border">{side.when.map((w) => <li key={w} className="flex gap-3 py-2 text-[14px] leading-snug text-foreground/85"><span aria-hidden="true" className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", tone === "custom" ? "bg-accent" : "bg-foreground/40")} />{w}</li>)}</ul>
    </div>
  );
  return (
    <Chapter id="bs-comparison" tone="white">
      <ChapterHead id="bs-comparison" kicker={k.kicker} title={k.title} intro={k.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-4"><Col side={k.generic} tone="generic" /></Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-3">
          <div className="flex h-full flex-col items-center justify-center rounded-[10px] border border-dashed border-foreground/20 p-5">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="w-full max-w-[200px]">
              <rect x="18" y="18" width="64" height="64" fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="1" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
              <path d="M 24 30 L 58 14 L 90 40 L 78 74 L 56 90 L 30 78 L 10 52 Z" fill="rgba(37,99,235,0.08)" stroke="#2563EB" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className={cn(MONO, "mt-3 text-center text-muted-foreground")}>{k.generic.label} · {k.custom.label}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5"><Col side={k.custom} tone="custom" /></Reveal>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
