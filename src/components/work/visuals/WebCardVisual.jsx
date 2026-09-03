/**
 * Compact browser/product fragment for the web & digital products
 * card. One restrained composition; language-neutral.
 */
export default function WebCardVisual() {
  return (
    <div className="w-full max-w-[230px] overflow-hidden rounded-lg border border-[#E5E1D6] bg-white text-left shadow-[0_12px_28px_-14px_rgba(12,18,32,0.25)]">
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] bg-[#F9F7F2] px-3 py-1.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E3DFD2]" />
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E3DFD2]" />
        <span className="rounded bg-white px-1.5 py-0.5 text-[8px] text-[#9A94A6]">
          nafureanu — web
        </span>
      </div>
      <div className="p-3">
        <span aria-hidden="true" className="block h-2 w-20 rounded-full bg-foreground/12" />
        <span aria-hidden="true" className="mt-1.5 block h-1 w-28 rounded-full bg-foreground/8" />
        <div className="mt-2.5 flex gap-1.5">
          {[14, 10, 12].map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="rounded-full bg-foreground/8"
              style={{ width: `${w * 3}px`, height: "6px" }}
            />
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          <div className="col-span-2 h-10 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF] p-2">
            <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-white/70" />
          </div>
          <div className="rounded-md border border-[#EFEBE0] p-1.5">
            {[0, 1].map((k) => (
              <span key={k} aria-hidden="true" className="mb-1.5 block h-1 w-full rounded-full bg-foreground/8 last:mb-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}