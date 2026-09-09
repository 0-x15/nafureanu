/**
 * The canvas behind the whole site — see .site-canvas in index.css.
 * One large-format abstract piece in the upper part of the page (veils
 * of light, two blurred ribbons with their ghost lines, a masked
 * technical trama, a frosted haze) dissolving into a quiet lower page.
 * Rendered once in SiteLayout under every page; purely decorative and
 * inert. Sections with a tone of their own paint over it.
 */
const COBALT = "#3157F6";
const CYAN = "#149FB8";
const INK = "#1B1F2A";

export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-canvas">
      <span className="canvas-mist" />

      <div className="canvas-top">
        <span className="canvas-veils" />
        <span className="canvas-trama" />
        <svg className="canvas-ribbons" viewBox="0 0 1440 1800" preserveAspectRatio="xMidYMin meet">
          <defs>
            {/* ribbon 1: cobalt rising into cyan, gone at both ends */}
            <linearGradient id="bg-r1" gradientUnits="userSpaceOnUse" x1="-100" y1="1000" x2="1540" y2="120">
              <stop offset="0" stopColor={COBALT} stopOpacity="0" />
              <stop offset="0.3" stopColor={COBALT} stopOpacity="0.2" />
              <stop offset="0.62" stopColor={CYAN} stopOpacity="0.17" />
              <stop offset="1" stopColor={CYAN} stopOpacity="0" />
            </linearGradient>
            {/* ribbon 2: cyan drifting down into cobalt */}
            <linearGradient id="bg-r2" gradientUnits="userSpaceOnUse" x1="-100" y1="420" x2="1540" y2="1480">
              <stop offset="0" stopColor={CYAN} stopOpacity="0" />
              <stop offset="0.32" stopColor={CYAN} stopOpacity="0.13" />
              <stop offset="0.7" stopColor={COBALT} stopOpacity="0.14" />
              <stop offset="1" stopColor={COBALT} stopOpacity="0" />
            </linearGradient>
            {/* ghost lines along the gestures */}
            <linearGradient id="bg-l1" gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="1540" y2="0">
              <stop offset="0" stopColor={COBALT} stopOpacity="0" />
              <stop offset="0.35" stopColor={COBALT} stopOpacity="0.26" />
              <stop offset="0.7" stopColor={COBALT} stopOpacity="0.2" />
              <stop offset="1" stopColor={COBALT} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bg-l2" gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="1540" y2="0">
              <stop offset="0" stopColor={CYAN} stopOpacity="0" />
              <stop offset="0.4" stopColor={CYAN} stopOpacity="0.22" />
              <stop offset="1" stopColor={CYAN} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ribbon 2 sits behind: a wide drift from the upper left down to the right */}
          <path className="ribbon ribbon-2" d="M-140 380 C 220 420, 440 780, 780 880 C 1120 980, 1320 1220, 1580 1440 L 1580 1560 C 1300 1320, 1090 1080, 750 990 C 410 900, 190 540, -140 500 Z" fill="url(#bg-r2)" />
          {/* ribbon 1: the main gesture, rising through the hero's right */}
          <path className="ribbon" d="M-140 980 C 280 900, 520 600, 820 520 C 1120 440, 1320 240, 1580 40 L 1580 230 C 1340 400, 1170 570, 870 650 C 570 730, 320 1060, -140 1140 Z" fill="url(#bg-r1)" />

          {/* ghost lines: the same gestures, drawn as hairlines */}
          <path d="M-140 950 C 280 870, 520 570, 820 490 C 1120 410, 1320 210, 1580 10" fill="none" stroke="url(#bg-l1)" strokeWidth="1.2" />
          <path d="M-140 1170 C 300 1090, 560 780, 900 690 C 1200 610, 1380 420, 1580 260" fill="none" stroke="url(#bg-l1)" strokeWidth="1" strokeOpacity="0.7" />
          <path d="M-140 350 C 220 390, 440 750, 780 850 C 1120 950, 1320 1190, 1580 1410" fill="none" stroke="url(#bg-l2)" strokeWidth="1" />
          {/* technical marks: a wide arc and one long straight, barely there */}
          <circle cx="1120" cy="560" r="680" fill="none" stroke={COBALT} strokeOpacity="0.055" strokeWidth="1" />
          <line x1="-140" y1="1500" x2="1580" y2="300" stroke={INK} strokeOpacity="0.045" strokeWidth="1" />
        </svg>
        <span className="canvas-haze" />
      </div>

      <span className="canvas-mid" />
      <span className="canvas-foot" />
    </div>
  );
}
