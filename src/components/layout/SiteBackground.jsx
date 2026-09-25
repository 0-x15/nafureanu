import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * A large N assembles in the centre of the viewport as the page scrolls:
 * five glass panes are its strokes, a small cobalt piece is the segment
 * of the logo. This component draws the randomness — where every pane
 * starts, how it is tilted, when it arrives, and the route the piece
 * wanders before it locks into the diagonal — fresh on every page load
 * and every navigation, and feeds the scroll progress; the motion
 * itself is CSS. Purely decorative and inert.
 *
 * The prerendered HTML and the first client render must agree, so the
 * initial scene comes from a small PRNG seeded by the pathname; once the
 * page is hydrated the browser redraws it with real randomness.
 */
function seeded(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One assembly — five strokes and the piece's route — drawn with the given random source. */
function draw(random) {
  const rnd = (min, max) => min + random() * (max - min);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  // arrival windows: a random order (Fisher–Yates, engine-independent), each stroke taking 0.18–0.3 of the scroll
  const order = [0, 1, 2, 3, 4];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const panes = order.map((slot, i) => {
    const w1 = rnd(0.18, 0.3);
    const w0 = Math.min(0.6 - w1 * 0.4, slot * 0.14 + rnd(0, 0.06));
    // start somewhere else in the viewport: a random direction, far enough to read as scattered
    const side = pick([-1, 1]);
    return {
      "--w0": w0.toFixed(3),
      "--w1": w1.toFixed(3),
      "--sx": `${(side * rnd(18, 46)).toFixed(1)}vw`,
      "--sy": `${rnd(-44, 44).toFixed(1)}vh`,
      "--sr": `${rnd(-32, 32).toFixed(1)}deg`,
    };
  });
  // the piece: four waypoints anywhere in the viewport, then the centre
  const piece = {};
  for (let i = 0; i < 4; i += 1) {
    piece[`--x${i}`] = `${rnd(-42, 42).toFixed(1)}vw`;
    piece[`--y${i}`] = `${rnd(-40, 40).toFixed(1)}vh`;
    piece[`--r${i}`] = `${rnd(-200, 200).toFixed(0)}deg`;
  }
  return { panes, piece };
}

export default function SiteBackground() {
  const ref = useRef(null);
  const { pathname } = useLocation();
  // a deterministic circuit for the static HTML, then a new random one for every page in the browser
  const [scene, setScene] = useState(() => draw(seeded(pathname)));
  useEffect(() => {
    setScene(draw(Math.random));
  }, [pathname]);

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
      // the diagonal runs from the top of the left column to the bottom of the right one
      const dx = 0.27 * window.innerWidth;
      const dy = 0.72 * window.innerHeight;
      root.style.setProperty("--diag", `${((Math.atan2(dx, dy) * 180) / Math.PI).toFixed(2)}deg`);
      root.style.setProperty("--dlen", `${(Math.hypot(dx, dy) / 2).toFixed(1)}px`);
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

  // literal class names: Tailwind keeps a component-layer rule only when it finds the class in the source
  const slots = ["fp-1", "fp-2", "fp-3", "fp-4", "fp-5"];
  const materials = ["fivo-a", "fivo-b", "fivo-a", "fivo-b", "fivo-a"];
  return (
    <div ref={ref} aria-hidden="true" className="site-canvas">
      {scene.panes.map((vars, i) => (
        <span key={`${pathname}-${i}`} className={`pane ${slots[i]}`} style={/** @type {any} */ (vars)}>
          <i className={materials[i]} />
        </span>
      ))}
      <span key={`${pathname}-n`} className="fp-n" style={/** @type {any} */ (scene.piece)}>
        <i className="fivo-n" />
      </span>
    </div>
  );
}
