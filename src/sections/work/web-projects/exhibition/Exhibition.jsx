import { Component, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight } from "lucide-react";
import BackToProjects from "@/components/work/BackToProjects";
import { cn } from "@/lib/utils";
import KineticTitle from "../KineticTitle";
import Outro from "../Outro";
import Scene from "./Scene";
import { DURATION, PALETTES, activeIndex, projectAnchor } from "./data";
import { buildTimeline, cssVars, initialStates } from "./timeline";
import "../webProjects.css";

gsap.registerPlugin(ScrollTrigger);

/** If WebGL fails at runtime the page falls back to the DOM gallery. */
class SceneBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFallback?.(); }
  render() { return this.state.failed ? null : this.props.children; }
}

const pad = (n) => String(n).padStart(2, "0");

/**
 * The immersive exhibition (desktop, fine pointer, motion allowed,
 * WebGL available): a sticky stage the visitor travels through with
 * the scroll — kinetic title, four project scenes that hand over to
 * each other, a receding corridor and the closing statement — with one
 * GSAP timeline driving typography, atmosphere and the WebGL surfaces.
 */
export default function Exhibition({ lang = "es", c, onFallback = undefined }) {
  const x = c.exhibition;
  const S = useMemo(() => initialStates(), []);
  const stage = useRef({ velocity: 0, bend: 0 }).current;
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const atmoRef = useRef(null);
  const cursorRef = useRef(null);
  const lenisRef = useRef(null);
  const [active, setActive] = useState(-1);
  const [canvasOn, setCanvasOn] = useState(true);
  const [hover, setHover] = useState(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const stageEl = stageRef.current;
    if (!container || !stageEl) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      buildTimeline(tl, S, gsap.utils.selector(stageEl), stageEl);
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => {
          stage.velocity = self.getVelocity();
          const i = activeIndex(self.progress * DURATION);
          setActive((prev) => (prev === i ? prev : i));
        },
      });
    }, container);
    const io = new IntersectionObserver(([entry]) => setCanvasOn(entry.isIntersecting), { threshold: 0 });
    io.observe(container);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      io.disconnect();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [S, stage]);

  /* Pointer: the cursor label follows with inertia; the atmosphere drifts a little. */
  useEffect(() => {
    const el = cursorRef.current;
    const atmo = atmoRef.current;
    if (!el || !atmo) return undefined;
    const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    const ax = gsap.quickTo(atmo, "xPercent", { duration: 1.4, ease: "power2" });
    const ay = gsap.quickTo(atmo, "yPercent", { duration: 1.4, ease: "power2" });
    const move = (e) => {
      qx(e.clientX);
      qy(e.clientY);
      ax((e.clientX / window.innerWidth - 0.5) * -3);
      ay((e.clientY / window.innerHeight - 0.5) * -2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const goTo = useCallback((i) => {
    const container = containerRef.current;
    if (!container) return;
    const top = container.getBoundingClientRect().top + window.scrollY;
    const dist = container.offsetHeight - window.innerHeight;
    const y = top + (projectAnchor(i) / DURATION) * dist;
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleHover = useCallback((def) => {
    setHover(def ? def.id : null);
    document.body.style.cursor = def ? "pointer" : "";
  }, []);
  const handleOpen = useCallback(
    (def) => {
      const p = c.projects.find((pr) => pr.id === def.id);
      if (p) window.open(p.url, "_blank", "noopener,noreferrer");
    },
    [c.projects]
  );
  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  return (
    <>
      <div ref={containerRef} className="wpx" style={{ height: `${(1 + DURATION) * 100}vh` }}>
        <div ref={stageRef} className="wpx-stage" style={cssVars(PALETTES.hero)}>
          <div ref={atmoRef} className="wpx-atmo" aria-hidden="true" />
          <div className="wpx-noise" aria-hidden="true" />

          {/* Back layer: monumental project names, partly behind the surfaces */}
          <div className="wpx-layer" aria-hidden="true">
            {c.projects.map((p, i) => (
              <KineticTitle key={p.id} as="div" lines={p.lines} className="wpx-name" maxVw={6.8} availVw={34} factor={0.68} lineAttr="data-line" attrs={{ "data-name": i }} />
            ))}
          </div>

          <div className="wpx-canvas">
            <SceneBoundary onFallback={onFallback}>
              <Scene S={S} stage={stage} active={canvasOn} onHover={handleHover} onOpen={handleOpen} />
            </SceneBoundary>
          </div>

          {/* Front layer: hero, project information, rail, progress, statement */}
          <div className="wpx-layer wpx-front">
            <div data-hero>
              <div className="wpx-hero-top" data-hero-ui>
                <BackToProjects lang={lang} />
              </div>
              <KineticTitle as="h1" lines={x.lines} className="wpx-title" lineAttr="data-hero-line" />
              <div className="wpx-hero-meta" data-hero-ui>
                <ul>{x.meta.map((m) => <li key={m}>{m}</li>)}</ul>
                <p>{x.lead}</p>
              </div>
              <p className="wpx-hint" data-hero-ui><span>{x.scroll}</span><i aria-hidden="true" /></p>
            </div>

            <section aria-label={x.stageLabel}>
              {c.projects.map((p, i) => (
                <article key={p.id} className="wpx-info" data-info={i} aria-labelledby={`wpx-${p.id}`}>
                  <h2 id={`wpx-${p.id}`} className="sr-only">{p.name}</h2>
                  <p className="wpx-num" data-item><span>{pad(i + 1)}</span><span className="wpx-num-of">/ {pad(c.projects.length)}</span></p>
                  <p className="wpx-cat" data-item>{p.category}</p>
                  <div className="wpx-detail">
                    <p className="wpx-line" data-item>{p.line}</p>
                    <ul className="wpx-signals" data-item>{p.signals.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
                    <a
                      data-item
                      className="wpx-visit"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onFocus={() => { if (active !== i) goTo(i); }}
                    >
                      {c.visit}
                      <span className="wpx-visit-host">{p.host}</span>
                      <ArrowUpRight aria-hidden="true" />
                      <span className="sr-only">({c.visitHint})</span>
                    </a>
                  </div>
                </article>
              ))}

              <nav className="wpx-rail" aria-label={x.railLabel} data-exhibit-ui>
                <ol>
                  {c.projects.map((p, i) => (
                    <li key={p.id}>
                      <button type="button" className={cn(active === i && "is-active")} aria-current={active === i ? "step" : undefined} onClick={() => goTo(i)}>
                        <span className="wpx-rail-num">{pad(i + 1)}</span>
                        <span className="wpx-rail-name">{p.short}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="wpx-progress" data-exhibit-ui aria-hidden="true">
                <span>01</span>
                <span className="wpx-progress-track"><span className="wpx-progress-fill" data-progress-fill /></span>
                <span>{pad(c.projects.length)}</span>
              </div>
            </section>

            <div className="wpx-statement">
              <p className="wpx-statement-text">
                {x.statement.map((l) => <span key={l} className="wpx-statement-line" data-statement-line>{l}</span>)}
              </p>
              <p className="wpx-statement-cap" data-statement-cap>{x.capability}</p>
            </div>
          </div>

          <div ref={cursorRef} className={cn("wpx-cursor", hover && "is-on")} aria-hidden="true">
            <span className="wpx-cursor-in">{x.cursor} <ArrowUpRight /></span>
          </div>
        </div>
      </div>
      <Outro lang={lang} c={c} />
    </>
  );
}
