import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import PageSurface from "./PageSurface";
import { Act, MONO, Statement } from "./webBits";

/**
 * Act 05 — design becomes software. The designed surface stays; a
 * divider the visitor drags (or moves with the keyboard) peels it back
 * to its construction layer: semantic tags, the grid, the action's
 * focus, media loading, metadata, motion rules. Then what we design and
 * what we develop, as one discipline.
 */
export default function BuildReveal({ c, mode }) {
  const t = c.build;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const [x, setX] = useState(reduced ? 56 : 100);
  const [auto, setAuto] = useState(true);
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    if (!inView || reduced || !auto) return undefined;
    const start = performance.now();
    let raf = 0;
    const step = (now) => {
      const p = Math.min(1, (now - start) / 1400);
      const e = 1 - Math.pow(1 - p, 3);
      setX(100 - 44 * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const delay = window.setTimeout(() => { raf = requestAnimationFrame(step); }, 500);
    return () => { window.clearTimeout(delay); cancelAnimationFrame(raf); };
  }, [inView, reduced, auto]);
  const vp = small ? "mobile" : "desktop";
  const pct = Math.round(x);
  return (
    <Act id="wd-build" tone="page" index={c.index.build} wireLabel={c.wire.detail}>
      <Statement id="wd-build-title" a={t.a} b={t.b} />
      <p className="mt-6 max-w-[42ch] text-lg leading-[1.55] text-foreground/80">{t.text}</p>
      <div ref={ref} className={cn("mt-14", small && "mx-auto max-w-[420px]")}>
        <div className="relative select-none">
          <PageSurface s={c.surface} mode={mode} viewport={vp} build />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}><PageSurface s={c.surface} mode={mode} viewport={vp} /></div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent" style={{ left: `${x}%` }}>
            <i className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-white font-mono text-[11px] text-accent shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)]">⇔</i>
          </span>
          <input type="range" min="0" max="100" value={pct} onChange={(e) => { setAuto(false); setX(Number(e.target.value)); }} onPointerDown={() => setAuto(false)} aria-label={t.sliderLabel} aria-valuetext={`${pct}% ${t.design}`} className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 ring-accent ring-offset-2 peer-focus-visible:ring-2" />
        </div>
        <div className={cn(MONO, "mt-3 flex items-center justify-between text-muted-foreground")}>
          <span className={cn(pct > 50 && "text-accent")}>{t.design}</span>
          <span className={cn(pct <= 50 && "text-accent")}>{t.construction}</span>
        </div>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-3 border-y border-foreground/15 py-5 sm:grid-cols-3 lg:grid-cols-6" aria-label={t.marksLabel}>
        {t.marks.map((m) => <li key={m} className={cn(MONO, "flex items-center gap-2 text-foreground/80")}><span aria-hidden="true" className="text-accent">✓</span>{m}</li>)}
      </ul>

      <div className="mt-24 grid gap-14 md:mt-36 md:grid-cols-2 md:gap-10">
        {[[t.offerDesign, t.designItems], [t.offerDev, t.devItems]].map(([label, items]) => (
          <div key={label}>
            <p className="font-heading text-[clamp(2.6rem,6.4vw,6.4rem)] font-bold leading-[0.9] tracking-[-0.05em] text-foreground">{label}</p>
            <ul className="mt-7 font-heading text-[clamp(1.3rem,2.4vw,2.1rem)] font-medium leading-[1.3] tracking-[-0.025em] text-foreground/70">
              {items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-16 max-w-[54ch] text-lg leading-[1.55] text-foreground/85">{t.one}</p>
    </Act>
  );
}
