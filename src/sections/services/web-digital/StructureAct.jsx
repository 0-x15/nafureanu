import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Act, EASE, H2, Index, MONO, Reg, SERIF, tabKey } from "./webBits";

/* Where each fragment lies before anyone organises it (canvas percentages). */
const SCATTER = {
  brand: { left: 8, top: 10, rotate: -2 }, nav: { left: 58, top: 78, rotate: 1.5 }, kicker: { left: 66, top: 12, rotate: 2 },
  title: { left: 14, top: 40, rotate: -1 }, lead: { left: 46, top: 58, rotate: 1 }, cta: { left: 70, top: 34, rotate: -2.5 },
  secondary: { left: 10, top: 70, rotate: 2 }, proof: { left: 30, top: 24, rotate: -1.5 },
  noise0: { left: 52, top: 44, rotate: 2 }, noise1: { left: 8, top: 86, rotate: -1 }, noise2: { left: 74, top: 62, rotate: 1 },
};

/** A fragment of information: the same element in all three states, so it travels. */
function Frag({ id, state, reduced, className = "", style = {}, children }) {
  const s = SCATTER[id];
  const scattered = state === 0;
  return (
    <motion.div layout transition={{ duration: reduced ? 0 : 0.7, ease: EASE }} className={cn("wd-motion", scattered ? "absolute" : "relative", className)} style={scattered ? { left: `${s.left}%`, top: `${s.top}%`, rotate: s.rotate } : style}>
      {children}
    </motion.div>
  );
}

/**
 * Act 02 — structure before style. One website surface, three states.
 * Content: the information as it arrives, scattered and with noise.
 * Structure: fragments snap into a hierarchy; the noise is struck out.
 * Design: the visual direction arrives on a structure that already works.
 * The elements physically travel between states.
 */
