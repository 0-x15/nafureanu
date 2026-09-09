/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * The system assembling: five glass panes and one cobalt piece, fixed to
 * the viewport, scattered at the top of the page, ordered into a deck of
 * layers by the middle and folded into one pane at the end, where the
 * piece locks in. Rendered once in SiteLayout under every page; purely
 * decorative and inert. Sections with a tone of their own paint over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="fp-1"><i className="fivo-a" /></span>
      <span className="fp-2"><i className="fivo-c" /></span>
      <span className="fp-3"><i className="fivo-b" /></span>
      <span className="fp-4"><i className="fivo-a" /></span>
      <span className="fp-5"><i className="fivo-b" /></span>
      <span className="fp-n"><i className="fivo-n" /></span>
    </div>
  );
}
