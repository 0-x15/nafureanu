const INK = "#121212";
const SIGNAL = "#E63946";
const BG = "#F9F9F7";
const MONO = "'JetBrains Mono', monospace";

/**
 * Vertical systems-pipeline diagram (Fivo payment architecture).
 * Signal-red pulses travel through the flow unless reduced motion is on.
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
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label={label}>
      {steps.map((s, i) => {
        const cy = y(i);
        const stroke = s.active ? SIGNAL : INK;
        return (
          <g key={s.label}>
            {i < steps.length - 1 && (
              <line
                x1={W / 2}
                y1={cy + NH / 2}
                x2={W / 2}
                y2={y(i + 1) - NH / 2}
                stroke={INK}
                strokeOpacity="0.25"
                strokeWidth="1"
              />
            )}
            <rect
              x={(W - NW) / 2}
              y={cy - NH / 2}
              width={NW}
              height={NH}
              fill={BG}
              stroke={stroke}
              strokeWidth={s.active ? 1.5 : 1}
            />
            <text
              x={W / 2}
              y={cy + 4}
              textAnchor="middle"
              fontSize="12"
              letterSpacing="1.5"
              fill={INK}
              style={{ fontFamily: MONO }}
            >
              {s.label}
            </text>
          </g>
        );
      })}
      {!reduced &&
        steps.slice(0, -1).map((_, i) => (
          <circle key={`pulse-${i}`} r="3.5" fill={SIGNAL}>
            <animateMotion
              dur={`${2.4 + (i % 4) * 0.45}s`}
              begin={`${i * 0.32}s`}
              repeatCount="indefinite"
              path={`M ${W / 2} ${y(i) + NH / 2} L ${W / 2} ${y(i + 1) - NH / 2}`}
            />
          </circle>
        ))}
    </svg>
  );
}