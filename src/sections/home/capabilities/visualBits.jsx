import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Shared glass atoms for the capability visuals. */

export function Panel({ className = "", children }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/70 bg-white/60 p-4 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.32)] backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Line({ className = "" }) {
  return <span className={cn("rounded-full bg-foreground/[0.07]", className)} />;
}

export function Dot({ accent = false, className = "" }) {
  return (
    <span
      className={cn(
        "h-1.5 w-1.5 shrink-0 rounded-full",
        accent ? "bg-accent" : "bg-black/15",
        className
      )}
    />
  );
}

export function Chrome({ lineW = "w-20" }) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
      ))}
      <Line className={cn("ml-3 h-2", lineW)} />
    </div>
  );
}

export function Chip({ className = "", children }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border border-white/70 bg-white/70 px-3 py-1.5 font-mono text-[9px] text-foreground/60 shadow-[0_16px_30px_-14px_rgba(12,18,32,0.3)] backdrop-blur-md",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Bars({ heights, accentIndex = 5, className = "" }) {
  return (
    <div className={cn("flex items-end gap-1.5", className)}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className={cn(
            "w-2 rounded-sm",
            i === accentIndex ? "bg-accent/70" : "bg-foreground/10"
          )}
        />
      ))}
    </div>
  );
}

export function FlowDot({ travel = 44, duration = 2.4, className = "" }) {
  return (
    <motion.span
      animate={{ x: [0, travel], opacity: [0, 1, 1, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={cn("absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent", className)}
    />
  );
}