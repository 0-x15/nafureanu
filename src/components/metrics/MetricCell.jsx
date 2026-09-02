import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/**
 * One metric of the production band — an animated number, supporting
 * copy, and a quiet contextual path into the related work.
 */
export default function MetricCell({
  metric,
  index = 0,
  lang = "es",
  separatorClass,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(reduced ? metric.value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(metric.value);
      return;
    }
    const controls = animate(0, metric.value, {
      duration: 1.5,
      delay: 0.15 + index * 0.12,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, metric.value, index]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="relative"
    >
      {separatorClass && (
        <motion.span
          aria-hidden="true"
          initial={reduced ? false : { scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.9, delay: 0.35 + index * 0.1, ease: EASE }}
          className={cn(
            "absolute left-0 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-white/[0.09]",
            separatorClass
          )}
        />
      )}
      <Link
        to={langPath(lang, metric.to)}
        className="group relative block py-9 pl-2 pr-2 sm:pl-6 lg:pl-8 lg:pr-5 xl:py-12"
      >
        {/* Soft cobalt light field on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-2xl bg-[radial-gradient(70%_90%_at_50%_0%,rgba(91,132,255,0.13),transparent_72%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 transition-colors duration-500 group-hover:text-[#8FA5E8]">
            {metric.context}
          </p>
          <p className="mt-5 font-heading text-6xl font-bold tracking-[-0.03em] text-white lg:text-7xl xl:text-8xl">
            {display}
            {metric.suffix && (
              <span className="text-[#5B84FF]">{metric.suffix}</span>
            )}
          </p>
          <p className="mt-4 font-heading text-lg font-semibold tracking-[-0.01em] text-white/90">
            {metric.label}
          </p>
          <p className="mt-2.5 max-w-[26ch] text-sm leading-relaxed text-white/45">
            {metric.copy}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs font-medium text-white/40 transition-colors duration-500 group-hover:text-white/85">
            {metric.hint}
            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </p>
        </div>
      </Link>
    </motion.div>
  );
}