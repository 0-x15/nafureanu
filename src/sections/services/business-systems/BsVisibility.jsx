import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Surface, stateTone } from "./bsBits";

const TONE_BG = { ok: "bg-[#B9DDC6]", danger: "bg-[#EAB4B4]", warn: "bg-[#E7C9A0]", info: "bg-accent/45", neutral: "bg-accent/25" };

/**
 * Visibility — the operational pulse: cases by state, pending work by
 * owner, where work waits longest, activity, and the commercial
 * pipeline. Fictional values, drawn once on entry.
 */
export default function BsVisibility({ c }) {
  const v = c.visibility;
  const p = v.pulse;
  const reduced = useReducedMotion();
  const total = p.byState.reduce((s, [, n]) => s + n, 0);
  const maxPending = Math.max(...p.pending.map(([, n]) => n));
  const maxAct = Math.max(...p.activity);
  const pts = p.activity.map((n, i) => `${(i / (p.activity.length - 1)) * 100},${40 - (n / maxAct) * 36}`).join(" ");
  const grow = (i) => ({ initial: reduced ? false : { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 0.7, delay: 0.05 * i, ease: EASE } });
  return (
    <Chapter id="bs-visibility" tone="blue">
      <ChapterHead id="bs-visibility" kicker={v.kicker} title={v.title} intro={v.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-8">
          <Surface title={p.title} meta="—" bodyClassName="grid gap-6 p-5 md:grid-cols-2 md:p-6">
            <div className="md:col-span-2">
              <p className={cn(MONO, "text-muted-foreground")}>{p.byStateLabel}</p>
              <div className="mt-2 flex h-4 w-full overflow-hidden rounded-[4px]">
                {p.byState.map(([label, n], i) => <motion.span key={label} className={cn("block h-full origin-left", TONE_BG[stateTone(label)])} style={{ width: `${(n / total) * 100}%` }} {...grow(i)} />)}
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{p.byState.map(([label, n]) => <li key={label} className="flex items-center gap-1.5 text-[11px] text-foreground/80"><span aria-hidden="true" className={cn("h-2 w-2 rounded-[2px]", TONE_BG[stateTone(label)])} />{label} <span className="font-mono text-muted-foreground">{n}</span></li>)}</ul>
            </div>
            <div>
              <p className={cn(MONO, "text-muted-foreground")}>{p.pendingLabel}</p>
              <ol className="mt-2 space-y-1.5">
                {p.pending.map(([who, n], i) => <li key={who} className="grid grid-cols-[90px_1fr_24px] items-center gap-2 text-[11px]"><span className="truncate text-foreground/80">{who}</span><motion.span aria-hidden="true" className="block h-2.5 origin-left rounded-[2px] bg-accent/60" style={{ width: `${(n / maxPending) * 100}%` }} {...grow(i)} /><span className="font-mono text-muted-foreground">{n}</span></li>)}
              </ol>
            </div>
            <div>
              <p className={cn(MONO, "text-muted-foreground")}>{p.waitingLabel}</p>
              <ol className="mt-2 divide-y divide-border">
                {p.waiting.map(([stage, t], i) => <li key={stage} className="flex items-center justify-between py-1.5 text-[12px]"><span className="flex items-center gap-2 text-foreground/85"><span aria-hidden="true" className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-[#D9534F]" : i === 1 ? "bg-[#E3B341]" : "bg-border")} />{stage}</span><span className="font-mono text-[11px] text-foreground">{t}</span></li>)}
              </ol>
            </div>
            <div>
              <p className={cn(MONO, "text-muted-foreground")}>{p.activityLabel}</p>
              <svg aria-hidden="true" viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-2 h-16 w-full">
                <defs><clipPath id="bs-pulse-clip"><motion.rect x="0" y="0" height="40" initial={reduced ? { width: 100 } : { width: 0 }} whileInView={{ width: 100 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.2, ease: EASE }} /></clipPath></defs>
                <polyline points={pts} fill="none" stroke="#2563EB" strokeWidth="1.2" vectorEffect="non-scaling-stroke" clipPath="url(#bs-pulse-clip)" />
                <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(15,23,42,0.12)" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div>
              <p className={cn(MONO, "text-muted-foreground")}>{p.pipelineLabel}</p>
              <ol className="mt-2 space-y-1.5">
                {p.pipeline.map(([stage, n], i) => <li key={stage} className="grid grid-cols-[80px_1fr_24px] items-center gap-2 text-[11px]"><span className="truncate text-foreground/80">{stage}</span><motion.span aria-hidden="true" className={cn("block h-2.5 origin-left rounded-[2px]", i === p.pipeline.length - 1 ? "bg-accent" : "bg-accent/35")} style={{ width: `${(n / p.pipeline[0][1]) * 100}%` }} {...grow(i)} /><span className="font-mono text-muted-foreground">{n}</span></li>)}
              </ol>
            </div>
          </Surface>
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{v.note}</p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{v.answersLabel}</p>
          <ul className="mt-3 divide-y divide-border border-t border-border">{v.answers.map((a) => <li key={a} className="flex items-center gap-3 py-2.5 text-[14px] text-foreground/85"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />{a}</li>)}</ul>
        </Reveal>
      </div>
      <Closing>{v.closing}</Closing>
    </Chapter>
  );
}
