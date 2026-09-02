import { motion, useTransform } from "framer-motion";

/**
 * The stage zone wrapper. The product visual enters from depth
 * (drift, blur, rotation) as its state approaches and leaves the
 * same way — it owns the most expressive transition of the section.
 */
export default function StageVisual({ index, f, progress, children }) {
  const t = useTransform(f, (v) => v - index);
  const opacity = useTransform(t, [-0.65, -0.35, 0.35, 0.65], [0, 1, 1, 0]);
  const x = useTransform(t, [-0.65, -0.35, 0.35, 0.65], [80, 0, 0, -80]);
  const rotate = useTransform(t, [-0.65, -0.35, 0.35, 0.65], [3, 0, 0, -3]);
  const filter = useTransform(
    t,
    [-0.65, -0.35, 0.35, 0.65],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );
  const y = useTransform(progress, [0, 1], ["1.5vh", "-1.5vh"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[8%] top-1/2 z-10 w-[40%] max-w-[520px] -translate-y-1/2"
    >
      <motion.div style={{ opacity, x, y, rotate, filter }}>{children}</motion.div>
    </div>
  );
}