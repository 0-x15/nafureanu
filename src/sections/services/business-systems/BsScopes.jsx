import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./bsBits";

/** CRM, business system or custom platform — three nested scopes, not tiers. */
export default function BsScopes({ c }) {
  const s = c.scopes;
  const [id, setId] = useState(s.levels[1].id);
  const idx = s.levels.findIndex((l) => l.id === id);
  const level = s.levels[idx];
  const reduced = useReducedMotion();
  const radii = [16, 30, 44];
  return (
    <Chapter id="bs-scopes">
      <ChapterHead id="bs-scopes" kicker={s.kicker} title={s.title} intro={s.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10 lg:items-center">
        <Reveal variant="scale" className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {radii.map((r, i) => <motion.circle key={r} cx="50" cy="50" r={r} fill={i === idx ? "rgba(37,99,235,0.08)" : "transparent"} stroke={i <= idx ? "#2563EB" : "rgba(15,23,42,0.18)"} strokeWidth={i === idx ? 0.8 : 0.4} strokeDasharray={i > idx ? "1 1.5" : "0"} initial={false} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.3 }} />)}
            </svg>
            <div role="tablist" aria-label={s.kicker}>
              {s.levels.map((l, i) => {
                const on = i === idx;
                const top = 50 - radii[i] + (i === 0 ? 8 : 5);
                return (
                  <button key={l.id} type="button" role="tab" id={`bs-scope-${l.id}`} aria-selected={on} aria-controls="bs-scope-panel" tabIndex={on ? 0 : -1} onClick={() => setId(l.id)}
                    onKeyDown={(e) => { const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1 }; if (!(e.key in map)) return; e.preventDefault(); const j = Math.min(2, Math.max(0, map[e.key])); setId(s.levels[j].id); document.getElementById(`bs-scope-${s.levels[j].id}`)?.focus(); }}
                    className={cn("absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-3 py-1 text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent text-accent-deep" : "border-border text-foreground/80 hover:border-foreground/40")} style={{ top: `${top}%` }}>
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        <motion.div key={level.id} id="bs-scope-panel" role="tabpanel" aria-labelledby={`bs-scope-${level.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-7">
          <p className={cn(MONO, "text-accent")}>{String(idx + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">{level.label}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/85">{level.text}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">{level.includes.map((x) => <li key={x} className="rounded-[6px] border border-accent/40 bg-white px-3 py-1.5 text-[13px] text-foreground">{x}</li>)}</ul>
          <p className="mt-6 max-w-xl text-[13px] text-muted-foreground">{s.note}</p>
        </motion.div>
      </div>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
