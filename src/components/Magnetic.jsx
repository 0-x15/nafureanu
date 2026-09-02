import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Magnetic hover: element is gently pulled toward the cursor.
 * No effect on touch devices (no mouse events) or reduced motion.
 */
export default function Magnetic({ children, className, strength = 0.25 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
}