import { motion, useTransform } from "framer-motion";

/**
 * The proof mark — evidence, not protagonist. A confident metric with
 * its own label, seated between the copy and the product visual,
 * settling into place after the headline has arrived.
 */
export default function ProofMark({ proof, index, f }) {
  const t = useTransform(f, (v) => v - index);
  const opacity = useTransform(t, [-0.45, -0.18, 0.18, 0.45], [0, 1, 1, 0]);
  const y = useTransform(t, [-0.45, -0.18, 0.18, 0.45], [26, 0, 0, -26]);
  const filter = useTransform(
    t,
    [-0.45, -0.18, 0.18, 0.45],
    ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o < 0.05 ? "none" : "auto"
  );

  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents }}
      aria-hidden="true"
      className="absolute left-[47%] top-[62%] z-20"
    >
      <span className="block w-9 border-t border-accent" />
      <p className="mt-2.5 font-heading text-4xl font-bold leading-none tracking-[-0.03em] text-foreground md:text-5xl">
        {proof.value}
        {proof.suffix && <span className="text-accent">{proof.suffix}</span>}
      </p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        {proof.label}
      </p>
    </motion.div>
  );
}