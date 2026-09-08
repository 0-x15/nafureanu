import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag, tabKey } from "./csBits";

/** Workflows and states — a linear rail whose selected state opens a control panel: what that state governs. */
export default function CsStates({ c }) {
  const s = c.states;
  const [i, setI] = useState(1);
  const st = s.states[i];
  const reduced = useReducedMotion();
  const label = (id) => s.states.find((x) => x.id === id)?.label || id;
  return (
    <Chapter id="cs-states" tone="blue">
      <ChapterHead id="cs-states" kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <div className="rounded-[12px] border border-border bg-white p-4 md:p-6">
          <ol role="tablist" aria-label={s.kicker} className="flex items-start overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {s.states.map((x, k) => {
              const on = k === i;
              const done = k < i;
              return (
                <li key={x.id} className="relative flex min-w-[110px] flex-1 flex-col">
                  <span className="flex items-center">
                    <button type="button" role="tab" id={`cs-state-${x.id}`} aria-selected={on} aria-controls="cs-state-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, s.states.length, setI)} aria-label={x.label}
                      className={cn("relative z-10 h-5 w-5 shrink-0 rounded-[4px] border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent shadow-[0_0_0_5px_rgba(37,99,235,0.14)]" : done ? "border-accent bg-[#EEF3FC]" : "border-border bg-white hover:border-accent")} />
                    {k < s.states.length - 1 && <span aria-hidden="true" className={cn("h-px flex-1", done ? "bg-accent" : "bg-border")} />}
                  </span>
                  <button type="button" tabIndex={-1} onClick={() => setI(k)} className={cn("mt-2 pr-2 text-left text-[13px] font-semibold tracking-[-0.01em]", on ? "text-accent" : done ? "text-foreground/80" : "text-muted-foreground")}>{x.label}</button>
                </li>
              );
            })}
          </ol>
          <motion.div key={st.id} id="cs-state-panel" role="tabpanel" aria-labelledby={`cs-state-${st.id}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[8px] border border-accent/40 bg-[#F7F9FD] p-3.5 sm:col-span-2 lg:col-span-1"><p className={cn(MONO, "text-muted-foreground")}>{s.labels.actions}</p><ul className="mt-2 flex flex-wrap gap-1.5">{st.actions.length ? st.actions.map((a, k) => <li key={a} className={cn("rounded-[5px] border px-2.5 py-1 text-[12px] font-medium", k === 0 ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground")}>{a}</li>) : <li className="text-[12px] text-muted-foreground">—</li>}</ul></div>
            {[["requires", st.requires], ["owner", st.owner], ["documents", st.documents], ["notify", st.notify]].map(([k, v]) => <div key={k} className="rounded-[8px] border border-border p-3.5"><p className={cn(MONO, "text-muted-foreground")}>{s.labels[k]}</p><p className="mt-1.5 text-[13px] leading-snug text-foreground/85">{v}</p></div>)}
            <div className="rounded-[8px] border border-[#B9DDC6] bg-[#EAF6EE] p-3.5 sm:col-span-2"><p className={cn(MONO, "text-[#1F6B3A]")}>{s.labels.automation}</p><p className="mt-1.5 text-[13px] leading-snug text-[#1F6B3A]">{st.automation}</p></div>
            <div className="rounded-[8px] border border-border p-3.5"><p className={cn(MONO, "text-muted-foreground")}>{s.labels.next}</p><div className="mt-2 flex flex-wrap gap-1.5">{st.next.length ? st.next.map((n) => <button key={n} type="button" onClick={() => setI(s.states.findIndex((x) => x.id === n))} className="outline-none focus-visible:ring-2 focus-visible:ring-accent"><Tag tone="accent">{label(n)} →</Tag></button>) : <Tag tone="muted">—</Tag>}</div></div>
          </motion.div>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{s.note}</p>
      </Reveal>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
