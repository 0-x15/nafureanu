import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, Entity, MONO, Pill, StateChip, Surface } from "./bsBits";

const POS = { customer: [16, 26], case: [50, 26], document: [84, 26], task: [50, 72] };

/**
 * System anatomy — one composition, nine lenses. The same four
 * fictional records stay on the canvas; selecting a piece of the model
 * reveals what that piece adds to them: links, states, rules, owners,
 * automations, connections or indicators. Nothing is nine cards.
 */
export default function BsAnatomy({ c }) {
  const a = c.anatomy;
  const cv = a.canvas;
  const [id, setId] = useState(a.layers[0].id);
  const layer = a.layers.find((l) => l.id === id) || a.layers[0];
  const reduced = useReducedMotion();
  const show = (k) => id === k;
  const onKey = (e, i) => {
    const map = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: a.layers.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(a.layers.length - 1, Math.max(0, map[e.key]));
    setId(a.layers[j].id);
    document.getElementById(`bs-anat-tab-${a.layers[j].id}`)?.focus();
  };
  const fade = { initial: reduced ? false : { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.35, ease: EASE } };

  return (
    <Chapter id="bs-anatomy" tone="blue">
      <ChapterHead id="bs-anatomy" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-4">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{a.hint}</p>
          <ol role="tablist" aria-label={a.hint} className="grid grid-cols-3 gap-1.5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-border lg:border-y lg:border-border">
            {a.layers.map((l, i) => {
              const on = l.id === id;
              return (
                <li key={l.id}>
                  <button type="button" role="tab" id={`bs-anat-tab-${l.id}`} aria-selected={on} aria-controls="bs-anat-panel" tabIndex={on ? 0 : -1} onClick={() => setId(l.id)} onKeyDown={(e) => onKey(e, i)}
                    className={cn("flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent lg:rounded-none lg:px-2 lg:py-3", on ? "bg-white text-accent-deep lg:bg-transparent" : "text-foreground hover:text-accent-deep")}>
                    <span className={cn("font-mono text-[10px] tracking-[0.18em]", on ? "text-accent" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">
                      <span className="block text-[13px] font-semibold tracking-[-0.01em] lg:text-[14px]">{l.label}</span>
                      <span className="hidden text-[11px] text-muted-foreground lg:block">{l.question}</span>
                    </span>
                    <span aria-hidden="true" className={cn("hidden h-2 w-2 rounded-full lg:block", on ? "bg-accent" : "bg-border")} />
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <div id="bs-anat-panel" role="tabpanel" aria-labelledby={`bs-anat-tab-${layer.id}`} className="lg:col-span-8">
          <Reveal variant="scale" delay={0.08}>
            <Surface title={layer.adds} meta={layer.label}>
              <div className="relative aspect-[16/9] w-full min-h-[300px] sm:min-h-0">
                {/* relationship lines */}
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  {cv.links.map(([x, y]) => (
                    <motion.line key={`${x}-${y}`} x1={POS[x][0]} y1={POS[x][1]} x2={POS[y][0]} y2={POS[y][1]} stroke="#2563EB" strokeWidth="1.2" vectorEffect="non-scaling-stroke" initial={false} animate={{ opacity: show("relations") || show("workflows") ? 0.8 : 0.18 }} transition={{ duration: 0.4 }} />
                  ))}
                </svg>
                {show("relations") && cv.links.map(([x, y, label]) => (
                  <motion.span key={`${x}-${y}-lbl`} {...fade} className={cn(MONO, "absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-white px-1.5 py-0.5 text-[9px] text-accent")} style={{ left: `${(POS[x][0] + POS[y][0]) / 2}%`, top: `${(POS[x][1] + POS[y][1]) / 2}%` }}>{label}</motion.span>
                ))}
                {cv.records.map((r) => (
                  <div key={r.id} className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 sm:w-[170px]" style={{ left: `${POS[r.id][0]}%`, top: `${POS[r.id][1]}%` }}>
                    <Entity label={r.label} name={r.name} fields={show("entities") ? r.fields : []} active={show("entities")}>
                      {show("states") && <motion.span {...fade} className="mt-2 block"><StateChip>{cv.states[r.id]}</StateChip></motion.span>}
                      {show("people") && <motion.span {...fade} className="mt-2 flex items-center gap-1.5"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF3FC] font-mono text-[9px] text-accent-deep">{cv.roles[r.id].slice(0, 1)}</span><span className="text-[11px] text-foreground/80">{cv.roles[r.id]}</span></motion.span>}
                    </Entity>
                  </div>
                ))}
                {/* rule / workflow / automation callouts */}
                {(show("rules") || show("workflows") || show("automation")) && (
                  <motion.ul {...fade} className="absolute inset-x-3 bottom-2 flex flex-wrap justify-center gap-1.5 sm:left-auto sm:right-3 sm:top-1/2 sm:bottom-auto sm:w-[200px] sm:-translate-y-1/2 sm:flex-col sm:justify-start">
                    {(show("rules") ? cv.rules : show("workflows") ? cv.workflows : cv.automations).map((t) => (
                      <li key={t} className={cn("rounded-[5px] border px-2 py-1.5 text-[11px] leading-snug", show("rules") ? "border-dashed border-accent/60 bg-white text-accent-deep" : show("workflows") ? "border-accent bg-[#EEF3FC] text-accent-deep" : "border-[#B9DDC6] bg-[#EAF6EE] text-[#1F6B3A]")}>{t}</li>
                    ))}
                  </motion.ul>
                )}
                {show("integrations") && (
                  <motion.ul {...fade} className="absolute inset-x-3 bottom-2 flex justify-center gap-2 sm:bottom-3">
                    {cv.integrations.map((t) => <li key={t} className="flex items-center gap-2"><span aria-hidden="true" className="h-px w-5 bg-accent" /><Pill tone="done">{t}</Pill></li>)}
                  </motion.ul>
                )}
                {show("visibility") && (
                  <motion.ul {...fade} className="absolute inset-x-3 bottom-2 grid grid-cols-3 gap-2 sm:bottom-3">
                    {cv.indicators.map(([k, v]) => <li key={k} className="rounded-[6px] border border-border bg-white px-2.5 py-2"><span className="block font-heading text-lg font-bold tracking-[-0.02em] text-foreground">{v}</span><span className="block text-[10px] leading-snug text-muted-foreground">{k}</span></li>)}
                  </motion.ul>
                )}
              </div>
            </Surface>
          </Reveal>
          <motion.div key={layer.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-5">
            <p className={cn(MONO, "text-accent")}>{layer.question}</p>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-foreground/85">{layer.text}</p>
          </motion.div>
        </div>
      </div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
