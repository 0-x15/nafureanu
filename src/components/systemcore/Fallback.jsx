const BLUE = "#3D7BFF";
const CYAN = "#5CDBEA";
const FRAME = "#2A3550";

/**
 * Static fallback for the System Core when WebGL is unavailable —
 * the same system language, drawn in SVG: separated modules, curved
 * paths and signal points.
 */
export default function Fallback() {
  const modules = [
    [0.0, 42], [148, 92], [140, 196], [80, 232], [20, 196], [14, 92],
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4],
  ];
  const signals = [
    [0, 1, 0.3], [2, 3, 0.6], [4, 5, 0.45], [0, 3, 0.7], [1, 4, 0.25],
  ];

  const pt = (m, s = 0.5) => {
    const a = modules[m[0]];
    const b = modules[m[1]];
    const x = a[0] + (b[0] - a[0]) * s;
    const y = a[1] + (b[1] - a[1]) * s;
    return [x, y - 12];
  };

  return (
    <div className="flex h-full items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 160 264" className="h-auto max-h-full w-full max-w-md">
        {links.map(([a, b], i) => {
          const p1 = pt([a, b], 0);
          const p2 = pt([a, b], 1);
          return (
            <path
              key={i}
              d={`M ${p1[0]} ${p1[1]} Q ${(p1[0] + p2[0]) / 2} ${(p1[1] + p2[1]) / 2 - 14} ${p2[0]} ${p2[1]}`}
              fill="none"
              stroke={FRAME}
              strokeOpacity="0.8"
              strokeWidth="0.5"
            />
          );
        })}
        {signals.map(([a, b, t], i) => {
          const p = pt([a, b], t);
          return <circle key={i} cx={p[0]} cy={p[1]} r="1.6" fill={i % 3 === 0 ? BLUE : CYAN} />;
        })}
        {modules.map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x - 10}
              y={y - 12 - 7}
              width="20"
              height="14"
              fill="none"
              stroke={i % 3 === 0 ? BLUE : FRAME}
              strokeWidth="0.6"
            />
            <circle cx={x} cy={y - 12} r="2.2" fill={i % 2 === 0 ? BLUE : CYAN} />
          </g>
        ))}
      </svg>
    </div>
  );
}