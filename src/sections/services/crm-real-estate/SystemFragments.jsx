import { cn } from "@/lib/utils";
import { MONO, Pill, Rail } from "./serviceBits";

const STATE_TONE = (s) => {
  const v = String(s).toLowerCase();
  if (/aprob|approv|firmad|signed|activ|hot|calient|done|realiz/.test(v)) return "done";
  if (/pend|review|revis|warn|aviso/.test(v)) return "warn";
  return "neutral";
};

function Row({ k, v, tone = undefined }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-1.5 last:border-b-0">
      <span className="text-[12px] text-muted-foreground">{k}</span>
      {tone ? <Pill tone={tone}>{v}</Pill> : <span className="text-[12px] font-medium text-foreground">{v}</span>}
    </div>
  );
}

/** One compact, fictional interface fragment per subsystem. */
export default function UiFragment({ ui }) {
  switch (ui.kind) {
    case "record":
      return (
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{ui.title}</p>
              <p className="mt-1 flex flex-wrap gap-x-3 text-[12px] text-muted-foreground">{ui.meta.map((m) => <span key={m}>{m}</span>)}</p>
            </div>
            <Pill tone="done">{ui.state}</Pill>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">{ui.flags.map((f) => <Pill key={f} tone="soft">{f}</Pill>)}</div>
          <div className="mt-3">
            <span className={cn(MONO, "text-muted-foreground")}>{ui.score}</span>
            <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-[#EEF1F6]"><span className="block h-full w-[85%] rounded-full bg-accent" /></span>
          </div>
        </div>
      );
    case "pipeline":
    case "rail":
      return <Rail steps={ui.steps} active={ui.active} size="sm" />;
    case "timeline":
      return (
        <div>
          <Rail steps={ui.steps} active={ui.active} size="sm" />
          {ui.extra && <p className="mt-2 text-[12px] text-muted-foreground">{ui.extra}</p>}
        </div>
      );
    case "contact":
      return (
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF3FC] font-heading text-sm font-bold text-accent-deep">{ui.name.slice(0, 1)}</span>
              <span>
                <span className="block text-[13px] font-semibold text-foreground">{ui.name}</span>
                <span className="block text-[11px] text-muted-foreground">{ui.type}</span>
              </span>
            </div>
            <Pill tone="warn">{ui.scoring}</Pill>
          </div>
          <ul className="mt-3 divide-y divide-border">{ui.rows.map((r) => <li key={r} className="py-1.5 text-[12px] text-foreground/80">{r}</li>)}</ul>
        </div>
      );
    case "fields":
      return <div>{ui.rows.map(([k, v]) => <Row key={k} k={k} v={v} />)}</div>;
    case "docs":
      return <div>{ui.rows.map(([k, v]) => <Row key={k} k={k} v={v} tone={STATE_TONE(v)} />)}</div>;
    case "kpis":
      return (
        <div className="grid grid-cols-3 gap-3">
          {ui.rows.map(([k, v]) => (
            <div key={k} className="rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-2">
              <span className="block font-heading text-lg font-bold tracking-[-0.02em] text-foreground">{v}</span>
              <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground">{k}</span>
            </div>
          ))}
        </div>
      );
    case "agenda":
      return (
        <ul className="divide-y divide-border">
          {ui.rows.map(([t, txt]) => (
            <li key={t} className="flex items-center gap-3 py-1.5">
              <span className="w-11 font-mono text-[11px] text-accent">{t}</span>
              <span className="text-[12px] text-foreground/85">{txt}</span>
            </li>
          ))}
        </ul>
      );
    case "sla":
      return (
        <div>
          <Rail steps={ui.steps} active={1} size="sm" />
          <p className={cn(MONO, "mt-2 text-muted-foreground")}>{ui.note}</p>
        </div>
      );
    case "match":
      return (
        <div className="flex items-center gap-3">
          <span className="flex-1 rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-2 text-center text-[12px] font-medium text-foreground">{ui.left}</span>
          <span className="flex flex-col items-center gap-1">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <Pill tone="accent">{ui.score}</Pill>
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
          </span>
          <span className="flex-1 rounded-[6px] border border-accent/40 bg-white px-3 py-2 text-center text-[12px] font-medium text-foreground">{ui.right}</span>
        </div>
      );
    case "chat":
      return (
        <div className="space-y-2">
          {ui.lines.map((l, i) => (
            <p key={l} className={cn("max-w-[85%] rounded-[10px] px-3 py-2 text-[12px] leading-snug", i % 2 === 0 ? "bg-[#F1F4F9] text-foreground" : "ml-auto border border-accent/30 bg-white text-accent-deep")}>{l}</p>
          ))}
        </div>
      );
    case "lane":
      return (
        <div className="flex items-center gap-2">
          {ui.flow.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className={cn("rounded-[6px] border px-3 py-1.5 text-[12px] font-medium", i === 2 ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground")}>{f}</span>
              {i < ui.flow.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-accent" />}
            </span>
          ))}
        </div>
      );
    case "ai":
      return (
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <span className="rounded-[6px] border border-dashed border-foreground/30 px-3 py-2 text-[12px] text-foreground/80">{ui.input}</span>
          <span aria-hidden="true" className="hidden h-px w-6 bg-accent sm:block" />
          <ul className="space-y-1">{ui.output.map((o) => <li key={o} className="flex items-center gap-2 text-[12px] text-foreground"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{o}</li>)}</ul>
        </div>
      );
    case "integrations":
      return <div className="flex flex-wrap gap-1.5">{ui.items.map((i) => <Pill key={i} tone="done">{i}</Pill>)}</div>;
    default:
      return null;
  }
}
