import { motion } from "framer-motion";
import { Dot, FlowDot, Line, Panel } from "../visualBits";

/**
 * 02 — Automation & AI: a real workflow transformed — document in,
 * understood and processed, clean result out. No robots, no brains.
 */
const DOC_WIDTHS = ["w-1/3", "w-full", "w-4/5", "w-full", "w-3/5"];

export default function AutomationVisual() {
  return (
    <div className="relative h-full w-full">
      {/* input — document */}
      <div className="absolute left-[2%] top-[24%] h-[54%] w-[26%] -rotate-3 rounded-xl border border-white/70 bg-white/55 p-3.5 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.3)] backdrop-blur-md">
        <div className="space-y-2">
          {DOC_WIDTHS.map((w, i) => (
            <span key={i} className={`block h-1.5 rounded-full bg-foreground/[0.08] ${w}`} />
          ))}
        </div>
      </div>

      {/* connector in */}
      <span className="absolute left-[29%] top-[50%] h-px w-[8%] bg-foreground/15">
        <FlowDot travel={34} />
      </span>

      {/* processing — understanding */}
      <Panel className="absolute left-[38%] top-[34%] h-[38%] w-[26%] border-accent/25 bg-white/70">
        <div className="flex h-full items-end justify-center gap-1.5">
          {[10, 20, 14, 24, 16, 28, 12].map((h, i) => (
            <motion.span
              key={i}
              animate={{ height: [`${h}px`, `${h + 12}px`, `${h}px`] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
              className="w-1 rounded-full bg-accent/70"
            />
          ))}
        </div>
      </Panel>

      {/* connector out */}
      <span className="absolute left-[65%] top-[50%] h-px w-[8%] bg-foreground/15">
        <FlowDot travel={34} />
      </span>

      {/* result — clean record */}
      <Panel className="absolute right-[2%] top-[20%] h-[58%] w-[28%] rotate-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5 py-1.5">
            <Dot accent={i === 0} />
            <Line className="h-1.5 flex-1" />
          </div>
        ))}
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.06] px-2 py-0.5">
          <Dot accent />
          <span className="h-1 w-8 rounded-full bg-foreground/[0.08]" />
        </span>
      </Panel>
    </div>
  );
}