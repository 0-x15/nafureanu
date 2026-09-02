import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const VARIANTS = {
  /* Fade-up — the default */
  up: (y) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
  }),
  /* Masked reveal — rises out of a clipping edge */
  mask: () => ({
    initial: { opacity: 0, y: 34, clipPath: "inset(0 0 100% 0)" },
    whileInView: { opacity: 1, y: 0, clipPath: "inset(0 0 -12% 0)" },
  }),
  /* Depth reveal — scales up from slightly smaller and blurred */
  scale: () => ({
    initial: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
    whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
  }),
  /* Horizontal slide — from the left */
  left: () => ({
    initial: { opacity: 0, x: -44 },
    whileInView: { opacity: 1, x: 0 },
  }),
};

/**
 * Scroll-into-view reveal with multiple motion languages so sections
 * don't all animate the same way. variant: "up" | "mask" | "scale" | "left".
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  variant = "up",
}) {
  const build = VARIANTS[variant] || VARIANTS.up;
  const { initial, whileInView } = build(y);
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}