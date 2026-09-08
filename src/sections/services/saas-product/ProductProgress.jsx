import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MONO } from "./saasBits";

/**
 * A thin product-lifecycle indicator in the left margin (xl and up):
 * idea → product → build → launch → evolve, following the reader with
 * IntersectionObserver. It is not navigation; it just shows where the
 * product is in its story.
 */
export default function ProductProgress({ items, map, label }) {
  const [active, setActive] = useState(items[0].id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const owner = {};
    Object.entries(map).forEach(([stage, ids]) => ids.forEach((id) => { owner[id] = stage; }));
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : Infinity));
      let best = null; let top = Infinity;
      seen.forEach((t, id) => { if (t < top) { top = t; best = id; } });
      if (best && owner[best]) setActive(owner[best]);
    }, { rootMargin: "-35% 0px -50% 0px" });
    Object.keys(owner).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [map]);
  return (
    <aside aria-label={label} className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col items-center gap-5">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id} className="flex flex-col items-center gap-1.5" aria-current={on ? "step" : undefined}>
              <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full transition-colors", on ? "bg-accent" : "bg-border")} />
              <span className={cn(MONO, "[writing-mode:vertical-rl] rotate-180 transition-colors", on ? "text-accent" : "text-muted-foreground/70")}>{String(i + 1).padStart(2, "0")} · {it.label}</span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
