import { ArrowRight } from "lucide-react";
import { Dot, FlowDot, Line, Panel } from "../visualBits";

/**
 * 04 — Integrations: before, information lives isolated in separate
 * tools; after, it flows coherently through the business.
 */
export default function IntegrationsVisual() {
  return (
    <div className="relative h-full w-full">
      {/* before — isolated tools */}
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`absolute left-0 ${i === 0 ? "top-[10%]" : "bottom-[10%]"} h-[32%] w-[30%] ${i === 0 ? "-rotate-2" : "rotate-2"} rounded-xl border border-dashed border-foreground/20 bg-white/40 p-3.5`}
        >
          <div className="space-y-2">
            {[0, 1, 2].map((j) => (
              <span key={j} className="block h-1.5 rounded-full bg-foreground/[0.08]" style={{ width: `${70 + j * 10}%` }} />
            ))}
          </div>
        </div>
      ))}

      {/* transformation */}
      <ArrowRight className="absolute left-[35%] top-1/2 h-6 w-6 -translate-y-1/2 text-accent" />

      {/* after — one coherent flow */}
      <Panel className="absolute right-0 top-[16%] h-[64%] w-[56%] rotate-1">
        <div className="flex items-center justify-between">
          <Line className="h-2 w-16" />
          <Dot accent />
        </div>
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-md border border-black/[0.04] bg-white/50 px-2.5 py-1.5">
              <Dot accent={i === 1} />
              <Line className="h-1.5 flex-1" />
              <Line className="h-1.5 w-8" />
            </div>
          ))}
        </div>
        <span className="relative mt-3 block h-px w-full bg-foreground/15">
          <FlowDot travel={150} duration={3} />
        </span>
      </Panel>
    </div>
  );
}