/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * Frosted slabs floating at two depths: a fixed layer (light fields and
 * three slabs that stay with the viewport, so every page and every
 * scroll position carries the atmosphere) and a document layer of seven
 * slabs placed along the scroll. Rendered once in SiteLayout under
 * every page; purely decorative and inert. Sections with a tone of their
 * own paint over it.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <div className="canvas-fixed">
        <span className="canvas-mist" />
        <span className="canvas-light-a" />
        <span className="canvas-light-b" />
        <span className="slab slab-f1" />
        <span className="slab slab-cyan slab-f2" />
        <span className="slab slab-faint slab-f3" />
      </div>
      <span className="slab slab-blue slab-d1" />
      <span className="slab slab-faint slab-d2" />
      <span className="slab slab-cyan slab-d3" />
      <span className="slab slab-d4" />
      <span className="slab slab-blue slab-d5" />
      <span className="slab slab-faint slab-d6" />
      <span className="slab slab-cyan slab-d7" />
    </div>
  );
}
