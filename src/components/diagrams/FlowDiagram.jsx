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
 * Vertical systems-pipeline diagram (Fivo payment architecture).
 * On scroll-in, connectors draw and boxes appear in sequence; signals
 * then travel the pipeline continuously (unless reduced motion).
 * steps: [{ label, active }]
 */
export default function FlowDiagram({ steps, reduced, label }) {
  const W = 600;
  const NW = 380;
  const NH = 56;
  const GAP = 26;
  const TOP = 30;
  const y = (i) => TOP + i * (NH + GAP);
  const H = y(steps.length - 1) + NH + TOP;

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
      {steps.map((s, i) => {
        const cy = y(i);
        return (
          <g key={`wrap-${s.label}`}>
            {i < steps.length - 1 && (
              <motion.line
                x1={W / 2}
                y1={cy + NH / 2}
                x2={W / 2}
                y2={y(i + 1) - NH / 2}
                stroke={INK}
                strokeOpacity="0.35"
                strokeWidth="1"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.14, ease: EASE }}
              />
            )}
            <motion.g
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.14, ease: EASE }}
            >
              <rect
                x={(W - NW) / 2}
                y={cy - NH / 2}
                width={NW}
                height={NH}
                fill={s.active ? "#13224A" : SURFACE}
                stroke={s.active ? BLUE : EDGE}
                strokeWidth={s.active ? 1.5 : 1}
              />
              <text
                x={W / 2}
                y={cy + 4}
                textAnchor="middle"
                fontSize="12"
                letterSpacing="1.5"
                fill={TXT}
                style={{ fontFamily: MONO }}
              >
                {s.label}
              </text>
            </motion.g>
          </g>
        );
      })}
      {!reduced &&
        steps.slice(0, -1).map((_, i) => (
          <circle key={`pulse-${i}`} r="3.5" fill={i === 4 ? CYAN : BLUE}>
            <animateMotion
              dur={`${2.4 + (i % 4) * 0.45}s`}
              begin={`${0.9 + i * 0.32}s`}
              repeatCount="indefinite"
              path={`M ${W / 2} ${y(i) + NH / 2} L ${W / 2} ${y(i + 1) - NH / 2}`}
            />
          </circle>
        ))}
    </motion.svg>
  );
}