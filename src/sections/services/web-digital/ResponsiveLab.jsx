import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import ResponsiveSurface, { bpOf } from "./ResponsiveSurface";
import { Act, H2, Index, MONO, Reg, Segmented } from "./webBits";

const MIN = 340, MAX = 1440;

/**
 * Act 04 — the responsive lab. One surface inside a viewport the
 * visitor resizes by dragging its edge (or with the keyboard, or with
 * the snap widths). The width is continuous; the decisions are not.
 */
export default function ResponsiveLab({ c }) {
  const t = c.lab;
  const reduced = useReducedMotion();
  const stage = useRef(null);
  const [stageW, setStageW] = useState(900);
  const [w, setW] = useState(1180);
  const [drag, setDrag] = useState(false);
  const [snap, setSnap] = useState(true);
  useEffect(() => {
    const el = stage.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setStageW(e.contentRect.width));
    ro.observe(el);
    const small = window.matchMedia("(max-width: 639px)").matches;
    if (small) setW(390);
    return () => ro.disconnect();
  }, []);
  const inner = Math.max(200, stageW - 24);
  const scale = Math.min(1, inner / w);
  const shown = w * scale;
  const bp = bpOf(w);
  const start = useRef({ x: 0, w: 0 });
  const onDown = (e) => { e.currentTarget.setPointerCapture(e.pointerId); start.current = { x: e.clientX, w }; setDrag(true); setSnap(false); };
  const onMove = (e) => { if (!drag) return; const next = Math.round(start.current.w + (e.clientX - start.current.x) / scale); setW(Math.min(MAX, Math.max(MIN, next))); };
  const onUp = () => setDrag(false);
  const onKey = (e) => {
    const step = e.shiftKey ? 100 : 20;
    const map = { ArrowLeft: w - step, ArrowRight: w + step, ArrowDown: w - step, ArrowUp: w + step, Home: MIN, End: MAX };
    if (!(e.key in map)) return;
    e.preventDefault(); setSnap(true); setW(Math.min(MAX, Math.max(MIN, map[e.key])));
  };
  const H = "clamp(360px,52svh,520px)";
  const tickPos = (v) => Math.min(inner, v * scale);
  return (
    <Act id="wd-lab" tone="white" className="py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-4">
          <Index>{c.index.lab}</Index>
          <h2 id="wd-lab-title" className={cn(H2, "mt-5")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.6] text-muted-foreground">{t.text}</p>
          <Segmented idPrefix="wd-bp" size="sm" label={t.chipsLabel} className="mt-8" items={t.chips.map((v) => ({ id: String(v), label: `${v}` }))} value={String(t.chips.includes(w) ? w : "")} onChange={(v) => { setSnap(true); setW(Number(v)); }} />
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-heading text-[2.4rem] font-bold leading-none tracking-[-0.04em] text-foreground tabular-nums" aria-live="polite">{Math.round(w)}</span>
            <span className={cn(MONO, "text-muted-foreground")}>{t.px} · {t.names[bp]}</span>
          </div>
          <ul className="mt-5 space-y-2 border-t border-foreground/12 pt-4">
            {t.decisions[bp].map((d) => <li key={d} className="flex items-center gap-3 text-[14px] leading-snug text-foreground/85"><Reg /> {d}</li>)}
          </ul>
        </div>

        <div className="lg:col-span-8">
          {/* ruler */}
          <div className="relative h-6" aria-hidden="true">
            <span className="absolute inset-x-3 bottom-0 h-px bg-foreground/15" />
            {t.chips.map((v) => v * scale <= inner + 1 && (
              <span key={v} className="absolute bottom-0 flex flex-col items-center" style={{ left: 12 + tickPos(v) }}>
                <span className={cn(MONO, "mb-1 -translate-x-1/2 text-[9px]", Math.abs(v - w) < 12 ? "text-accent" : "text-muted-foreground")}>{v}</span>
                <i className={cn("block h-2 w-px", Math.abs(v - w) < 12 ? "bg-accent" : "bg-foreground/30")} />
              </span>
            ))}
          </div>
          <div ref={stage} className="relative bg-[#F3F1EA] p-3" style={{ height: `calc(${H} + 24px)` }}>
            <div className={cn("wd-motion relative overflow-hidden border border-foreground/10 bg-white shadow-[0_30px_60px_-40px_rgba(12,18,32,0.45)]", snap && !reduced && "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]")} style={{ width: shown, height: H }}>
              <div style={{ width: w, height: `calc(${H} / ${scale})`, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <ResponsiveSurface s={t.surface} w={w} reduced={Boolean(reduced)} />
              </div>
            </div>
            {/* the edge */}
            <div role="slider" tabIndex={0} aria-label={t.handle} aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={Math.round(w)} aria-valuetext={`${Math.round(w)} ${t.px} · ${t.names[bp]}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onKeyDown={onKey} className={cn("wd-grip absolute top-3 z-10 flex w-6 -translate-x-1/2 items-center justify-center rounded-[3px] border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", drag ? "border-accent bg-accent text-white" : "border-foreground/20 bg-white text-foreground/60 hover:border-accent hover:text-accent", snap && !reduced && "transition-[left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]")} style={{ left: 12 + shown, height: H }}>
              <span className={cn("pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-white transition-opacity", drag ? "opacity-100" : "opacity-0")}>{Math.round(w)} {t.px}</span>
            </div>
            {scale < 0.999 && <span className={cn(MONO, "absolute bottom-1 right-3 text-muted-foreground")}>×{scale.toFixed(2)}</span>}
          </div>
        </div>
      </div>
    </Act>
  );
}
