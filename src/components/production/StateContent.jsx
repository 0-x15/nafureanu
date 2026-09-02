import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { langPath } from "@/i18n";

/**
 * The content zone for one state: commercial headline first, then
 * supporting copy, context and a quiet CTA. Only one state is ever
 * readable — the outgoing block rises away and blurs out before
 * the next one enters.
 */
export default function StateContent({ state, index, f, lang }) {
  const t = useTransform(f, (v) => v - index);
  const opacity = useTransform(t, [-0.5, -0.3, 0.3, 0.5], [0, 1, 1, 0]);
  const y = useTransform(t, [-0.5, -0.3, 0.3, 0.5], [44, 0, 0, -44]);
  const filter = useTransform(
    t,
    [-0.5, -0.3, 0.3, 0.5],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );
  const pointerEvents = useTransform(opacity, (o) =>
    o < 0.05 ? "none" : "auto"
  );

  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents }}
      className="absolute left-5 top-[26%] z-30 max-w-[54%] md:left-10 md:top-[30%] lg:max-w-[560px]"
    >
      <h3 className="font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-5xl">
        {state.headline}
      </h3>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {state.copy}
      </p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        {state.context}
      </p>
      <Link
        to={langPath(lang, state.to)}
        className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
      >
        {state.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}