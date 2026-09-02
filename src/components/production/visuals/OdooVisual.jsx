import { motion } from "framer-motion";

const NODES = ["sale", "stock", "account"];

/**
 * 03 — A business system assembled around a process: an operational
 * flow with data moving between areas, modules docking around it,
 * and automation switched on.
 */
export default function OdooVisual() {
  return (
    <div className="relative h-[380px] w-full">
      {/* process flow — center */}
      <div className="absolute left-0 top-[42%] flex w-full items-center">
        {NODES.map((node, i) => (
          <div key={node} className="flex flex-1 items-center last:flex-none">
            <span className="rounded-lg border border-black/[0.06] bg-white/80 px-3.5 py-2.5 font-mono text-[10px] text-foreground/70 shadow-[0_20px_40px_-20px_rgba(12,18,32,0.3)] backdrop-blur-md">
              {node}
            </span>
            {i < NODES.length - 1 && (
              <span className="relative mx-2 h-px flex-1 bg-foreground/15">
                <motion.span
                  animate={{ x: [0, 42], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* docking modules around the process */}
      <div className="absolute left-[6%] top-[16%] flex -rotate-2 gap-2">
        {["hr", "crm"].map((m) => (
          <span
            key={m}
            className="rounded-md border border-black/[0.06] bg-white/60 px-2.5 py-1.5 font-mono text-[9px] text-foreground/50 shadow-[0_16px_30px_-16px_rgba(12,18,32,0.25)] backdrop-blur-sm"
          >
            {m}
          </span>
        ))}
      </div>
      <div className="absolute right-[4%] bottom-[12%] rotate-2">
        <span className="rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-[9px] text-accent shadow-[0_16px_30px_-16px_rgba(43,89,255,0.35)] backdrop-blur-sm">
          custom
        </span>
      </div>

      {/* automation toggle */}
      <div className="absolute bottom-[18%] left-[10%] flex -rotate-1 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 shadow-[0_16px_30px_-14px_rgba(12,18,32,0.3)] backdrop-blur-md">
        <span className="relative h-3 w-6 rounded-full bg-accent/80">
          <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/50">
          auto
        </span>
      </div>
    </div>
  );
}