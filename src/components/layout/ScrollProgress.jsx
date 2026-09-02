import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Electric-blue progress rail pinned to the top of the viewport.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#3D7BFF] via-[#5CDBEA] to-[#8E7BFF]"
    />
  );
}