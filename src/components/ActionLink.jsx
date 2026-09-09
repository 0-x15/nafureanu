import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  upRight: ArrowUpRight,
  right: ArrowRight,
};

/* plate padding per size */
const SIZES = {
  lg: "px-6 py-3.5",
  md: "px-5 py-3",
  sm: "px-4 py-2",
};

/**
 * The Nafureanu action system — one reusable CTA component.
 * A light plate built like a block of stacked sheets: a fine lamination
 * across the body, pieces sticking out of the edges that slide home on
 * hover, and two layers under the bottom edge (see .action in index.css).
 * variant: "primary" (cobalt) | "secondary" (light glass) | "text"
 * (quiet inline action). icon: "upRight" for conversation/external
 * actions, "right" for navigational ones. Renders a router Link, or a
 * <button> when `as="button"`. Pass "action-quiet" in className for the
 * compact header plate with a quieter shadow.
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
  const arrow = Icon && (
    <Icon
      aria-hidden="true"
      className={cn(
        "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        icon === "upRight"
          ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
          : "group-hover:translate-x-[2px]"
      )}
    />
  );

  if (variant === "text") {
    return (
      <Link to={to} className={cn("group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.005em] text-accent transition-colors hover:text-accent-deep", className)}>
        {children}
        {arrow}
      </Link>
    );
  }

  const cls = cn("action group", variant === "primary" ? "action-primary" : "action-secondary", SIZES[size], className);
  const inner = (
    <>
      <span aria-hidden="true" className="action__seg" />
      <span aria-hidden="true" className="action__seg" />
      <span aria-hidden="true" className="action__seg" />
      <span aria-hidden="true" className="action__seg" />
      <span className="action__label">{children}</span>
      {arrow}
    </>
  );

  if (as === "button") {
    return (
      <button type={type} onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}
