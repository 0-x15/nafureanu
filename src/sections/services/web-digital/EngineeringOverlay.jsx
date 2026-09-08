import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import NortePage from "./NortePage";
import { Act, Caption, MONO, Statement } from "./webBits";

/**
 * Act V — design and development are one product. The page the visitor
 * just art-directed stays exactly the same; an overlay reveals the
 * engineering beneath it. Then the same surface, re-art-directed for a
 * phone. Motion budget, accessibility and findability as design quality.
 */
export default function EngineeringOverlay({ c, mode }) {
  const t = c.engineering;
  const [on, setOn] = useState(true);
  const [active, setActive] = useState(null);
  const labels = Object.fromEntries(t.layers.map((l) => [l.id, l.short]));
  return (
    <Act id="wd-engineering" tone="paper">
      <Reveal>
        <Statement id="wd-engineering-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <div className="pt-6 shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)]">
            <NortePage content={c.studio.content} mode={mode} overlay={on} active={active || undefined} layers={labels} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" aria-pressed={on} onClick={() => setOn((v) => !v)} className={cn("inline-flex items-center gap-2 rounded-[6px] border px-4 py-2 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>
              <span aria-hidden="true" className={cn("h-2 w-2 rounded-[1px]", on ? "bg-white" : "bg-accent")} />{on ? t.toggleOn : t.toggleOff}
            </button>
            <Caption>{c.studio.note}</Caption>
          </div>
        </div>
        <div className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{t.layersLabel}</p>
          <ul className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10" onMouseLeave={() => setActive(null)}>
            {t.layers.map((l) => {
              const isOn = active === l.id;
              return (
                <li key={l.id}>
                  <button type="button" aria-pressed={isOn} onMouseEnter={() => setActive(l.id)} onFocus={() => setActive(l.id)} onBlur={() => setActive(null)} onClick={() => setActive((v) => (v === l.id ? null : l.id))} className={cn("grid w-full gap-0.5 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", isOn ? "text-accent-deep" : "text-foreground")}>
                    <span className="flex items-baseline gap-3"><span className={cn(MONO, isOn ? "text-accent" : "text-muted-foreground")}>{l.short}</span><span className="text-[14px] font-semibold">{l.label}</span></span>
                    <span className={cn("text-[13px] leading-[1.55]", isOn ? "text-foreground/85" : "text-muted-foreground")}>{l.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Responsive: the same surface, re-art-directed */}
      <Reveal className="mt-24 border-t border-foreground/10 pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h3 className="font-heading text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.responsiveA}</span><span className="block text-muted-foreground">{t.responsiveB}</span></h3>
            <ul className="mt-8 space-y-3">
              {t.responsiveItems.map((x, i) => <li key={x.label} className="grid gap-1 border-l-2 border-accent pl-4 sm:grid-cols-[120px_1fr] sm:gap-4"><span className={cn(MONO, "pt-1 text-accent")}>0{i + 1} · {x.label}</span><span className="text-[14px] leading-[1.6] text-foreground/85">{x.text}</span></li>)}
            </ul>
          </div>
          <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-[1.9fr_1fr] sm:gap-4 md:gap-8 lg:col-span-7">
            <div><div className="shadow-[0_40px_80px_-60px_rgba(12,18,32,0.5)]"><NortePage content={c.studio.content} mode={mode} /></div><Caption className="mt-3">{t.desktop}</Caption></div>
            <div className="mx-auto w-[64%] sm:mx-0 sm:w-auto"><div className="rounded-[14px] border-[6px] border-[#1A1A1A] bg-[#1A1A1A] shadow-[0_40px_80px_-50px_rgba(12,18,32,0.6)]"><div className="overflow-hidden rounded-[9px]"><NortePage content={c.studio.content} mode={mode} viewport="mobile" /></div></div><Caption className="mt-3 text-center sm:text-left">{t.mobile}</Caption></div>
          </div>
        </div>
      </Reveal>

      {/* Motion budget · accessibility · findability */}
      <Reveal className="mt-24 grid gap-12 border-t border-foreground/10 pt-14 md:grid-cols-3 md:gap-10">
        {[t.motion, t.a11y, t.seo].map((blk) => (
          <div key={blk.label}>
            <p className={cn(MONO, "text-muted-foreground")}>{blk.label}</p>
            <h3 className="mt-3 font-heading text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground [text-wrap:balance]"><span className="block">{blk.a}</span><span className="block text-muted-foreground">{blk.b}</span></h3>
            <ul className="mt-6 space-y-1.5">
              {blk.items.map((x) => <li key={x} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-foreground/85"><span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-accent" />{x}</li>)}
            </ul>
            <p className="mt-5 text-[13px] leading-[1.6] text-muted-foreground">{blk.note}</p>
          </div>
        ))}
      </Reveal>
    </Act>
  );
}
