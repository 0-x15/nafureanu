import { cn } from "@/lib/utils";
import { Bars, Chip, Chrome, Line, Panel } from "../visualBits";

/**
 * 01 — Software: a complete digital product built around a business.
 * A dashboard behind, an application with sidebar and operational
 * data in front.
 */
export default function SoftwareVisual() {
  return (
    <div className="relative h-full w-full">
      {/* dashboard — depth layer */}
      <div className="absolute left-[3%] top-[8%] h-[42%] w-[44%] -rotate-3 rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <Line className="h-2 w-16" />
        <Bars heights={[45, 70, 40, 88, 60, 100, 75]} accentIndex={5} className="mt-4 h-14" />
      </div>

      {/* application — front */}
      <Panel className="absolute right-[5%] top-[20%] h-[62%] w-[62%] rotate-1">
        <Chrome />
        <div className="mt-4 flex gap-4">
          <div className="w-10 shrink-0 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <Line
                key={i}
                className={cn("h-2 w-full", i === 0 && "bg-accent/30")}
              />
            ))}
          </div>
          <div className="flex-1 space-y-2.5">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-6 w-6 shrink-0 rounded-md border border-black/[0.06]",
                    i === 0 ? "bg-accent/15" : "bg-foreground/[0.04]"
                  )}
                />
                <Line className="h-2 flex-1" />
              </div>
            ))}
          </div>
        </div>
        <Bars
          heights={[30, 55, 42, 68, 50, 82, 60, 90]}
          accentIndex={7}
          className="mt-4 h-12 border-t border-black/[0.05] pt-3"
        />
      </Panel>

      <Chip className="absolute bottom-[6%] left-[8%] -rotate-2">API · v3</Chip>
    </div>
  );
}