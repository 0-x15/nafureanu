import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, Caption, EASE, MONO, Statement, tabKey } from "./webBits";

const N = 5;

/** The fictional hero at one of five moments: generic → clarified → ordered → proven → actionable. */
function Canvas({ k, step, reduced }) {
  const t = { duration: reduced ? 0 : 0.5, ease: EASE };
  const generic = step === 0;
  const centered = step <= 1;
  const proof = step >= 3;
  const action = step >= 4;
  const fade = (key, children, cls = "") => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={key} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t} className={cn("block", cls)}>{children}</motion.span>
    </AnimatePresence>
  );
  return (
    <LayoutGroup id="fs">
      <div aria-hidden="true" className={cn("relative aspect-[16/10] overflow-hidden text-[11px] transition-colors duration-500 sm:text-[13px] md:text-[15px] lg:text-[17px]", generic ? "bg-[#F1F1F1] text-[#3A3A3A]" : "bg-[#F6F3EC] text-[#1C1B19]")}>
        <div className="flex h-full flex-col px-[5%] pt-[3.5%]">
          <div className={cn("flex items-center justify-between pb-[2.5%]", generic ? "border-b border-black/10" : "border-b border-[#1C1B19]/15")}>
            {fade(generic ? "bad" : "good", generic ? k.badName : k.name, cn("font-heading text-[1em] font-bold", !generic && "tracking-[-0.02em]"))}
            <span className="flex items-center gap-[1.6em] font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-70">{(generic ? k.badNav : k.nav).map((n) => <span key={n}>{n}</span>)}</span>
          </div>
          <div className={cn("grid flex-1 pt-[4%]", centered ? "grid-cols-1 content-center justify-items-center text-center" : "grid-cols-[1.25fr_1fr] items-center gap-[6%]")}>
            <div className={cn("min-w-0", centered ? "max-w-[30em]" : "")}>
              {!generic && <motion.p layout="position" transition={t} className="font-mono text-[0.42em] uppercase tracking-[0.2em] opacity-60">{fade(`k${step > 1 ? 1 : 0}`, k.kicker)}</motion.p>}
              <motion.h3 layout="position" transition={t} className={cn("mt-[0.4em] font-heading font-bold leading-[1.02]", generic ? "text-[1.5em] tracking-[-0.01em]" : centered ? "text-[1.7em] tracking-[-0.03em]" : "text-[2.3em] tracking-[-0.035em]")}>
                {fade(`t${Math.min(step, 2)}`, step === 0 ? k.badSlogan : step === 1 ? k.clearTitle : k.title)}
              </motion.h3>
              <motion.p layout="position" transition={t} className={cn("mt-[0.9em] leading-[1.55] opacity-75", centered ? "mx-auto max-w-[28em] text-[0.6em]" : "max-w-[32em] text-[0.64em]")}>
                {fade(`s${Math.min(step, 2)}`, step === 0 ? k.badSub : step === 1 ? k.clearSub : k.sub)}
              </motion.p>
              <AnimatePresence initial={false}>
                {proof && (
                  <motion.ul key="proof" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t} className="mt-[1.1em] flex flex-wrap gap-x-[1.2em] gap-y-[0.4em] font-mono text-[0.42em] uppercase tracking-[0.14em] opacity-75">
                    {k.proof.map((p) => <li key={p} className="before:mr-1 before:content-['✓']">{p}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
              <motion.div layout="position" transition={t} className={cn("mt-[1.4em] flex flex-wrap items-center gap-[1em]", centered && "justify-center")}>
                <AnimatePresence mode="wait" initial={false}>
                  {action ? (
                    <motion.span key="cta" initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={t} className="inline-flex items-center gap-2 bg-[#1C1B19] px-[1.1em] py-[0.55em] text-[0.56em] font-semibold text-white">{k.cta} <span>→</span></motion.span>
                  ) : (
                    <motion.span key="bad" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} className={cn("inline-flex items-center border px-[1.1em] py-[0.55em] text-[0.56em] font-medium", generic ? "border-black/25 bg-white" : "border-current/30")}>{k.badCta}</motion.span>
                  )}
                </AnimatePresence>
                {action && <motion.span initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.15 }} className="text-[0.52em] opacity-70">{k.ctaAlt}</motion.span>}
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {!centered && (
                <motion.div key="plate" layout initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={t} className="relative aspect-[4/5] max-h-[78%] self-center justify-self-end w-full">
                  <span className="wd-plate absolute inset-0 block grayscale" />
                  <span className="absolute bottom-[4%] left-[4%] font-mono text-[0.38em] uppercase tracking-[0.16em] text-white/90">{k.imageLabel}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {generic && <span className="wd-plate absolute inset-x-0 bottom-0 h-[22%] opacity-25" />}
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}

/**
 * The first seconds. A deliberately generic hero for a fictional company
 * is redesigned step by step: clarify what it is, order the hierarchy,
 * add evidence, offer the right action. The five questions a visitor
 * answers before reading are ticked as the page starts to answer them.
 */
export default function FirstSeconds({ c }) {
  const t = c.seconds;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const [step, setStep] = useState(reduced ? N - 1 : 0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!inView || !auto || reduced || step >= N - 1) return undefined;
    const id = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1600 : 2000);
    return () => clearTimeout(id);
  }, [inView, auto, reduced, step]);
  const select = (i) => { setAuto(false); setStep(i); };
  const answered = new Set(t.steps.slice(0, step + 1).flatMap((s) => s.answers));
  const s = t.steps[step];
  return (
    <Act id="wd-seconds" tone="white">
      <Reveal>
        <Statement id="wd-seconds-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div ref={ref} className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{t.questionsLabel}</p>
          <ol className="mt-4 divide-y divide-border border-y border-border">
            {t.questions.map((q) => {
              const ok = answered.has(q.id);
              return (
                <li key={q.id} className="flex items-center justify-between gap-4 py-3.5">
                  <span className={cn("font-heading text-lg font-semibold tracking-[-0.02em] transition-colors md:text-xl", ok ? "text-foreground" : "text-foreground/35")}>{q.label}</span>
                  <span className={cn(MONO, "shrink-0 transition-colors", ok ? "text-accent" : "text-foreground/30")} aria-live="polite">{ok ? t.answered : t.pending}</span>
                </li>
              );
            })}
          </ol>
          <div role="tablist" aria-label={t.stepsLabel} className="mt-8 grid gap-1.5">
            {t.steps.map((x, i) => {
              const on = i === step;
              return (
                <button key={x.id} type="button" role="tab" id={`wd-step-${x.id}`} aria-selected={on} aria-controls="wd-step-panel" tabIndex={on ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, i, N, select)} className={cn("flex items-baseline gap-3 rounded-[6px] px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "bg-[#F3F1EA]" : "hover:bg-[#F7F6F2]")}>
                  <span className={cn(MONO, on ? "text-accent" : "text-muted-foreground")}>0{i}</span>
                  <span className={cn("text-[14px] font-semibold", on ? "text-foreground" : "text-foreground/70")}>{x.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-8">
          <div id="wd-step-panel" role="tabpanel" aria-labelledby={`wd-step-${s.id}`}>
            <div className="shadow-[0_40px_90px_-60px_rgba(12,18,32,0.45)]"><Canvas k={t.canvas} step={step} reduced={reduced} /></div>
            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={s.id} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="max-w-xl text-[15px] leading-[1.65] text-foreground/85"><span className="font-semibold text-foreground">{s.title}. </span>{s.text}</motion.p>
              </AnimatePresence>
              <Caption>{t.note}</Caption>
            </div>
          </div>
        </div>
      </div>
    </Act>
  );
}
