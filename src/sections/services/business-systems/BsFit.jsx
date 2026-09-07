import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./bsBits";

/* One authored symptom fragment per situation kind. */
function Symptom({ v }) {
  switch (v.kind) {
    case "duplicate":
      return (
        <div className="grid grid-cols-3 gap-2">
          {v.items.map((it, i) => (
            <div key={it} className="rounded-[6px] border border-border bg-white p-2">
              <span className={cn(MONO, "block text-muted-foreground")}>{it}</span>
              <span className={cn("mt-1 block truncate text-[11px] font-medium", i === 1 ? "text-[#8A5A14]" : "text-foreground")}>{v.field}</span>
            </div>
          ))}
        </div>
      );
    case "sheet":
      return (
        <div className="rounded-[6px] border border-border bg-white">
          <div className="grid grid-cols-4 gap-px border-b border-border bg-border">{["A", "B", "C", "D"].map((c) => <span key={c} className={cn(MONO, "bg-[#F6F8FB] px-2 py-1 text-muted-foreground")}>{c}</span>)}</div>
          {[0, 1].map((r) => <div key={r} className="grid grid-cols-4 gap-px bg-border">{[0, 1, 2, 3].map((c) => <span key={c} className="h-5 bg-white" />)}</div>)}
          <div className="flex gap-1 border-t border-border px-1.5 py-1">{v.tabs.map((t, i) => <span key={t} className={cn(MONO, "rounded-[3px] px-1.5 py-0.5 text-[9px]", i === 0 ? "bg-[#EEF3FC] text-accent-deep" : "text-muted-foreground")}>{t}</span>)}</div>
        </div>
      );
    case "memory":
      return (
        <div className="flex flex-wrap gap-2">
          {v.items.map((it, i) => <span key={it} className="rounded-[3px] bg-[#FFF7C2] px-2.5 py-1.5 text-[11px] text-[#5B4A00] shadow-sm" style={{ rotate: `${[-2, 1.5, -1][i % 3]}deg` }}>{it}</span>)}
        </div>
      );
    case "bridge":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-[6px] border border-border bg-white px-2.5 py-1.5 text-[11px] font-medium text-foreground">{v.from}</span>
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-foreground/40" />
          <span className={cn(MONO, "rounded-full border border-[#E7C9A0] bg-[#FFF7EA] px-2 py-1 text-[#8A5A14]")}>{v.via}</span>
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-foreground/40" />
          <span className="rounded-[6px] border border-border bg-white px-2.5 py-1.5 text-[11px] font-medium text-foreground">{v.to}</span>
        </div>
      );
    case "chat":
      return (
        <div className="space-y-1.5">
          {v.lines.map((l, i) => <p key={l} className={cn("max-w-[80%] rounded-[10px] px-2.5 py-1.5 text-[11px]", i % 2 ? "ml-auto bg-[#E7F6E9] text-foreground" : "bg-white text-foreground border border-border")}>{l}</p>)}
        </div>
      );
    case "steps":
      return (
        <ol className="flex flex-wrap items-center gap-1.5">
          {v.items.map((it, i) => <li key={it} className="flex items-center gap-1.5"><span className={cn(MONO, "rounded-[4px] border border-border bg-white px-2 py-1 text-foreground/80")}>{i + 1} · {it}</span>{i < v.items.length - 1 && <span aria-hidden="true" className="h-px w-2 bg-foreground/40" />}</li>)}
        </ol>
      );
    case "report":
      return (
        <div className="flex items-center gap-3">
          <ul className="space-y-1">{v.sources.map((s) => <li key={s} className={cn(MONO, "rounded-[4px] border border-border bg-white px-2 py-1 text-muted-foreground")}>{s}</li>)}</ul>
          <span aria-hidden="true" className="block h-px w-8 border-t border-dashed border-foreground/50" />
          <span className="rounded-[6px] border border-border bg-white px-2.5 py-2 text-[11px] font-medium text-foreground">{v.out}</span>
        </div>
      );
    default:
      return null;
  }
}

/**
 * When generic software stops fitting — a canvas of recognisable
 * scenes. Each one pairs a plain sentence with an authored fragment of
 * the workaround itself: the duplicated field, the tab called
 * "Tracking_v3", the person between two systems.
 */
export default function BsFit({ c }) {
  const f = c.fit;
  return (
    <Chapter id="bs-fit" tone="white">
      <ChapterHead id="bs-fit" kicker={f.kicker} title={f.title} intro={f.intro} />
      <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {f.situations.map((s, i) => (
          <Reveal key={s.title} delay={0.04 * (i % 3)}>
            <li className={cn("flex h-full flex-col justify-between rounded-[10px] border border-border bg-[#FAFBFD] p-5", i === f.situations.length - 1 && "md:col-span-2 xl:col-span-1")}>
              <div>
                <p className="font-heading text-[17px] font-bold leading-snug tracking-[-0.01em] text-foreground">{s.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
              <div className="mt-5 rounded-[8px] border border-dashed border-foreground/20 bg-white/60 p-3"><Symptom v={s.visual} /></div>
            </li>
          </Reveal>
        ))}
      </ul>
      <Closing>{f.closing}</Closing>
    </Chapter>
  );
}
