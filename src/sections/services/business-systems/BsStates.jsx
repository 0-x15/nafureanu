import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, StateChip } from "./bsBits";

const POS = { new: [8, 25], review: [27, 25], approved: [46, 25], progress: [66, 13], blocked: [66, 38], done: [91, 25] };

function pathFor(a, b) {
  const [x1, y1] = POS[a]; const [x2, y2] = POS[b];
  if (a === "review" && b === "new") return `M ${x1} ${y1 + 4} C ${x1} ${y1 + 16}, ${x2} ${y2 + 16}, ${x2} ${y2 + 4}`;
  if (a === "blocked" && b === "progress") return `M ${x1 + 3} ${y1 - 4} L ${x2 + 3} ${y2 + 4}`;
  if (a === "progress" && b === "blocked") return `M ${x1 - 3} ${y1 + 4} L ${x2 - 3} ${y2 - 4}`;
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

/**
 * States and workflows — an interactive state machine. Select a state
 * to see what it requires, who can act, what happens on entry, what runs
 * automatically and where it can go next. Transitions leaving the
 * selected state light up.
 */
export default function BsStates({ c }) {
  const s = c.states;
  const [id, setId] = useState(s.machine.states[1].id);
  const d = s.details[id];
  const reduced = useReducedMotion();
  const nextIds = s.machine.transitions.filter(([a]) => a === id).map(([, b]) => b);
  const label = (sid) => s.machine.states.find((x) => x.id === sid)?.label || sid;
  const onKey = (e, i) => {
    const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: s.machine.states.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(s.machine.states.length - 1, Math.max(0, map[e.key]));
    setId(s.machine.states[j].id);
    document.getElementById(`bs-state-${s.machine.states[j].id}`)?.focus();
  };
  return (
    <Chapter id="bs-states" tone="white">
      <ChapterHead id="bs-states" kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <div className="rounded-[12px] border border-border bg-[#FAFBFD] p-4 md:p-6">
          {/* diagram (sm and up) */}
          <div role="tablist" aria-label={s.kicker} className="relative mx-auto hidden aspect-[2/1] w-full max-w-[920px] sm:block">
            <svg aria-hidden="true" viewBox="0 0 100 50" className="absolute inset-0 h-full w-full overflow-visible">
              <defs><marker id="bs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="1.6" markerHeight="1.6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" /></marker></defs>
              {s.machine.transitions.map(([a, b]) => {
                const on = a === id;
                return <path key={`${a}-${b}`} d={pathFor(a, b)} fill="none" stroke={on ? "#2563EB" : "rgba(15,23,42,0.28)"} strokeWidth={on ? 2 : 1.2} vectorEffect="non-scaling-stroke" markerEnd={on ? "url(#bs-arrow)" : undefined} className="transition-[stroke] duration-300" />;
              })}
            </svg>
            {s.machine.transitions.filter(([a]) => a === id).map(([a, b, t]) => {
              const [x1, y1] = POS[a]; const [x2, y2] = POS[b];
              const off = a === "review" && b === "new" ? 11 : 0;
              const dx = a === "progress" && b === "blocked" ? -9 : a === "blocked" && b === "progress" ? 9 : 0;
              return <motion.span key={`${a}-${b}-t`} aria-hidden="true" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className={cn(MONO, "absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-white px-1.5 py-0.5 text-[9px] text-accent shadow-sm lg:block")} style={{ left: `${(x1 + x2) / 2 + dx}%`, top: `${((y1 + y2) / 2 + off) * 2}%` }}>{t}</motion.span>;
            })}
            {s.machine.states.map((st, i) => {
              const on = st.id === id;
              const next = nextIds.includes(st.id);
              return (
                <button key={st.id} type="button" role="tab" id={`bs-state-${st.id}`} aria-selected={on} aria-controls="bs-state-panel" tabIndex={on ? 0 : -1} onClick={() => setId(st.id)} onKeyDown={(e) => onKey(e, i)}
                  className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-[7px] border bg-white px-3 py-2 text-[12px] font-semibold tracking-[-0.01em] outline-none transition-[border-color,box-shadow,color] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent text-accent-deep shadow-[0_12px_28px_-18px_rgba(37,99,235,0.7)]" : next ? "border-accent/50 text-foreground" : "border-border text-foreground/80 hover:border-foreground/40")}
                  style={{ left: `${POS[st.id][0]}%`, top: `${POS[st.id][1] * 2}%` }}>
                  <span aria-hidden="true" className={cn("mr-1.5 inline-block h-1.5 w-1.5 rounded-full", on ? "bg-accent" : next ? "bg-accent/50" : "bg-border")} />{st.label}
                </button>
              );
            })}
          </div>
          {/* list (below sm) */}
          <ol className="flex flex-wrap gap-1.5 sm:hidden">
            {s.machine.states.map((st) => <li key={st.id}><button type="button" aria-pressed={st.id === id} onClick={() => setId(st.id)} className={cn("rounded-[6px] border px-3 py-1.5 text-[12px] font-semibold", st.id === id ? "border-accent bg-white text-accent-deep" : "border-border bg-white text-foreground/80")}>{st.label}</button></li>)}
          </ol>
          <motion.dl key={id} id="bs-state-panel" role="tabpanel" aria-labelledby={`bs-state-${id}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 grid gap-4 rounded-[10px] border border-border bg-white p-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1"><dt className={cn(MONO, "text-muted-foreground")}>{label(id)}</dt><dd className="mt-1"><StateChip>{label(id)}</StateChip></dd></div>
            {[["requires", d.requires], ["who", d.who], ["effects", d.effects], ["auto", d.auto]].map(([k, v]) => (
              <div key={k}><dt className={cn(MONO, "text-muted-foreground")}>{s.labels[k]}</dt><dd className={cn("mt-1 text-[13px] leading-snug", k === "auto" ? "text-[#1F6B3A]" : "text-foreground/85")}>{v}</dd></div>
            ))}
            <div className="sm:col-span-2 lg:col-span-5"><dt className={cn(MONO, "text-muted-foreground")}>{s.labels.next}</dt><dd className="mt-1.5 flex flex-wrap gap-1.5">{nextIds.length ? nextIds.map((n) => <button key={n} type="button" onClick={() => setId(n)} className="rounded-[4px] border border-accent/50 bg-[#EEF3FC] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-deep outline-none hover:border-accent focus-visible:ring-2 focus-visible:ring-accent">{label(n)} →</button>) : <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">—</span>}</dd></div>
          </motion.dl>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{s.note}</p>
      </Reveal>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
