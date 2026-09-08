import { cn } from "@/lib/utils";
import PageSurface, { MODE_IDS } from "./PageSurface";
import { Act, MONO, Statement, tabKey } from "./webBits";

/**
 * Act 03 — design changes perception. The signature act: this page's own
 * opening, re-art-directed four ways. The words never change; the company
 * they seem to belong to does. Direction follows intention.
 */
export default function DirectionStudio({ c, mode, setMode }) {
  const t = c.direction;
  const k = Math.max(0, MODE_IDS.indexOf(mode));
  const m = t.modes[k];
  const select = (i) => setMode(MODE_IDS[i]);
  return (
    <Act id="wd-direction" tone="page" index={c.index.direction} wireLabel={c.wire.proof}>
      <Statement id="wd-direction-title" a={t.a} b={t.b} />
      <p className="mt-6 max-w-[40ch] text-lg leading-[1.55] text-foreground/80">{t.intro}</p>
      <div role="tablist" aria-label={t.modesLabel} className="mt-14 flex flex-wrap gap-x-10 gap-y-2 border-b border-foreground/15">
        {t.modes.map((x, i) => {
          const on = i === k;
          return (
            <button key={x.id} type="button" role="tab" id={`wd-mode-${x.id}`} aria-selected={on} aria-controls="wd-mode-panel" tabIndex={on ? 0 : -1} onClick={() => select(i)} onKeyDown={(e) => tabKey(e, i, t.modes.length, select)} className={cn("wd-keep -mb-px flex items-baseline gap-3 border-b-2 pb-4 pt-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", on ? "border-accent text-foreground" : "border-transparent text-foreground/40 hover:text-foreground/80")}>
              <span className={cn(MONO, on ? "text-accent" : "text-current")}>{x.n}</span>
              <span className="font-heading text-2xl font-bold tracking-[-0.03em] md:text-3xl">{x.label}</span>
            </button>
          );
        })}
      </div>
      <div id="wd-mode-panel" role="tabpanel" aria-labelledby={`wd-mode-${m.id}`}>
        <div className="mt-10 hidden sm:block"><PageSurface key={mode} s={c.surface} mode={mode} /></div>
        <div className="mt-10 sm:hidden"><PageSurface key={`${mode}-m`} s={c.surface} mode={mode} viewport="mobile" /></div>
        <p className="sr-only">{m.describe}</p>
        <div className={cn(MONO, "mt-4 flex flex-wrap items-center justify-between gap-3 text-muted-foreground")}>
          <span>{t.note}</span>
          <span className="text-foreground/75" aria-live="polite">{m.n} {m.label} · {m.intent}</span>
        </div>
      </div>
      <p className="mt-24 max-w-3xl font-heading text-[clamp(1.6rem,3.2vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.quietA}</span><span className="block text-muted-foreground">{t.quietB}</span></p>
    </Act>
  );
}
