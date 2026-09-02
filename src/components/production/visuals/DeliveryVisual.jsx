const LINE = "rounded-full bg-foreground/[0.07]";

/**
 * 01 — Delivery. Layered shipped work: an application interface,
 * a business dashboard behind it, and deployment chips in front.
 */
export default function DeliveryVisual() {
  return (
    <div className="relative h-[380px] w-full">
      {/* business dashboard — depth layer */}
      <div className="absolute left-[2%] top-[6%] h-[38%] w-[55%] -rotate-3 rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <span className={`block h-2 w-16 ${LINE}`} />
        <div className="mt-4 flex h-14 items-end gap-1.5">
          {[45, 70, 40, 88, 60, 100, 75, 50].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`w-2 rounded-sm ${i === 5 ? "bg-accent/70" : "bg-foreground/10"}`}
            />
          ))}
        </div>
      </div>

      {/* application interface — front */}
      <div className="absolute right-[4%] top-[16%] h-[66%] w-[82%] rotate-1 rounded-xl border border-white/70 bg-white/80 p-4 shadow-[0_50px_90px_-35px_rgba(12,18,32,0.4)] backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          ))}
          <span className={`ml-3 h-2 w-20 ${LINE}`} />
        </div>
        <div className="mt-4 space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`h-7 w-7 shrink-0 rounded-md border border-black/[0.06] ${
                  i === 0 ? "bg-accent/15" : "bg-foreground/[0.04]"
                }`}
              />
              <span className={`h-2 flex-1 ${LINE}`} />
              <span className={`h-2 w-10 ${LINE}`} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-20 items-end gap-1 border-t border-black/[0.05] pt-3">
          {[30, 55, 42, 68, 50, 82, 60, 90, 72].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${i === 7 ? "bg-accent/80" : "bg-foreground/[0.08]"}`}
            />
          ))}
        </div>
      </div>

      {/* shipped-work chips — foreground */}
      <div className="absolute bottom-[8%] left-[6%] flex -rotate-2 gap-2">
        {["API · 200", "v2.4 · deploy"].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 font-mono text-[9px] text-foreground/60 shadow-[0_16px_30px_-14px_rgba(12,18,32,0.3)] backdrop-blur-md"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}