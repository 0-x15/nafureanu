/**
 * The atmosphere behind the whole site: light fields, frosted panels,
 * a halo and a tonal mist on the ivory sheet, spread along the scroll
 * (see .site-canvas in index.css). Rendered once in SiteLayout under
 * every page; purely decorative and inert. Sections with a tone of their
 * own simply paint over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="canvas-mist" />
      <span className="canvas-light-a" />
      <span className="canvas-haze" />
      <span className="canvas-glass-a" />
      <span className="canvas-plane-b" />
      <span className="canvas-shade-c" />
      <span className="canvas-glass-d" />
      <span className="canvas-band" />
      <span className="canvas-halo" />
      <span className="canvas-shade-f" />
      <span className="canvas-light-g" />
    </div>
  );
}
