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
 * An instrument rather than a button: a minimal plate with corner marks
 * that deploys on hover — segments grow out of two vertices and print a
 * mono readout at their end (see .action in index.css).
 * variant: "primary" (cobalt) | "secondary" (light glass) | "text"
 * (quiet inline action). icon: "upRight" for conversation/external
 * actions, "right" for navigational ones. Renders a router Link, or a
 * <button> when `as="button"`. Pass "action-quiet" in className for the
 * compact header plate with a quieter shadow.
 * `readout` overrides the upper readout ("01 · acción"), `hint` the lower one (the destination).
 * @param {{ to?: string, children: import("react").ReactNode, variant?: "primary" | "secondary" | "text", icon?: "upRight" | "right", size?: "lg" | "md" | "sm", className?: string, as?: "button", type?: "button" | "submit", onClick?: () => void, readout?: string, hint?: string }} props
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
  readout = undefined,
  hint = undefined,
}) {
  const Icon = ICONS[icon];

  if (variant === "text") {
    return (
      <Link to={to} className={cn("group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.005em] text-accent transition-colors hover:text-accent-deep", className)}>
        {children}
        {Icon && <Icon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", icon === "upRight" ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" : "group-hover:translate-x-[2px]")} />}
      </Link>
    );
  }

  // the readouts: the index and the action above, the real destination below
  const en = /^\/en(\/|$)/.test(to);
  const seg = to.replace(/^\/en/, "").split("/").filter(Boolean).pop() || "";
  const NAMES = en
    ? { "": "home", contact: "contact", work: "work", services: "services", about: "studio" }
    : { "": "inicio", contact: "contacto", work: "proyectos", services: "servicios", about: "estudio" };
  const dest = hint ?? NAMES[seg] ?? seg;
  const above = readout ?? (en ? "01 · action" : "01 · acción");
  const below = `→ ${dest}`;

  const quiet = /\baction-quiet\b/.test(className);
  const setCls = cn("action-set", variant === "primary" ? "action-set-primary" : "action-set-secondary", quiet && "action-set-quiet", className.replace(/\baction-quiet\b/, ""));
  const cls = cn("action group", variant === "primary" ? "action-primary" : "action-secondary", SIZES[size]);
  const inner = (
    <>
      <span>{children}</span>
      {Icon && <Icon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", icon === "upRight" ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" : "group-hover:translate-x-[2px]")} />}
    </>
  );

  return (
    <span className={setCls}>
      {as === "button" ? (
        <button type={type} onClick={onClick} className={cls}>{inner}</button>
      ) : (
        <Link to={to} className={cls}>{inner}</Link>
      )}
      <i aria-hidden="true" className="action__corner action__corner-1" />
      <i aria-hidden="true" className="action__corner action__corner-2" />
      <i aria-hidden="true" className="action__corner action__corner-3" />
      <i aria-hidden="true" className="action__corner action__corner-4" />
      <span aria-hidden="true" className="action__hud action__hud-1"><i className="diag" /><i className="line" /><b>{above}</b></span>
      {!(as === "button") && <span aria-hidden="true" className="action__hud action__hud-2"><i className="diag" /><i className="line" /><b>{below}</b></span>}
    </span>
  );
}
