import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  upRight: ArrowUpRight,
  right: ArrowRight,
};

/* the label plate and the arrow piece, per size */
const LABEL = {
  lg: "px-6 py-3.5",
  md: "px-5 py-3",
  sm: "px-4 py-2",
};
const PIECE = {
  lg: "px-[15px]",
  md: "px-[13px]",
  sm: "px-[11px]",
};

/**
 * The Nafureanu action system — one reusable CTA component.
 * A segmented plate: the label, a hairline joint and a square piece that
 * holds the arrow, with two layers behind that lock in on hover (see
 * .action in index.css). variant: "primary" (cobalt) | "secondary"
 * (light glass) | "text" (quiet inline action). icon: "upRight" for
 * conversation/external actions, "right" for navigational ones.
 * Renders a router Link, or a <button> when `as="button"`.
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

  const cls = cn("action group", variant === "primary" ? "action-primary" : "action-secondary", className);
  const inner = (
    <>
      <span className={cn("action__label", LABEL[size])}>{children}</span>
      {arrow && <span className={cn("action__piece", PIECE[size])}>{arrow}</span>}
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
