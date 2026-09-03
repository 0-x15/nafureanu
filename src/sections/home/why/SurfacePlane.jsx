import { cn } from "@/lib/utils";

/**
 * The visible layer — a deliberately minimal interface plane.
 * Not a fake dashboard: just enough surface to read as "software".
 */
export default function SurfacePlane({ t }) {
  return (
    <div className="border border-foreground/10 bg-card p-4 shadow-[28px_28px_56px_-28px_rgba(20,24,38,0.28)]">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-foreground/10 pb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
        <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
          nafureanu.app
        </span>
      </div>
      {/* minimal navigation */}
      <div className="mt-4 space-y-1">
        {t.surfaceItems.map((item, i) => (
          <div
            key={item}
            className={cn(
              "flex items-center gap-2.5 px-2 py-1.5",
              i === 0 && "border-l-2 border-accent bg-accent/[0.06]"
            )}
          >
            <span className="h-3 w-3 border border-foreground/15 bg-foreground/[0.04]" />
            <span className="text-[10px] text-foreground/75">{item}</span>
          </div>
        ))}
      </div>
      {/* abstract content */}
      <div className="mt-5 space-y-2.5 border-t border-foreground/10 pt-4">
        <div className="h-1.5 w-3/4 bg-foreground/[0.07]" />
        <div className="h-1.5 w-1/2 bg-foreground/[0.05]" />
        <div className="flex h-8 items-end gap-1.5">
          {[10, 16, 8, 22, 14, 28, 18].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px` }}
              className={cn("w-1.5", i === 5 ? "bg-accent/50" : "bg-foreground/10")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}