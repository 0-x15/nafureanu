const INK = "#121212";
const SIGNAL = "#E63946";
const BG = "#F9F9F7";
const MONO = "'JetBrains Mono', monospace";

/**
 * Radial hub-and-spoke architecture diagram (SophIA as the central
 * system). Signal-red pulses travel from the core to each module
 * unless reduced motion is on. nodes: [{ label, active }]
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
    <svg viewBox={`0 0 ${W} ${W}`} className="mx-auto h-auto w-full max-w-3xl" role="img" aria-label={label}>
      {pos.map((p, i) => (
        <line
          key={`line-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke={INK}
          strokeOpacity={nodes[i].active ? 0.5 : 0.2}
          strokeWidth="1"
        />
      ))}
      {pos.map((p, i) => (
        <g key={`node-${i}`}>
          <rect
            x={p.x - NW / 2}
            y={p.y - NH / 2}
            width={NW}
            height={NH}
            fill={BG}
            stroke={nodes[i].active ? SIGNAL : INK}
            strokeWidth={nodes[i].active ? 1.5 : 1}
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontSize="10"
            letterSpacing="1.2"
            fill={INK}
            style={{ fontFamily: MONO }}
          >
            {nodes[i].label}
          </text>
        </g>
      ))}
      <rect x={cx - 95} y={cy - 26} width={190} height={52} fill={INK} />
      <rect x={cx - 95} y={cy - 26} width={8} height={52} fill={SIGNAL} />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="14"
        letterSpacing="3"
        fill={BG}
        style={{ fontFamily: MONO }}
      >
        {centerLabel}
      </text>
      {!reduced &&
        pos.map((p, i) => (
          <circle key={`pulse-${i}`} r="3.5" fill={SIGNAL}>
            <animateMotion
              dur={`${2.6 + (i % 5) * 0.4}s`}
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
              path={`M ${cx} ${cy} L ${p.x} ${p.y}`}
            />
          </circle>
        ))}
    </svg>
  );
}