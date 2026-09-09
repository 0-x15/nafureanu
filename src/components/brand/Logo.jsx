import { cn } from "@/lib/utils";

/**
 * Nafureanu brand — the Structural N.
 *
 * Two columns and a diagonal cut into three pieces by two joints. The joints
 * start exactly where the diagonal leaves each column face, so the middle
 * piece is the free span between the columns: that piece is the cobalt one.
 * Geometry lives on a 64-unit grid; the static files in /public/brand are
 * generated from the same construction.
 *
 * Columns inherit `currentColor`; the piece uses the accent token, so the
 * mark follows the surrounding text colour (foreground, white on dark).
 */
const TOP = "M0 0L18 0L27.87 13.73L16 22.26L16 64L0 64Z";
const MID = "M18.04 25.1L29.91 16.57L45.96 38.9L34.09 47.43Z";
const BOTTOM = "M64 64L46 64L36.13 50.27L48 41.74L48 0L64 0Z";

/**
 * The symbol on its own. `size` is the rendered height (px number or any CSS length; width is equal).
 * Pass `title` to expose it as an image; otherwise it is decorative.
 * @param {{ size?: number | string, className?: string, title?: string, mono?: boolean, style?: Record<string, any> }} props
 */
export function LogoSymbol({ size = 24, className = "", title = undefined, mono = false, style = {} }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size, ...style }}
    >
      {title && <title>{title}</title>}
      <path fill="currentColor" d={TOP} />
      <path fill={mono ? "currentColor" : "hsl(var(--accent))"} d={MID} />
      <path fill="currentColor" d={BOTTOM} />
    </svg>
  );
}

/**
 * Symbol + wordmark in one line, for the header. `--wm` is the wordmark
 * font size; the symbol is scaled to sit against the cap height with a
 * touch of overshoot (1.22×), which is how it reads as one word.
 */
export function LogoInline({ className = "", wordClassName = "" }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.55em] font-heading font-bold tracking-[-0.02em] text-foreground", className)}>
      <LogoSymbol size="1.22em" />
      <span className={wordClassName}>Nafureanu</span>
    </span>
  );
}

/**
 * The horizontal lockup: symbol on the left, wordmark and the line
 * "Software Engineering" on the right, the text block as tall as the symbol.
 * Proportions mirror /public/brand/logo-lockup.svg. The vertical offsets
 * come from Satoshi's metrics (ascender 1.01, cap height 0.731, line-height 1):
 * the wordmark cap top meets the symbol top, the subtitle baseline meets its bottom.
 * `size` is the wordmark font size (any CSS length).
 */
export function LogoLockup({ size = "48px", className = "", subtitle = "Software Engineering" }) {
  return (
    <span className={cn("inline-flex items-start text-foreground", className)} style={/** @type {any} */ ({ "--wm": size, gap: "calc(var(--wm) * 0.4125)" })}>
      <LogoSymbol size="calc(var(--wm) * 1.2)" />
      <span className="flex flex-col" style={{ marginTop: "calc(var(--wm) * -0.154)" }}>
        <span className="block font-heading font-bold leading-none tracking-[-0.02em] [font-kerning:normal]" style={{ fontSize: "var(--wm)" }}>Nafureanu</span>
        <span className="block font-heading font-medium uppercase leading-none tracking-[0.22em] text-[#4A5164]" style={{ fontSize: "calc(var(--wm) * 0.2825)", marginTop: "calc(var(--wm) * 0.103)" }}>{subtitle}</span>
      </span>
    </span>
  );
}
