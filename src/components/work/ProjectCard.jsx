import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projectSlug } from "@/data/projects";
import { langPath, pick } from "@/i18n";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 175, damping: 20, mass: 0.8 };

/**
 * Compact project card — collectible-card proportions resting on a
 * controlled spring. The surface tilts a couple of degrees toward the
 * pointer, drifts a couple of pixels and lifts 3px on hover; the inner
 * artwork counter-moves slightly. Reduced motion disables the tilt;
 * touch devices skip it entirely.
 */
export default function ProjectCard({
  project,
  index,
  lang,
  viewProject,
  className = "",
  children,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hover = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const sh = useSpring(hover, SPRING);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-2.8, 2.8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [2.2, -2.2]);
  const x = useTransform(sx, [-0.5, 0.5], [-2, 2]);
  const y = useTransform(sh, [0, 1], [0, -3]);
  const innerX = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const innerY = useTransform(sy, [-0.5, 0.5], [-2, 2]);

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) - 0.5);
    my.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
    hover.set(0);
  };

  const card = project.card;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={(e) => !reduced && e.pointerType === "mouse" && hover.set(1)}
      onPointerLeave={reset}
      style={reduced ? undefined : { rotateX, rotateY, x, y, transformPerspective: 1400 }}
      className={cn("h-full", className)}
    >
      <Link
        to={langPath(lang, `/work/${projectSlug(project, lang)}`)}
        className="group flex h-[420px] flex-col overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,30,50,0.05),0_10px_28px_-16px_rgba(20,30,50,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_2px_4px_rgba(20,30,50,0.06),0_16px_34px_-16px_rgba(49,87,246,0.22),inset_0_1px_0_rgba(255,255,255,0.85)]"
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] text-accent">
            {index}
          </span>
          <span className="text-right font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">
            {pick(card.category, lang)}
          </span>
        </div>

        <h2 className="mt-4 font-heading text-lg font-bold leading-tight tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-accent-deep">
          {pick(project.title, lang)}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {pick(card.description, lang)}
        </p>

        <div className="relative mt-4 min-h-[104px] flex-1">
          <motion.div
            style={reduced ? undefined : { x: innerX, y: innerY }}
            className="flex h-full items-center justify-center"
          >
            {children}
          </motion.div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {card.signals.slice(0, 3).map((sig) => (
            <li
              key={pick(sig, lang)}
              className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
            >
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
              {pick(sig, lang)}
            </li>
          ))}
        </ul>

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
          {viewProject}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]"
          />
        </span>
      </Link>
    </motion.div>
  );
}