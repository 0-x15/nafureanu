import { Bars, Dot, FlowDot, Line, Panel } from "../visualBits";

/**
 * 03 — Business systems: fragments of the operation converge into
 * one coherent system at the center.
 */
export default function BusinessSystemsVisual() {
  return (
    <div className="relative h-full w-full">
      {/* clients fragment */}
      <div className="absolute left-0 top-[26%] h-[38%] w-[24%] -rotate-2 rounded-xl border border-white/70 bg-white/50 p-3.5 shadow-[0_24px_50px_-28px_rgba(12,18,32,0.28)] backdrop-blur-sm">
        <Line className="h-1.5 w-12" />
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Dot accent={i === 1} />
              <Line className="h-1.5 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* connector in */}
      <span className="absolute left-[25%] top-[45%] h-px w-[8%] bg-foreground/15">
        <FlowDot travel={34} />
      </span>

      {/* unified system — center */}
      <Panel className="absolute left-[34%] top-[16%] h-[66%] w-[34%]">
        <div className="flex items-center justify-between">
          <Line className="h-2 w-14" />
          <Dot accent />
        </div>
        <div className="mt-3.5 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Dot accent={i === 0} />
              <Line className="h-1.5 flex-1" />
              <Line className="h-1.5 w-6" />
            </div>
          ))}
        </div>
        <Bars heights={[40, 65, 50, 90, 70]} accentIndex={3} className="mt-3.5 h-10 border-t border-black/[0.05] pt-2.5" />
      </Panel>

      {/* connector from KPI fragment */}
      <span className="absolute left-[68%] top-[45%] h-px w-[8%] bg-foreground/15">
        <FlowDot travel={34} />
      </span>

      {/* KPI fragment */}
      <div className="absolute right-0 top-[32%] h-[34%] w-[23%] rotate-2 rounded-xl border border-white/70 bg-white/50 p-3.5 shadow-[0_24px_50px_-28px_rgba(12,18,32,0.28)] backdrop-blur-sm">
        <Line className="h-1.5 w-10" />
        <Bars heights={[45, 70, 40, 88, 60]} accentIndex={3} className="mt-3 h-9" />
      </div>
    </div>
  );
}