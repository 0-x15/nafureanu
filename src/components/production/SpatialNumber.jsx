import { motion, useTransform } from "framer-motion";

/* Choreography: a number holds the focal point until |t| ≈ 0.3,
   then sweeps out to the periphery (and back in) with speed — the
   center is never shared by two competing metrics. */
const T = [-2, -1, -0.55, -0.3, 0, 0.3, 0.55, 1, 2];
const X = ["56vw", "50vw", "44vw", "8vw", "5vw", "8vw", "44vw", "50vw", "56vw"];
const Y = ["-3vh", "-6vh", "-4vh", "0vh", "-1vh", "0vh", "-4vh", "-6vh", "-3vh"];
const SCALE = [0.12, 0.15, 0.26, 0.97, 1, 0.97, 0.26, 0.15, 0.12];
const OPACITY = [0, 0.05, 0.1, 1, 1, 1, 0.1, 0.05, 0];
const BLUR = [
  "blur(10px)", "blur(8px)", "blur(5px)", "blur(0px)",
  "blur(0px)", "blur(0px)", "blur(5px)", "blur(8px)", "blur(10px)",
];

/**
 * One metric number: monumental and clean when focal, an atmospheric
 * cropped hint in the periphery otherwise.
 */
export default function SpatialNumber({ metric, index, f, goTo }) {
  const t = useTransform(f, (v) => v - index);
  const x = useTransform(t, T, X);
  const y = useTransform(t, T, Y);
  const scale = useTransform(t, T, SCALE);
  const rotate = useTransform(t, [-1, -0.55, 0, 0.55, 1], [6, 4, 0, -4, -6]);
  const opacity = useTransform(t, T, OPACITY);
  const filter = useTransform(t, T, BLUR);
  const pointerEvents = useTransform(opacity, (o) =>
    o < 0.05 ? "none" : "auto"
  );

  return (
    <motion.div
      onClick={() => goTo(index)}
      style={{ x, y, scale, rotate, opacity, filter, pointerEvents }}
      aria-hidden="true"
      className="absolute z-20 cursor-pointer select-none font-heading text-[clamp(8rem,26vw,24rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground"
    >
      {metric.value}
      {metric.suffix && <span className="text-accent">{metric.suffix}</span>}
    </motion.div>
  );
}