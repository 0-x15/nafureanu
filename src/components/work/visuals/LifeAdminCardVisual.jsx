/**
 * Abstract internal-management visual for the Life Admin card —
 * quiet structural blocks and a single cobalt thread. No invented
 * data or traction; language-neutral.
 */
export default function LifeAdminCardVisual() {
  return (
    <div className="w-full max-w-[400px] rounded-lg border border-border bg-[#FCFBF8] p-5 text-left shadow-[0_24px_48px_-24px_rgba(12,18,32,0.22)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Life Admin — sistema de gestión
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <div className="rounded-md border border-border bg-white p-3">
          <span aria-hidden="true" className="block h-1.5 w-8 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="mt-2 block h-1.5 w-11 rounded-full bg-foreground/8" />
        </div>
        <div className="rounded-md border border-accent/40 bg-[#EDF2FF] p-3">
          <span aria-hidden="true" className="block h-1.5 w-8 rounded-full bg-accent/60" />
          <span aria-hidden="true" className="mt-2 block h-1.5 w-11 rounded-full bg-accent/30" />
        </div>
        <div className="rounded-md border border-border bg-white p-3">
          <span aria-hidden="true" className="block h-1.5 w-8 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="mt-2 block h-1.5 w-11 rounded-full bg-foreground/8" />
        </div>
      </div>

      <div className="mt-2.5 space-y-2">
        {[86, 64, 74].map((w, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-white px-3 py-2.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
            <span aria-hidden="true" className="h-1.5 rounded-full bg-foreground/8" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">
        Flujos · Estados · Automatización
      </p>
    </div>
  );
}