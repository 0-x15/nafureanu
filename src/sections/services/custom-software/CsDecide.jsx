import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag, tabKey } from "./csBits";

const Y = [18, 50, 82];

/** Buy, configure or build — a decision path. Selecting a branch lights its path and its verdict. */
export default function CsDecide({ c }) {
  const d = c.decide;
  const [i, setI] = useState(2);
  const path = d.paths[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-decide" tone="white">
      <ChapterHead id="cs-decide" kicker={d.kicker} title={d.title} intro={d.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" className="lg:col-span-7">
          <div className="relative grid gap-3 rounded-[12px] border border-border bg-[#FAFBFD] p-4 sm:grid-cols-[minmax(150px,1fr)_72px_minmax(0,1.4fr)] sm:items-center sm:gap-0 sm:p-6">
            <div className="rounded-[8px] border border-foreground/30 bg-white px-3 py-3 sm:px-4">
              <p className={cn(MONO, "text-muted-foreground")}>{d.kicker}</p>
              <p className="mt-1 font-heading text-[15px] font-bold leading-snug tracking-[-0.01em] text-foreground sm:text-base">{d.question}</p>
            </div>
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden h-full min-h-[240px] w-full sm:block">
              {d.paths.map((p, k) => (
                <motion.path key={p.id} d={`M 0 50 C 50 50, 50 ${Y[k]}, 100 ${Y[k]}`} fill="none" stroke={k === i ? "#2563EB" : "rgba(15,23,42,0.22)"} strokeWidth={k === i ? 2 : 1.2} vectorEffect="non-scaling-stroke" initial={false} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.3 }} />
              ))}
            </svg>
            <ol role="tablist" aria-label={d.question} className="flex flex-col justify-between gap-2 sm:gap-3 sm:py-1">
              {d.paths.map((p, k) => {
                const on = k === i;
                return (
                  <li key={p.id}>
                    <button type="button" role="tab" id={`cs-decide-${p.id}`} aria-selected={on} aria-controls="cs-decide-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, d.paths.length, setI)}
                      className={cn("flex w-full items-center justify-between gap-3 rounded-[8px] border bg-white px-3 py-2.5 text-left outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-4", on ? "border-accent shadow-[0_12px_28px_-18px_rgba(37,99,235,0.7)]" : "border-border hover:border-foreground/40")}>
                      <span><span className={cn("block text-[14px] font-semibold tracking-[-0.01em]", on ? "text-accent-deep" : "text-foreground")}>{p.label}</span><span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{p.condition}</span></span>
                      <Tag tone={on ? (p.id === "build" ? "solid" : "accent") : "muted"} className="shrink-0">{p.verdict}</Tag>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
        <motion.div key={path.id} id="cs-decide-panel" role="tabpanel" aria-labelledby={`cs-decide-${path.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-5">
          <p className={cn(MONO, "text-accent")}>{path.verdict}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">{path.label}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{path.text}</p>
          <p className={cn(MONO, "mt-8 text-muted-foreground")}>{d.signalsLabel}</p>
          <ul className="mt-2 divide-y divide-border border-t border-border">{d.signals.map((s) => <li key={s} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />{s}</li>)}</ul>
        </motion.div>
      </div>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
