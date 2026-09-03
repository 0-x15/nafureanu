import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * One functional domain of the connected system panel. A focusable
 * surface (keyboard and touch reach the same emphasis as hover): the
 * architectural number, title and descriptor, the enterprise-style
 * microvisual, the approved micro-tags and the explanation — always
 * readable, only emphasised by interaction. `state` comes from the
 * panel: "idle" | "active" | "related" | "muted".
 */
const CrmCentralModule = forwardRef(
  /**
   * @param {{
   *   item: any;
   *   state?: "idle" | "active" | "related" | "muted";
   *   onEngage?: () => void;
   *   onRelease?: () => void;
   *   className?: string;
   *   children?: import("react").ReactNode;
   * }} props
   * @param {import("react").ForwardedRef<HTMLElement>} ref
   */
  function CrmCentralModule(
    { item, state = "idle", onEngage, onRelease, className = "", children },
    ref
  ) {
  const titleId = `crm-central-${item.id}`;
  const active = state === "active";

  return (
    <article
      ref={ref}
      tabIndex={0}
      aria-labelledby={titleId}
      onMouseEnter={onEngage}
      onMouseLeave={onRelease}
      onFocus={onEngage}
      onBlur={onRelease}
      className={cn(
        "group relative flex h-full flex-col rounded-lg border bg-white p-4 outline-none transition-[border-color,box-shadow,opacity,transform] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFBF8] md:p-5",
        state === "idle" &&
          "border-border shadow-[0_1px_2px_rgba(12,18,32,0.04)]",
        state === "active" &&
          "-translate-y-px border-accent/60 shadow-[0_22px_48px_-28px_rgba(49,87,246,0.45),0_1px_2px_rgba(12,18,32,0.04)]",
        state === "related" &&
          "border-accent/35 shadow-[0_1px_2px_rgba(12,18,32,0.04)]",
        state === "muted" && "border-border opacity-60",
        className
      )}
    >
      <header className="flex items-baseline gap-2.5">
        <span className="font-mono text-[10px] text-accent">{item.num}</span>
        <h3
          id={titleId}
          className="font-heading text-base font-bold tracking-[-0.01em] text-foreground md:text-lg"
        >
          {item.title}
        </h3>
      </header>
      <p
        className={cn(
          "mt-1 text-xs transition-colors duration-300",
          active ? "text-foreground/80" : "text-muted-foreground"
        )}
      >
        {item.descriptor}
      </p>

      {/* Microvisual — decorative fragment of the real system */}
      {children && (
        <div aria-hidden="true" className="mt-4">
          {children}
        </div>
      )}

      {item.tags && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className={cn(
                "rounded-sm border px-1.5 py-0.5 text-[10px] leading-tight transition-colors duration-300",
                active
                  ? "border-accent/30 text-foreground/75"
                  : "border-border/80 text-muted-foreground"
              )}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <p
        className={cn(
          "mt-3 text-[12.5px] leading-relaxed transition-colors duration-300",
          active ? "text-foreground/85" : "text-muted-foreground"
        )}
      >
        {item.detail}
      </p>
    </article>
  );
  }
);

export default CrmCentralModule;
