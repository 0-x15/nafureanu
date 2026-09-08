import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { EASE, Handles, KICKER, MONO, Tag } from "./saasBits";

/**
 * The product sketch. State 0: an unfinished sentence. State 1: the
 * questions that turn it into a user and a need. State 2: the core
 * action, alone. State 3: the skeleton of an interface. Plays once when
 * in view; the reader can step through it; reduced motion shows the end.
 */
function Sketch({ h }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const [state, setState] = useState(reduced ? 3 : 0);
  const [auto, setAuto] = useState(!reduced);
  useEffect(() => {
    if (!inView || !auto || reduced) return undefined;
    if (state >= 3) { setAuto(false); return undefined; }
    const id = setTimeout(() => setState((s) => Math.min(3, s + 1)), state === 0 ? 1600 : 1800);
    return () => clearTimeout(id);
  }, [inView, auto, state, reduced]);
  const t = { duration: reduced ? 0 : 0.45, ease: EASE };
  const positions = [{ left: "6%", top: "10%" }, { right: "6%", top: "14%" }, { left: "8%", bottom: "12%" }, { right: "8%", bottom: "10%" }];
  return (
    <figure ref={ref} aria-label={h.visualLabel} className="m-0">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[12px] border border-dashed border-foreground/30 bg-white [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:28px_28px]">
        <AnimatePresence mode="wait" initial={false}>
          {state <= 1 && (
            <motion.div key="idea" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 sm:w-[64%]">
                <p className="relative font-heading text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                  {h.sentence}
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: state >= 1 ? 1 : 0 }} transition={t} className="text-accent"> {h.completion}</motion.span>
                  {state === 0 && <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[2px] translate-y-1 bg-accent motion-safe:animate-pulse" />}
                  {state >= 1 && <Handles />}
                </p>
              </div>
              {h.questions.map((q, i) => (
                <motion.span key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: state >= 1 ? 1 : 0, y: state >= 1 ? 0 : 6 }} transition={{ ...t, delay: 0.15 * i }} className="absolute max-w-[42%] rounded-[6px] border border-accent/40 bg-white px-3 py-2 shadow-sm" style={positions[i]}>
                  <span className={cn(MONO, "block text-accent")}>{q.label}</span>
                  <span className="block text-[12px] leading-snug text-foreground/85">{q.answer}</span>
                </motion.span>
              ))}
            </motion.div>
          )}
          {state === 2 && (
            <motion.div key="action" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={t} className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <span className={cn(MONO, "text-muted-foreground")}>{h.questions[2].label}</span>
              <span className="relative rounded-[10px] border-2 border-accent bg-white px-6 py-4 font-heading text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{h.questions[2].answer}<Handles /></span>
              <span className="max-w-[70%] text-center text-[12px] text-muted-foreground">{h.questions[3].answer}</span>
            </motion.div>
          )}
          {state === 3 && (
            <motion.div key="product" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t} className="absolute inset-3 flex flex-col overflow-hidden rounded-[8px] border border-border bg-white sm:inset-5">
              <div className="flex items-center gap-4 border-b border-border px-4 py-2.5">
                <span className="flex items-center gap-2 text-[12px] font-bold tracking-[-0.01em] text-foreground"><i aria-hidden="true" className="h-2 w-2 bg-accent" />{h.skeleton.side.split(" ")[0]}</span>
                {h.skeleton.nav.map((n, i) => <span key={n} className={cn("text-[11px]", i === 0 ? "font-semibold text-accent" : "text-muted-foreground")}>{n}</span>)}
              </div>
              <div className="grid flex-1 gap-3 p-4 sm:grid-cols-[1fr_140px]">
                <div>
                  <div className="flex items-center justify-between gap-3"><span className="text-[13px] font-semibold text-foreground">{h.skeleton.nav[0]}</span><span className="relative rounded-[5px] bg-accent px-3 py-1.5 text-[11px] font-medium text-white">{h.skeleton.primary}<Handles /></span></div>
                  <ul className="mt-3 divide-y divide-border rounded-[6px] border border-border">{h.skeleton.rows.map((r) => <li key={r} className="px-3 py-2 text-[11px] text-foreground/80">{r}</li>)}</ul>
                </div>
                <div className="hidden rounded-[6px] border border-dashed border-foreground/25 p-3 sm:block"><span className={cn(MONO, "text-muted-foreground")}>{h.skeleton.side}</span><span className="mt-2 block h-1.5 w-2/3 rounded-[2px] bg-foreground/15" /><span className="mt-1.5 block h-1.5 w-1/2 rounded-[2px] bg-foreground/15" /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {h.states.map((s, i) => { const on = i === state; return <li key={s}><button type="button" aria-pressed={on} onClick={() => { setAuto(false); setState(i); }} className={cn("w-full rounded-[6px] border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-white" : "border-border hover:border-foreground/30")}><span className={cn(MONO, "block", on ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span><span className="mt-0.5 block text-[12px] font-semibold text-foreground">{s}</span></button></li>; })}
      </ol>
      <figcaption className="mt-3"><Tag tone="muted">{h.note}</Tag></figcaption>
    </figure>
  );
}

export default function ProductHero({ lang, c, proofPath }) {
  const h = c.hero;
  return (
    <header id="sp-hero" className="mx-auto grid max-w-[1440px] items-start gap-12 overflow-x-clip px-5 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12 lg:grid-cols-12 lg:gap-8">
      <div className="min-w-0 lg:col-span-5">
        <Reveal>
          <p className={KICKER}>{h.kicker}</p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-5xl lg:text-[3.6rem] [text-wrap:balance]">{h.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-[1.7] text-foreground/85 md:text-lg">{h.lead}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted-foreground">{h.support}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-3">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
          <ActionLink to={proofPath} variant="secondary" icon="right" size="lg">{h.proof}</ActionLink>
        </Reveal>
      </div>
      <Reveal variant="scale" delay={0.1} className="min-w-0 md:mx-auto md:w-full md:max-w-[620px] lg:col-span-7 lg:-mt-10 lg:max-w-none lg:pl-4">
        <Sketch h={h} />
      </Reveal>
    </header>
  );
}
