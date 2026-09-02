import { useEffect, useRef } from "react";

/**
 * Flow-state cursor: a precision crosshair reticle with live X/Y
 * coordinates. Only enabled for fine pointers without reduced motion.
 * Updates the DOM directly — no React re-render per mousemove.
 */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    const el = ref.current;
    if (!el) return undefined;
    el.style.display = "block";
    const coords = el.querySelector("[data-coords]");

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (coords) {
        coords.textContent = `${String(e.clientX).padStart(4, "0")} / ${String(
          e.clientY
        ).padStart(4, "0")}`;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.style.display = "none";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ display: "none" }}
    >
      <div className="relative">
        <div className="absolute left-0 top-0 h-5 w-px -translate-y-1/2 bg-[#121212]/40" />
        <div className="absolute left-0 top-0 h-px w-5 -translate-x-1/2 bg-[#121212]/40" />
        <div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#E63946]" />
        <span
          data-coords
          className="absolute left-3 top-2 whitespace-nowrap font-mono text-[9px] tracking-wider text-[#848482]"
        >
          0000 / 0000
        </span>
      </div>
    </div>
  );
}