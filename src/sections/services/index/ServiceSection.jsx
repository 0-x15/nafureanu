import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./servicesIndexBits";

/**
 * The technical drawing of the Services index: an isometric section of a
 * company system. Seven strata, each a slab whose front face carries the
 * motif of one layer — the foundation, the integrations, the data, the
 * operations, the automation lane, the product shell — and, on top, the
 * web interface.
 * In the hero the strata are pulled apart and named; `assembled` closes
 * them into one solid block. Hairlines, pale plates, one cobalt accent.
 * Decorative; the callers hide it from readers.
 */
const C = 0.8660254;
const S = 0.5;
const W = 240;
const H = 120;
const TK = 26;
const INK = "rgba(25,28,41,0.4)";
const INK_SOFT = "rgba(25,28,41,0.18)";
const COBALT = "#3157F6";
const CYAN = "#17B4CD";
const MONO = "ui-monospace, Menlo, monospace";

/** plate → screen */
const P = (u, v, z, cx, cy) => [cx + (u - v) * C, cy - z + (u + v) * S];

/** One slab: top face, front-left face (with the motif) and front-right face. */
function Slab({ z, cx, cy, top, front }) {
  const [lx, ly] = P(0, H, z, cx, cy);
  const [bx, by] = P(W, H, z, cx, cy);
  const [rx, ry] = P(W, 0, z, cx, cy);
  return (
    <g>
      <polygon points={`${bx},${by} ${rx},${ry} ${rx},${ry + TK} ${bx},${by + TK}`} fill="#DEDBD2" stroke={INK} strokeWidth="0.75" />
      {/* front-left face, drawn in its own plane */}
      <g transform={`matrix(${C},${S},0,1,${lx},${ly})`}>
        <rect x="0" y="0" width={W} height={TK} fill="#ECEAE2" stroke={INK} strokeWidth="0.75" />
        {front}
      </g>
      {/* top face, in plate coordinates */}
      <g transform={`translate(${cx},${cy - z}) matrix(${C},${S},${-C},${S},0,0)`}>
        <rect x="0" y="0" width={W} height={H} fill="#F7F5EF" stroke={INK} strokeWidth="0.75" />
        {top}
      </g>
    </g>
  );
}

