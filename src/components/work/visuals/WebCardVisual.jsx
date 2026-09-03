/**
 * Restrained browser/interface collage for the Web Projects card —
 * one editorial composition, not ten websites. Language-neutral.
 */
export default function WebCardVisual() {
  return (
    <div className="relative w-full max-w-[460px] py-2">
      <div
        aria-hidden="true"
        className="absolute -right-3 -top-3 hidden h-full w-[70%] rounded-lg border border-border bg-[#FCFBF8] md:block"
      />
      <div className="relative overflow-hidden rounded-lg border border-[#E5E1D6] bg-white text-left shadow-[0_24px_48px_-24px_rgba(12,18,32,0.3)]">
        <div className="flex items-center gap-2.5 border-b border-[#EFEBE0] bg-[#F9F7F2] px-3.5 py-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
          <span className="ml-1 rounded bg-white px-2 py-0.5 text-[9px] text-[#9A94A6]">
            nafureanu — web
          </span>
        </div>
        <div className="p-5">
          <span aria-hidden="true" className="block h-3 w-32 rounded-full bg-foreground/12" />
          <span aria-hidden="true" className="mt-2.5 block h-2 w-48 rounded-full bg-foreground/8" />
          <div className="mt-5 flex gap-2">
            {[16, 12, 14].map((w, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="rounded-full bg-foreground/8"
                style={{ width: `${w * 4}px`, height: "8px" }}
              />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <div className="col-span-2 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF] p-4">
              <span aria-hidden="true" className="block h-1.5 w-14 rounded-full bg-white/70" />
            </div>
            <div className="rounded-md border border-[#EFEBE0] p-3">
              {[0, 1, 2].map((k) => (
                <span key={k} aria-hidden="true" className="mb-2 block h-1.5 w-full rounded-full bg-foreground/8 last:mb-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}