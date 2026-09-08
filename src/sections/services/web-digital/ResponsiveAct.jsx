import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import PageSurface from "./PageSurface";
import { Act, EASE, MONO, Statement, tabKey } from "./webBits";

const WIDTH = { desktop: "100%", tablet: "68%", mobile: "40%" };
const WIDTH_SMALL = { desktop: "100%", tablet: "84%", mobile: "66%" };

/** A typographic toggle: a small square and a word. */
function Toggle({ on, onClick, children }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={cn("wd-keep inline-flex items-center gap-2.5 font-heading text-lg font-bold tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "text-accent" : "text-foreground/60 hover:text-foreground")}>
      <span aria-hidden="true" className={cn("h-2.5 w-2.5 border", on ? "border-accent bg-accent" : "border-current")} />{children}
    </button>
  );
}

/**
 * Act 04 — a website has to behave. The same surface, in the direction
 * chosen above, recomposes for desktop, tablet and phone: the menu
 * changes, text reflows, the action stays in reach. Two conditions
 * (keyboard, reduced motion) and one purposeful interaction.
 */
export default function ResponsiveAct({ c, mode }) {
  const t = c.behave;
  const reduced = useReducedMotion();
  const [ctx, setCtx] = useState(0);
  const [kb, setKb] = useState(false);
  const [rm, setRm] = useState(false);
  const [inter, setInter] = useState(true);
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setSmall(mq.matches);
    apply();
    if (mq.matches) setCtx(2);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const id = t.contexts[ctx].id;
  return (
    <Act id="wd-behave" tone="white" index={c.index.behave} wireLabel={c.wire.detail}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Statement id="wd-behave-title" a={t.a} b={t.b} size="text-[clamp(2rem,4.2vw,3.8rem)]" />
          <p className="mt-6 max-w-[34ch] text-lg leading-[1.55] text-foreground/80">{t.text}</p>
          <p className={cn(MONO, "mt-12 text-muted-foreground")}>{t.contextsLabel}</p>
          <div role="tablist" aria-label={t.contextsLabel} className="mt-3 flex flex-wrap gap-x-7 border-b border-foreground/15">
            {t.contexts.map((x, i) => {
              const on = i === ctx;
              return <button key={x.id} type="button" role="tab" id={`wd-ctx-${x.id}`} aria-selected={on} aria-controls="wd-ctx-panel" tabIndex={on ? 0 : -1} onClick={() => setCtx(i)} onKeyDown={(e) => tabKey(e, i, t.contexts.length, setCtx)} className={cn("wd-keep -mb-px border-b-2 pb-3 pt-1 font-heading text-xl font-bold tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "border-accent text-foreground" : "border-transparent text-foreground/40 hover:text-foreground/80")}>{x.label}</button>;
            })}
          </div>
          <p className="mt-4 min-h-[44px] text-[14px] leading-[1.6] text-muted-foreground" aria-live="polite">{t.changes[id]}</p>
          <p className={cn(MONO, "mt-10 text-muted-foreground")}>{t.togglesLabel}</p>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            <Toggle on={kb} onClick={() => setKb((v) => !v)}>{t.keyboard}</Toggle>
            <Toggle on={rm} onClick={() => setRm((v) => !v)}>{t.reduced}</Toggle>
          </div>
          <p className="mt-3 min-h-[22px] text-[14px] leading-[1.6] text-muted-foreground" aria-live="polite">{kb && rm ? `${t.keyboardNote} ${t.reducedNote}` : kb ? t.keyboardNote : rm ? t.reducedNote : ""}</p>
        </div>
        <div className="lg:col-span-8">
          <div id="wd-ctx-panel" role="tabpanel" aria-labelledby={`wd-ctx-${id}`} className="flex min-h-[380px] items-start justify-center bg-[#F3F1EA] p-4 md:min-h-[520px] md:p-8">
            <motion.div initial={false} animate={{ width: (small ? WIDTH_SMALL : WIDTH)[id] }} transition={{ duration: reduced ? 0 : 0.75, ease: EASE }} className="w-full shadow-[0_40px_90px_-60px_rgba(12,18,32,0.5)]">
              <PageSurface key={`${id}-${mode}-${rm}`} s={c.surface} mode={mode} viewport={id} keyboard={kb} reduced={rm} interactive={inter} />
            </motion.div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-12 md:items-end">
            <h3 className="font-heading text-[clamp(1.5rem,2.6vw,2.3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:col-span-7 [text-wrap:balance]"><span className="block">{t.motionA}</span><span className="block text-muted-foreground">{t.motionB}</span></h3>
            <div className="md:col-span-5 md:justify-self-end md:text-right">
              <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
                <Toggle on={!inter} onClick={() => setInter(false)}>{t.staticLabel}</Toggle>
                <Toggle on={inter} onClick={() => setInter(true)}>{t.interactiveLabel}</Toggle>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{inter ? t.interactiveHint : t.staticHint}</p>
            </div>
          </div>
        </div>
      </div>
    </Act>
  );
}
