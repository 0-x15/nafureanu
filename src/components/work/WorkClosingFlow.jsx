import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const MONO = "font-mono text-[11px] uppercase tracking-[0.16em]";

/* Three stages on a slightly diagonal rail, authored in a 360 × 440 box. */
const STAGES = [
  { x: 36, y: 44 },
  { x: 100, y: 218 },
  { x: 164, y: 392 },
];
const RAIL = "M36 56 V132 C36 156 50 172 72 172 H80 C92 172 100 182 100 196 V206 M100 230 V306 C100 330 114 346 136 346 H144 C156 346 164 356 164 370 V380";

/**
 * The closing visual of /work: a real process becomes a system in
 * production. A thin technical rail with three stages, precise labels
 * and small status fragments. On entering the viewport, once: the first
 * node appears, the rail grows, the second stage resolves, the rail
 * continues, a cobalt signal travels down and the production node goes
 * live. Reduced motion renders the final state immediately.
 */
export default function WorkClosingFlow({ labels, status, title }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const signal = useRef(null);
  const [travelling, setTravelling] = useState(false);
  const play = inView && !reduce;
  const done = reduce || inView;

  /* The signal travels once, 350 ms after the rail starts growing, and fades when it arrives. */
  useEffect(() => {
    if (!play || !signal.current) return undefined;
    const start = window.setTimeout(() => { setTravelling(true); signal.current?.beginElement(); }, 350);
    const stop = window.setTimeout(() => setTravelling(false), 350 + 1700);
    return () => { window.clearTimeout(start); window.clearTimeout(stop); };
  }, [play]);

  const at = (t) => (reduce ? { duration: 0 } : { duration: 0.5, delay: t, ease: EASE });
  const show = (t) => ({ initial: reduce ? false : { opacity: 0, y: 6 }, animate: done ? { opacity: 1, y: 0 } : undefined, transition: at(t) });

  return (
    <svg ref={ref} viewBox="0 0 360 440" role="img" aria-label={title} className="block h-auto w-full max-w-[380px] overflow-visible">
      <title>{title}</title>
      {/* faint traces leaving the rail into the page */}
      <path d="M164 404 V440" className="stroke-accent/30" strokeWidth="1" strokeDasharray="1.5 5" strokeLinecap="round" />
      <path d="M36 0 V32" className="stroke-accent/30" strokeWidth="1" strokeDasharray="1.5 5" strokeLinecap="round" />

      {/* the rail: drawn in two growths */}
      <path id="wcf-rail" d={RAIL} fill="none" stroke="none" />
      <motion.path
        d={RAIL}
        fill="none"
        className="stroke-accent"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
        animate={done ? { pathLength: 1, opacity: 0.85 } : undefined}
        transition={reduce ? { duration: 0 } : { pathLength: { duration: 1.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.4 } }}
      />

      {/* the signal travels once, then the production node goes live */}
      {!reduce && (
        <g style={{ opacity: travelling ? 1 : 0, transition: "opacity 0.3s" }}>
          <circle r="6.5" className="fill-accent" opacity="0.16" />
          <circle r="2.6" className="fill-accent" />
          <animateMotion ref={signal} dur="1.5s" begin="indefinite" fill="freeze" rotate="none" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" keyPoints="0;1">
            <mpath href="#wcf-rail" />
          </animateMotion>
        </g>
      )}

      {/* stage 1 — the real process */}
      <motion.g {...show(0)}>
        <circle cx={STAGES[0].x} cy={STAGES[0].y} r="6" className="fill-white stroke-accent" strokeWidth="1.25" />
        <text x={STAGES[0].x + 18} y={STAGES[0].y + 4} className={cn(MONO, "fill-foreground")}>{labels[0]}</text>
        <g transform={`translate(${STAGES[0].x + 18} ${STAGES[0].y + 16})`}>
          {[26, 18, 22].map((w, i) => (
            <rect key={i} x={i * 30} y="0" width={w} height="3" rx="1.5" className="fill-[#C9D3EC]" />
          ))}
          <text x="0" y="20" className="font-mono text-[10px] uppercase tracking-[0.14em] fill-muted-foreground">{status[0]}</text>
        </g>
      </motion.g>

      {/* stage 2 — understand · design */}
      <motion.g {...show(0.9)}>
        <rect x={STAGES[1].x - 6} y={STAGES[1].y - 6} width="12" height="12" rx="2" transform={`rotate(45 ${STAGES[1].x} ${STAGES[1].y})`} className="fill-white stroke-accent" strokeWidth="1.25" />
        <text x={STAGES[1].x + 20} y={STAGES[1].y + 4} className={cn(MONO, "fill-foreground")}>{labels[1]}</text>
        <g transform={`translate(${STAGES[1].x + 20} ${STAGES[1].y + 16})`}>
          {/* a blueprint fragment: measured lines and one tick */}
          <line x1="0" y1="2" x2="64" y2="2" className="stroke-accent/60" strokeWidth="1" />
          <line x1="0" y1="-1" x2="0" y2="5" className="stroke-accent/60" strokeWidth="1" />
          <line x1="64" y1="-1" x2="64" y2="5" className="stroke-accent/60" strokeWidth="1" />
          <rect x="0" y="8" width="40" height="3" rx="1.5" className="fill-accent/35" />
          <rect x="0" y="14" width="52" height="3" rx="1.5" className="fill-accent/20" />
          <text x="0" y="32" className="font-mono text-[10px] uppercase tracking-[0.14em] fill-muted-foreground">{status[1]}</text>
        </g>
      </motion.g>

      {/* stage 3 — system in production */}
      <motion.g {...show(1.7)}>
        <circle cx={STAGES[2].x} cy={STAGES[2].y} r="11" className="fill-accent/10" />
        <circle cx={STAGES[2].x} cy={STAGES[2].y} r="6" className="fill-accent" />
        <text x={STAGES[2].x + 22} y={STAGES[2].y + 4} className={cn(MONO, "fill-foreground")}>{labels[2]}</text>
        <g transform={`translate(${STAGES[2].x + 22} ${STAGES[2].y + 20})`}>
          <circle cx="3" cy="4" r="3" className="fill-accent" />
          <text x="12" y="8" className="font-mono text-[10px] uppercase tracking-[0.14em] fill-accent">{status[2]}</text>
        </g>
      </motion.g>
    </svg>
  );
}
