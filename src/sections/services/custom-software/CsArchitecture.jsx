import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Tag } from "./csBits";

/** Architecture after the problem — toggle constraints and watch the composition of the system change. */
export default function CsArchitecture({ c }) {
  const a = c.architecture;
  const [on, setOn] = useState(() => new Set(["external"]));
  const reduced = useReducedMotion();
  const toggle = (id) => setOn((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const resolved = a.layers.map((l) => {
    let text = a.base[l.id]; let by = null;
    a.constraints.forEach((k) => { if (on.has(k.id) && k.effects[l.id]) { text = k.effects[l.id]; by = k.label; } });
    return { ...l, text, by };
  });
  return (
    <Chapter id="cs-architecture" tone="white">
      <ChapterHead id="cs-architecture" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "text-muted-foreground")}>{a.constraintsLabel}</p>
          <ul className="mt-3 space-y-2">
            {a.constraints.map((k) => { const active = on.has(k.id); return <li key={k.id}><button type="button" aria-pressed={active} onClick={() => toggle(k.id)} className={cn("flex w-full items-center gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", active ? "border-accent" : "border-border hover:border-foreground/30")}><span aria-hidden="true" className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border font-mono text-[10px]", active ? "border-accent bg-accent text-white" : "border-border bg-white")}>{active ? "✓" : ""}</span><span className={cn("text-[14px] font-medium", active ? "text-accent-deep" : "text-foreground")}>{k.label}</span></button></li>; })}
          </ul>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-4 md:p-6">
            <p className={cn(MONO, "text-muted-foreground")}>{a.layersLabel}</p>
            <ol className="mt-3 space-y-2" aria-live="polite">
              {resolved.map((l, i) => (
                <li key={l.id} className={cn("grid gap-1 rounded-[8px] border bg-white px-4 py-3 sm:grid-cols-[130px_1fr] sm:gap-4", l.by ? "border-accent/50" : "border-border")} style={{ marginLeft: `${i * 2}%` }}>
                  <span className="flex items-center gap-2"><span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-[13px] font-semibold text-foreground">{l.label}</span></span>
                  <motion.span key={l.text} initial={reduced ? false : { opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="text-[13px] leading-snug text-foreground/85">{l.text}{l.by && <Tag tone="accent" className="ml-2 align-middle">{l.by}</Tag>}</motion.span>
                </li>
              ))}
            </ol>
            <p className={cn(MONO, "mt-3 text-muted-foreground")}>{a.note}</p>
          </div>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Reveal delay={0.06}><p className={cn(MONO, "text-muted-foreground")}>{a.criteriaLabel}</p><ul className="mt-2 flex flex-wrap gap-1.5">{a.criteria.map((k) => <li key={k}><Pill tone="soft">{k}</Pill></li>)}</ul></Reveal>
        <Reveal delay={0.08}><p className={cn(MONO, "text-muted-foreground")}>{a.rangeLabel}</p><ul className="mt-2 flex flex-wrap gap-1.5">{a.range.map((k) => <li key={k}><Pill>{k}</Pill></li>)}</ul></Reveal>
      </div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
