import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { EASE, MONO } from "./workBits";

/**
 * Act 03 — next. The closing looks forward: entry 05 is a system still
 * to be assembled. Its four layers — infrastructure, software,
 * automation, AI — float exploded above a glass plinth, each breathing
 * at its own pace. Enter the field and the exploded view opens further,
 * with guides and labels. Click (or press Enter) and the parts land one
 * after another on the reserved place, the cobalt piece last, and the
 * tag reads "assembled"; click again to take it apart. A registration
 * mark follows the pointer. Then the statement and the door.
 */
/* ── the assembly: geometry in the plinth's own oblique ───────────── */
const U = [0.9836, -0.1803]; // along the plinth's long edge
const V = [0.9393, 0.3430]; // along its short edge
const C = [285, 187]; // centre of the plinth's top face
const para = (cx, cy, w, d) => [
  [cx - U[0] * w / 2 - V[0] * d / 2, cy - U[1] * w / 2 - V[1] * d / 2],
  [cx + U[0] * w / 2 - V[0] * d / 2, cy + U[1] * w / 2 - V[1] * d / 2],
  [cx + U[0] * w / 2 + V[0] * d / 2, cy + U[1] * w / 2 + V[1] * d / 2],
  [cx - U[0] * w / 2 + V[0] * d / 2, cy - U[1] * w / 2 + V[1] * d / 2],
];
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
/** A part: top face and its two front faces, drawn at the plinth centre; position comes from the group transform. */
function Part({ w, d, t, top, side, stroke, dash }) {
  const P = para(C[0], C[1], w, d);
  const dn = (p) => [p[0], p[1] + t];
  return (
    <>
      <polygon points={pts([P[3], P[2], dn(P[2]), dn(P[3])])} fill={side} stroke={stroke} strokeOpacity="0.7" strokeDasharray={dash} />
      <polygon points={pts([P[0], P[3], dn(P[3]), dn(P[0])])} fill={side} stroke={stroke} strokeOpacity="0.55" strokeDasharray={dash} />
      <polygon points={pts(P)} fill={top} stroke={stroke} strokeOpacity="0.85" strokeDasharray={dash} />
    </>
  );
}

/* the four layers of any system, bottom to top */
const PARTS = [
  { key: "infra", w: 210, d: 74, t: 14, restY: -46, hoverX: -26, hoverY: -12, rot: -3, top: "#DFE5F5", side: "#C9D2EA", stroke: "#1B1F2A" },
  { key: "software", w: 200, d: 70, t: 6, restY: -94, hoverX: 18, hoverY: -22, rot: 2.5, top: "#FFFFFF", side: "#EEF1F7", stroke: "#1B1F2A" },
  { key: "automation", w: 190, d: 66, t: 6, restY: -140, hoverX: -14, hoverY: -34, rot: -2, top: "rgba(255,255,255,0.72)", side: "rgba(255,255,255,0.5)", stroke: "#3157F6" },
  { key: "ai", w: 96, d: 34, t: 10, restY: -188, hoverX: 30, hoverY: -46, rot: 4, top: "#3157F6", side: "#2348E8", stroke: "#3157F6" },
];
const STACK_Y = [-2, -18, -26, -34]; // assembled offsets, bottom to top

