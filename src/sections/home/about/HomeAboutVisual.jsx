import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
const INK = "#1B1F2A";
const COBALT = "#3157F6";

/* ── axonometric helpers (30° isometric, screen y down) ──────────────── */
const U = [0.866, 0.5];
const V = [-0.866, 0.5];
const iso = (o, a, b) => [o[0] + a * U[0] + b * V[0], o[1] + a * U[1] + b * V[1]];
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
/** The three visible faces of a plate: top, front-right, front-left. */
function faces(o, a, b, t) {
  const A = o, B = iso(o, a, 0), C = iso(o, a, b), D = iso(o, 0, b);
  const dn = (p) => [p[0], p[1] + t];
  return { top: pts([A, B, C, D]), right: pts([B, C, dn(C), dn(B)]), left: pts([D, C, dn(C), dn(D)]), A, B, C, D };
}
/** transform that projects a flat drawing onto the top face at plate coords (a, b). */
const onTop = (o, a, b) => { const [x, y] = iso(o, a, b); return `matrix(0.866 0.5 -0.866 0.5 ${x.toFixed(1)} ${y.toFixed(1)})`; };

/* ── the sheet: 400 × 590 ────────────────────────────────────────────── */
const STACK_O = [242, 172]; // top vertex of the engineering plate
const PLATE = { a: 160, b: 76, t: 4 };
const STEP = 40; // exploded spacing between plates
const BASE_T = 16;
const PAD_K = [[0.3, 0.7], [0.3, 0.3], [0.7, 0.7], [0.7, 0.3]]; // where each input lands on the plate
const TOKENS = [[214, 26], [264, 68], [312, 36], [356, 92]]; // hovering inputs (top vertex)
const TOKEN = { a: 26, b: 26, t: 3 };
const LABEL_X = 16;
const LEADER_X = 150;

/** Flat glyphs, 10 × 10, for the legend; projected onto the tokens. */
const GLYPHS = [
  (c) => (<g fill={c}><circle cx="5" cy="3" r="2.2" /><path d="M0.8 10c0-2.6 1.9-4.2 4.2-4.2S9.2 7.4 9.2 10Z" /></g>),
  (c) => (<g fill={c}><rect x="0.5" y="5" width="2.4" height="5" /><rect x="3.8" y="1" width="2.4" height="9" /><rect x="7.1" y="3" width="2.4" height="7" /></g>),
  (c) => (<g fill="none" stroke={c} strokeWidth="1.3"><path d="M1.5 0.7h4.6l2.4 2.4v6.2h-7Z" /><path d="M3.4 5.2h3.2M3.4 7.3h3.2" /></g>),
  (c) => (<g fill="none" stroke={c} strokeWidth="1.4"><rect x="0.9" y="0.9" width="8.2" height="8.2" rx="1" /><path d="M3 5.2l1.6 1.6L7.4 3.6" /></g>),
];

/** The motif on each system plate, drawn flat and projected. */
const MOTIFS = [
  // software: three modules
  <g key="sw" fill="#fff" stroke={COBALT} strokeWidth="0.9"><rect x="0" y="0" width="18" height="10" /><rect x="22" y="0" width="18" height="10" /><rect x="0" y="14" width="40" height="10" fill={COBALT} fillOpacity="0.16" /></g>,
  // ai: a node with satellites
  <g key="ai"><circle cx="20" cy="12" r="7" fill={COBALT} fillOpacity="0.18" stroke={COBALT} strokeWidth="0.9" /><circle cx="20" cy="12" r="2.2" fill={COBALT} /><circle cx="2" cy="4" r="1.6" fill={COBALT} /><circle cx="38" cy="4" r="1.6" fill={COBALT} /><circle cx="4" cy="22" r="1.6" fill={COBALT} /><circle cx="36" cy="22" r="1.6" fill={COBALT} /><path d="M2 4l11 5.5M38 4l-11 5.5M4 22l9.5-5.5M36 22l-9.5-5.5" stroke={COBALT} strokeOpacity="0.5" strokeWidth="0.8" /></g>,
  // automation: a pipeline with a return
  <g key="auto" fill="none" stroke={COBALT} strokeWidth="1"><path d="M0 6h40" /><path d="M40 6v12H0" strokeDasharray="2 2" strokeOpacity="0.6" /><circle cx="8" cy="6" r="2.4" fill="#fff" /><circle cx="22" cy="6" r="2.4" fill="#fff" /><circle cx="36" cy="6" r="2.4" fill={COBALT} /></g>,
  // infrastructure: a rack grid
  <g key="infra" fill={COBALT}>{[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={c * 10.5} y={r * 8} width="8" height="5.5" fillOpacity={r === 1 ? 0.55 : 0.22} />))}</g>,
];

