import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, MONO, Note, Statement, Tag } from "./saasBits";

/**
 * A website ends when it's published; a product starts there. The
 * product shell: switch on the systems a product may need and watch
 * the shell fill; billing opens its own states; then the user/operator
 * switch shows the side founders forget.
 */
export default function ProductShell({ c }) {
  const s = c.shell;
  const [on, setOn] = useState(() => new Set(["auth", "accounts", "state", "notifications", "admin"]));
  const [view, setView] = useState("user");
  const reduced = useReducedMotion();
  const toggle = (id) => setOn((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const active = s.systems.filter((x) => on.has(x.id));
  return (
    <Act id="sp-shell" tone="studio" className="pt-0 md:pt-0">
      <Reveal><Statement id="sp-shell-title" a={s.statementA} b={s.statementB} /></Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-[1fr_1.6fr] md:gap-6">
        <Reveal delay={0.05}><div className="h-full rounded-[10px] border border-border bg-white p-5"><Note>{s.website.label}</Note><ol className="mt-4 flex flex-wrap gap-2">{s.website.items.map((w, i) => <li key={w} className="flex items-center gap-2"><span className="rounded-[6px] border border-border px-3 py-1.5 text-[13px] text-foreground/80">{w}</span>{i < s.website.items.length - 1 && <span aria-hidden="true" className="h-px w-3 bg-foreground/30" />}</li>)}</ol><p className={cn(MONO, "mt-6 text-muted-foreground")}>—</p></div></Reveal>
        <Reveal variant="scale" delay={0.08}><div className="h-full rounded-[10px] border border-accent bg-white p-5"><Note tone="accent">{s.product.label}</Note><ul className="mt-4 flex flex-wrap gap-2">{s.product.items.map((w) => <li key={w} className="rounded-[6px] border border-accent/40 bg-[#EEF3FC] px-3 py-1.5 text-[13px] font-medium text-accent-deep">{w}</li>)}</ul><span aria-hidden="true" className="mt-5 block h-px w-full bg-accent/30" /><span className={cn(MONO, "mt-2 block text-accent")}>∞</span></div></Reveal>
      </div>
      <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <Note>{s.systemsLabel}</Note>
          <p className={cn(MONO, "mt-1 text-accent")}>{s.systemsHint}</p>
          <ul className="mt-3 grid grid-cols-2 gap-1.5">{s.systems.map((x) => { const a = on.has(x.id); return <li key={x.id}><button type="button" aria-pressed={a} onClick={() => toggle(x.id)} className={cn("w-full rounded-[6px] border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", a ? "border-accent bg-white" : "border-border bg-white/60 hover:border-foreground/30")}><span className={cn("block text-[12px] font-semibold", a ? "text-accent-deep" : "text-foreground/80")}>{x.label}</span></button></li>; })}</ul>
          <p className="mt-4 text-[13px] text-muted-foreground">{s.note}</p>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <div className="rounded-[12px] border border-border bg-white p-4 md:p-6" aria-live="polite">
            <div className="rounded-[8px] border border-foreground/30 p-3"><span className={cn(MONO, "text-foreground/70")}>{c.studio.frame.product} · {s.product.label}</span></div>
            <ol className="mt-2 space-y-1.5">
              {active.map((x, i) => (
                <motion.li key={x.id} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className={cn("grid gap-1 rounded-[7px] border px-3 py-2 sm:grid-cols-[170px_1fr]", x.id === "billing" ? "border-accent bg-[#F7F9FD]" : "border-border bg-[#FAFBFD]")} style={{ marginLeft: `${Math.min(i, 8) * 1.5}%` }}>
                  <span className="text-[13px] font-semibold text-foreground">{x.label}</span>
                  <span className="text-[12px] text-muted-foreground">{x.text}</span>
                  {x.id === "billing" && <span className="sm:col-span-2"><span className={cn(MONO, "block text-accent")}>{s.billing.label}</span><span className="mt-1.5 flex flex-wrap gap-1.5">{s.billing.states.map((b) => <Tag key={b} tone="accent">{b}</Tag>)}</span><span className="mt-1.5 block text-[11px] text-muted-foreground">{s.billing.note}</span></span>}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-center">
        <Reveal delay={0.05} className="lg:col-span-5">
          <Statement a={s.operator.statementA} b={s.operator.statementB} as="p" className="md:text-3xl lg:text-4xl" />
          <div role="group" aria-label={`${s.operator.userLabel} / ${s.operator.operatorLabel}`} className="mt-6 inline-flex rounded-[8px] border border-border bg-white p-1">
            {[["user", s.operator.userLabel], ["operator", s.operator.operatorLabel]].map(([k, l]) => <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)} className={cn("rounded-[6px] px-4 py-2 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent", view === k ? "bg-accent text-white" : "text-foreground hover:bg-[#F6F8FB]")}>{l}</button>)}
          </div>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <motion.div key={view} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-[12px] border border-border bg-white">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5"><span className="flex items-center gap-2 text-[12px] font-bold text-foreground"><i aria-hidden="true" className="h-2 w-2 bg-accent" />{c.studio.frame.product}</span><Tag tone={view === "user" ? "neutral" : "accent"}>{view === "user" ? s.operator.userLabel : s.operator.operatorLabel}</Tag></div>
            <ul className="grid gap-2 p-4 sm:grid-cols-2">{(view === "user" ? s.operator.user : s.operator.operator).map((x) => <li key={x} className={cn("rounded-[6px] border px-3 py-2.5 text-[13px] font-medium", view === "user" ? "border-border bg-[#FAFBFD] text-foreground/85" : "border-accent/40 bg-[#EEF3FC] text-accent-deep")}>{x}</li>)}</ul>
          </motion.div>
        </Reveal>
      </div>
    </Act>
  );
}
