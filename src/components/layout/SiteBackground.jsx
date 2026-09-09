/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * The three glass planes of the Fivo chapter on the home, carried to the
 * rest of the layout with the same material and tilts, on the site's
 * ivory. Rendered once in SiteLayout under every page; purely
 * decorative and inert. Sections with a tone of their own paint over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="fivo-a fp-1" />
      <span className="fivo-c fp-2" />
      <span className="fivo-b fp-3" />
      <span className="fivo-a fp-4" />
      <span className="fivo-b fp-5" />
      <span className="fivo-c fp-6" />
      <span className="fivo-a fp-7" />
    </div>
  );
}
