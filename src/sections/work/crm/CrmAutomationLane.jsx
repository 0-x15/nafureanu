import { cn } from "@/lib/utils";

/**
 * One automation lane of the engine panel: the identification on the
 * left (cobalt number seated on the spine, title, description and an
 * optional note) and the live process visualisation on the right. The
 * lane is focusable, so keyboard users reach the same execution state
 * as hover. `state`: "idle" | "active" | "dim".
 *
 * @param {{
 *   module: any;
 *   state?: "idle" | "active" | "dim";
 *   onEngage?: () => void;
 *   onRelease?: () => void;
 *   children?: import("react").ReactNode;
 * }} props
 */
export default function CrmAutomationLane({
  module,
  state = "idle",
  onEngage,
  onRelease,
  children,
}) {
  const titleId = `crm-auto-${module.id}`;
  const active = state === "active";

  return (
    <article
      tabIndex={0}
      aria-labelledby={titleId}
      onMouseEnter={onEngage}
      onMouseLeave={onRelease}
      onFocus={onEngage}
      onBlur={onRelease}
      className={cn(
        "relative grid gap-5 border-t border-white/[0.08] px-5 py-6 outline-none transition-[opacity,background-color] duration-300 first:border-t-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3157F6]/60 md:px-6 md:py-7 lg:grid-cols-[minmax(0,34%)_minmax(0,1fr)] lg:gap-10",
        active && "bg-white/[0.035]",
        state === "dim" && "opacity-75"
      )}
    >
      <div className="flex items-start gap-4">
        {/* The number sits on the automation spine */}
        <span
          className={cn(
            "relative z-10 mt-0.5 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border bg-[#121A29] px-1.5 font-mono text-[10px] transition-colors duration-300",
            active
              ? "border-[#3157F6] text-[#8FA5E8]"
              : "border-white/15 text-[#5B84FF]"
          )}
        >
          {module.num}
        </span>
        <div className="min-w-0">
          <h3
            id={titleId}
            className="font-heading text-lg font-bold tracking-[-0.01em] text-white md:text-xl"
          >
            {module.title}
          </h3>
          <p
            className={cn(
              "mt-2 max-w-md text-sm leading-relaxed transition-colors duration-300",
              active ? "text-white/80" : "text-white/60"
            )}
          >
            {module.text}
          </p>
          {module.note && (
            <p className="mt-3 max-w-md border-l border-[#3157F6]/60 pl-3 text-[12.5px] leading-relaxed text-[#8FA5E8]">
              {module.note}
            </p>
          )}
        </div>
      </div>

      {/* Process visualisation — decorative demo of the automation */}
      <div aria-hidden="true" className="min-w-0 lg:pt-0.5">
        {children}
      </div>
    </article>
  );
}