/**
 * The operating layer as an exploded axonometric sheet: signals of the
 * real operation hover over a glass engineering plate, where they land
 * on an ordered grid; beneath it the four system layers are stacked and
 * rest on a solid cobalt base — the system. Callouts on the left name
 * every plate the way a technical drawing does; the thesis closes the
 * sheet. Enters once: the stack rises from the base, the inputs settle.
 */
export function OperatingLayer({ t, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const on = reduce || inView;
  const fade = (delay, y = 8) => ({ initial: reduce ? false : { opacity: 0, y }, animate: on ? { opacity: 1, y: 0 } : undefined, transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE } });

  const plates = [
    { key: "eng", o: STACK_O },
    ...t.layers.map((_, i) => ({ key: `s${i}`, o: [STACK_O[0], STACK_O[1] + STEP * (i + 1)] })),
  ];
  const baseO = [STACK_O[0], STACK_O[1] + STEP * (t.layers.length + 1)];
  const collapse = (o) => baseO[1] - o[1];
  const F = (o, tt = PLATE.t) => faces(o, PLATE.a, PLATE.b, tt);
  const eng = F(STACK_O);
  const base = F(baseO, BASE_T);
  const pads = PAD_K.map(([ka, kb]) => iso(STACK_O, PLATE.a * ka, PLATE.b * kb));

  /** leader from a hovering token down to its pad: vertical, then along an axis. */
  const leader = (i) => {
    const [tx, ty] = TOKENS[i];
    const start = [tx, ty + TOKEN.a + TOKEN.t];
    const [px, py] = pads[i];
    const dx = px - tx;
    const dy = Math.abs(dx) * 0.577;
    const y1 = py - dy;
    return `M${start[0]} ${start[1]} V${y1.toFixed(1)} L${px.toFixed(1)} ${py.toFixed(1)}`;
  };

  return (
    <svg ref={ref} viewBox="0 0 400 590" role="img" aria-label={t.visualLabel} className={cn("block h-auto w-full overflow-visible", className)}>
      <title>{t.visualLabel}</title>
      <defs>
        <filter id="ol-soft" x="-20%" y="-30%" width="140%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1B2440" floodOpacity="0.08" /></filter>
        <filter id="ol-deep" x="-20%" y="-30%" width="140%" height="190%"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#1B2440" floodOpacity="0.18" /></filter>
        <clipPath id="ol-eng-top"><polygon points={eng.top} /></clipPath>
      </defs>

      {/* ── operación real: legend + hovering signals ── */}
      <motion.g {...fade(0.05)}>
        <text x={LABEL_X} y="26" className={cn(MONO, "fill-[#4A5164]")}>{t.inputsLabel}</text>
        {t.inputs.map((label, i) => (
          <g key={label} transform={`translate(${LABEL_X} ${40 + i * 18})`}>
            {GLYPHS[i % GLYPHS.length](COBALT)}
            <text x="18" y="9" className={cn(MONO, "fill-foreground/80")}>{label}</text>
          </g>
        ))}
      </motion.g>

      {/* fragments: the noise around a real operation */}
      <g stroke={INK} strokeOpacity="0.22" strokeWidth="1" strokeLinecap="round">
        <path d="M176 106l7-4M246 18l7-4M300 128l7-4M384 42l-7 4M166 64l7 4M338 150l7 4" />
      </g>
      <g fill={INK} fillOpacity="0.18"><circle cx="200" cy="84" r="1.3" /><circle cx="290" cy="94" r="1.3" /><circle cx="360" cy="24" r="1.3" /><circle cx="236" cy="132" r="1.3" /><circle cx="392" cy="120" r="1.3" /></g>
      {[[186, 116], [334, 146]].map(([x, y]) => { const g = faces([x, y], 18, 18, 0); return <polygon key={x} points={g.top} fill="none" stroke={INK} strokeOpacity="0.25" strokeDasharray="2 2" />; })}

      {/* leaders: vertical, then along an axis, into the ordered pads */}
      {TOKENS.map((_, i) => (
        <motion.path key={i} d={leader(i)} fill="none" stroke={COBALT} strokeOpacity="0.55" strokeWidth="0.9" strokeDasharray="3 3" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={on ? { pathLength: 1, opacity: 1 } : undefined} transition={reduce ? { duration: 0 } : { pathLength: { duration: 0.8, delay: 1.0 + i * 0.1, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 1.0 + i * 0.1 } }} />
      ))}

      {/* the tokens */}
      {TOKENS.map(([x, y], i) => {
        const g = faces([x, y], TOKEN.a, TOKEN.b, TOKEN.t);
        return (
          <motion.g key={i} initial={reduce ? false : { opacity: 0, y: -14 }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE }} filter="url(#ol-soft)">
            <polygon points={g.right} fill="#E4E8F2" stroke={INK} strokeOpacity="0.2" strokeWidth="0.8" />
            <polygon points={g.left} fill="#EEF1F7" stroke={INK} strokeOpacity="0.2" strokeWidth="0.8" />
            <polygon points={g.top} fill="#FFFFFF" stroke={INK} strokeOpacity="0.28" strokeWidth="0.8" />
            <g transform={`${onTop([x, y], 8, 8)} scale(1.1)`}>{GLYPHS[i % GLYPHS.length](COBALT)}</g>
          </motion.g>
        );
      })}

      {/* ── the stack, drawn back to front ── */}
      {/* base: the system */}
      <motion.g initial={reduce ? false : { opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.3, ease: EASE }} filter="url(#ol-deep)">
        <polygon points={base.right} fill="#1F3FD0" />
        <polygon points={base.left} fill="#2A4CE6" />
        <polygon points={base.top} fill={COBALT} />
        <polygon points={base.top} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.8" />
      </motion.g>

      {/* the four layers, top of the stack last */}
      {[...t.layers].map((_, idx) => t.layers.length - 1 - idx).map((i) => {
        const p = plates[i + 1];
        const g = F(p.o);
        return (
          <motion.g key={p.key} initial={reduce ? false : { opacity: 0, y: collapse(p.o) }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={reduce ? { duration: 0 } : { opacity: { duration: 0.3, delay: 0.5 + i * 0.1 }, y: { type: "spring", stiffness: 90, damping: 18, mass: 0.9, delay: 0.55 + i * 0.12 } }} filter="url(#ol-soft)">
            <polygon points={g.right} fill="#E6EAF3" stroke={INK} strokeOpacity="0.18" strokeWidth="0.8" />
            <polygon points={g.left} fill="#F0F2F8" stroke={INK} strokeOpacity="0.18" strokeWidth="0.8" />
            <polygon points={g.top} fill="#FFFFFF" fillOpacity="0.94" stroke={INK} strokeOpacity="0.22" strokeWidth="0.8" />
            <g transform={onTop(p.o, PLATE.a * 0.56, PLATE.b * 0.58)}>{MOTIFS[i % MOTIFS.length]}</g>
            {/* a cobalt edge on the front-left face marks the layer, fading with depth */}
            <polygon points={g.left} fill={COBALT} fillOpacity={0.9 - i * 0.2} />
          </motion.g>
        );
      })}

      {/* the engineering plate: glass with an ordered grid */}
      <motion.g initial={reduce ? false : { opacity: 0, y: collapse(STACK_O) }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={reduce ? { duration: 0 } : { opacity: { duration: 0.3, delay: 0.95 }, y: { type: "spring", stiffness: 90, damping: 18, mass: 0.9, delay: 1.0 } }} filter="url(#ol-soft)">
        <polygon points={eng.right} fill={COBALT} fillOpacity="0.28" stroke={COBALT} strokeOpacity="0.5" strokeWidth="0.8" />
        <polygon points={eng.left} fill={COBALT} fillOpacity="0.18" stroke={COBALT} strokeOpacity="0.5" strokeWidth="0.8" />
        <polygon points={eng.top} fill="#FFFFFF" fillOpacity="0.72" />
        <g clipPath="url(#ol-eng-top)" stroke={COBALT} strokeOpacity="0.18" strokeWidth="0.7">
          {Array.from({ length: 9 }, (_, k) => { const a = (PLATE.a * (k + 1)) / 10; const p1 = iso(STACK_O, a, 0), p2 = iso(STACK_O, a, PLATE.b); return <line key={`a${k}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />; })}
          {Array.from({ length: 4 }, (_, k) => { const b = (PLATE.b * (k + 1)) / 5; const p1 = iso(STACK_O, 0, b), p2 = iso(STACK_O, PLATE.a, b); return <line key={`b${k}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />; })}
        </g>
        <polygon points={eng.top} fill="none" stroke={COBALT} strokeOpacity="0.7" strokeWidth="0.9" />
        {/* the ordered pads the inputs land on */}
        {pads.map(([x, y], i) => (
          <g key={i} transform={`matrix(0.866 0.5 -0.866 0.5 ${x.toFixed(1)} ${y.toFixed(1)})`}>
            <rect x="-6" y="-6" width="12" height="12" fill={COBALT} fillOpacity="0.14" stroke={COBALT} strokeOpacity="0.8" strokeWidth="0.9" />
            <rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill={COBALT} />
          </g>
        ))}
      </motion.g>

      {/* ── callouts: the sheet names every plate ── */}
      <motion.g {...fade(1.2, 0)}>
        {/* engineering */}
        <line x1={LEADER_X} y1={eng.D[1]} x2={eng.D[0] - 2} y2={eng.D[1]} stroke={COBALT} strokeOpacity="0.6" strokeWidth="0.8" />
        <circle cx={eng.D[0]} cy={eng.D[1]} r="2.2" fill="#FFFFFF" stroke={COBALT} strokeWidth="1" />
        <text x={LABEL_X} y={eng.D[1] + 3.5} className={cn(MONO, "fill-accent")}>{t.fieldLabel}</text>
        <text x={LABEL_X} y={F(plates[1].o).D[1] - 15} className="font-mono text-[9px] uppercase tracking-[0.18em] fill-[#8A8FA0]">{t.layersLabel}</text>
        {t.layers.map((label, i) => {
          const g = F(plates[i + 1].o);
          const y = g.D[1];
          return (
            <g key={label}>
              <line x1={LEADER_X} y1={y} x2={g.D[0] - 2} y2={y} stroke={INK} strokeOpacity="0.3" strokeWidth="0.8" />
              <circle cx={g.D[0]} cy={y} r="1.8" fill={INK} fillOpacity="0.55" />
              <text x={LABEL_X} y={y + 4} className="font-mono text-[9px] tracking-[0.16em] fill-[#8A8FA0]">0{i + 1}</text>
              <text x={LABEL_X + 22} y={y + 4.5} className="font-heading text-[13.5px] font-bold tracking-[-0.015em] fill-foreground">{label}</text>
            </g>
          );
        })}
        {/* the system */}
        <line x1={LEADER_X} y1={base.D[1]} x2={base.D[0] - 2} y2={base.D[1]} stroke={COBALT} strokeOpacity="0.7" strokeWidth="0.8" />
        <circle cx={LABEL_X + 4} cy={base.D[1]} r="4" fill={COBALT} />
        <text x={LABEL_X + 16} y={base.D[1] + 4} className="font-mono text-[11px] uppercase tracking-[0.2em] fill-foreground">{t.result}</text>
      </motion.g>

      {/* ── the thesis: the sheet's title block ── */}
      <motion.g {...fade(1.5, 6)}>
        <line x1={LABEL_X} y1="522" x2="384" y2="522" stroke={INK} strokeOpacity="0.14" />
        <text x={LABEL_X} y="554" className="font-heading text-[24px] font-bold tracking-[-0.025em] fill-foreground">{t.statement[0]}</text>
        <text x={LABEL_X} y="582" className="font-heading text-[24px] font-bold tracking-[-0.025em] fill-accent">{t.statement[1]}</text>
      </motion.g>
    </svg>
  );
}
