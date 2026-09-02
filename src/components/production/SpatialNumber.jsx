import { motion, useTransform } from "framer-motion";

const T_INPUT = [-2, -1, 0, 1, 2];
const X = ["62vw", "48vw", "6vw", "-38vw", "-52vw"];
const Y = ["-2vh", "6vh", "0vh", "-9vh", "-4vh"];
const SCALE = [0.14, 0.32, 1, 0.32, 0.14];

/**
 * One metric number moving through a spatial sequence: focal when
 * active, displaced and receded into depth as a neighbour. Clicking
 * a visible neighbour scrolls the composition to its state.
 */
export default function SpatialNumber({ metric, index, f, goTo }) {
  const t = useTransform(f, (v) => v - index);
  const x = useTransform(t, T_INPUT, X);
  const y = useTransform(t, T_INPUT, Y);
  const scale = useTransform(t, T_INPUT, SCALE);
  const rotate = useTransform(t, [-1, 0, 1], [7, 0, -7]);
  const opacity = useTransform(
    t,
    [-2, -1.3, -0.45, 0, 0.45, 1.3, 2],
    [0, 0.08, 0.16, 1, 0.16, 0.08, 0]
  );
  const filter = useTransform(
    t,
    [-1.4, -0.35, 0, 0.35, 1.4],
    ["blur(7px)", "blur(2px)", "blur(0px)", "blur(2px)", "blur(7px)"]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o < 0.05 ? "none" : "auto"
  );

  return (
    <motion.div
      onClick={() => goTo(index)}
      style={{ x, y, scale, rotate, opacity, filter, pointerEvents }}
      aria-hidden="true"
      className="absolute z-20 cursor-pointer select-none font-heading text-[clamp(9rem,30vw,30rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground"
    >
      {metric.value}
      {metric.suffix && <span className="text-accent">{metric.suffix}</span>}
    </motion.div>
  );
}