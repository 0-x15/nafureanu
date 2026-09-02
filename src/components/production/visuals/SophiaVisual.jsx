/**
 * 02 — SophIA as a real software environment: a CRM panel with
 * property records and a match indicator, a KPI fragment behind,
 * and an AI assistant line at the bottom.
 */
const ROWS = [
  ["P-4821", "€1.250K", null],
  ["P-1094", "€890K", "match 98%"],
  ["P-7650", "€2.400K", null],
];

export default function SophiaVisual() {
  return (
    <div className="relative h-[380px] w-full">
      {/* KPI fragment — depth layer */}
      <div className="absolute right-[2%] top-[4%] h-[30%] w-[48%] rotate-2 rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_30px_60px_-30px_rgba(12,18,32,0.25)] backdrop-blur-sm">
        <span className="block h-2 w-14 rounded-full bg-foreground/[0.07]" />
        <div className="mt-3 flex h-10 items-end gap-1.5">
          {[40, 65, 50, 85, 60, 100].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`w-2.5 rounded-sm ${i === 5 ? "bg-accent/70" : "bg-foreground/10"}`}
            />
          ))}
        </div>
      </div>

      {/* CRM panel — front */}
      <div className="absolute left-0 top-[14%] h-[68%] w-[88%] -rotate-1 rounded-xl border border-white/70 bg-white/80 p-4 shadow-[0_50px_90px_-35px_rgba(12,18,32,0.4)] backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">
            SophIA
          </span>
          <span className="h-5 w-24 rounded bg-foreground/[0.06]" />
        </div>
        <div className="mt-3 space-y-2">
          {ROWS.map(([code, price, match], i) => (
            <div
              key={code}
              className="flex items-center gap-3 rounded-lg border border-black/[0.04] bg-white/60 px-3 py-2"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-accent" : "bg-black/15"}`}
              />
              <span className="font-mono text-[9px] text-foreground/70">{code}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{price}</span>
              {match && (
                <span className="ml-auto rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[8px] text-accent">
                  {match}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* AI assistant line */}
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-accent/20 bg-accent/[0.06] px-3 py-2">
          <span className="flex items-end gap-0.5">
            {[10, 16, 7].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px` }}
                className="w-0.5 rounded-full bg-accent/70"
              />
            ))}
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-foreground/[0.06]" />
        </div>
      </div>
    </div>
  );
}