/* front-face motifs, in face coordinates (a along the edge 0..W, b down 0..TK) */
function FoundationFront() {
  return (
    <g transform="scale(0.857,0.866)">
      {[14, 74, 134, 194].map((x, i) => (
        <g key={x}>
          <rect x={x} y="6" width="52" height="18" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
          {[10, 14, 18, 22].map((y) => <line key={y} x1={x + 5} y1={y} x2={x + 38} y2={y} stroke={INK_SOFT} strokeWidth="1.2" />)}
          <circle cx={x + 46} cy="15" r="1.8" fill={i === 2 ? CYAN : COBALT} />
        </g>
      ))}
      <rect x="254" y="6" width="14" height="18" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
    </g>
  );
}
function IntegrationsFront() {
  return (
    <g transform="scale(0.857,0.866)">
      <rect x="14" y="6" width="60" height="18" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="206" y="6" width="60" height="18" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      {[10, 14, 18].map((y) => <rect key={y} x="20" y={y} width="34" height="2" fill={INK_SOFT} />)}
      {[10, 14, 18].map((y) => <rect key={y} x="212" y={y} width="34" height="2" fill={INK_SOFT} />)}
      <circle cx="74" cy="15" r="3.5" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <circle cx="206" cy="15" r="3.5" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <line x1="78" y1="15" x2="202" y2="15" stroke={CYAN} strokeWidth="2" />
      <rect x="134" y="9" width="12" height="12" fill={COBALT} />
      <text x="118" y="8" fontSize="6" fontFamily={MONO} letterSpacing="1" fill={INK}>API</text>
    </g>
  );
}
function DataFront() {
  return (
    <g transform="scale(0.857,0.866)">
      <rect x="12" y="5" width="256" height="20" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      {[44, 76, 108, 140, 172, 204, 236].map((x) => <line key={x} x1={x} y1="5" x2={x} y2="25" stroke={INK_SOFT} strokeWidth="0.75" />)}
      <line x1="12" y1="12" x2="268" y2="12" stroke={INK_SOFT} strokeWidth="0.75" />
      <line x1="12" y1="18" x2="268" y2="18" stroke={INK_SOFT} strokeWidth="0.75" />
      <rect x="108" y="12" width="32" height="6" fill={COBALT} opacity="0.85" />
      {[16, 48, 80, 144, 176, 208, 240].map((x) => <rect key={x} x={x} y="20" width="20" height="2" fill={INK_SOFT} />)}
    </g>
  );
}
function AutomationFront() {
  return (
    <g transform="scale(0.857,0.866)">
      <line x1="14" y1="15" x2="180" y2="15" stroke={INK} strokeWidth="0.75" strokeDasharray="3 3" />
      <rect x="14" y="8" width="26" height="14" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="154" y="8" width="26" height="14" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="90" y="9" width="12" height="12" fill={COBALT} />
      <polygon points="78,15 84,12 84,18" fill={INK} />
      <polygon points="108,15 114,12 114,18" fill={INK} />
      <rect x="196" y="8" width="26" height="12" rx="6" fill={COBALT} stroke={INK} strokeWidth="0.5" />
      <circle cx="216" cy="14" r="4" fill="#FFFFFF" />
      <rect x="232" y="8" width="26" height="12" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="0.5" />
      <circle cx="238" cy="14" r="4" fill={INK_SOFT} />
    </g>
  );
}
function OperationsFront() {
  return (
    <g transform="scale(0.857,0.866)">
      {[14, 66, 118, 170].map((x, i) => (
        <g key={x}>
          <rect x={x} y="7" width="40" height="16" rx="2" fill={i === 2 ? COBALT : "#FFFFFF"} fillOpacity={i === 2 ? 0.14 : 1} stroke={i === 2 ? COBALT : INK} strokeWidth="0.75" strokeOpacity={i === 2 ? 0.6 : 1} />
          <rect x={x + 6} y="13" width={i === 2 ? 22 : 18} height="3" fill={i === 2 ? COBALT : INK_SOFT} />
          {i < 3 && <line x1={x + 40} y1="15" x2={x + 52} y2="15" stroke={INK} strokeWidth="0.75" />}
        </g>
      ))}
      <rect x="226" y="6" width="14" height="18" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      {[10, 14, 18].map((y) => <line key={y} x1="229" y1={y} x2="237" y2={y} stroke={INK_SOFT} strokeWidth="1" />)}
      <rect x="248" y="6" width="20" height="18" rx="1" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="251" y="12" width="14" height="8" fill={CYAN} opacity="0.8" />
    </g>
  );
}
function ProductFront() {
  return (
    <g transform="scale(0.857,0.866)">
      <rect x="12" y="5" width="46" height="20" fill="#F1EFE8" stroke={INK} strokeWidth="0.75" />
      {[9, 13, 17, 21].map((y, i) => <rect key={y} x="17" y={y} width="30" height="2" fill={i === 1 ? COBALT : INK_SOFT} />)}
      <rect x="62" y="5" width="120" height="20" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="68" y="9" width="40" height="3" fill="#1B1F2C" opacity="0.7" />
      <rect x="68" y="15" width="100" height="2" fill={INK_SOFT} /><rect x="68" y="19" width="84" height="2" fill={INK_SOFT} />
      <rect x="186" y="5" width="82" height="20" fill={COBALT} opacity="0.12" stroke={COBALT} strokeWidth="0.75" strokeOpacity="0.5" />
      <polyline points="192,21 204,13 214,17 232,9 258,12" fill="none" stroke={CYAN} strokeWidth="1.5" />
    </g>
  );
}
function InterfaceFront() {
  return (
    <g transform="scale(0.857,0.866)">
      <rect x="12" y="6" width="256" height="18" rx="2" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <circle cx="20" cy="15" r="1.8" fill={INK} /><circle cx="26" cy="15" r="1.8" fill={INK} /><circle cx="32" cy="15" r="1.8" fill={INK} />
      <rect x="44" y="11" width="150" height="8" rx="4" fill="#EFEDE6" stroke={INK_SOFT} strokeWidth="0.75" />
      <rect x="236" y="10" width="26" height="10" rx="2" fill={COBALT} />
    </g>
  );
}
/* the top of the block: the interface as the visitor sees it */
function InterfaceTop() {
  return (
    <g transform="scale(0.857,0.8)">
      <rect x="26" y="22" width="228" height="106" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="0.75" />
      <rect x="26" y="22" width="228" height="14" rx="3" fill="#EFEDE6" stroke={INK} strokeWidth="0.75" />
      <circle cx="35" cy="29" r="1.8" fill={INK} /><circle cx="42" cy="29" r="1.8" fill={INK} /><circle cx="49" cy="29" r="1.8" fill={INK} />
      <rect x="40" y="48" width="84" height="7" rx="1" fill="#1B1F2C" opacity="0.8" />
      <rect x="40" y="60" width="64" height="7" rx="1" fill="#1B1F2C" opacity="0.8" />
      <rect x="40" y="78" width="88" height="3" fill={INK_SOFT} /><rect x="40" y="85" width="72" height="3" fill={INK_SOFT} /><rect x="40" y="92" width="80" height="3" fill={INK_SOFT} />
      <rect x="40" y="106" width="38" height="12" rx="2" fill={COBALT} />
      <rect x="148" y="46" width="92" height="70" rx="3" fill={COBALT} opacity="0.16" stroke={COBALT} strokeWidth="0.75" strokeOpacity="0.5" />
    </g>
  );
}

