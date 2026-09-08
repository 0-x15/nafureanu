import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Rail, Surface, Tag, tabKey } from "./csBits";

function ProductSurface({ s }) {
  switch (s.kind) {
    case "table":
      return (
        <table className="w-full border-collapse text-left text-[12px]">
          <thead><tr>{s.columns.map((h) => <th key={h} scope="col" className={cn(MONO, "border-b border-border pb-2 pr-3 font-normal text-muted-foreground")}>{h}</th>)}</tr></thead>
          <tbody>{s.rows.map((r) => <tr key={r[0]} className="border-b border-border last:border-b-0">{r.map((cell, k) => <td key={k} className={cn("py-2 pr-3", k === 0 ? "font-mono text-[11px] text-accent" : "text-foreground/85")}>{k === 2 ? <Tag tone="accent">{cell}</Tag> : cell}</td>)}</tr>)}</tbody>
        </table>
      );
    case "modules":
      return <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">{s.modules.map((m, k) => <li key={m} className={cn("rounded-[6px] border px-3 py-4 text-[13px] font-medium", k === 1 ? "border-accent bg-[#EEF3FC] text-accent-deep" : "border-border bg-white text-foreground")}>{m}</li>)}</ul>;
    case "journey":
      return <div><Rail steps={s.steps} active={s.active} size="sm" /><p className="mt-4 rounded-[6px] border border-accent/40 bg-[#EEF3FC] px-3 py-2 text-[12px] text-accent-deep">{s.detail}</p></div>;
    case "portal":
      return <ul className="divide-y divide-border">{s.items.map(([k, v]) => <li key={k} className="flex items-center justify-between py-2.5 text-[13px]"><span className="font-medium text-foreground">{k}</span><span className="text-muted-foreground">{v}</span></li>)}</ul>;
    case "data": {
      const max = Math.max(...s.series);
      return (
        <div>
          <ul className="grid grid-cols-3 gap-2">{s.kpis.map(([k, v]) => <li key={k} className="rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-2"><span className="block font-heading text-lg font-bold tracking-[-0.02em] text-foreground">{v}</span><span className="block text-[10px] text-muted-foreground">{k}</span></li>)}</ul>
          <div className="mt-3 flex h-16 items-end gap-1">{s.series.map((n, k) => <span key={k} aria-hidden="true" className="flex-1 rounded-[2px] bg-accent/40" style={{ height: `${(n / max) * 100}%` }} />)}</div>
        </div>
      );
    }
    case "workflow":
      return <div><Rail steps={s.states} active={s.active} size="sm" /><ul className="mt-4 flex flex-wrap gap-1.5">{s.actions.map((x, k) => <li key={x} className={cn("rounded-[5px] border px-3 py-1.5 text-[12px] font-medium", k === 0 ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground")}>{x}</li>)}</ul></div>;
    case "api":
      return <div><ul className="divide-y divide-border font-mono text-[12px]">{s.endpoints.map(([m, path]) => <li key={m + path} className="flex items-center gap-3 py-2"><span className={cn("w-12 text-[10px] tracking-[0.12em]", m === "GET" ? "text-[#1F6B3A]" : "text-accent")}>{m}</span><span className="text-foreground">{path}</span></li>)}</ul><p className={cn(MONO, "mt-3 text-muted-foreground")}>{s.note}</p></div>;
    default:
      return null;
  }
}

/** What we build — seven intents; the product surface changes with the selection. */
export default function CsBuild({ c }) {
  const b = c.build;
  const [i, setI] = useState(0);
  const t = b.types[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-build" tone="white">
      <ChapterHead id="cs-build" kicker={b.kicker} title={b.title} intro={b.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <ol role="tablist" aria-label={b.kicker} className="divide-y divide-border border-y border-border">
            {b.types.map((x, k) => {
              const on = k === i;
              return (
                <li key={x.id}>
                  <button type="button" role="tab" id={`cs-build-${x.id}`} aria-selected={on} aria-controls="cs-build-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, b.types.length, setI)}
                    className={cn("flex w-full items-start gap-3 py-3 text-left outline-none transition-colors focus-visible:text-accent", on ? "text-accent-deep" : "text-foreground hover:text-accent-deep")}>
                    <span className={cn("mt-1 font-mono text-[10px] tracking-[0.18em]", on ? "text-accent" : "text-muted-foreground")}>{String(k + 1).padStart(2, "0")}</span>
                    <span className="flex-1"><span className="block text-[15px] font-semibold tracking-[-0.01em]">{x.label}</span>{on && <motion.span initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 block text-[13px] leading-snug text-muted-foreground">{x.text}</motion.span>}</span>
                    <span aria-hidden="true" className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", on ? "bg-accent" : "bg-border")} />
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <motion.div key={t.id} id="cs-build-panel" role="tabpanel" aria-labelledby={`cs-build-${t.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Surface title={t.surface.title} meta={t.label}><ProductSurface s={t.surface} /></Surface>
          </motion.div>
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{b.note}</p>
        </Reveal>
      </div>
      <Closing>{b.closing}</Closing>
    </Chapter>
  );
}
