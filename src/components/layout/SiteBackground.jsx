/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * The glass of the old Fivo chapter, carried to every page: two radial
 * glows and five tall glass planes, one fixed with the viewport and four
 * along the document. Rendered once in SiteLayout under every page;
 * purely decorative and inert. Sections with a tone of their own paint
 * over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <div className="canvas-fixed">
        <span className="canvas-glow-a" />
        <span className="canvas-glow-b" />
        <span className="plane plane-f1" />
      </div>
      <span className="plane plane-tint plane-d1" />
      <span className="plane plane-d2" />
      <span className="plane plane-tint plane-d3" />
      <span className="plane plane-d4" />
    </div>
  );
}
