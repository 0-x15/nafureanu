import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { EASE, Field, KICKER, MONO, Packet, Stamp, Sys } from "./intBits";

/**
 * Two systems and the person in the middle. The manual queue (copy,
 * export, check…) collapses into one integration and a single signal
 * crosses; System B's state catches up and acknowledges.
 */
function Bridge({ v }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [mode, setMode] = useState(reduced ? 1 : 0);
  const [auto, setAuto] = useState(true);
  const [done, setDone] = useState(Boolean(reduced));
  useEffect(() => {
    if (!inView || !auto || reduced || mode === 1) return undefined;
    const id = setTimeout(() => setMode(1), 2000);
    return () => clearTimeout(id);
  }, [inView, auto, reduced, mode]);
  useEffect(() => {
    if (mode === 0) { setDone(false); return undefined; }
    if (reduced) { setDone(true); return undefined; }
    const id = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(id);
  }, [mode, reduced]);
  const t = { duration: reduced ? 0 : 0.5, ease: EASE };
  return (
    <figure ref={ref} aria-label={v.label} className="m-0">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(150px,0.8fr)_minmax(0,1fr)] sm:items-center sm:gap-0">
        <Sys label={v.a} meta={<Stamp tone="muted" glyph={false}>{v.kindA}</Stamp>}>
          <Field k={v.record.name} v={v.name} />
          <Field k={v.record.ref} v={v.ref} />
          <div className="mt-2 flex items-center justify-between font-mono text-[11px]"><span className="text-muted-foreground">{v.record.status}</span><Stamp tone="ok">{v.statusA}</Stamp></div>
        </Sys>
        <div className="relative flex min-h-[120px] flex-col items-center justify-center sm:min-h-[230px]">
          <AnimatePresence mode="wait" initial={false}>
            {mode === 0 ? (
              <motion.div key="manual" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={t} className="flex flex-wrap items-center justify-center gap-1.5 sm:flex-col sm:flex-nowrap">
                <span className={cn(MONO, "w-full text-center text-muted-foreground sm:mb-1")}>{v.person}</span>
                {v.ops.map((o, i) => (
                  <motion.span key={o} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.07 * i }} className={cn(MONO, "rounded-[4px] border border-dashed border-foreground/35 bg-white px-2.5 py-1 text-foreground/80")}>{o}</motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.div key="integrated" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t} className="relative flex h-full w-full flex-col items-center justify-center">
                <span aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 w-px bg-accent sm:bottom-auto sm:left-0 sm:right-0 sm:top-1/2 sm:h-px sm:w-auto" />
                {!reduced && (
                  <motion.span aria-hidden="true" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: 1.3, ease: "linear", delay: 0.15 }} className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block"><Packet /></motion.span>
                )}
                <span className={cn(MONO, "relative rounded-full border border-accent bg-white px-3 py-1 text-accent")}>{v.integration}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Sys label={v.b} tone={done ? "accent" : "neutral"} meta={<Stamp tone="muted" glyph={false}>{v.kindB}</Stamp>}>
          <Field k={v.record.name} v={v.name} />
          <Field k={v.record.ref} v={v.ref} />
          <div className="mt-2 flex items-center justify-between font-mono text-[11px]"><span className="text-muted-foreground">{v.record.status}</span>{done ? <Stamp tone="ok">{v.statusA}</Stamp> : <Stamp tone="warn">{v.statusB}</Stamp>}</div>
          <p className={cn(MONO, "mt-2 min-h-[16px] text-right text-accent")} aria-live="polite">{done ? v.ack : ""}</p>
        </Sys>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {v.modes.map((m, i) => (
          <button key={m} type="button" aria-pressed={mode === i} onClick={() => { setAuto(false); setMode(i); }} className={cn("rounded-[6px] border px-3 py-1.5 text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", mode === i ? "border-accent bg-white text-accent" : "border-border bg-white text-foreground/75 hover:border-foreground/30")}>{m}</button>
        ))}
        <figcaption className="ml-auto"><Stamp tone="muted" glyph={false}>{v.note}</Stamp></figcaption>
      </div>
    </figure>
  );
}

export default function IntegrationHero({ lang, c, proofPath }) {
  const h = c.hero;
  return (
    <header id="in-hero" className="mx-auto grid max-w-[1440px] items-start gap-12 overflow-x-clip px-5 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12 lg:grid-cols-12 lg:gap-8">
      <div className="min-w-0 lg:col-span-5">
        <Reveal>
          <p className={KICKER}>{h.kicker}</p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground md:text-5xl lg:text-[2.6rem] xl:text-[3rem] [text-wrap:balance]">{h.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-[1.7] text-foreground/85 md:text-lg">{h.lead}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted-foreground">{h.support}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-3">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
          <ActionLink to={proofPath} variant="secondary" icon="right" size="lg">{h.proof}</ActionLink>
        </Reveal>
      </div>
      <Reveal variant="scale" delay={0.1} className="min-w-0 md:mx-auto md:w-full md:max-w-[640px] lg:col-span-7 lg:-mt-10 lg:max-w-none lg:pl-4">
        <Bridge v={h.visual} />
      </Reveal>
    </header>
  );
}
