/**
 * Abstract internal-management fragment for the internal CRM card —
 * quiet structural blocks and a single cobalt thread. No invented
 * data or traction; language-neutral.
 */
export default function LifeAdminCardVisual() {
  return (
    <div className="w-full max-w-[230px] rounded-lg border border-border bg-[#FCFBF8] p-3 text-left shadow-[0_12px_28px_-14px_rgba(12,18,32,0.2)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
          CRM
        </span>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <div className="rounded-md border border-border bg-white p-2">
          <span aria-hidden="true" className="block h-1 w-5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="mt-1.5 block h-1 w-7 rounded-full bg-foreground/8" />
        </div>
        <div className="rounded-md border border-accent/40 bg-[#EDF2FF] p-2">
          <span aria-hidden="true" className="block h-1 w-5 rounded-full bg-accent/60" />
          <span aria-hidden="true" className="mt-1.5 block h-1 w-7 rounded-full bg-accent/30" />
        </div>
        <div className="rounded-md border border-border bg-white p-2">
          <span aria-hidden="true" className="block h-1 w-5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="mt-1.5 block h-1 w-7 rounded-full bg-foreground/8" />
        </div>
      </div>

      <div className="mt-2 space-y-1.5">
        {[86, 64].map((w, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-white px-2 py-1.5">
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-accent/50" />
            <span aria-hidden="true" className="h-1 rounded-full bg-foreground/8" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}