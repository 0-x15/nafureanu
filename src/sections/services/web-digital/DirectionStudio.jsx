import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import LandingSurface from "./LandingSurface";
import { Act, H2, H3, Index, MONO, Reg, Segmented, tabKey } from "./webBits";

const DIRS = ["editorial", "technical", "expressive"];

/**
 * Act 03 — design changes perception. One landing, three art directions,
 * the same words. The composition relocates when the direction changes.
 * Beneath the surface, one more decision: still, or interactive — and
 * interactive means the page answers the pointer with intent.
 */
export default function DirectionStudio({ c, dir, setDir }) {
  const t = c.direction;
  const reduced = useReducedMotion();
  const [live, setLive] = useState(true);
  const k = Math.max(0, DIRS.indexOf(dir));
  const m = t.modes[k];
  return (
    <Act id="wd-direction" className="py-16 md:py-24">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6">
          <Index>{c.index.direction}</Index>
          <h2 id="wd-direction-title" className={cn(H2, "mt-5")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
        </div>
        <p className="max-w-[40ch] text-[15px] leading-[1.6] text-muted-foreground lg:col-span-5 lg:col-start-8 lg:pb-1">{t.intro}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <ol role="tablist" aria-label={t.modesLabel} aria-orientation="vertical" className="border-t border-foreground/12">
            {t.modes.map((x, i) => {
              const on = i === k;
              return (
                <li key={x.id} className="border-b border-foreground/12">
                  <button type="button" role="tab" id={`wd-dir-${x.id}`} aria-selected={on} aria-controls="wd-dir-panel" tabIndex={on ? 0 : -1} onClick={() => setDir(DIRS[i])} onKeyDown={(e) => tabKey(e, i, 3, (j) => setDir(DIRS[j]))} className={cn("grid w-full grid-cols-[28px_1fr] items-baseline gap-3 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "text-foreground" : "text-foreground/45 hover:text-foreground/85")}>
                    <span className={cn(MONO, on ? "text-accent" : "text-current")}>{x.n}</span>
                    <span>
                      <span className="flex items-baseline justify-between gap-3"><span className="font-heading text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">{x.label}</span>{on && <Reg />}</span>
                      <motion.span initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35 }} className="block overflow-hidden">
                        <span className="block pt-1 text-[14px] leading-[1.5] text-foreground/80">{x.intent}</span>
                        <span className={cn(MONO, "block pt-2 text-muted-foreground")}>{x.notes}</span>
                      </motion.span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 hidden text-[13px] leading-[1.6] text-muted-foreground lg:block">{live ? t.liveHint : t.stillHint}</p>
        </div>

        <div className="lg:col-span-9">
          <div id="wd-dir-panel" role="tabpanel" aria-labelledby={`wd-dir-${m.id}`} className="h-[clamp(400px,58svh,600px)] shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)]">
            <LandingSurface s={t.surface} dir={dir} live={live} reduced={Boolean(reduced)} />
          </div>
          <p className="sr-only">{m.describe}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <span className={cn(MONO, "text-muted-foreground")}>{t.note} · <span className="text-foreground/75">{m.n} {m.label}</span></span>
            <Segmented idPrefix="wd-live" size="sm" label={t.liveLabel} items={[{ id: "still", label: t.still }, { id: "live", label: t.live }]} value={live ? "live" : "still"} onChange={(v) => setLive(v === "live")} className="border-b-0" />
          </div>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground lg:hidden">{live ? t.liveHint : t.stillHint}</p>
        </div>
      </div>

      <p className={cn(H3, "mt-12 max-w-[34ch] md:mt-16")}><span className="block">{t.quiet.a}</span><span className="block text-muted-foreground">{t.quiet.b}</span></p>
    </Act>
  );
}
