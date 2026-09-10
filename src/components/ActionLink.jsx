import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  upRight: ArrowUpRight,
  right: ArrowRight,
};

const SIZES = {
  lg: "px-7 py-3.5",
  md: "px-6 py-3",
  sm: "px-5 py-2",
};

/**
 * The Nafureanu action system — one reusable CTA component.
 * A plate with the label and the arrow on a stack of light sheets: one
 * shows at rest, two more slide out on hover (see .action-set in index.css).
 * variant: "primary" (cobalt) | "secondary" (light) | "text" (quiet
 * inline action). icon: "upRight" for conversation/external actions,
 * "right" for navigational ones. Renders a router Link, or a <button>
 * when `as="button"`. Pass "action-quiet" in className for the compact
 * header plate without layers.
 * `disabled` (button only) keeps the plate in place and stops the hover stack.
 * @param {{ to?: string, children: import("react").ReactNode, variant?: "primary" | "secondary" | "text", icon?: "upRight" | "right", size?: "lg" | "md" | "sm", className?: string, as?: "button", type?: "button" | "submit", onClick?: () => void, disabled?: boolean }} props
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
  disabled = false,
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

  // the wrapper carries the layers and any layout classes; the plate is the link itself
  const quiet = /\baction-quiet\b/.test(className);
  const setCls = cn("action-set group", variant === "primary" ? "action-set-primary" : "action-set-secondary", quiet && "action-set-quiet", disabled && "action-set-disabled", className.replace(/\baction-quiet\b/, ""));
  const cls = cn("action", variant === "primary" ? "action-primary" : "action-secondary", SIZES[size]);
  const inner = (
    <>
      {children}
      {arrow}
    </>
  );

  return (
    <span className={setCls}>
      <i aria-hidden="true" className="action__layer action__layer-3" />
      <i aria-hidden="true" className="action__layer action__layer-2" />
      <i aria-hidden="true" className="action__layer action__layer-1" />
      {as === "button" ? (
        <button type={type} onClick={onClick} disabled={disabled} aria-disabled={disabled || undefined} className={cls}>{inner}</button>
      ) : (
        <Link to={to} className={cls}>{inner}</Link>
      )}
    </span>
  );
}
