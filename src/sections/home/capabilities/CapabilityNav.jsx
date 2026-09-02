import { cn } from "@/lib/utils";

/**
 * The six capabilities as a large typographic navigation system.
 * Titles are part of the composition: the active one grows and
 * dominates; the others stay quiet and receded. Hover, focus or
 * click changes the active scene.
 */
export default function CapabilityNav({
  capabilities,
  active,
  onSelect,
  ariaLabel,
}) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-col">
      {capabilities.map((cap, i) => {
        const isActive = i === active;
        return (
          <button
            key={cap.name}
            type="button"
            onMouseEnter={() => onSelect(i)}
            onFocus={() => onSelect(i)}
            onClick={() => onSelect(i)}
            aria-current={isActive}
            className="group flex items-baseline gap-4 border-b border-border/70 py-4 text-left lg:py-5"
          >
            <span
              className={cn(
                "font-mono text-[10px] transition-colors duration-500",
                isActive ? "text-accent" : "text-muted-foreground/30"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "font-heading font-bold tracking-[-0.02em] transition-all duration-500",
                isActive
                  ? "translate-x-1 text-3xl text-foreground lg:text-4xl"
                  : "-translate-x-1 text-xl text-muted-foreground/45 group-hover:text-muted-foreground lg:text-2xl"
              )}
            >
              {cap.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}