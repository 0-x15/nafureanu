import { Lock, ShieldCheck } from "lucide-react";
import { Chip, Line, Panel } from "../visualBits";

/**
 * 06 — Advanced infrastructure: a simple payment experience in
 * front, settlement and verification layers behind it.
 */
export default function InfrastructureVisual() {
  return (
    <div className="relative h-full w-full">
      {/* deep layer — settlement */}
      <div className="absolute left-[6%] top-[44%] h-[36%] w-[42%] -rotate-2 rounded-xl border border-white/50 bg-white/35 p-3.5 opacity-80 shadow-[0_24px_50px_-28px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/45">
            Circle CCTP
          </span>
          <span className="font-mono text-[8px] text-muted-foreground/70">
            Ethereum → Base
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.07]">
          <span className="block h-full w-[72%] rounded-full bg-accent/80" />
        </div>
      </div>

      {/* deep layer — verification */}
      <div className="absolute left-[24%] top-[14%] flex -rotate-1 items-center gap-2 rounded-full border border-white/50 bg-white/40 px-3 py-1.5 shadow-[0_16px_30px_-16px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <ShieldCheck className="h-3 w-3 text-accent/80" />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/50">
          on-chain
        </span>
      </div>

      {/* product experience — front */}
      <Panel className="absolute right-[6%] top-[16%] h-[56%] w-[46%] rotate-1">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <Line className="h-2 w-16" />
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <Line className="h-2 w-1/2" />
            <span className="font-mono text-[10px] text-foreground/70">120.00</span>
          </div>
          <div className="flex items-center justify-between">
            <Line className="h-2 w-1/3" />
            <span className="font-mono text-[10px] text-muted-foreground">USDC</span>
          </div>
        </div>
        <div className="mt-5 flex h-9 items-center justify-center gap-2 rounded-md bg-accent text-white shadow-[0_12px_24px_-10px_rgba(43,89,255,0.6)]">
          <Lock className="h-3.5 w-3.5" />
          <span className="h-1.5 w-14 rounded-full bg-white/60" />
        </div>
      </Panel>

      <Chip className="absolute bottom-[8%] left-[10%] -rotate-2">USDC · EURC</Chip>
    </div>
  );
}