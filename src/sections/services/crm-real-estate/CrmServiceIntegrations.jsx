import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Pill } from "./serviceBits";

/**
 * Integrations — an ecosystem, selectable. Picking a tool shows the
 * mini-flow between it and the CRM: what moves, in which direction,
 * when, and which manual work disappears.
 */
export default function CrmServiceIntegrations({ c }) {
  const g = c.integrations;
  const [id, setId] = useState(g.items[0].id);
  const it = g.items.find((x) => x.id === id) || g.items[0];
  const reduced = useReducedMotion();
  const both = it.direction.includes("↔");
  const toCrm = /→\s*CRM/.test(it.direction) && !both;
  const onKey = (e, i) => {
    const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: g.items.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(g.items.length - 1, Math.max(0, map[e.key]));
    setId(g.items[j].id);
    document.getElementById(`crm-int-tab-${g.items[j].id}`)?.focus();
  };
  return (
    <Chapter id="crm-service-integrations" tone="white">
      <ChapterHead id="crm-service-integrations" kicker={g.kicker} title={g.title} intro={g.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-4">
          <ul role="tablist" aria-label={g.kicker} className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {g.items.map((x, i) => {
              const on = x.id === id;
              return (
                <li key={x.id}>
                  <button type="button" role="tab" id={`crm-int-tab-${x.id}`} aria-selected={on} aria-controls="crm-int-panel" tabIndex={on ? 0 : -1} onClick={() => setId(x.id)} onKeyDown={(e) => onKey(e, i)} className={cn("flex w-full items-center justify-between gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}>
                    <span>
                      <span className={cn("block text-[14px] font-semibold", on ? "text-accent-deep" : "text-foreground")}>{x.name}</span>
                      <span className={cn(MONO, "mt-0.5 block text-muted-foreground")}>{x.group}</span>
                    </span>
                    <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", on ? "bg-accent" : "bg-border")} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <motion.div key={it.id} id="crm-int-panel" role="tabpanel" aria-labelledby={`crm-int-tab-${it.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-8">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-6 md:p-8">
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className={cn("rounded-[8px] border bg-white px-4 py-4 text-center", toCrm ? "border-border" : "border-accent")}>
                <span className={cn(MONO, "block text-muted-foreground")}>{g.core}</span>
                <span className="mt-1 block font-heading text-xl font-bold tracking-[-0.02em] text-foreground">CRM</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-1">
                <span aria-hidden="true" className={cn("h-px w-10 bg-accent", toCrm && "hidden")} />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{it.direction}</span>
                <span aria-hidden="true" className={cn("h-px w-10 bg-accent", !toCrm && !both && "hidden")} />
              </div>
              <div className={cn("rounded-[8px] border bg-white px-4 py-4 text-center", toCrm ? "border-accent" : "border-border")}>
                <span className={cn(MONO, "block text-muted-foreground")}>{it.group}</span>
                <span className="mt-1 block font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{it.name}</span>
              </div>
            </div>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {[[g.labels.moves, it.moves], [g.labels.trigger, it.trigger], [g.labels.removes, it.removes]].map(([k, v]) => (
                <div key={k}>
                  <dt className={cn(MONO, "text-muted-foreground")}>{k}</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">{g.items.map((x) => <Pill key={x.id} tone={x.id === it.id ? "accent" : "soft"}>{x.name}</Pill>)}</div>
        </motion.div>
      </div>
      <Reveal delay={0.08}><p className="mt-10 max-w-3xl text-[14px] text-muted-foreground">{g.note}</p></Reveal>
    </Chapter>
  );
}
