import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, H2, Index, MONO } from "./studioBits";

/**
 * Room 01 — the operating model as an architectural section: four
 * structural pillars that assemble when the room enters view. Selecting
 * one reads its foundation. White room, tight structural spacing.
 */
export default function StudioModel({ a }) {
  const t = a.model;
  const reduced = useReducedMotion();
  const [on, setOn] = useState(0);
  const p = t.pillars[on];
  return (
    <section id="studio-model" aria-labelledby="studio-model-title" className="scroll-mt-20 bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <Index meta={t.meta}>{t.index}</Index>
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 id="studio-model-title" className={cn(H2, "text-foreground md:col-span-7")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className={cn(MONO, "text-muted-foreground md:col-span-4 md:col-start-9 md:text-right")}>{t.hint}</p>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-3 md:mt-12 md:gap-6" role="group" aria-label={t.index}>
          {t.pillars.map((x, i) => {
            const active = on === i;
            return (
              <button key={x.n} type="button" aria-pressed={active} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} className="group relative flex h-[260px] flex-col items-start text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 md:h-[320px]">
                <span className={cn(MONO, "transition-colors", active ? "text-accent" : "text-muted-foreground")}>{x.n}</span>
                <span className="relative mt-3 flex min-h-0 flex-1 items-stretch gap-3">
                  <motion.span aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.12 * i, ease: EASE }} className={cn("block origin-bottom transition-[width,background-color] duration-300", active ? "w-[3px] bg-accent" : "w-px bg-foreground/30 group-hover:bg-foreground/60")} />
                  <span className={cn("self-end font-heading text-[15px] font-bold leading-none tracking-[-0.02em] [writing-mode:vertical-rl] rotate-180 transition-colors md:text-[19px]", active ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80")}>{x.label}</span>
                </span>
                <span aria-hidden="true" className={cn("mt-3 block h-px w-full transition-colors", active ? "bg-accent" : "bg-foreground/25")} />
                <span className={cn("mt-2 hidden text-[12px] leading-snug text-muted-foreground md:block", active && "text-foreground/80")}>{x.short}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 border-t border-foreground/12 pt-5 md:grid-cols-12 md:gap-8" aria-live="polite">
          <p className={cn(MONO, "text-accent md:col-span-3")}>{p.n} · {p.label}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={p.n} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="max-w-[60ch] text-[15px] leading-[1.6] text-foreground/85 md:col-span-9 md:text-[16px]">{p.text}</motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
