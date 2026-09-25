import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion`, safe for prerendered pages. framer-motion's own
 * hook reads matchMedia during the first client render, which makes a
 * reduced-motion visitor hydrate a tree different from the static HTML.
 * This one answers `false` on the first render (matching the server) and
 * the real preference right after mount; the animations then resolve to
 * their final state instantly, as MotionConfig reducedMotion="user" does.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
