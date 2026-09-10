import { cn } from "@/lib/utils";

/** Vocabulary of the Services index: one material (glass blades), one easing, small mono labels. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";

/** The service material: three glass tones on a hairline of white light. */
export const TONES = {
  white: "border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.82),rgba(255,255,255,0.44))]",
  cobalt: "border-white/60 bg-[linear-gradient(165deg,rgba(49,87,246,0.62),rgba(87,118,255,0.3))]",
  cyan: "border-white/60 bg-[linear-gradient(165deg,rgba(23,180,205,0.56),rgba(23,180,205,0.24))]",
};

/**
 * One blade of service material: a tall, narrow, rounded glass plane.
 * Purely decorative — the callers place it and hide it from readers.
 * @param {{ tone?: keyof typeof TONES, className?: string, style?: import("react").CSSProperties, blur?: number }} props
 */
export function Blade({ tone = "white", className = "", style = undefined, blur = 0 }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute block rounded-[18px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_40px_80px_-40px_rgba(49,87,246,0.42)]", TONES[tone], className)}
      style={{ ...style, filter: blur ? `blur(${blur}px)` : undefined }}
    />
  );
}
