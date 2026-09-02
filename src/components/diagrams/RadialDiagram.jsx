import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const W = 640;
const H = 520;
const CX = W / 2;
const CY = H / 2;
const RX = 248;
const RY = 165;

/**
 * Hub-and-spoke system map for dark bands — SophIA's architecture.
 * nodes: [{ label, active }]. Refined pill styling, no console HUD.
 */
export default function RadialDiagram({ centerLabel, nodes, label, reduced }) {
  const pts = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
  });
  const NW = 118;
  const NH = 30;

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto h-auto w-full max-w-2xl"
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
    >
      {nodes.map((n, i) => {
        const p = pts[i];
        const active = n.active;
        return (
          <g key={`spoke-${i}`}>
            <motion.line
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke={active ? "rgba(91,132,255,0.55)" : "rgba(255,255,255,0.12)"}
              strokeWidth="1"
              variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: EASE }}
            />
            {!reduced && (
              <circle r="2.5" fill={active ? "#8FA5E8" : "rgba(255,255,255,0.5)"}>
                <animateMotion
                  dur={`${2.6 + (i % 5) * 0.4}s`}
                  begin={`${0.8 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M ${CX} ${CY} L ${p.x} ${p.y}`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Center hub */}
      <motion.g
        variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <circle cx={CX} cy={CY} r="52" fill="rgba(43,89,255,0.16)" stroke="#5B84FF" strokeWidth="1.5" />
        <text
          x={CX}
          y={CY + 5}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#F2F3F6"
          style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
        >
          {centerLabel}
        </text>
      </motion.g>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const p = pts[i];
        const active = n.active;
        return (
          <motion.g
            key={n.label}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: EASE }}
          >
            <rect
              x={p.x - NW / 2}
              y={p.y - NH / 2}
              width={NW}
              height={NH}
              rx={NH / 2}
              fill={active ? "rgba(43,89,255,0.15)" : "rgba(255,255,255,0.04)"}
              stroke={active ? "#5B84FF" : "rgba(255,255,255,0.14)"}
              strokeWidth="1"
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="12"
              fill={active ? "#EAF0FF" : "rgba(255,255,255,0.75)"}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}