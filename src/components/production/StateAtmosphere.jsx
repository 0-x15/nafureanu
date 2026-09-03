import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* Per-state atmospheric tint — restrained colour, blurred into the
   ivory canvas so each chapter has its own mood. */
const TINTS = [
  "left-[52%] top-[24%] bg-[radial-gradient(closest-side,rgba(49,87,246,0.10),transparent)]",
  "right-[4%] top-[8%] bg-[radial-gradient(closest-side,rgba(20,160,190,0.10),transparent)]",
  "left-[24%] bottom-[4%] bg-[radial-gradient(closest-side,rgba(139,124,246,0.09),transparent)]",
  "right-[10%] bottom-[8%] bg-[radial-gradient(closest-side,rgba(30,68,214,0.11),transparent)]",
];

export default function StateAtmosphere({ index, f }) {
  const t = useTransform(f, (v) => v - index);
  const opacity = useTransform(t, [-0.6, -0.25, 0.25, 0.6], [0, 1, 1, 0]);
  return (
    <motion.span
      style={{ opacity }}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 h-[58vh] w-[64vw] rounded-full blur-[100px]",
        TINTS[index]
      )}
    />
  );
}