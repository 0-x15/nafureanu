import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Act, EASE, H2, Index, MONO, Reg, Segmented } from "./webBits";

/**
 * Act 06 — the brief. A creative document on a sheet: eight fields, a
 * primary goal that decides which of them matter first, margin notes.
 * Not a form. With this we can start.
 */
export default function WebBrief({ c }) {
  const t = c.brief;
  const reduced = useReducedMotion();
  const [goal, setGoal] = useState(t.sheet.goals[0].id);
  const g = t.sheet.goals.find((x) => x.id === goal) || t.sheet.goals[0];
  const rank = (id) => g.rows.indexOf(id);
  return (
    <Act id="wd-brief" tone="white" className="py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <Index>{c.index.brief}</Index>
          <h2 id="wd-brief-title" className={cn(H2, "mt-5 lg:text-[clamp(1.6rem,2.3vw,2.3rem)]")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className="mt-5 max-w-[32ch] text-[15px] leading-[1.6] text-muted-foreground">{t.intro}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="border border-foreground/12 bg-[#FCFBF8] shadow-[0_40px_80px_-60px_rgba(12,18,32,0.4)]">
            <div className="flex items-center justify-between border-b border-foreground/12 px-5 py-3 md:px-7">
              <span className="flex items-center gap-3"><Reg /><span className={cn(MONO, "text-foreground/70")}>{t.sheet.title} · {t.sheet.number}</span></span>
              <span className={cn(MONO, "text-muted-foreground")}>{t.sheet.owner}</span>
            </div>
            <div className="border-b border-foreground/12 px-5 pb-3 pt-4 md:px-7">
              <p className={cn(MONO, "text-muted-foreground")}>{t.sheet.goalLabel}</p>
              <Segmented idPrefix="wd-goal" size="sm" label={t.sheet.goalLabel} controls="wd-brief-rows" items={t.sheet.goals.map((x) => ({ id: x.id, label: x.label }))} value={goal} onChange={setGoal} className="mt-1 border-b-0" />
            </div>
            <ol id="wd-brief-rows" className="divide-y divide-foreground/10">
              {t.sheet.rows.map((r, i) => {
                const k = rank(r.id);
                const on = k >= 0;
                return (
                  <motion.li key={r.id} initial={false} animate={{ opacity: on ? 1 : 0.55 }} transition={{ duration: reduced ? 0 : 0.35, ease: EASE }} className="grid grid-cols-[28px_1fr] items-baseline gap-3 px-5 py-3.5 md:grid-cols-[28px_120px_1fr_150px] md:gap-5 md:px-7">
                    <span className={cn(MONO, on ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span>
                    <span className={cn(MONO, "text-foreground/70")}>{r.label}</span>
                    <span className="col-span-2 text-[15px] leading-[1.5] text-foreground md:col-span-1 md:text-[16px]">{r.q}</span>
                    <span className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-self-end">
                      {on ? <><span className={cn(MONO, "text-accent")}>{t.sheet.priority} {k + 1}</span><span className="text-[12px] text-foreground/70">{r.hint}</span></> : <span className={cn(MONO, "text-transparent")}>·</span>}
                    </span>
                  </motion.li>
                );
              })}
            </ol>
            <div className="flex items-center justify-between border-t border-foreground/12 px-5 py-3 md:px-7">
              <span className="font-heading text-[15px] font-bold tracking-[-0.02em] text-accent">{t.start}</span>
              <span className={cn(MONO, "text-muted-foreground")}>{g.label}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className={cn(MONO, "text-muted-foreground")}>{t.notesLabel}</p>
          <ul className="mt-3 divide-y divide-foreground/12 border-y border-foreground/12">
            {t.notes.map((n) => <li key={n.label} className="py-3"><span className="block text-[14px] font-semibold text-foreground">{n.label}</span><span className="block text-[13px] leading-[1.55] text-muted-foreground">{n.text}</span></li>)}
          </ul>
          <p className="mt-4 text-[13px] leading-[1.6] text-muted-foreground">{t.noSpec}</p>
        </div>
      </div>
    </Act>
  );
}
