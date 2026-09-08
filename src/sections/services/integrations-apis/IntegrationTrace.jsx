import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, Field, MONO, Note, Packet, Stamp, Statement, Sys, tabKey } from "./intBits";

const N = 6;

/** The payload as it is at a given stage: ghost before it has been translated, changed once it has. */
function Payload({ label, kind, fields, ghost = false, changed = false, tone = "neutral", meta = undefined, className = "" }) {
  return (
    <Sys label={label} tone={tone} meta={meta} className={className}>
      <p className={cn(MONO, "mb-1 text-[9px] text-muted-foreground")}>{kind}</p>
      {fields.map(([k, v]) => <Field key={k} k={k} v={ghost ? "—" : v} tone={ghost ? "ghost" : changed ? "changed" : "neutral"} />)}
    </Sys>
  );
}

/** What happens · why it exists · what can go wrong, for one stage. */
function Explain({ t, s }) {
  return (
    <dl className="grid gap-4 md:grid-cols-3 md:gap-6">
      {[["what", t.whatLabel, s.what], ["why", t.whyLabel, s.why], ["fail", t.failLabel, s.fail]].map(([id, label, text]) => (
        <div key={id}>
          <dt className={cn(MONO, id === "fail" ? "text-[#A4261B]" : "text-accent")}>{label}</dt>
          <dd className="mt-1.5 text-[14px] leading-[1.65] text-foreground/85">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The signature act: one fictional record travels end to end. The stages
 * are a tablist; the trace plays once when it enters the viewport and then
 * stays calm. The destination payload literally takes shape as the data
 * is translated, delivered and confirmed. Direction and mechanism live in
 * the same act, as controls and notes, not as separate chapters.
 */
export default function IntegrationTrace({ c }) {
  const t = c.trace;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const [stage, setStage] = useState(reduced ? N - 1 : -1);
  const [playing, setPlaying] = useState(false);
  const [dir, setDir] = useState(0);
  useEffect(() => { if (inView && !reduced && stage === -1 && !playing) setPlaying(true); }, [inView, reduced, stage, playing]);
  useEffect(() => {
    if (!playing) return undefined;
    if (stage >= N - 1) { setPlaying(false); return undefined; }
    const id = setTimeout(() => setStage((s) => s + 1), stage < 0 ? 600 : 1400);
    return () => clearTimeout(id);
  }, [playing, stage]);
  const select = (i) => { setPlaying(false); setStage(i); };
  const s = stage >= 0 ? t.stages[stage] : null;
  const mapped = stage >= 2;
  const delivered = stage >= 4;
  const confirmed = stage >= 5;
  const d = t.directions[dir];
  const tr = { duration: reduced ? 0 : 0.35, ease: EASE };

  return (
    <Act id="in-trace" tone="ledger">
      <Reveal>
        <Statement id="in-trace-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>

      <div ref={ref} className="mt-12 rounded-[14px] border border-border bg-white/90 p-4 shadow-[0_30px_70px_-50px_rgba(12,18,32,0.35)] backdrop-blur-[2px] md:p-6">
        {/* Trace header */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4">
          <Stamp tone="transit" glyph={false}>{t.traceId}</Stamp>
          <span className={cn(MONO, "text-foreground/80")}>{d.sign}</span>
          <span className={cn(MONO, "text-muted-foreground")}>{t.time}</span>
          <span className="ml-auto flex items-center gap-2">
            <span className={cn(MONO, "text-muted-foreground")} aria-live="polite">{s ? s.stamp : t.atSource}</span>
            <button type="button" onClick={() => { setStage(-1); setPlaying(true); }} disabled={reduced || playing} className={cn(MONO, "rounded-[4px] border border-border bg-white px-2 py-1 text-foreground/75 outline-none transition-colors hover:border-foreground/35 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40")}>{t.play}</button>
          </span>
        </div>

        {/* Source · stages · destination */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:items-start lg:gap-8">
          <Payload label={t.sourceLabel} kind={t.sourceKind} fields={t.source} tone={stage < 0 ? "accent" : "neutral"} />

          <div className="relative">
            <div role="tablist" aria-label={t.stagesLabel} aria-orientation="horizontal" className="relative grid gap-1 lg:grid-cols-6 lg:gap-0">
              <span aria-hidden="true" className="absolute bottom-2 left-[13px] top-2 w-px bg-foreground/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[13px] lg:h-px lg:w-auto" />
              {stage >= 0 && !reduced && (
                <motion.span aria-hidden="true" layout transition={{ duration: 0.5, ease: EASE }} className="absolute left-[13px] hidden -translate-x-1/2 -translate-y-1/2 lg:block" style={{ top: 13, left: `${((stage + 0.5) / N) * 100}%` }}><Packet /></motion.span>
              )}
              {t.stages.map((x, i) => {
                const on = i === stage;
                const past = i < stage;
                return (
                  <div key={x.id} className="lg:text-center">
                    <button type="button" role="tab" id={`in-stage-${x.id}`} aria-selected={on} aria-controls="in-stage-panel" tabIndex={on || (stage < 0 && i === 0) ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, Math.max(0, stage), N, select)} className="group flex w-full items-center gap-3 rounded-[6px] px-1 py-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:flex-col lg:gap-2 lg:text-center">
                      <span aria-hidden="true" className={cn("relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px] transition-colors", on ? "border-accent text-accent ring-4 ring-accent/15" : past ? "border-accent bg-accent text-white" : "border-foreground/30 text-muted-foreground")}>{past ? "✓" : `0${i + 1}`}</span>
                      <span className={cn("text-[13px] font-semibold leading-tight transition-colors", on ? "text-accent" : past ? "text-foreground" : "text-muted-foreground")}>{x.label}</span>
                      <span className={cn(MONO, "ml-auto hidden text-[9px] text-muted-foreground lg:ml-0 lg:block", !past && !on && "invisible")}>{past ? x.stamp : on ? x.stampNow : x.stamp}</span>
                    </button>
                    {on && (
                      <div className="mb-2 ml-[38px] rounded-[8px] border border-border bg-[#FAFBFD] p-4 lg:hidden">
                        <Note tone="accent" className="mb-3">{x.note}</Note>
                        <Explain t={t} s={x} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div id="in-stage-panel" role="tabpanel" aria-labelledby={s ? `in-stage-${s.id}` : undefined} className="mt-6 hidden min-h-[190px] rounded-[10px] border border-border bg-[#FAFBFD] p-5 lg:block">
              <AnimatePresence mode="wait" initial={false}>
                {s ? (
                  <motion.div key={s.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
                    <Note tone="accent" className="mb-4">{s.note}</Note>
                    <Explain t={t} s={s} />
                  </motion.div>
                ) : (
                  <motion.p key="idle" initial={false} animate={{ opacity: 1 }} className="text-[14px] leading-[1.65] text-muted-foreground">{t.idle}</motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Payload label={t.destLabel} kind={t.destKind} fields={t.destination} ghost={!mapped} changed={mapped && !confirmed} tone={confirmed ? "accent" : delivered ? "accent" : "neutral"} meta={confirmed ? <Stamp tone="ok">{t.ack}</Stamp> : delivered ? <Stamp tone="transit">{t.delivering}</Stamp> : undefined} />
        </div>

        {/* Mapping line under the trace */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
          {t.mappings.map(([from, to]) => (
            <span key={from} className={cn("inline-flex items-center gap-2 font-mono text-[11px] transition-opacity", mapped ? "opacity-100" : "opacity-35")}>
              <span className="text-muted-foreground">{from}</span><span aria-hidden="true" className="text-accent">→</span><span className="text-foreground">{to}</span>
            </span>
          ))}
          <span className="ml-auto text-[12px] text-muted-foreground">{t.mappingNote}</span>
        </div>
      </div>

      {/* Direction */}
      <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className={cn(MONO, "text-muted-foreground")}>{t.directionLabel}</p>
          <h3 className="mt-3 font-heading text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-foreground md:text-3xl">{t.directionTitle}</h3>
          <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-muted-foreground">{t.directionIntro}</p>
        </div>
        <div className="lg:col-span-7">
          <div role="tablist" aria-label={t.directionLabel} className="inline-flex max-w-full flex-wrap gap-1 rounded-[10px] border border-border bg-white p-1">
            {t.directions.map((x, i) => {
              const on = i === dir;
              return <button key={x.id} type="button" role="tab" id={`in-dir-${x.id}`} aria-selected={on} aria-controls="in-dir-panel" tabIndex={on ? 0 : -1} onClick={() => setDir(i)} onKeyDown={(e) => tabKey(e, i, t.directions.length, setDir)} className={cn("rounded-[7px] px-3 py-2 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "bg-accent text-white" : "text-foreground/75 hover:bg-[#F3F5F9]")}>{x.label}</button>;
            })}
          </div>
          <div id="in-dir-panel" role="tabpanel" aria-labelledby={`in-dir-${d.id}`} className="mt-4 grid gap-5 rounded-[10px] border border-border bg-white p-5 md:grid-cols-[140px_1fr] md:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={d.id} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tr} className="font-heading text-3xl font-bold tracking-[-0.02em] text-accent md:text-4xl">{d.sign}</motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={d.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
                <p className="text-[15px] leading-[1.7] text-foreground/85">{d.text}</p>
                <p className="mt-3 flex items-start gap-2 text-[14px] leading-[1.6] text-muted-foreground"><span aria-hidden="true" className="mt-[7px] h-px w-4 shrink-0 bg-accent" />{d.fits}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mechanisms and honesty */}
      <div className="mt-16 border-t border-border pt-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className={cn(MONO, "text-muted-foreground")}>{t.mechanismsLabel}</p>
            <h3 className="mt-3 font-heading text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-foreground md:text-3xl">{t.mechanismsTitle}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-muted-foreground">{t.mechanismsIntro}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {t.mechanisms.map((m) => (
              <li key={m.id} className="rounded-[8px] border border-border bg-white p-4">
                <span className={cn(MONO, "text-accent")}>{m.label}</span>
                <span className="mt-1.5 block text-[14px] leading-[1.6] text-foreground/85">{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="mt-14">
          <h3 className="max-w-3xl font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl [text-wrap:balance]"><span className="block">{t.honestyA}</span><span className="block text-muted-foreground">{t.honestyB}</span></h3>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.outcomes.map((o) => (
              <li key={o.label} className="rounded-[8px] border border-border bg-white p-4">
                <Stamp tone={o.tone}>{o.label}</Stamp>
                <span className="mt-3 block text-[14px] leading-[1.6] text-foreground/85">{o.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Act>
  );
}
