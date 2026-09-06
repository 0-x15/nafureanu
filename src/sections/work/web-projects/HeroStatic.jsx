import BackToProjects from "@/components/work/BackToProjects";
import KineticTitle from "./KineticTitle";
import { PALETTES } from "./exhibition/data";
import { cssVars } from "./exhibition/timeline";
import "./webProjects.css";

/** Instant first paint while the WebGL exhibition module loads: same typography, same place. */
export default function HeroStatic({ lang = "es", c }) {
  const x = c.exhibition;
  return (
    <div className="wpx-stage wpx-stage--static" style={cssVars(PALETTES.hero)}>
      <div className="wpx-atmo" aria-hidden="true" />
      <div className="wpx-layer wpx-front">
        <div className="wpx-hero-top"><BackToProjects lang={lang} /></div>
        <KineticTitle as="h1" lines={x.lines} className="wpx-title" />
        <div className="wpx-hero-meta">
          <ul>{x.meta.map((m) => <li key={m}>{m}</li>)}</ul>
          <p>{x.lead}</p>
        </div>
      </div>
    </div>
  );
}
