/**
 * The canvas behind the whole site: seven large rectangular planes on the
 * ivory sheet, placed along the scroll (see .site-canvas in index.css).
 * Rendered once in SiteLayout under every page; purely decorative and
 * inert. Sections with a tone of their own simply paint over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="canvas-a" />
      <span className="canvas-b" />
      <span className="canvas-c" />
      <span className="canvas-d" />
      <span className="canvas-e" />
      <span className="canvas-f" />
      <span className="canvas-g" />
    </div>
  );
}
