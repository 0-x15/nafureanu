import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, tabKey } from "./csBits";

const Block = ({ children, tone = "solid", className = "" }) => (
  <span className={cn("flex h-14 min-w-[84px] items-center justify-center rounded-[6px] border px-3 text-center font-mono text-[10px] uppercase tracking-[0.12em]", tone === "solid" ? "border-foreground/40 bg-white text-foreground/80" : tone === "accent" ? "border-accent bg-[#EEF3FC] text-accent-deep" : tone === "fade" ? "border-dashed border-foreground/30 bg-transparent text-muted-foreground" : "border-dashed border-accent/60 bg-white text-accent", className)}>{children}</span>
);

/** Four starting points — new, evolve, replace, connect — each drawn as the situation it starts from. */
export default function CsStart({ c }) {
  const s = c.start;
  const [i, setI] = useState(1);
  const o = s.options[i];
  const reduced = useReducedMotion();
  const L = s.labels;
  const pictures = {
    new: <div className="flex items-center gap-3"><Block tone="ghost">{L.fresh}</Block><span aria-hidden="true" className="h-px w-8 bg-accent" /><Block tone="accent">{L.fresh}</Block></div>,
    evolve: <div className="flex items-center gap-2"><Block>{L.existing}</Block><span aria-hidden="true" className="h-px w-5 bg-accent" /><span className="flex flex-col gap-1.5"><Block tone="accent" className="h-6 min-w-[72px]">+</Block><Block tone="accent" className="h-6 min-w-[72px]">+</Block></span></div>,
    replace: <div className="flex items-center gap-3"><Block tone="fade">{L.legacy}</Block><span className="flex flex-col items-center gap-1"><span aria-hidden="true" className="h-px w-10 border-t border-dashed border-accent" /><span className={cn(MONO, "text-[9px] text-accent")}>{L.migration}</span><span aria-hidden="true" className="h-px w-10 border-t border-dashed border-accent" /></span><Block tone="accent">{L.fresh}</Block></div>,
    connect: <div className="flex items-center gap-2"><Block>{L.existing}</Block><span aria-hidden="true" className="h-px w-4 bg-accent" /><Block tone="accent" className="h-20">{L.layer}</Block><span aria-hidden="true" className="h-px w-4 bg-accent" /><Block>{L.existing}</Block></div>,
  };
  return (
    <Chapter id="cs-start" tone="blue">
      <ChapterHead id="cs-start" kicker={s.kicker} title={s.title} intro={s.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-5">
          <ol role="tablist" aria-label={s.kicker} className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {s.options.map((x, k) => { const on = k === i; return <li key={x.id}><button type="button" role="tab" id={`cs-start-${x.id}`} aria-selected={on} aria-controls="cs-start-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, s.options.length, setI)} className={cn("flex w-full items-center justify-between gap-3 rounded-[8px] border bg-white px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent" : "border-border hover:border-foreground/30")}><span className={cn("text-[15px] font-semibold", on ? "text-accent-deep" : "text-foreground")}>{x.label}</span><span aria-hidden="true" className={cn("h-2 w-2 rounded-full", on ? "bg-accent" : "bg-border")} /></button></li>; })}
          </ol>
        </Reveal>
        <motion.div key={o.id} id="cs-start-panel" role="tabpanel" aria-labelledby={`cs-start-${o.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-white p-6 md:p-8">
            <div className="flex min-h-[112px] items-center justify-center overflow-x-auto">{pictures[o.id]}</div>
            <p className="mt-6 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground">{o.label}</p>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-foreground/85">{o.text}</p>
          </div>
        </motion.div>
      </div>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
