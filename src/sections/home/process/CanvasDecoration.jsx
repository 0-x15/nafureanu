import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Business reality entering the canvas — scattered strokes that lose
   their disorder as the composition approaches the rail. */
const CHAOS = Array.from({ length: 12 }, (_, i) => {
  const t = i / 11;
  const dir = i % 2 ? -1 : 1;
  return {
    x: 170 + i * 34,
    y: 320 + dir * (54 - 46 * t) * (0.4 + ((i * 37) % 60) / 100),
    rot: dir * 9 * (1 - t),
    o: 0.15 + 0.2 * t,
  };
});

const PULSE_X = [880, 920, 960, 1000, 1040];

/**
 * The blueprint layer of the engineering canvas: one continuous rail
 * plus the quiet evidence of each phase — boundaries, modules,
 * connections, a repeating signal, and the calm parallel lines of a
 * deployed system.
 */
export default function CanvasDecoration() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 640"
      className="absolute inset-0 h-full w-full text-foreground"
      fill="none"
    >
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        {/* 01 — process fragments begin to align */}
        {CHAOS.map((c, i) => (
          <line
            key={i}
            x1={c.x - 16}
            y1={c.y}
            x2={c.x + 16}
            y2={c.y}
            stroke="currentColor"
            strokeOpacity={c.o}
            strokeWidth={1}
            transform={`rotate(${c.rot} ${c.x} ${c.y})`}
          />
        ))}
        {/* 02 — system boundaries appear */}
        <rect x={300} y={262} width={180} height={116} stroke="currentColor" strokeOpacity={0.12} />
        <rect x={348} y={240} width={250} height={160} stroke="currentColor" strokeOpacity={0.07} />
        {/* 03 — structure becomes modules */}
        <rect x={566} y={372} width={50} height={30} fill="white" fillOpacity={0.45} stroke="currentColor" strokeOpacity={0.2} />
        <rect x={628} y={356} width={72} height={18} fill="white" fillOpacity={0.45} stroke="currentColor" strokeOpacity={0.2} />
        <rect x={600} y={414} width={58} height={14} fill="white" fillOpacity={0.4} stroke="currentColor" strokeOpacity={0.16} />
        {/* 04 — external tools join the same structure */}
        <g stroke="#2B59FF" strokeOpacity={0.35} strokeWidth={1}>
          <line x1={742} y1={252} x2={771} y2={320} />
          <line x1={792} y1={222} x2={771} y2={320} />
          <line x1={818} y1={262} x2={771} y2={320} />
        </g>
        <g fill="#2B59FF" fillOpacity={0.5}>
          <circle cx={742} cy={252} r={2.2} />
          <circle cx={792} cy={222} r={2.2} />
          <circle cx={818} cy={262} r={2.2} />
        </g>
        {/* 06 — the deployed system resolves into calm parallel lines */}
        <line x1={1120} y1={302} x2={1400} y2={302} stroke="currentColor" strokeOpacity={0.14} />
        <line x1={1120} y1={338} x2={1400} y2={338} stroke="currentColor" strokeOpacity={0.14} />
      </motion.g>

      {/* 05 — a repeating signal moves through the system */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
      >
        {PULSE_X.map((x) => (
          <circle key={x} cx={x} cy={320} r={2} fill="#2B59FF" fillOpacity={0.3} />
        ))}
        <motion.circle
          cx={880}
          cy={320}
          r={2.6}
          fill="#2B59FF"
          animate={reduce ? undefined : { cx: [880, 1040] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </motion.g>

      {/* the engineering rail — one continuous line, drawn left → right */}
      <motion.line
        x1={150}
        y1={320}
        x2={1400}
        y2={320}
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  );
}