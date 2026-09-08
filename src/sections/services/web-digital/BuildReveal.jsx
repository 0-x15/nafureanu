import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import BuildSpecimen from "./BuildSpecimen";
import { Act, H2, H3, Index, MONO, Reg } from "./webBits";

/* Which layers live in which vertical band of the specimen. */
const BANDS = [["semantics", "content", "component"], ["grid", "media"], ["interaction", "performance", "a11y"]];
const bandAt = (x) => (x < 32 ? 0 : x < 68 ? 1 : 2);

/**
 * Act 05 — design becomes software. The finished page stays; a divider
 * the visitor drags (or moves with the keyboard) peels it back to its
 * construction layer, and the legend follows the divider spatially.
 * Then design and development as one experience: a lock-up, not a slogan.
 */
export default function BuildReveal({ c }) {
  const t = c.build;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const [x, setX] = useState(reduced ? 58 : 100);
  const [auto, setAuto] = useState(true);
  const [legendHot, setLegendHot] = useState(/** @type {string | null} */ (null));
  useEffect(() => {
    if (!inView || reduced || !auto) return undefined;
    const start = performance.now();
    let raf = 0;
    const step = (now) => { const p = Math.min(1, (now - start) / 1500); const e = 1 - Math.pow(1 - p, 3); setX(100 - 42 * e); if (p < 1) raf = requestAnimationFrame(step); };
    const delay = window.setTimeout(() => { raf = requestAnimationFrame(step); }, 400);
    return () => { window.clearTimeout(delay); cancelAnimationFrame(raf); };
  }, [inView, reduced, auto]);
  const pct = Math.round(x);
  const band = bandAt(x);
  const hot = legendHot || BANDS[band][0];
  const H = "clamp(380px,54svh,540px)";
  return (
    <Act id="wd-build" className="py-16 md:py-24">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6">
          <Index>{c.index.build}</Index>
          <h2 id="wd-build-title" className={cn(H2, "mt-5")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
        </div>
        <p className="max-w-[38ch] text-[15px] leading-[1.6] text-muted-foreground lg:col-span-5 lg:col-start-8 lg:pb-1">{t.text}</p>
      </div>

      <div ref={ref} className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-9">
          <div className="relative select-none shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)]" style={{ height: H }}>
            <div className="absolute inset-0 isolate"><BuildSpecimen s={t.specimen} layers={t.layers} blueprint hot={hot} /></div>
            <div className="absolute inset-0 isolate z-[1]" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}><BuildSpecimen s={t.specimen} layers={t.layers} /></div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent" style={{ left: `${x}%` }}>
              <i className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-white font-mono text-[10px] tracking-[0.08em] text-accent shadow-[0_12px_30px_-10px_rgba(37,99,235,0.6)]">{pct}</i>
              <span className={cn(MONO, "absolute -left-1 bottom-3 -translate-x-full whitespace-nowrap text-accent")}>{t.design}</span>
              <span className={cn(MONO, "absolute bottom-3 left-2 whitespace-nowrap text-accent")}>{t.construction}</span>
            </span>
            <input type="range" min="0" max="100" value={pct} onChange={(e) => { setAuto(false); setX(Number(e.target.value)); }} onPointerDown={() => setAuto(false)} aria-label={t.sliderLabel} aria-valuetext={`${pct}% ${t.design}`} className="wd-range peer absolute inset-0 z-20 h-full w-full opacity-0" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 ring-accent ring-offset-2 peer-focus-visible:ring-2" />
          </div>
        </div>
        <ol className="lg:col-span-3" aria-label={t.layersLabel}>
          {t.layers.map((l) => {
            const on = hot === l.id;
            return (
              <li key={l.id} onMouseEnter={() => setLegendHot(l.id)} onMouseLeave={() => setLegendHot(null)} className={cn("grid grid-cols-[18px_1fr] items-baseline gap-2 border-b border-foreground/12 py-2.5 transition-colors", on ? "text-foreground" : "text-foreground/50")}>
                <span className={cn("transition-opacity", on ? "opacity-100" : "opacity-30")}><Reg /></span>
                <span><span className="block text-[14px] font-semibold">{l.label}</span><span className={cn(MONO, "block text-[9px]", on ? "text-accent" : "text-muted-foreground")}>{l.tag}</span></span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* design + development = one experience */}
      <div className="mt-16 grid gap-10 border-t border-foreground/12 pt-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="grid grid-cols-[auto_28px_auto] items-center gap-x-4 gap-y-3">
            <span className="font-heading text-[clamp(1.3rem,1.9vw,1.75rem)] font-bold tracking-[-0.03em] text-foreground">{t.lockup.design}</span>
            <span aria-hidden="true" className="row-span-2 h-full w-full"><svg viewBox="0 0 28 80" className="h-full w-full" preserveAspectRatio="none"><path d="M0 8h14v64H0M14 40h28" fill="none" stroke="#2563EB" strokeWidth="1.2" /></svg></span>
            <span className={cn("row-span-2 self-center font-heading text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[1] tracking-[-0.035em] text-accent")}>{t.lockup.one}</span>
            <span className="font-heading text-[clamp(1.3rem,1.9vw,1.75rem)] font-bold tracking-[-0.03em] text-foreground">{t.lockup.dev}</span>
          </div>
          <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.65] text-foreground/85">{t.lockupText}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {[[t.offerDesign, t.designItems], [t.offerDev, t.devItems]].map(([label, items]) => (
            <div key={label}>
              <p className={cn(H3, "text-[1.15rem]")}>{label}</p>
              <ul className="mt-3 space-y-1.5">{items.map((i) => <li key={i} className="flex items-center gap-2.5 text-[14px] text-foreground/80"><i className="h-px w-3 bg-accent" />{i}</li>)}</ul>
            </div>
          ))}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-foreground/12 pt-4 sm:col-span-2" aria-label={t.marksLabel}>
            {t.marks.map((m) => <li key={m} className={cn(MONO, "flex items-center gap-1.5 text-foreground/70")}><span aria-hidden="true" className="text-accent">✓</span>{m}</li>)}
          </ul>
        </div>
      </div>
    </Act>
  );
}