function Assembly({ reduced, mode, placed, labels, tag, stateWords }) {
  const assembled = mode === "assembled";
  const open = mode === "open";
  return (
    <svg viewBox="0 0 560 380" aria-hidden="true" className="h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="wk-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="wk-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E9EDF7" stopOpacity="0.9" />
        </linearGradient>
        <filter id="wk-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#3157F6" floodOpacity="0.16" />
        </filter>
        <radialGradient id="wk-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3157F6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#3157F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the floor light, stronger once assembled */}
      <motion.ellipse cx="280" cy="330" rx="230" ry="26" fill="url(#wk-floor)" initial={false} animate={{ opacity: assembled ? 1.6 : 1, scale: assembled ? 1.1 : 1 }} transition={{ duration: reduced ? 0 : 0.8 }} style={{ transformOrigin: "280px 330px" }} />

      {/* the plinth */}
      <g transform="translate(0 38)" filter="url(#wk-shadow)">
        <polygon points="80,178 320,134 490,196 250,240" fill="url(#wk-top)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polygon points="80,178 250,240 250,286 80,224" fill="url(#wk-side)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polygon points="250,240 490,196 490,242 250,286" fill="url(#wk-side)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polyline points="80,178 250,240 490,196" fill="none" stroke="#FFFFFF" strokeOpacity="0.9" />
        <motion.polygon points={pts(para(C[0], C[1], 214, 76))} initial={false} animate={{ fill: assembled ? "rgba(49,87,246,0.1)" : "rgba(49,87,246,0)", stroke: assembled ? "#3157F6" : "rgba(49,87,246,0.6)" }} transition={{ duration: reduced ? 0 : 0.5 }} strokeDasharray="5 4" />
      </g>

      {/* guides from the sky to each part, only while open */}
      <motion.g initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.4 }} stroke="#3157F6" strokeOpacity="0.4">
        {PARTS.map((p, i) => (
          <line key={p.key} x1={C[0] + p.hoverX} y1="0" x2={C[0] + p.hoverX} y2={C[1] + 38 + p.restY + p.hoverY - 24} />
        ))}
      </motion.g>

      {/* the parts, bottom to top */}
      {PARTS.map((p, i) => {
        const done = assembled && placed > i;
        const target = assembled
          ? { x: 0, y: 38 + STACK_Y[i] + (done ? 0 : -60), rotate: 0, opacity: done ? 1 : 0.25 }
          : open
            ? { x: p.hoverX, y: 38 + p.restY + p.hoverY, rotate: p.rot, opacity: 1 }
            : { x: 0, y: 38 + p.restY, rotate: 0, opacity: 1 };
        const bob = !reduced && !assembled && !open ? { y: [38 + p.restY, 38 + p.restY - 4 - i, 38 + p.restY] } : {};
        return (
          <motion.g
            key={p.key}
            initial={false}
            animate={{ ...target, ...bob }}
            transition={bob.y ? { y: { duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }, x: { duration: 0.6 }, rotate: { duration: 0.6 }, opacity: { duration: 0.4 } } : { type: "spring", stiffness: 120, damping: 18, mass: 0.9, delay: reduced ? 0 : assembled ? i * 0.16 : 0 }}
            style={{ transformOrigin: `${C[0]}px ${C[1] + 38}px` }}
          >
            <Part w={p.w} d={p.d} t={p.t} side={p.side} stroke={p.stroke} dash={assembled ? undefined : i === 3 ? undefined : "6 5"} top={assembled || i === 3 ? p.top : p.top === "#FFFFFF" ? "rgba(255,255,255,0.55)" : p.top} />
            {/* the part's label, only while open */}
            <motion.g initial={false} animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.08 * i }}>
              <line x1={C[0] + 110} y1={C[1] + 38 - 10} x2={C[0] + 150} y2={C[1] + 38 - 26} stroke="#1B1F2A" strokeOpacity="0.4" />
              <text x={C[0] + 156} y={C[1] + 38 - 30} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.4" fill="#1B1F2A" fillOpacity="0.75">{String(4 - i).padStart(2, "0")} · {labels[i].toUpperCase()}</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* the tag: 05, and the state of the entry */}
      <g transform="translate(430 372)">
        <rect x="0" y="-20" width="112" height="20" fill="#FFFFFF" stroke="#1B1F2A" strokeOpacity="0.4" />
        <text x="10" y="-6" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.4" fill="#3157F6">{tag}</text>
        <text x="38" y="-6" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.4" fill="#1B1F2A" fillOpacity="0.7">{assembled ? stateWords[1].toUpperCase() : stateWords[0].toUpperCase()}</text>
      </g>
    </svg>
  );
}

export default function WorkNext({ lang, t }) {
  const reduced = useReducedMotion();
  const n = t.next;
  const [hot, setHot] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [placed, setPlaced] = useState(0);
  const ref = useRef(null);
  // the parts land one after another
  useEffect(() => {
    if (!assembled) { setPlaced(0); return undefined; }
    if (reduced) { setPlaced(PARTS.length); return undefined; }
    const timers = PARTS.map((_, i) => window.setTimeout(() => setPlaced(i + 1), 160 * i + 120));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [assembled, reduced]);
  const mode = assembled ? "assembled" : hot ? "open" : "rest";
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cx = useSpring(mx, { stiffness: 80, damping: 22 });
  const cy = useSpring(my, { stiffness: 80, damping: 22 });
  const left = useTransform(cx, (v) => `${v * 100}%`);
  const top = useTransform(cy, (v) => `${v * 100}%`);
  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    my.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  };
  const io = { initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

  return (
    <section aria-labelledby="work-next" onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)} onFocusCapture={() => setHot(true)} onBlurCapture={() => setHot(false)} className="group/next relative overflow-hidden border-t border-foreground/10 px-5 py-24 md:px-10 md:py-32">
      {/* the stronger closing field: cobalt light, a cyan reflection */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -bottom-[40%] left-[14%] h-[120%] w-[72%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.14),transparent)] blur-2xl" />
        <span className="absolute -right-[6%] top-[-10%] h-[70%] w-[36%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.08),transparent)] blur-2xl" />
        <span className="absolute inset-x-0 top-[38%] h-px bg-foreground/[0.08]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* the empty plinth */}
          <motion.div {...io} transition={{ duration: 0.9, ease: EASE }} ref={ref} onPointerMove={onMove} className="relative lg:col-span-7">
            <p className={cn(MONO, "text-accent")}>{n.kicker}</p>
            <div className="relative mt-4">
              <button
                type="button"
                aria-pressed={assembled}
                aria-label={assembled ? n.disassemble : n.assemble}
                onClick={() => setAssembled((v) => !v)}
                className="relative mx-auto block w-full max-w-[560px] cursor-pointer pt-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 focus-visible:ring-offset-[#F9F7F0] md:pt-4"
              >
                <Assembly reduced={Boolean(reduced)} mode={mode} placed={placed} labels={n.parts} tag={n.tag} stateWords={n.states} />
              </button>
              {/* the counter and the hint: always readable */}
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className={cn(MONO, "text-muted-foreground")}>{n.slot} · {n.piecesLabel} {assembled ? placed : 0}/{PARTS.length}</p>
                <p className={cn(MONO, "text-muted-foreground")}>{assembled ? n.hintOpen : n.hintRest}</p>
              </div>
              {/* the cursor: a registration mark looking for its place */}
              {!reduced && (
                <motion.span aria-hidden="true" style={{ left, top }} className="pointer-events-none absolute hidden h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 border border-accent bg-[#F9F7F0] opacity-0 transition-opacity duration-500 group-hover/next:opacity-100 lg:block">
                  <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-accent/50" />
                  <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-accent/50" />
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* the statement and the door */}
          <motion.div {...io} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="lg:col-span-5 lg:self-center">
            <h2 id="work-next" className="max-w-[16ch] font-heading text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground [text-wrap:balance]">{n.line}</h2>
            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{n.support}</p>
            <div className="mt-9">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{n.cta}</ActionLink>
            </div>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{n.reassure}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
