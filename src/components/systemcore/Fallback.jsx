const INK = "#121212";
const SIGNAL = "#E63946";

/**
 * Static fallback for the System Core when WebGL is unavailable —
 * the same four-stage systems language, drawn in SVG.
 */
export default function Fallback() {
  const cols = [5, 7, 7, 4];
  const nodes = [];
  cols.forEach((count, s) => {
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: 90 + s * 207,
        y: 55 + (i * 190) / Math.max(count - 1, 1),
        col: s,
        i,
        red: (s * 3 + i) % 9 === 0,
      });
    }
  });
  const lines = nodes
    .filter((n) => n.col < 3)
    .map((n) => {
      const targets = nodes.filter((t) => t.col === n.col + 1);
      const t = targets[Math.min(n.i, targets.length - 1)];
      return { a: n, b: t };
    });

  return (
    <div className="flex h-full items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 828 300" className="h-auto max-h-full w-full max-w-4xl">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.a.x}
            y1={l.a.y}
            x2={l.b.x}
            y2={l.b.y}
            stroke={INK}
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <rect
            key={i}
            x={n.x - 5}
            y={n.y - 5}
            width="10"
            height="10"
            fill={n.red ? SIGNAL : INK}
            opacity={n.red ? 1 : 0.8}
          />
        ))}
      </svg>
    </div>
  );
}