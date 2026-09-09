/**
 * The atmosphere behind the whole site — see .site-canvas in index.css.
 * Four scenes along the scroll: soft cobalt/cyan light fields, flowing
 * curves and a ghostly sweep (SVG with gradient strokes that fade at both
 * ends), near-invisible structural lines, a couple of shades and two
 * frosted surfaces. Rendered once in SiteLayout under every page; purely
 * decorative and inert. Sections with a tone of their own paint over it.
 */
const COBALT = "#3157F6";
const CYAN = "#149FB8";
const INK = "#1B1F2A";

/** A stroke gradient that fades in and out along the drawing's width. */
function Fade({ id, color, peak, x1 = 0, x2 = 1 }) {
  return (
    <linearGradient id={id} gradientUnits="objectBoundingBox" x1={x1} y1="0" x2={x2} y2="0">
      <stop offset="0" stopColor={color} stopOpacity="0" />
      <stop offset="0.35" stopColor={color} stopOpacity={peak} />
      <stop offset="0.65" stopColor={color} stopOpacity={peak} />
      <stop offset="1" stopColor={color} stopOpacity="0" />
    </linearGradient>
  );
}

export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="canvas-mist" />

      {/* scene A */}
      <div className="canvas-a">
        <svg viewBox="0 0 1560 1320" preserveAspectRatio="none">
          <defs>
            <Fade id="bgA1" color={COBALT} peak="0.26" />
            <Fade id="bgA2" color={COBALT} peak="0.16" />
            <Fade id="bgA3" color={CYAN} peak="0.2" />
            <Fade id="bgAs" color={COBALT} peak="0.11" />
          </defs>
          {/* the sweep: one wide, blurred curve */}
          <path className="sweep" d="M-60 1040 C 300 860, 560 1120, 900 700 S 1400 260, 1660 320" fill="none" stroke="url(#bgAs)" strokeWidth="150" strokeLinecap="round" />
          {/* flowing lines */}
          <path d="M-60 1000 C 320 820, 560 1080, 900 660 S 1380 220, 1660 280" fill="none" stroke="url(#bgA1)" strokeWidth="1.3" />
          <path d="M-60 1060 C 340 880, 600 1150, 940 740 S 1420 300, 1660 360" fill="none" stroke="url(#bgA2)" strokeWidth="1.1" />
          <path d="M-60 940 C 300 760, 520 1000, 860 600 S 1340 160, 1660 200" fill="none" stroke="url(#bgA3)" strokeWidth="1" />
          {/* structure: a long straight line and a wide arc, barely there */}
          <line x1="120" y1="1320" x2="1560" y2="120" stroke={INK} strokeOpacity="0.055" strokeWidth="1" />
          <circle cx="1040" cy="560" r="620" fill="none" stroke={COBALT} strokeOpacity="0.05" strokeWidth="1" />
        </svg>
      </div>
      <span className="canvas-glass-a" />

      {/* scene B */}
      <div className="canvas-b">
        <svg viewBox="0 0 1480 1160" preserveAspectRatio="none">
          <defs>
            <Fade id="bgB1" color={COBALT} peak="0.22" />
            <Fade id="bgB2" color={CYAN} peak="0.16" />
            <Fade id="bgBs" color={COBALT} peak="0.09" />
          </defs>
          <path className="sweep" d="M-80 300 C 300 200, 520 640, 900 560 S 1360 260, 1560 420" fill="none" stroke="url(#bgBs)" strokeWidth="170" strokeLinecap="round" />
          <path d="M-80 260 C 300 160, 520 600, 900 520 S 1360 220, 1560 380" fill="none" stroke="url(#bgB1)" strokeWidth="1.2" />
          <path d="M-80 340 C 320 240, 560 700, 940 620 S 1400 320, 1560 480" fill="none" stroke="url(#bgB2)" strokeWidth="1" />
          <line x1="-80" y1="900" x2="1560" y2="560" stroke={INK} strokeOpacity="0.05" strokeWidth="1" />
          <line x1="-80" y1="990" x2="1560" y2="650" stroke={INK} strokeOpacity="0.035" strokeWidth="1" />
        </svg>
      </div>
      <span className="canvas-shade-b" />
      <span className="canvas-glass-b" />

      {/* scene C */}
      <div className="canvas-c">
        <span className="band" />
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
          <defs>
            <Fade id="bgC1" color={COBALT} peak="0.2" />
            <Fade id="bgC2" color={CYAN} peak="0.15" />
          </defs>
          <path d="M-40 520 C 300 420, 620 700, 980 560 S 1400 340, 1640 440" fill="none" stroke="url(#bgC1)" strokeWidth="1.2" />
          <path d="M-40 600 C 320 500, 660 780, 1020 640 S 1440 420, 1640 520" fill="none" stroke="url(#bgC2)" strokeWidth="1" />
          <line x1="-40" y1="300" x2="1640" y2="120" stroke={INK} strokeOpacity="0.045" strokeWidth="1" />
          <line x1="-40" y1="380" x2="1640" y2="200" stroke={INK} strokeOpacity="0.03" strokeWidth="1" />
        </svg>
      </div>
      <span className="canvas-halo" />
      <span className="canvas-shade-c" />

      {/* scene D */}
      <div className="canvas-d">
        <svg viewBox="0 0 1500 960" preserveAspectRatio="none">
          <defs>
            <Fade id="bgD1" color={COBALT} peak="0.18" />
          </defs>
          <path d="M-40 700 C 300 560, 640 820, 1000 620 S 1360 380, 1540 460" fill="none" stroke="url(#bgD1)" strokeWidth="1.2" />
          <circle cx="1000" cy="560" r="520" fill="none" stroke={COBALT} strokeOpacity="0.045" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