export default function StructureAct({ c }) {
  const t = c.structure;
  const f = t.fragments;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [state, setState] = useState(reduced ? 2 : 0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!inView || !auto || reduced || state >= 2) return undefined;
    const id = window.setTimeout(() => setState((v) => v + 1), state === 0 ? 1700 : 2100);
    return () => window.clearTimeout(id);
  }, [inView, auto, reduced, state]);
  const select = (i) => { setAuto(false); setState(i); };
  const design = state === 2;
  const structure = state === 1;
  const mono = "font-mono text-[10px] uppercase tracking-[0.14em]";
  const slot = (label) => structure && <span className={cn(mono, "absolute -top-4 left-0 text-foreground/40")}>{label}</span>;

  return (
    <Act id="wd-structure" tone="white" className="py-16 md:py-24">
      <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-4">
          <Index>{c.index.structure}</Index>
          <h2 id="wd-structure-title" className={cn(H2, "mt-5")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span><span className="block text-accent">{t.q}</span></h2>
          <ol className="mt-8 border-t border-foreground/12" role="tablist" aria-label={t.statesLabel} aria-orientation="vertical">
            {t.states.map((x, i) => {
              const on = i === state;
              return (
                <li key={x.id} className="border-b border-foreground/12">
                  <button type="button" role="tab" id={`wd-state-${x.id}`} aria-selected={on} aria-controls="wd-state-panel" tabIndex={on ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, i, 3, select)} className={cn("group grid w-full grid-cols-[28px_1fr] items-baseline gap-3 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "text-foreground" : "text-foreground/45 hover:text-foreground/80")}>
                    <span className={cn(MONO, on ? "text-accent" : "text-current")}>{x.n}</span>
                    <span>
                      <span className="block font-heading text-[17px] font-bold tracking-[-0.02em]">{x.label}</span>
                      <motion.span initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35 }} className="block overflow-hidden text-[14px] leading-[1.55] text-muted-foreground">{x.note}</motion.span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div id="wd-state-panel" role="tabpanel" aria-labelledby={`wd-state-${t.states[state].id}`} className="lg:col-span-8">
          <LayoutGroup id="wd-structure">
            <div className={cn("wd-motion relative h-[clamp(380px,54svh,540px)] overflow-hidden border transition-colors duration-700", design ? "border-transparent bg-[#F6F3EC] text-[#1C1B19]" : "border-foreground/10 bg-white text-foreground/70")} aria-hidden="true">
              {/* structure: slot outlines */}
              {structure && <div className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-3 px-[5%]"><span className="col-span-12 border-x border-dashed border-foreground/10" /></div>}
              <div className={cn("relative flex h-full flex-col", state === 0 ? "" : "px-[5%] pb-[4%] pt-[3.5%]")}>
                {/* header row */}
                <div className={cn(state === 0 ? "" : "flex items-center justify-between border-b pb-[2%]", design ? "border-[#1C1B19]/15" : structure ? "border-dashed border-foreground/20" : "")}>
                  <Frag id="brand" state={state} reduced={reduced}>
                    <span className={cn("transition-all duration-500", design ? `${SERIF} text-[1.1em] font-semibold text-[#1C1B19]` : "text-[13px] font-medium")}>{f.brand}</span>
                  </Frag>
                  <Frag id="nav" state={state} reduced={reduced}>
                    <span className={cn("flex gap-[1.4em] transition-all duration-500", design ? `${mono} text-[#1C1B19]/70` : "text-[12px]")}>{f.nav.map((n) => <span key={n}>{n}</span>)}</span>
                  </Frag>
                </div>
                {/* main */}
                <div className={cn(state === 0 ? "" : "grid flex-1 gap-[5%] pt-[4%]", state !== 0 && "grid-cols-1", design && "md:grid-cols-[1.25fr_0.75fr] md:items-end")}>
                  <div className={cn(state === 0 ? "" : "relative flex flex-col")}>
                    <Frag id="kicker" state={state} reduced={reduced}>
                      <span className={cn("transition-all duration-500", design ? `${mono} text-[#1C1B19]/60` : "text-[12px]")}>{f.kicker}</span>
                    </Frag>
                    <Frag id="title" state={state} reduced={reduced} className={cn(state !== 0 && "mt-[0.6em]")}>
                      {slot(t.slots.message)}
                      <span className={cn("block max-w-[18ch] transition-all duration-500", design ? `${SERIF} text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#1C1B19]` : structure ? "text-[clamp(1.2rem,2vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground/80" : "text-[13px] font-medium")}>{f.title}</span>
                    </Frag>
                    <Frag id="lead" state={state} reduced={reduced} className={cn(state !== 0 && "mt-[1em]")}>
                      {slot(t.slots.support)}
                      <span className={cn("block max-w-[34ch] transition-all duration-500", design ? "text-[clamp(0.8rem,1vw,0.95rem)] leading-[1.55] text-[#1C1B19]/75" : structure ? "text-[13px] leading-[1.5] text-foreground/60" : "text-[13px]")}>{f.lead}</span>
                    </Frag>
                    <div className={cn(state === 0 ? "" : "mt-[1.4em] flex flex-wrap items-center gap-[1.2em]")}>
                      <Frag id="cta" state={state} reduced={reduced}>
                        {slot(t.slots.action)}
                        <span className={cn("inline-flex items-center gap-2 transition-all duration-500", design ? "bg-[#2563EB] px-[1.1em] py-[0.55em] text-[13px] font-semibold text-white" : structure ? "border border-foreground/30 px-3 py-1.5 text-[12px] font-semibold text-foreground/80" : "text-[13px] font-medium")}>{f.cta}{design && <span aria-hidden="true">↗</span>}</span>
                      </Frag>
                      <Frag id="secondary" state={state} reduced={reduced}>
                        <span className={cn("transition-all duration-500", design ? "text-[12px] text-[#1C1B19]/70 underline underline-offset-4 decoration-[#1C1B19]/30" : "text-[12px]")}>{f.secondary}</span>
                      </Frag>
                    </div>
                  </div>
                  {/* media arrives with design */}
                  <motion.div initial={false} animate={{ opacity: design ? 1 : 0, scale: design ? 1 : 0.96 }} transition={{ duration: reduced ? 0 : 0.7, ease: EASE }} className={cn("relative hidden md:block", design ? "h-[62%] self-end" : "h-0")}>
                    <div className="wd-plate-warm absolute inset-0" /><span className={cn(mono, "absolute bottom-2 left-2 text-white/85")}>{f.mediaCaption}</span>
                  </motion.div>
                </div>
                {/* proof strip */}
                <Frag id="proof" state={state} reduced={reduced} className={cn(state !== 0 && "mt-auto pt-[3%]")}>
                  {slot(t.slots.proof)}
                  <span className={cn("flex flex-wrap gap-x-[2em] gap-y-1 transition-all duration-500", design ? `${mono} border-t border-[#1C1B19]/15 pt-[0.8em] text-[#1C1B19]/60` : structure ? "border-t border-dashed border-foreground/20 pt-[0.8em] text-[11px] uppercase tracking-[0.12em] text-foreground/50" : "text-[13px]")}>{f.proof.map((p, i) => <span key={p}>{state !== 0 ? `0${i + 1} ` : ""}{p}</span>)}</span>
                </Frag>
                {/* noise: struck out when structure arrives, gone with design */}
                {f.noise.map((n, i) => (
                  <motion.div key={n} layout initial={false} animate={{ opacity: design ? 0 : structure ? 0.35 : 1, scale: design ? 0.9 : 1 }} transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: structure ? 0.25 + i * 0.1 : 0 }} className={cn("absolute text-[13px]", structure && "line-through decoration-[#A4261B]/60")} style={{ left: `${SCATTER[`noise${i}`].left}%`, top: `${SCATTER[`noise${i}`].top}%`, rotate: SCATTER[`noise${i}`].rotate }}>{n}</motion.div>
                ))}
              </div>
            </div>
          </LayoutGroup>
          <div className="mt-3 flex items-center justify-between">
            <Reg label={t.caption} tone="muted" />
            <span className={cn(MONO, "text-muted-foreground")} aria-live="polite">{t.states[state].n} · {t.states[state].label}</span>
          </div>
        </div>
      </div>
    </Act>
  );
}
