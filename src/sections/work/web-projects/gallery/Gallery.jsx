import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BackToProjects from "@/components/work/BackToProjects";
import { cn } from "@/lib/utils";
import KineticTitle from "../KineticTitle";
import Outro from "../Outro";
import { PALETTES, asset } from "../exhibition/data";
import { cssVars } from "../exhibition/timeline";
import "../webProjects.css";

const SIZES = { desktop: [2400, 1500], detail: [2000, 1250], detail2: [2000, 1250], mobile: [780, 1688] };
const pad = (n) => String(n).padStart(2, "0");

function Shot({ id, file, alt, sizes = "100vw", className = "", priority = false }) {
  const [w, h] = SIZES[file];
  const md = file === "desktop" || file === "detail";
  return (
    <img
      src={asset(id, file)}
      srcSet={md ? `${asset(id, `${file}-md`)} 1200w, ${asset(id, file)} ${w}w` : undefined}
      sizes={md ? sizes : undefined}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-auto w-full", className)}
    />
  );
}

function Stage({ p, i, n, c, reduce }) {
  const x = c.exhibition;
  const dark = p.id === "mp-monitor";
  const views = [
    { file: "mobile", alt: p.images.mobile, caption: p.captions.mobile, cls: "is-phone" },
    { file: "detail", alt: p.images.detail, caption: p.captions.detail, cls: "is-wide" },
    ...(p.images.detail2 ? [{ file: "detail2", alt: p.images.detail2, caption: p.captions.detail2, cls: "is-wide" }] : []),
  ];
  const reveal = reduce
    ? {}
    : { initial: { opacity: 0, rotateX: 9, y: 36 }, whileInView: { opacity: 1, rotateX: 0, y: 0 }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } };
  return (
    <article className="wpg-stage" style={cssVars(PALETTES[p.id])} aria-labelledby={`wpg-${p.id}`}>
      <div className="wpg-stage-in">
        <div className="wpg-stage-text">
          <p className="wpx-num"><span>{pad(i + 1)}</span><span className="wpx-num-of">/ {pad(n)}</span></p>
          <KineticTitle as="h2" lines={p.lines} className="wpg-name" maxVw={14} availVw={88} lgMaxVw={6.2} lgAvailVw={32} factor={0.68} attrs={{ id: `wpg-${p.id}` }} />
          <p className="wpx-cat">{p.category}</p>
          <p className="wpg-line">{p.line}</p>
          <ul className="wpx-signals">{p.signals.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
          <a className="wpx-visit" href={p.url} target="_blank" rel="noopener noreferrer">
            {c.visit}
            <span className="wpx-visit-host">{p.host}</span>
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only">({c.visitHint})</span>
          </a>
        </div>
        <div>
          <motion.div className={cn("wpg-shot", dark && "wpg-shot--dark")} style={{ transformPerspective: 1200 }} {...reveal}>
            <Shot id={p.id} file="desktop" alt={p.images.desktop} sizes="(min-width: 1024px) 56vw, 92vw" />
          </motion.div>
          <ul className="wpg-strip" aria-label={x.swipe}>
            {views.map((v) => (
              <li key={v.file} className={v.cls}>
                <figure>
                  <Shot id={p.id} file={v.file} alt={v.alt} sizes="(min-width: 1024px) 420px, 78vw" />
                  <figcaption>{v.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="wpg-swipe" aria-hidden="true">{x.swipe}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * The exhibition as a vertical sequence: large typography, full-width
 * real captures with a light perspective entrance, a swipeable strip
 * of secondary views and the same closing statement. Used on touch
 * devices, tablets, narrow screens, with reduced motion and when WebGL
 * is unavailable.
 */
export default function Gallery({ lang = "es", c }) {
  const x = c.exhibition;
  const reduce = useReducedMotion();
  const dd = c.projects[0];
  const dental = c.projects[1];
  return (
    <div className="wpg">
      <header className="wpg-hero" style={cssVars(PALETTES.hero)}>
        <BackToProjects lang={lang} />
        <KineticTitle as="h1" lines={x.lines} className="wpg-title" maxVw={15} availVw={88} lgMaxVw={11} lgAvailVw={76} factor={0.66} />
        <div className="wpg-meta">
          <ul>{x.meta.map((m) => <li key={m}>{m}</li>)}</ul>
          <p>{x.lead}</p>
        </div>
        <div className="wpg-space" aria-hidden="true">
          <Shot id={dd.id} file="desktop" alt="" className="wpg-space-main" sizes="(min-width: 1024px) 52vw, 80vw" priority />
          <Shot id={dental.id} file="mobile" alt="" className="wpg-space-phone" priority />
        </div>
      </header>
      {c.projects.map((p, i) => (
        <Stage key={p.id} p={p} i={i} n={c.projects.length} c={c} reduce={reduce} />
      ))}
      <section className="wpg-statement">
        <p className="wpg-statement-text">{x.statement.map((l) => <span key={l} className="wpg-statement-line">{l}</span>)}</p>
        <p className="wpg-statement-cap">{x.capability}</p>
      </section>
      <Outro lang={lang} c={c} />
    </div>
  );
}
