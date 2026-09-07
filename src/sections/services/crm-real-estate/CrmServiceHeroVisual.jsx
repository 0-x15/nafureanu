import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MONO } from "./serviceBits";

/* Which domain each live event lights up (indices into h.domains). */
const EVENT_DOMAIN = [4, 3, 5, 7, 1, 9];
const RADIUS = 43; // % of the square

/**
 * The operating model: ten domains on a ring around the CRM core. Live
 * events cycle only while the visual is on screen and never under
 * reduced motion; below lg the ring becomes a grid with the same data.
 */
export default function CrmServiceHeroVisual({ h }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [ev, setEv] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return undefined;
    const id = setInterval(() => setEv((v) => (v + 1) % h.events.length), 2600);
    return () => clearInterval(id);
  }, [inView, reduced, h.events.length]);
  const activeDomain = EVENT_DOMAIN[ev % EVENT_DOMAIN.length];

  return (
    <figure ref={ref} aria-label={h.visualLabel} className="m-0">
      {/* Ring — lg and up */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] lg:block">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(15,23,42,0.08)" strokeDasharray="0.6 1.4" />
          {h.domains.map((d, i) => {
            const a = ((i * 36 - 90) * Math.PI) / 180;
            const x = 50 + RADIUS * Math.cos(a);
            const y = 50 + RADIUS * Math.sin(a);
            const on = i === activeDomain;
            return <line key={d.id} x1="50" y1="50" x2={x} y2={y} stroke={on ? "#2563EB" : "rgba(15,23,42,0.12)"} strokeWidth={on ? 0.5 : 0.25} className="transition-[stroke] duration-500" />;
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/30 bg-white text-center shadow-[0_0_0_10px_rgba(37,99,235,0.05),0_24px_48px_-28px_rgba(37,99,235,0.45)]">
          <span className="font-heading text-2xl font-bold tracking-[-0.03em] text-foreground">{h.core}</span>
          <span aria-hidden="true" className="mt-1.5 h-[2px] w-6 rounded-full bg-accent" />
        </div>
        {h.domains.map((d, i) => {
          const a = ((i * 36 - 90) * Math.PI) / 180;
          const x = 50 + RADIUS * Math.cos(a);
          const y = 50 + RADIUS * Math.sin(a);
          const on = i === activeDomain;
          return (
            <div
              key={d.id}
              className={cn(
                "absolute w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] border bg-white px-2.5 py-2 text-center transition-[border-color,box-shadow,transform] duration-500",
                on ? "border-accent shadow-[0_12px_30px_-16px_rgba(37,99,235,0.6)] scale-[1.04]" : "border-border"
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className={cn("block text-[12px] font-semibold tracking-[-0.01em]", on ? "text-accent-deep" : "text-foreground")}>{d.label}</span>
              <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground">{d.hint}</span>
            </div>
          );
        })}
        <Ticker events={h.events} ev={ev} className="absolute left-1/2 top-[calc(50%+92px)] -translate-x-1/2" />
      </div>

      {/* Grid — below lg */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3 rounded-[8px] border border-accent/30 bg-white px-4 py-3">
          <span className="font-heading text-xl font-bold tracking-[-0.03em] text-foreground">{h.core}</span>
          <Ticker events={h.events} ev={ev} />
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {h.domains.map((d, i) => {
            const on = i === activeDomain;
            return (
              <li key={d.id} className={cn("rounded-[8px] border bg-white px-3 py-2.5 transition-colors duration-500", on ? "border-accent" : "border-border")}>
                <span className={cn("block text-[12px] font-semibold", on ? "text-accent-deep" : "text-foreground")}>{d.label}</span>
                <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground">{d.hint}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className={cn(MONO, "mt-4 text-muted-foreground")}>{h.note}</figcaption>
    </figure>
  );
}

function Ticker({ events, ev, className = "" }) {
  return (
    <div className={cn("flex h-8 items-center gap-2 overflow-hidden rounded-full border border-border bg-[#F6F8FB] px-3", className)} aria-live="off">
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" /></span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={ev} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className={cn(MONO, "whitespace-nowrap text-foreground/80")}>
          {events[ev]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
