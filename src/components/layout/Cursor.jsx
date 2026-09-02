import { useEffect, useRef } from "react";
import { STRINGS } from "@/i18n";

/**
 * Contextual precision cursor: a blue reticle with live X/Y coordinates.
 * Reacts to [data-cursor] targets — "view" and "start" expand the ring
 * into a labelled state, "node" highlights architecture nodes.
 * Fine pointers only, disabled under reduced motion. Direct DOM updates —
 * no React re-render per mousemove.
 */
export default function Cursor({ lang = "es" }) {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    const el = ref.current;
    if (!el) return undefined;
    el.style.display = "block";
    const ring = el.querySelector("[data-ring]");
    const label = el.querySelector("[data-label]");
    const coords = el.querySelector("[data-coords]");
    const L = STRINGS[lang].cursor;

    let mode = "";
    const apply = (m) => {
      if (m === mode || !ring || !label) return;
      mode = m;
      if (!m) {
        ring.style.transform = "translate(-50%, -50%) scale(1)";
        ring.style.borderColor = "rgba(61,123,255,0.75)";
        ring.style.backgroundColor = "rgba(61,123,255,0)";
        label.textContent = "";
        label.style.opacity = "0";
        label.style.color = "#F0EFEA";
      } else if (m === "node") {
        ring.style.transform = "translate(-50%, -50%) scale(1.8)";
        ring.style.borderColor = "rgba(92,219,234,0.9)";
        ring.style.backgroundColor = "rgba(92,219,234,0.08)";
        label.textContent = L.node;
        label.style.opacity = "1";
        label.style.color = "#5CDBEA";
      } else {
        ring.style.transform = "translate(-50%, -50%) scale(2.6)";
        ring.style.borderColor = "rgba(61,123,255,0)";
        ring.style.backgroundColor = "rgba(61,123,255,0.92)";
        label.textContent = L[m] || "";
        label.style.opacity = "1";
        label.style.color = "#F0EFEA";
      }
    };

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (coords) {
        coords.textContent = `${String(e.clientX).padStart(4, "0")} / ${String(
          e.clientY
        ).padStart(4, "0")}`;
      }
      const t =
        e.target && e.target.closest ? e.target.closest("[data-cursor]") : null;
      apply(t ? t.dataset.cursor : "");
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.style.display = "none";
    };
  }, [lang]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ display: "none" }}
    >
      <div className="relative">
        {/* Crosshair guides */}
        <div className="absolute left-0 top-0 h-6 w-px -translate-y-1/2 bg-[#8A93A6]/30" />
        <div className="absolute left-0 top-0 h-px w-6 -translate-x-1/2 bg-[#8A93A6]/30" />
        {/* State ring */}
        <div
          data-ring
          className="absolute left-0 top-0 h-9 w-9 rounded-full border"
          style={{
            transform: "translate(-50%, -50%) scale(1)",
            borderColor: "rgba(61,123,255,0.75)",
            transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.22s, background-color 0.22s",
          }}
        />
        {/* Contextual label */}
        <span
          data-label
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{ opacity: 0, transition: "opacity 0.18s" }}
        />
        {/* Center dot */}
        <div className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5CDBEA]" />
        <span
          data-coords
          className="absolute left-4 top-3 whitespace-nowrap font-mono text-[9px] tracking-wider text-[#8A93A6]"
        >
          0000 / 0000
        </span>
      </div>
    </div>
  );
}