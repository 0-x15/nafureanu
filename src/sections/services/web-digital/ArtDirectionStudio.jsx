import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import NortePage, { MODE_IDS } from "./NortePage";
import { Act, Caption, Mark, MONO, Statement, tabKey } from "./webBits";

const NOTE_KEYS = ["type", "grid", "image", "motion", "cta"];

/**
 * The signature act: one business, one content, four art directions.
 * The visitor switches the visual system and watches the same company
 * feel completely different. Annotations name what changed. Restraint
 * is one of the options, on purpose.
 */
export default function ArtDirectionStudio({ c, mode, setMode }) {
  const t = c.studio;
  const k = MODE_IDS.indexOf(mode);
  const m = t.modes[k] || t.modes[0];
  const select = (i) => setMode(MODE_IDS[i]);
  return (
    <Act id="wd-studio" tone="white">
      <Reveal>
        <Statement id="wd-studio-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-3">
          <p className={cn(MONO, "text-muted-foreground")}>{t.modesLabel}</p>
          <div role="tablist" aria-label={t.modesLabel} aria-orientation="vertical" className="mt-3 -mx-5 flex gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {t.modes.map((x, i) => {
              const on = i === k;
              return (
                <button key={x.id} type="button" role="tab" id={`wd-mode-${x.id}`} aria-selected={on} aria-controls="wd-mode-panel" tabIndex={on ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, i, t.modes.length, select)} className={cn("shrink-0 rounded-[6px] border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:w-full", on ? "border-foreground bg-foreground text-white" : "border-border bg-white text-foreground/80 hover:border-foreground/40")}>
                  <span className="block font-heading text-xl font-bold tracking-[-0.02em] md:text-2xl">{x.label}</span>
                  <span className={cn("mt-1 hidden text-[12px] leading-snug lg:block", on ? "text-white/70" : "text-muted-foreground")}>{x.fits}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[13px] leading-snug text-muted-foreground lg:hidden">{m.fits}</p>
          <ul className="mt-8 hidden space-y-4 lg:block" aria-live="polite">
            {NOTE_KEYS.map((n) => <li key={n}><Mark label={t.noteLabels[n]} tone="ink">{m.notes[n]}</Mark></li>)}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-9">
          <div id="wd-mode-panel" role="tabpanel" aria-labelledby={`wd-mode-${m.id}`}>
            <div className="hidden shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)] sm:block"><NortePage key={mode} content={t.content} mode={mode} /></div>
            <div className="mx-auto max-w-[420px] shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)] sm:hidden"><NortePage key={`${mode}-m`} content={t.content} mode={mode} viewport="mobile" /></div>
            <p className="sr-only">{m.describe}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Caption>{t.note}</Caption>
              <Caption className="text-foreground/70">{m.label} · {m.motion}</Caption>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
              {NOTE_KEYS.map((n) => <li key={n}><Mark label={t.noteLabels[n]} tone="ink">{m.notes[n]}</Mark></li>)}
            </ul>
          </div>
        </div>
      </div>

      <Reveal className="mt-24 grid gap-10 border-t border-border pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h3 className="font-heading text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.restraintA}</span><span className="block text-muted-foreground">{t.restraintB}</span></h3>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.7] text-foreground/85">{t.restraintText}</p>
        </div>
        <div className="lg:col-span-6">
          <p className={cn(MONO, "text-muted-foreground")}>{t.factorsLabel}</p>
          <p className="mt-4 font-heading text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold leading-[1.25] tracking-[-0.03em] text-foreground/35">
            {t.factors.map((f, i) => <span key={f}><span className={cn(i % 3 === 1 && "text-foreground", i % 3 === 2 && "text-foreground/70")}>{f}</span>{i < t.factors.length - 1 && <span className="text-foreground/25"> · </span>}</span>)}
          </p>
          <p className="mt-8 max-w-lg font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">{t.differentiate}</p>
        </div>
      </Reveal>
    </Act>
  );
}
