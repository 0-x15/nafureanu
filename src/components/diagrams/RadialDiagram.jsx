import { motion } from "framer-motion";

const INK = "#8A93A6";
const BLUE = "#3D7BFF";
const CYAN = "#5CDBEA";
const TXT = "#E8ECF3";
const SURFACE = "#0D1117";
const EDGE = "#2A3550";
const MONO = "'JetBrains Mono', monospace";
const EASE = [0.22, 1, 0.36, 1];

/**
 * Radial hub-and-spoke architecture diagram (SophIA as the central
 * system). On scroll-in, connections draw themselves progressively and
 * modules appear in sequence; cyan/blue pulses then travel the data
 * paths continuously (unless reduced motion). nodes: [{ label, active }]
 */
export default function RadialDiagram({ centerLabel, nodes, reduced, label }) {
  const W = 780;
  const cx = W / 2;
  const cy = W / 2;
  const R = 288;
  const NW = 150;
  const NH = 30;
  const pos = nodes.map((_, i) => {
    const a = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${W}`}
      className="mx-auto h-auto w-full max-w-3xl"
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
    >
      {pos.map((p, i) => (
        <motion.line
          key={`line-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke={nodes[i].active ? BLUE : INK}
          strokeOpacity={nodes[i].active ? 0.75 : 0.3}
          strokeWidth="1"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE }}
        />
      ))}
      {pos.map((p, i) => (
        <motion.g
          key={`node-${i}`}
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: EASE }}
        >
          <rect
            x={p.x - NW / 2}
            y={p.y - NH / 2}
            width={NW}
            height={NH}
            fill={SURFACE}
            stroke={nodes[i].active ? BLUE : EDGE}
            strokeWidth={nodes[i].active ? 1.5 : 1}
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontSize="10"
            letterSpacing="1.2"
            fill={TXT}
            style={{ fontFamily: MONO }}
          >
            {nodes[i].label}
          </text>
        </motion.g>
      ))}
      <motion.g
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <rect x={cx - 95} y={cy - 26} width={190} height={52} fill="#111726" stroke={BLUE} strokeWidth="1" />
        <rect x={cx - 95} y={cy - 26} width={8} height={52} fill={BLUE} />
        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fontSize="14"
          letterSpacing="3"
          fill={TXT}
          style={{ fontFamily: MONO }}
        >
          {centerLabel}
        </text>
      </motion.g>
      {!reduced &&
        pos.map((p, i) => (
          <circle key={`pulse-${i}`} r="3.5" fill={nodes[i].active ? CYAN : BLUE}>
            <animateMotion
              dur={`${2.6 + (i % 5) * 0.4}s`}
              begin={`${0.8 + i * 0.45}s`}
              repeatCount="indefinite"
              path={`M ${cx} ${cy} L ${p.x} ${p.y}`}
            />
          </circle>
        ))}
    </motion.svg>
  );
}