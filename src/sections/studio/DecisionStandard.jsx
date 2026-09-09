import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, H2, Index, MONO } from "./studioBits";

/* Walk the tree with the answers given so far. */
function walk(nodes, answers) {
  const path = [];
  let id = nodes[0].id;
  let outcome = null;
  for (let guard = 0; guard < 10 && id; guard++) {
    const n = nodes.find((x) => x.id === id);
    if (!n) break;
    const ans = answers[n.id];
    path.push({ id: n.id, ans });
    if (!ans) break;
    const branch = n[ans];
    if (branch.outcome) { outcome = branch.outcome; break; }
    id = branch.next;
  }
  return { path, outcome };
}

function Answer({ chosen, muted, label, onClick }) {
  return <button type="button" aria-pressed={chosen} onClick={onClick} className={cn("min-h-[36px] border px-4 font-heading text-[13px] font-bold tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", chosen ? "border-accent bg-accent text-white" : muted ? "border-foreground/15 text-foreground/40 hover:border-foreground/40 hover:text-foreground/70" : "border-foreground/40 text-foreground hover:border-accent hover:text-accent")}>{label}</button>;
}

function Outcome({ o, lit = false, dim = false }) {
  return (
    <div className={cn("border px-4 py-2.5 transition-all duration-300", lit ? "border-accent bg-accent text-white shadow-[0_18px_40px_-24px_rgba(37,99,235,0.6)]" : dim ? "border-foreground/10 text-foreground/35" : "border-foreground/25 text-foreground/75")}>
      <p className="font-heading text-[14px] font-bold tracking-[-0.01em] md:text-[15px]">{o.label}</p>
      <p className={cn("mt-1 text-[12px] leading-snug", lit ? "text-white/80" : "text-muted-foreground")}>{o.text}</p>
    </div>
  );
}

/**
 * Room 02 — the decision room. Not a quiz that sells a service: a board
 * that shows how we think before proposing anything. Desktop: the whole
 * tree, the chosen path lit. Mobile: one question at a time. Every path
 * arrives at the right decision, not the most complex one.
 */
