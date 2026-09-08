import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag, tabKey } from "./csBits";

/**
 * What "custom" means — an exploded application: nine plates stacked
 * from the interface down to the infrastructure. Selecting a plate lifts
 * it, opens its fragment and explains what that layer decides.
 */
export default function CsAnatomy({ c }) {
  const a = c.anatomy;
  const [i, setI] = useState(0);
  const layer = a.layers[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-anatomy" tone="blue">
      <ChapterHead id="cs-anatomy" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" className="lg:col-span-7">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{a.hint}</p>
          <ol role="tablist" aria-label={a.hint} className="space-y-1.5">
            {a.layers.map((l, k) => {
              const on = k === i;
              return (
                <li key={l.id} style={{ marginLeft: `${k * 1.2}%`, marginRight: `${(a.layers.length - 1 - k) * 1.2}%` }}>
                  <motion.button type="button" role="tab" id={`cs-layer-${l.id}`} aria-selected={on} aria-controls="cs-anatomy-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, a.layers.length, setI)}
                    initial={false} animate={{ y: on && !reduced ? -3 : 0 }} transition={{ duration: 0.25 }}
                    className={cn("flex w-full items-center gap-3 rounded-[7px] border px-3 py-2.5 text-left outline-none transition-[border-color,box-shadow,background-color] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-4", on ? "border-accent bg-white shadow-[0_16px_36px_-22px_rgba(37,99,235,0.7)]" : k === 0 ? "border-border bg-white hover:border-foreground/40" : "border-border bg-white/80 hover:border-foreground/40")}>
                    <span className={cn("font-mono text-[10px] tracking-[0.18em]", on ? "text-accent" : "text-muted-foreground")}>{String(k + 1).padStart(2, "0")}</span>
                    <span className={cn("w-[110px] shrink-0 text-[13px] font-semibold tracking-[-0.01em] sm:w-[140px] sm:text-[14px]", on ? "text-accent-deep" : "text-foreground")}>{l.label}</span>
                    <span className="hidden min-w-0 flex-1 flex-wrap gap-1.5 sm:flex">
                      {on && l.fragment.map((f) => <motion.span key={f} initial={reduced ? false : { opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}><Tag tone="accent">{f}</Tag></motion.span>)}
                      {!on && <span className="truncate text-[11px] text-muted-foreground">{l.question}</span>}
                    </span>
                    <span aria-hidden="true" className={cn("ml-auto h-2 w-2 shrink-0 rounded-full", on ? "bg-accent" : "bg-border")} />
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <motion.div key={layer.id} id="cs-anatomy-panel" role="tabpanel" aria-labelledby={`cs-layer-${layer.id}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-5 lg:pt-8">
          <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")} · {layer.label}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">{layer.question}</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground/85">{layer.text}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 sm:hidden">{layer.fragment.map((f) => <li key={f}><Tag tone="accent">{f}</Tag></li>)}</ul>
        </motion.div>
      </div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
