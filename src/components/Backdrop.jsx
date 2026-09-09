import { cn } from "@/lib/utils";

/**
 * Tonal planes for the background system. Every tone is the paper itself
 * shifted a hair: a lighter sheet, a cooler technical field, a shade.
 */
const TONES = {
  white: "bg-white/55 ring-1 ring-foreground/[0.05] shadow-[0_60px_140px_-80px_rgba(27,36,64,0.16)]",
  cool: "bg-[#E7EDF9]/55 ring-1 ring-accent/[0.08]",
  deep: "bg-foreground/[0.025] ring-1 ring-foreground/[0.05]",
};

/**
 * A background plane behind a section: one large, low-contrast rectangle
 * with a hairline edge and two technical corner marks, placed under the
 * content the way a sheet sits under a drawing. Purely decorative and
 * inert; the section must be `relative isolate` so the plane paints
 * above the section's ground and below its content. Positions are
 * percentages of the section and may bleed past its edges. Hidden on
 * phones, where the global canvas is enough.
 * @param {{ tone?: "white" | "cool" | "deep", x?: string, y?: string, w?: string, h?: string, marks?: boolean, className?: string }} props
 */
export default function Backdrop({ tone = "white", x = "58%", y = "0%", w = "50%", h = "100%", marks = true, className = "" }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block", className)}>
      <div className={cn("absolute", TONES[tone])} style={{ left: x, top: y, width: w, height: h }}>
        {marks && (
          <>
            <span className="absolute -left-px -top-px h-3.5 w-3.5 border-l border-t border-foreground/25" />
            <span className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b border-r border-foreground/25" />
          </>
        )}
      </div>
    </div>
  );
}
