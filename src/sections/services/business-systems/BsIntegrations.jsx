import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./bsBits";

const R = 40;

/**
 * Integrations — existing tools orbit the custom system. Select one to
 * see SOURCE → DATA → RULE → DESTINATION and what stops being manual.
 * Below md the orbit becomes a list of the same buttons.
 */
export default function BsIntegrations({ c }) {
  const g = c.integrations;
  const [id, setId] = useState(g.items[0].id);
  const it = g.items.find((x) => x.id === id) || g.items[0];
  const reduced = useReducedMotion();
  const idx = g.items.findIndex((x) => x.id === id);
  const onKey = (e, i) => {
    const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: g.items.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(g.items.length - 1, Math.max(0, map[e.key]));
    setId(g.items[j].id);
    document.getElementById(`bs-int-${g.items[j].id}`)?.focus();
  };
  const toCore = it.destination === g.core;
  const renderNode = (x, i) => {
    const on = x.id === id;
    return (
      <button type="button" role="tab" id={`bs-int-${x.id}`} aria-selected={on} aria-controls="bs-int-panel" tabIndex={on ? 0 : -1} onClick={() => setId(x.id)} onKeyDown={(e) => onKey(e, i)}
        className={cn("rounded-[7px] border bg-white px-3 py-2 text-left text-[12px] font-semibold tracking-[-0.01em] outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:whitespace-nowrap", on ? "border-accent text-accent-deep shadow-[0_12px_28px_-18px_rgba(37,99,235,0.7)]" : "border-border text-foreground/85 hover:border-foreground/40")}>
        {x.name}
      </button>
    );
  };
  return (
    <Chapter id="bs-integrations" tone="white">
      <ChapterHead id="bs-integrations" kicker={g.kicker} title={g.title} intro={g.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" delay={0.05} className="lg:col-span-6">
          {/* orbit (md+) */}
          <div role="tablist" aria-label={g.kicker} className="relative mx-auto hidden aspect-square w-full max-w-[520px] md:block">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(15,23,42,0.1)" strokeDasharray="0.8 1.6" />
              {g.items.map((x, i) => {
                const a = ((i * (360 / g.items.length) - 90) * Math.PI) / 180;
                const on = x.id === id;
                return <motion.line key={x.id} x1="50" y1="50" x2={50 + R * Math.cos(a)} y2={50 + R * Math.sin(a)} stroke={on ? "#2563EB" : "rgba(15,23,42,0.14)"} strokeWidth={on ? 0.6 : 0.3} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />;
              })}
              {!reduced && (
                <motion.circle key={id} r="1.1" fill="#2563EB" initial={{ cx: toCore ? 50 + R * Math.cos(((idx * (360 / g.items.length) - 90) * Math.PI) / 180) : 50, cy: toCore ? 50 + R * Math.sin(((idx * (360 / g.items.length) - 90) * Math.PI) / 180) : 50, opacity: 0 }} animate={{ cx: toCore ? 50 : 50 + R * Math.cos(((idx * (360 / g.items.length) - 90) * Math.PI) / 180), cy: toCore ? 50 : 50 + R * Math.sin(((idx * (360 / g.items.length) - 90) * Math.PI) / 180), opacity: [0, 1, 1, 0] }} transition={{ duration: 1.4, ease: "linear", delay: 0.2 }} />
              )}
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-white text-center shadow-[0_0_0_10px_rgba(37,99,235,0.05)]">
              <span className={cn(MONO, "text-accent")}>{g.core}</span>
            </div>
            {g.items.map((x, i) => {
              const a = ((i * (360 / g.items.length) - 90) * Math.PI) / 180;
              return <div key={x.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}>{renderNode(x, i)}</div>;
            })}
          </div>
          {/* list (below md) */}
          <div role="tablist" aria-label={g.kicker} className="grid grid-cols-2 gap-2 md:hidden">
            {g.items.map((x, i) => <span key={x.id} className="contents">{renderNode(x, i)}</span>)}
          </div>
        </Reveal>
        <motion.div key={it.id} id="bs-int-panel" role="tabpanel" aria-labelledby={`bs-int-${it.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-6">
          <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-7">
            <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{it.name}</p>
            <ol className="mt-5 grid gap-2 sm:grid-cols-4">
              {[["source", it.source], ["data", it.data], ["rule", it.rule], ["destination", it.destination]].map(([k, v], i) => (
                <li key={k} className={cn("relative rounded-[6px] border px-3 py-2.5", i === 2 ? "border-accent bg-[#EEF3FC]" : "border-border bg-white")}>
                  <span className={cn(MONO, "block text-muted-foreground")}>{g.labels[k]}</span>
                  <span className="mt-1 block text-[12px] leading-snug text-foreground">{v}</span>
                  {i < 3 && <span aria-hidden="true" className="absolute -right-[6px] top-1/2 hidden h-px w-2 bg-accent sm:block" />}
                </li>
              ))}
            </ol>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{g.labels.benefit}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-foreground/85">{it.benefit}</p>
          </div>
        </motion.div>
      </div>
      <Reveal delay={0.08}><p className="mt-8 max-w-3xl text-[13px] text-muted-foreground">{g.note}</p></Reveal>
      <Closing>{g.closing}</Closing>
    </Chapter>
  );
}