export default function DecisionStandard({ a }) {
  const t = a.decision;
  const reduced = useReducedMotion();
  const [answers, setAnswers] = useState({});
  const { path, outcome } = walk(t.nodes, answers);
  const onPath = (id) => path.some((s) => s.id === id);
  const answer = (id, v) => setAnswers((prev) => ({ ...prev, [id]: v }));
  const reset = () => setAnswers({});
  const current = path[path.length - 1];
  const currentNode = current ? t.nodes.find((n) => n.id === current.id) : null;

  return (
    <section id="studio-decision" aria-labelledby="studio-decision-title" className="scroll-mt-20 bg-[#EEF2F8] px-5 py-16 [background-image:linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] [background-size:32px_32px] md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Index meta={t.meta}>{t.index}</Index>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="studio-decision-title" className={cn(H2, "text-foreground lg:col-span-6")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <div className="flex items-baseline justify-between gap-6 lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] leading-[1.6] text-foreground/80">{t.intro}</p>
            <button type="button" onClick={reset} className={cn(MONO, "shrink-0 text-muted-foreground underline underline-offset-4 outline-none transition-colors hover:text-foreground focus-visible:text-accent")}>{t.restart}</button>
          </div>
        </div>

        {/* Desktop board */}
        <ol className="mt-8 hidden md:block" aria-label={t.pathLabel}>
          {t.nodes.map((n, i) => {
            const active = onPath(n.id);
            const ans = answers[n.id];
            const isCurrent = current?.id === n.id && !ans;
            const yesOut = n.yes.outcome;
            const noOut = n.no.outcome;
            const last = i === t.nodes.length - 1;
            return (
              <li key={n.id} className="relative grid grid-cols-12 gap-6 pb-4">
                {!last && <span aria-hidden="true" className={cn("absolute bottom-0 left-[19px] top-[64px] w-px", active && ans === "no" ? "bg-accent" : "bg-foreground/20")} />}
                <div className={cn("col-span-7 flex items-start gap-5 transition-opacity duration-300", !active && "opacity-40")}>
                  <span aria-hidden="true" className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center border bg-white font-mono text-[11px]", active ? "border-accent text-accent" : "border-foreground/25 text-muted-foreground", isCurrent && "ring-4 ring-accent/15")}>0{i + 1}</span>
                  <div className="min-w-0">
                    <p className="max-w-[34ch] font-heading text-[18px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[19px]">{n.q}</p>
                    <div className="mt-3 flex gap-2">
                      <Answer chosen={ans === "yes"} muted={!active} label={t.yes} onClick={() => answer(n.id, "yes")} />
                      <Answer chosen={ans === "no"} muted={!active} label={t.no} onClick={() => answer(n.id, "no")} />
                    </div>
                  </div>
                </div>
                <div className="col-span-5 grid grid-cols-[28px_1fr] items-start gap-3">
                  <span aria-hidden="true" className={cn("mt-5 h-px w-full transition-colors", active && (yesOut ? ans === "yes" : ans === "no") ? "bg-accent" : "bg-foreground/20")} />
                  <div className="space-y-3">
                    {yesOut ? (
                      <div><span className={cn(MONO, "mb-1 block", active && ans === "yes" ? "text-accent" : "text-muted-foreground")}>{t.yes} →</span><Outcome o={t.outcomes[yesOut]} lit={active && ans === "yes"} dim={!active} /></div>
                    ) : (
                      <span className={cn(MONO, "block pt-1", active && ans === "yes" ? "text-accent" : "text-muted-foreground")}>{t.yes} → {t.continue}</span>
                    )}
                    {noOut ? (
                      <div><span className={cn(MONO, "mb-1 block", active && ans === "no" ? "text-accent" : "text-muted-foreground")}>{t.no} →</span><Outcome o={t.outcomes[noOut]} lit={active && ans === "no"} dim={!active} /></div>
                    ) : (
                      <span className={cn(MONO, "block", active && ans === "no" ? "text-accent" : "text-muted-foreground")}>{t.no} → {t.continue}</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile: one step at a time */}
        <div className="mt-8 md:hidden">
          <ol className="flex flex-wrap gap-x-3 gap-y-1" aria-label={t.pathLabel}>
            {path.filter((s) => s.ans).map((s, i) => <li key={s.id} className={cn(MONO, "text-accent")}>0{i + 1} {s.ans === "yes" ? t.yes : t.no}</li>)}
          </ol>
          <AnimatePresence mode="wait" initial={false}>
            {outcome ? (
              <motion.div key={outcome} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35, ease: EASE }} className="mt-4">
                <Outcome o={t.outcomes[outcome]} lit />
                <button type="button" onClick={reset} className={cn(MONO, "mt-4 text-muted-foreground underline underline-offset-4")}>{t.restart}</button>
              </motion.div>
            ) : currentNode && (
              <motion.div key={currentNode.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35, ease: EASE }} className="mt-4 border border-foreground/15 bg-white p-5">
                <p className={cn(MONO, "text-accent")}>0{path.length}</p>
                <p className="mt-2 font-heading text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground">{currentNode.q}</p>
                <div className="mt-5 flex gap-2"><Answer chosen={false} muted={false} label={t.yes} onClick={() => answer(currentNode.id, "yes")} /><Answer chosen={false} muted={false} label={t.no} onClick={() => answer(currentNode.id, "no")} /></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Conclusion: every path arrives at the right decision */}
        <div className="mt-12 border-t border-foreground/15 pt-6 md:mt-14">
          <div className="grid gap-4 md:grid-cols-12 md:items-center md:gap-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 md:col-span-7">
              {Object.keys(t.outcomes).map((k) => <li key={k} className={cn(MONO, "transition-colors", outcome === k ? "text-accent" : "text-foreground/55")}>{t.outcomes[k].label}</li>)}
            </ul>
            <p className="md:col-span-5 md:text-right">
              <span className={cn(MONO, "block text-muted-foreground")}>{t.conclusionLabel}</span>
              <span className="mt-1 block font-heading text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold leading-[1.15] tracking-[-0.025em] text-foreground">{t.conclusionA} <span className="text-muted-foreground">{t.conclusionB}</span></span>
            </p>
          </div>
          <p className="mt-6 text-[15px] text-foreground/80">{t.closing}</p>
        </div>
      </div>
    </section>
  );
}
