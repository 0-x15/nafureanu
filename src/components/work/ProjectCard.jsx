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
import { langPath, pick } from "@/i18n";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 170, damping: 20, mass: 0.75 };

/**
 * Editorial project card resting on a controlled spring: the surface
 * tilts a couple of degrees toward the pointer and lifts slightly.
 * Reduced motion disables the tilt; touch devices skip it entirely —
 * the card stays fully functional without hover.
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

  const rotateY = useTransform(sx, [-0.5, 0.5], [-2.5, 2.5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [2, -2]);
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
      style={reduced ? undefined : { rotateX, rotateY, y, transformPerspective: 1400 }}
      className={cn("h-full", className)}
    >
      <Link
        to={langPath(lang, `/work/${project.slug}`)}
        className="group flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[0_2px_10px_-6px_rgba(20,30,50,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-accent/45 hover:shadow-[0_24px_48px_-24px_rgba(49,87,246,0.28)] md:min-h-[440px] md:p-8"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] text-muted-foreground/70">
            {index}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {pick(card.category, lang)}
          </span>
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-accent-deep md:text-3xl">
          {pick(project.title, lang)}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {pick(card.description, lang)}
        </p>

        <div className="relative mt-6 flex-1">
          <motion.div
            style={reduced ? undefined : { x: innerX, y: innerY }}
            className="flex h-full items-center justify-center py-2"
          >
            {children}
          </motion.div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
          {card.signals.map((sig) => (
            <li
              key={pick(sig, lang)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
              {pick(sig, lang)}
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
          {viewProject}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}