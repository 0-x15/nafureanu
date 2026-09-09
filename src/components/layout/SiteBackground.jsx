import { useEffect, useRef } from "react";

/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * A large invisible N on the right half of the viewport: the cobalt
 * piece travels its strokes as the page scrolls and five glass panes
 * assemble each stroke as it passes. This component only feeds two
 * custom properties — the scroll progress and the diagonal's angle for
 * the current viewport; the motion itself is CSS. Rendered once in
 * SiteLayout under every page; purely decorative and inert.
 */
export default function SiteBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const progress = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--p", reduced ? "1" : p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(progress); };
    const onResize = () => {
      const deg = (Math.atan2(0.365 * window.innerWidth, 0.72 * window.innerHeight) * 180) / Math.PI;
      root.style.setProperty("--diag", `${deg.toFixed(2)}deg`);
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="site-canvas">
      <span className="fp-1"><i className="fivo-a" /></span>
      <span className="fp-2"><i className="fivo-b" /></span>
      <span className="fp-3"><i className="fivo-a" /></span>
      <span className="fp-4"><i className="fivo-b" /></span>
      <span className="fp-5"><i className="fivo-a" /></span>
      <span className="fp-n"><i className="fivo-n" /></span>
    </div>
  );
}
