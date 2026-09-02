import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/*
 * Spatial config for the seven problem fragments. Choreography:
 * ENTER fast (opacity + ~2px blur only), HOLD locked and fully
 * readable, then EXIT by converging into an ordered column and
 * dissolving. Staggered fade ends keep the exit lively but all
 * within the exit band.
 */
const ENTER = 0.08;
const HOLD_END = 0.4;
const CONFIG = [
  { x: -21, y: -16, endY: -19, r: -3, dim: 0.95, fade: 0.5, size: "text-sm md:text-base" },
  { x: 20, y: -20, endY: -12.5, r: 2.5, dim: 0.95, fade: 0.48, size: "text-base md:text-lg", glass: true },
  { x: -25, y: -7, endY: -6, r: 1.5, dim: 0.9, fade: 0.51, size: "text-sm md:text-base" },
  { x: 22, y: -2, endY: 0.5, r: -2, dim: 0.95, fade: 0.47, size: "text-base md:text-xl" },
  { x: -20, y: 7, endY: 7, r: 2, dim: 0.88, fade: 0.52, size: "text-sm md:text-base" },
  { x: 21, y: 14, endY: 13.5, r: -1.5, dim: 0.92, fade: 0.49, size: "text-sm md:text-lg" },
  { x: -17, y: 20, endY: 20, r: 3, dim: 0.85, fade: 0.53, size: "text-sm" },
];

export default function ProblemFragment({ text, index, progress }) {
  const isMobile = useIsMobile();
  const cfg = CONFIG[index % CONFIG.length];

  const x = useTransform(
    progress,
    [0, ENTER, HOLD_END, cfg.fade],
    [`${cfg.x}vw`, `${cfg.x}vw`, `${cfg.x}vw`, "0vw"]
  );
  const y = useTransform(
    progress,
    [0, ENTER, HOLD_END, cfg.fade],
    [`${cfg.y + 2}vh`, `${cfg.y}vh`, `${cfg.y}vh`, `${cfg.endY}vh`]
  );
  const rotate = useTransform(
    progress,
    [0, HOLD_END, cfg.fade],
    [cfg.r, cfg.r, 0]
  );
  /* fully readable almost immediately, held, clean exit */
  const opacity = useTransform(
    progress,
    [0, ENTER, HOLD_END, cfg.fade],
    [0, cfg.dim, cfg.dim, 0]
  );
  const blurV = useTransform(progress, [0, ENTER], [isMobile ? 1 : 2.5, 0]);
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