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
 * variant: "primary" (multi-tone cobalt material) | "secondary"
 * (light structural button) | "text" (quiet inline action).
 * icon: "upRight" for conversation/external actions, "right" for
 * navigational actions. Icon defaults match the variant.
 */
export default function ActionLink({
  to,
  children,
  variant = "primary",
  icon = variant === "secondary" ? "right" : "upRight",
  size = "lg",
  className,
}) {
  const Icon = ICONS[icon];
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium tracking-[-0.005em]",
        variant === "primary" && "action-primary text-accent-foreground",
        variant === "secondary" && "action-secondary",
        variant === "text" &&
          "text-accent transition-colors hover:text-accent-deep",
        variant !== "text" && SIZES[size],
        className
      )}
    >
      {children}
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            icon === "upRight"
              ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              : "group-hover:translate-x-[2px]"
          )}
        />
      )}
    </Link>
  );
}