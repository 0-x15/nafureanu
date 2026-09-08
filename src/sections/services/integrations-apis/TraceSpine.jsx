import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MONO } from "./intBits";

/**
 * The page's own progress is not a menu but a trace: a packet descends a
 * vertical line as the visitor scrolls, and the label beside it names the
 * state of the data in the act on screen. Decorative, hidden below xl.
 */
export default function TraceSpine({ c, map, articleId }) {
  const [p, setP] = useState(0);
  const [state, setState] = useState("manual");
  const reduced = useReducedMotion();

  useEffect(() => {
    const art = document.getElementById(articleId);
    if (!art) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = art.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [articleId]);

  useEffect(() => {
    const els = Object.entries(map).flatMap(([s, ids]) => ids.map((id) => ({ s, el: document.getElementById(id) }))).filter((x) => x.el);
    if (!els.length) return undefined;
    const io = new IntersectionObserver((list) => {
      list.forEach((e) => { if (e.isIntersecting) { const hit = els.find((x) => x.el === e.target); if (hit) setState(hit.s); } });
    }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((x) => io.observe(x.el));
    return () => io.disconnect();
  }, [map]);

  return (
    <aside aria-hidden="true" className="pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-center gap-2">
        <span className={cn(MONO, "text-[9px] text-muted-foreground [writing-mode:vertical-rl]")}>{c.trace}</span>
        <span className={cn(MONO, "text-[9px] text-foreground/60 [writing-mode:vertical-rl]")}>{c.source}</span>
        <div className="relative h-[30vh] w-px bg-foreground/15">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40 bg-white" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-foreground/40 bg-white" />
          <span className="absolute left-0 top-0 w-px bg-accent" style={{ height: `${p * 100}%` }} />
          <span className={cn("absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center", !reduced && "transition-[top] duration-150 ease-out")} style={{ top: `${p * 100}%` }}>
            <i className="block h-2.5 w-2.5 rounded-[2px] bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" />
            <span className={cn(MONO, "absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] text-accent [writing-mode:vertical-rl] rotate-180")}>{c.states[state]}</span>
          </span>
        </div>
        <span className={cn(MONO, "text-[9px] text-foreground/60 [writing-mode:vertical-rl]")}>{c.destination}</span>
      </div>
    </aside>
  );
}
