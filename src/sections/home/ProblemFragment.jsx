import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * Spatial config for the seven problem fragments: scattered start
 * (vw/vh offsets, rotation, controlled blur, mixed scale, depth)
 * drifting into an ordered column that dissolves as the central
 * message takes over.
 */
const CONFIG = [
  { x: -21, y: -16, endY: -19, r: -3, dim: 0.5, peak: 0.85, fade: 0.52, blur: 5, size: "text-sm md:text-base" },
  { x: 20, y: -20, endY: -12.5, r: 2.5, dim: 0.65, peak: 0.9, fade: 0.5, blur: 0, size: "text-base md:text-lg", glass: true },
  { x: -25, y: -7, endY: -6, r: 1.5, dim: 0.55, peak: 0.85, fade: 0.54, blur: 3, size: "text-sm md:text-base" },
  { x: 22, y: -2, endY: 0.5, r: -2, dim: 0.7, peak: 0.95, fade: 0.48, blur: 0, size: "text-base md:text-xl" },
  { x: -20, y: 7, endY: 7, r: 2, dim: 0.5, peak: 0.8, fade: 0.55, blur: 4, size: "text-sm md:text-base" },
  { x: 21, y: 14, endY: 13.5, r: -1.5, dim: 0.6, peak: 0.88, fade: 0.51, blur: 0, size: "text-sm md:text-lg" },
  { x: -17, y: 20, endY: 20, r: 3, dim: 0.45, peak: 0.8, fade: 0.53, blur: 6, size: "text-sm" },
];

export default function ProblemFragment({ text, index, progress }) {
  const cfg = CONFIG[index % CONFIG.length];
  const x = useTransform(progress, [0, 0.45], [`${cfg.x}vw`, "0vw"]);
  const y = useTransform(progress, [0, 0.45], [`${cfg.y}vh`, `${cfg.endY}vh`]);
  const rotate = useTransform(progress, [0, 0.45], [cfg.r, 0]);
  const opacity = useTransform(
    progress,
    [0, 0.08, 0.3, cfg.fade],
    [cfg.dim * 0.65, cfg.dim, cfg.peak, 0]
  );
  const blurV = useTransform(progress, [0, 0.18], [cfg.blur, 0]);
  const filter = useMotionTemplate`blur(${blurV}px)`;

  return (
    <motion.div
      style={{ x, y, rotate, opacity, filter }}
      className="absolute left-1/2 top-1/2 z-[1]"
    >
      <p
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 font-heading font-semibold tracking-[-0.01em] text-foreground md:whitespace-nowrap",
          cfg.size,
          cfg.glass &&
            "rounded-lg border border-white/60 bg-white/40 px-4 py-2 shadow-[0_24px_50px_-30px_rgba(12,18,32,0.35)] backdrop-blur-md"
        )}
      >
        {text}
      </p>
    </motion.div>
  );
}