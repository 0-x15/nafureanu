/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * Five glass planes fixed to the viewport: the outer span is carried by
 * the page's scroll progress, the inner element holds the material, the
 * tilt and a slow drift. Rendered once in SiteLayout under every page;
 * purely decorative and inert. Sections with a tone of their own paint
 * over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="fp-1"><i className="fivo-a" /></span>
      <span className="fp-2"><i className="fivo-c" /></span>
      <span className="fp-3"><i className="fivo-b" /></span>
      <span className="fp-4"><i className="fivo-b" /></span>
      <span className="fp-5"><i className="fivo-a" /></span>
    </div>
  );
}
