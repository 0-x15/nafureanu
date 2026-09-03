import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const W = 620;
const NW = 420;
const NH = 52;
const GAP = 20;
const TOP = 22;

/**
 * Vertical systems-pipeline diagram for dark bands — Fivo's payment
 * architecture. steps: [{ label, active }].
 */
export default function FlowDiagram({ steps, label, reduced }) {
  const y = (i) => TOP + i * (NH + GAP);
  const H = y(steps.length - 1) + NH + TOP;

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto h-auto w-full max-w-xl"
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
    >
      {steps.map((s, i) => {
        const cy = y(i);
        return (
          <g key={`step-${s.label}`}>
            {i < steps.length - 1 && (
              <>
                <motion.line
                  x1={W / 2}
                  y1={cy + NH / 2}
                  x2={W / 2}
                  y2={y(i + 1) - NH / 2}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: EASE }}
                />
                {!reduced && (
                  <circle r="3" fill="#5B84FF">
                    <animateMotion
                      dur={`${2.2 + (i % 4) * 0.4}s`}
                      begin={`${1 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M ${W / 2} ${cy + NH / 2} L ${W / 2} ${y(i + 1) - NH / 2}`}
                    />
                  </circle>
                )}
              </>
            )}
            <motion.g
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              <rect
                x={(W - NW) / 2}
                y={cy - NH / 2}
                width={NW}
                height={NH}
                rx="14"
                fill={s.active ? "rgba(49,87,246,0.15)" : "rgba(255,255,255,0.04)"}
                stroke={s.active ? "#5B84FF" : "rgba(255,255,255,0.14)"}
                strokeWidth="1"
              />
              <text
                x={W / 2}
                y={cy + 4.5}
                textAnchor="middle"
                fontSize="13"
                fill={s.active ? "#EAF0FF" : "rgba(255,255,255,0.8)"}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </text>
            </motion.g>
          </g>
        );
      })}
    </motion.svg>
  );
}