import { Lock } from "lucide-react";

/**
 * 04 — Fivo: the product experience in front (checkout), the
 * infrastructure behind (settlement, CCTP, networks) — complexity
 * sitting behind a simple surface.
 */
export default function FivoVisual() {
  return (
    <div className="relative h-[380px] w-full">
      {/* settlement — depth layer */}
      <div className="absolute left-[4%] bottom-[6%] h-[44%] w-[70%] -rotate-2 rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-black/[0.08] px-2 py-0.5 font-mono text-[8px] text-foreground/60">
            Circle CCTP
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
            Ethereum → Base
          </span>
        </div>
        <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.07]">
          <span className="block h-full w-[72%] rounded-full bg-accent" />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-20 rounded-full bg-foreground/[0.06]" />
        </div>
      </div>

      {/* checkout — front */}
      <div className="absolute right-[6%] top-[8%] h-[46%] w-[74%] rotate-1 rounded-xl border border-white/70 bg-white/80 p-4 shadow-[0_50px_90px_-35px_rgba(12,18,32,0.4)] backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">
            Fivo
          </span>
          <span className="rounded-full border border-black/[0.08] px-2.5 py-0.5 font-mono text-[8px] text-foreground/60">
            USDC
          </span>
        </div>
        <div className="mt-3.5 flex items-center justify-between">
          <span className="h-2 w-24 rounded-full bg-foreground/[0.07]" />
          <span className="font-mono text-[10px] text-foreground/70">120.00</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="h-2 w-16 rounded-full bg-foreground/[0.07]" />
          <span className="font-mono text-[10px] text-muted-foreground">USDC</span>
        </div>
        <div className="mt-4 flex h-9 items-center justify-center gap-2 rounded-md bg-accent text-white shadow-[0_12px_24px_-10px_rgba(43,89,255,0.6)]">
          <Lock className="h-3.5 w-3.5" />
          <span className="h-1.5 w-16 rounded-full bg-white/60" />
        </div>
      </div>

      {/* networks chip */}
      <div className="absolute bottom-[16%] right-[8%] rotate-2">
        <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 font-mono text-[8px] text-foreground/60 shadow-[0_16px_30px_-14px_rgba(12,18,32,0.3)] backdrop-blur-md">
          Ethereum · Base · Arbitrum
        </span>
      </div>
    </div>
  );
}