import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  upRight: ArrowUpRight,
  right: ArrowRight,
};

const SIZES = {
  lg: "px-5 py-2.5",
  md: "px-4 py-2",
  sm: "px-3.5 py-1.5",
};

/**
 * The Nafureanu action — the system drawing on the home, whole. The
 * label is a tile hanging from a guide above an isometric stack (the
 * glass engineering plate with its grid and pads, two white plates with
 * the cobalt edge, the cobalt base), with callout leaders on the left,
 * a dashed ghost tile and technical marks; on hover the stack spreads
 * upwards and the tile descends onto the plate (see .iso in index.css).
 * Renders a router Link, or a <button> when `as="button"`. variant:
 * "primary" | "secondary" | "text" (a quiet inline link). "action-quiet"
 * in className is the compact header form: the tile alone.
 * @param {{ to?: string, children: import("react").ReactNode, variant?: "primary" | "secondary" | "text", icon?: "upRight" | "right", size?: "lg" | "md" | "sm", className?: string, as?: "button", type?: "button" | "submit", onClick?: () => void }} props
 */
export default function ActionLink({
  to = "#",
  children,
  variant = "primary",
  icon = variant === "secondary" ? "right" : "upRight",
  size = "lg",
  className = "",
  as = undefined,
  type = "button",
  onClick = undefined,
}) {
  const Icon = ICONS[icon];
  const tileRef = useRef(null);
  const [w, setW] = useState(180);
  const quiet = /\baction-quiet\b/.test(className);

  // the stack follows the width of the tile
  useEffect(() => {
    if (variant === "text" || quiet) return undefined;
    const tile = tileRef.current;
    if (!tile) return undefined;
    const measure = () => setW(Math.round(tile.offsetWidth));
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(tile);
    return () => ro?.disconnect();
  }, [variant, quiet]);

  if (variant === "text") {
    return (
      <Link to={to} className={cn("group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.005em] text-accent transition-colors hover:text-accent-deep", className)}>
        {children}
        {Icon && <Icon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", icon === "upRight" ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" : "group-hover:translate-x-[2px]")} />}
      </Link>
    );
  }

  const setCls = cn("iso", variant === "secondary" && "iso-secondary", quiet && "iso-quiet", className.replace(/\baction-quiet\b/, ""));
  const tileCls = cn("iso__tile", SIZES[size]);
  const inner = (
    <>
      <span>{children}</span>
      {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
    </>
  );
  const plate = (n, pads = false) => (
    <i className={`iso__plate iso__plate-${n}`}>
      <b className="iso__edge" />
      <b className="iso__face">
        {pads && <><i className="iso__pad iso__pad-1" /><i className="iso__pad iso__pad-2" /><i className="iso__pad iso__pad-3" /></>}
      </b>
    </i>
  );

  return (
    <span className={setCls} style={/** @type {any} */ ({ "--w": `${w}px` })}>
      {as === "button" ? (
        <button ref={tileRef} type={type} onClick={onClick} className={tileCls}>{inner}</button>
      ) : (
        <Link ref={tileRef} to={to} className={tileCls}>{inner}</Link>
      )}
      <u aria-hidden="true" className="iso__drop" />
      <span aria-hidden="true" className="iso__stack">
        <i className="iso__plate iso__base"><b className="iso__edge" /><b className="iso__face" /></i>
        {plate(3)}
        {plate(2)}
        {plate(1, true)}
      </span>
      <b aria-hidden="true" className="iso__lead iso__lead-1" />
      <b aria-hidden="true" className="iso__lead iso__lead-2" />
      <b aria-hidden="true" className="iso__lead iso__lead-3" />
      <i aria-hidden="true" className="iso__ghost" />
      <i aria-hidden="true" className="iso__mark iso__mark-1" />
      <i aria-hidden="true" className="iso__mark iso__mark-2" />
      <i aria-hidden="true" className="iso__dot iso__dot-1" />
      <i aria-hidden="true" className="iso__dot iso__dot-2" />
    </span>
  );
}