const LAYERS = [FoundationFront, IntegrationsFront, DataFront, OperationsFront, AutomationFront, ProductFront, InterfaceFront];

/**
 * @param {{ labels: string[], range?: string, material?: string, assembled?: boolean, className?: string, compact?: boolean }} props
 */
export default function ServiceSection({ labels, range = undefined, material = undefined, assembled = false, className = "", compact = false }) {
  const reduced = useReducedMotion();
  const step = assembled ? TK : TK + 18;
  const cx = compact ? 340 : 372;
  const cy = compact ? 40 : 58;
  const total = (LAYERS.length - 1) * step;
  const zOf = (i) => -(total - i * step);
  const floorY = cy + total + (W + H) * S + TK + 22;
  return (
    <svg viewBox={compact ? "0 0 640 420" : "0 0 640 560"} className={cn("h-auto w-full overflow-visible", className)} aria-hidden="true">
      <defs>
        <filter id="sv-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#3157F6" floodOpacity="0.16" />
        </filter>
      </defs>
      {/* the ground under the block */}
      <ellipse cx={cx + 20} cy={floorY} rx={(W + H) * C / 2 + 20} ry="20" fill={COBALT} opacity="0.07" />
      {LAYERS.map((Front, i) => {
        const z = zOf(i);
        const isTop = i === LAYERS.length - 1;
        const [lx, ly] = P(0, H, z, cx, cy);
        const [bx, by] = P(W, H, z, cx, cy);
        const ax = (lx + bx) / 2 - 40;
        const ay = (ly + by) / 2 + TK / 2;
        return (
          <motion.g
            key={i}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: EASE }}
            style={{ filter: "url(#sv-shadow)" }}
          >
            <Slab z={z} cx={cx} cy={cy} top={isTop ? <InterfaceTop /> : null} front={<Front />} />
            {!assembled && labels[i] !== undefined && (
              <g>
                {/* the leader starts after the label: ~7.2px per mono character at 9px with 1.4 letter-spacing */}
                <line x1={24 + labels[i].length * 7.2 + 8} y1={ay} x2={ax} y2={ay} stroke={INK} strokeWidth="0.75" />
                <circle cx={ax} cy={ay} r="1.8" fill={COBALT} />
                <text x="24" y={ay + 3} fontSize="9" fontFamily={MONO} letterSpacing="1.4" fill="rgba(25,28,41,0.72)">
                  {labels[i].toUpperCase()}
                </text>
              </g>
            )}
          </motion.g>
        );
      })}
      {(range || material) && (
        <g>
          {range && <text x="24" y={compact ? 408 : 536} fontSize="9" fontFamily={MONO} letterSpacing="1.4" fill="rgba(25,28,41,0.55)">{range}</text>}
          {material && <text x="604" y={compact ? 408 : 536} textAnchor="end" fontSize="9" fontFamily={MONO} letterSpacing="1.4" fill="rgba(25,28,41,0.55)">{material.toUpperCase()}</text>}
        </g>
      )}
    </svg>
  );
}
