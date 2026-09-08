import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MONO, Tone, WHO, Who } from "./aiBits";

const STAGE_X = [30, 47, 64];
const LANE_Y = { rules: 26, ai: 50, human: 74 };
const OUT_X = 86;

/**
 * Work in motion. Five pieces of incoming work enter on the left and
 * travel along the rules lane or the AI lane through understand → rule
 * → decision → action. One of them drops to the human lane on an
 * uncertain field. They settle as completed work or human review. Plays
 * once in view; the final state is shown at once under reduced motion.
 */
export default function AiHeroVisual({ h, labels }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const play = inView && !reduced;
  let done = 0; let review = 0;
  const paths = h.items.map((it, i) => {
    const laneY = LANE_Y[it.lane];
    const startY = 18 + i * 16;
    const xs = [10, STAGE_X[0], STAGE_X[1], STAGE_X[2]];
    const ys = [startY, laneY, laneY, laneY];
    if (it.outcome === "review") { xs.push(STAGE_X[2], OUT_X); ys.push(LANE_Y.human, 80 + review * 10); review += 1; }
    else { xs.push(OUT_X); ys.push(23 + done * 10); done += 1; }
    return { xs, ys, delay: 0.3 + i * 1.15 };
  });
  return (
    <figure ref={ref} aria-label={h.visualLabel} className="m-0">
      {/* board — md and up */}
      <div className="relative hidden aspect-[16/10] w-full overflow-hidden rounded-[12px] border border-border bg-white md:block">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* stage headers */}
        {h.stages.map((s, i) => <span key={s} className={cn(MONO, "absolute top-3 -translate-x-1/2 text-muted-foreground")} style={{ left: `${i < 3 ? STAGE_X[i] : OUT_X}%` }}>{s}</span>)}
        {/* lanes */}
        {["rules", "ai", "human"].map((lane) => (
          <div key={lane} className="absolute left-[6%] right-[28%] flex items-center" style={{ top: `${LANE_Y[lane]}%` }}>
            <span className="absolute -top-3 left-0"><Who who={lane} label={labels[lane]} /></span>
            <span aria-hidden="true" className="h-px w-full" style={{ background: `linear-gradient(90deg, ${WHO[lane].line}55, ${WHO[lane].line}99 40%, ${WHO[lane].line}99)` }} />
            {STAGE_X.map((x) => <span key={x} aria-hidden="true" className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white" style={{ left: `${((x - 6) / 66) * 100}%`, top: "50%", borderColor: WHO[lane].line }} />)}
          </div>
        ))}
        {/* outcome slots */}
        <div className={cn("absolute right-3 top-[10%] w-[22%] rounded-[8px] border border-[#B9DDC6] bg-[#EAF6EE]/70 px-2 pb-2 pt-1.5")} style={{ height: "48%" }}><span className={cn(MONO, "text-[#1F6B3A]")}>{h.outcomes.done}</span></div>
        <div className={cn("absolute right-3 top-[66%] w-[22%] rounded-[8px] border border-[#E7C9A0] bg-[#FFF7EA]/70 px-2 pb-2 pt-1.5")} style={{ height: "30%" }}><span className={cn(MONO, "text-[#8A5A14]")}>{h.outcomes.review}</span></div>
        {/* moving work */}
        {h.items.map((it, i) => {
          const p = paths[i];
          const last = p.xs.length - 1;
          const initial = reduced ? { left: `${p.xs[last]}%`, top: `${p.ys[last]}%` } : { left: `${p.xs[0]}%`, top: `${p.ys[0]}%` };
          const animate = play ? { left: p.xs.map((x) => `${x}%`), top: p.ys.map((y) => `${y}%`) } : initial;
          return (
            <motion.div key={it.id} initial={initial} animate={animate} transition={{ duration: 0.55 * last, delay: p.delay, ease: "easeInOut", times: p.xs.map((_, k) => k / last) }} className="absolute -translate-y-1/2 -translate-x-1/2">
              <span className={cn("block whitespace-nowrap rounded-[6px] border bg-white px-2.5 py-1.5 text-[11px] font-semibold tracking-[-0.01em] shadow-sm", WHO[it.lane].chip)}>{it.label}</span>
            </motion.div>
          );
        })}
      </div>
      {/* list — below md */}
      <ol className="divide-y divide-border rounded-[10px] border border-border bg-white md:hidden">
        {h.items.map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center gap-2"><span className="text-[13px] font-semibold text-foreground">{it.label}</span><Who who={it.lane} label={labels[it.lane]} /></span>
            <Tone tone={it.outcome === "done" ? "ok" : "warn"}>{h.outcomes[it.outcome]}</Tone>
          </li>
        ))}
      </ol>
      <ul className="mt-3 hidden flex-wrap gap-x-4 gap-y-1 md:flex">
        {h.items.map((it) => <li key={it.id} className="text-[11px] text-muted-foreground"><span className="font-medium text-foreground/80">{it.label}</span> · {it.detail}</li>)}
      </ul>
      <figcaption className={cn(MONO, "mt-3 text-muted-foreground")}>{h.note}</figcaption>
    </figure>
  );
}
