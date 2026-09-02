import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { langPath } from "@/i18n";

/**
 * The content zone for one state. Readable only in a tight window
 * around its own state — the outgoing block rises away and blurs
 * out before the next one becomes readable. No two blocks ever
 * share the same visual space.
 */
export default function StateText({ metric, index, f, lang }) {
  const t = useTransform(f, (v) => v - index);
  const opacity = useTransform(t, [-0.5, -0.32, 0.32, 0.5], [0, 1, 1, 0]);
  const y = useTransform(t, [-0.5, -0.32, 0.32, 0.5], [36, 0, 0, -36]);
  const filter = useTransform(
    t,
    [-0.5, -0.32, 0.32, 0.5],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o < 0.05 ? "none" : "auto"
  );

  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents }}
      className="absolute bottom-[15vh] left-5 z-30 max-w-sm md:left-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {metric.context}
      </p>
      <h3 className="mt-3 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
        {metric.label}
      </h3>
      <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground md:text-base">
        {metric.copy}
      </p>
      <Link
        to={langPath(lang, metric.to)}
        className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
      >
        {metric.hint}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}