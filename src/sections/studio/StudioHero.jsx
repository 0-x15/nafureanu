import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { rise } from "@/lib/rise";
import { LogoSymbol } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { EASE, H1, MONO } from "./studioBits";

/**
 * The section drawing: where Nafureanu sits in a project. A vertical
 * technical axis with four stations; the cobalt band marks the span the
 * company answers for. Hover, focus or tap a station for its note.
 */
export function SectionAxis({ ax, reduced, compact = false }) {
  const [on, setOn] = useState(1);
  const st = ax.stations;
  return (
    <figure aria-label={ax.label} className="m-0">
      <div className={cn("relative pl-6", compact ? "min-h-[300px]" : "min-h-[340px]")}>
        <motion.span aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} className="absolute bottom-0 left-[31px] top-0 w-px origin-top bg-foreground/25" />
        <motion.span aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }} className="absolute left-[30px] top-[calc(33.333%+2px)] w-[3px] origin-top bg-accent" style={{ height: "calc(66.666% - 2px)" }} />
        <span className={cn(MONO, "absolute left-0 top-[calc(33.333%+2px)] text-accent [writing-mode:vertical-rl] rotate-180")} style={{ height: "calc(66.666% - 2px)" }}>{ax.band}</span>
        <ol className="relative grid h-full grid-rows-4" style={{ minHeight: "inherit" }}>
          {st.map((s, i) => {
            const active = on === i;
            const inBand = i >= 1;
            return (
              <li key={s.id} className="relative flex items-start">
                <button type="button" aria-pressed={active} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} className="group flex w-full items-start gap-4 py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">
                  <span aria-hidden="true" className={cn("relative z-10 mt-[3px] block h-[15px] w-[15px] shrink-0 border transition-colors", active ? "border-accent bg-accent" : inBand ? "border-accent bg-background" : "border-foreground/40 bg-background")} />
                  <span className="min-w-0">
                    <span className={cn(MONO, "block", inBand ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span>
                    <span className={cn("block font-heading text-[17px] font-bold tracking-[-0.02em] transition-colors md:text-[19px]", active ? "text-foreground" : "text-foreground/60 group-hover:text-foreground")}>{s.label}</span>
                    <AnimatePresence initial={false}>
                      {active && <motion.span initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="block max-w-[34ch] overflow-hidden text-[13px] leading-[1.55] text-muted-foreground">{s.note}</motion.span>}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className={cn(MONO, "mt-2 text-muted-foreground")}>{ax.hint}</figcaption>
    </figure>
  );
}

/**
 * The entrance of the practice. One composition across the viewport: the
 * corporate statement, three institutional facts, the section drawing on
 * the right, and a signature line closing the room. The entrance is CSS
 * (`rise`): the statement paints with the static HTML.
 */
export default function StudioHero({ a }) {
  const reduced = useReducedMotion();
  const h = a.hero;
  const up = (i) => rise(12, 0.7, 0.1 + i * 0.1);
  return (
    <header className="relative overflow-x-clip px-5 pb-10 pt-6 md:px-10 md:pb-14 md:pt-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="rise flex items-baseline justify-between gap-6 border-b border-foreground/12 pb-3" style={up(0)}>
          <p className="flex items-baseline gap-4"><span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{a.kicker}</span><span className={cn(MONO, "hidden text-muted-foreground sm:inline")}>{a.company}</span></p>
          <p className={cn(MONO, "text-muted-foreground")}>{a.rev}</p>
        </div>
        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className={cn("rise", H1, "max-w-[17ch] text-foreground")} style={up(1)}>{h.title}</h1>
            <p className="rise mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-foreground/85 md:text-[17px]" style={up(2)}>{h.lead}</p>
            <dl className="rise mt-10 grid grid-cols-3 gap-6 border-t border-foreground/12 pt-4" style={up(3)}>
              {h.facts.map((f) => <div key={f.k}><dt className={cn(MONO, "text-muted-foreground")}>{f.k}</dt><dd className="mt-1 text-[13px] font-semibold leading-snug text-foreground md:text-[14px]">{f.v}</dd></div>)}
            </dl>
          </div>
          <div className="rise lg:col-span-4 lg:col-start-9" style={up(2)}>
            <p className={cn(MONO, "mb-4 text-muted-foreground")}>{h.axis.label}</p>
            <SectionAxis ax={h.axis} reduced={Boolean(reduced)} />
          </div>
        </div>
        <div className="rise mt-12 flex items-center gap-4 md:mt-16" style={up(4)}>
          <LogoSymbol size={14} className="text-foreground" />
          <span className={cn(MONO, "text-foreground/70")}>{h.signature}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-foreground/12" />
        </div>
      </div>
    </header>
  );
}
