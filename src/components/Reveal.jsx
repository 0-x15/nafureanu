import { m as motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

/* The eager entrance (see .rise in index.css): where each variant starts from. */
const EAGER_FROM = { up: (y) => [0, y], mask: (y) => [0, y], scale: () => [0, 12], left: () => [-44, 0] };

/**
 * Scroll-into-view reveal with multiple motion languages so sections
 * don't all animate the same way. variant: "up" | "mask" | "scale" | "left".
 *
 * `eager` is for content in the first viewport of a page whose code loads
 * on demand (the heroes of service pages and case studies): the entrance
 * runs as a CSS animation from the static HTML, so the heading and lead
 * paint before any JavaScript arrives instead of waiting, invisible, for
 * the chunk and the hydration. It rises with the same timing; the mask,
 * scale and blur languages are reserved for the scroll reveals below.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  variant = "up",
  eager = false,
}) {
  if (eager) {
    const [fx, fy] = (EAGER_FROM[variant] || EAGER_FROM.up)(y);
    const style = /** @type {any} */ ({ "--rise-x": `${fx}px`, "--rise-y": `${fy}px`, "--rise-t": "0.8s", "--rise-d": `${delay}s` });
    return <div className={cn("rise", className)} style={style}>{children}</div>;
  }
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