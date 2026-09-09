import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  upRight: ArrowUpRight,
  right: ArrowRight,
};

const SIZES = {
  lg: "px-6 py-3.5",
  md: "px-5 py-3",
  sm: "px-4 py-2",
};

const BITS = 14; // pieces of matter around each action
const NEAR = 28; // px from the plate's edge where the button is fully assembled
const FAR = 170; // px where the matter starts to gather

/* ── one shared pointer listener for every action on the page ───── */
const fields = new Set();
let raf = 0;
let pointer = null;
const rectOf = (el) => el.getBoundingClientRect();
function update() {
  raf = 0;
  if (!pointer) return;
  fields.forEach((f) => {
    const r = rectOf(f.el);
    const cx = Math.max(r.left, Math.min(pointer.x, r.right));
    const cy = Math.max(r.top, Math.min(pointer.y, r.bottom));
    const d = Math.hypot(pointer.x - cx, pointer.y - cy);
    const k = Math.max(0, Math.min(1, 1 - (d - NEAR) / (FAR - NEAR)));
    if (Math.abs(k - f.k) < 0.005) return;
    f.k = k;
    const s = f.el.style;
    s.setProperty("--k", k.toFixed(3));
    // lean a little towards the hand
    const mx = ((pointer.x - (r.left + r.width / 2)) / r.width) * 4 * k;
    const my = ((pointer.y - (r.top + r.height / 2)) / r.height) * 3 * k;
    s.setProperty("--mx", mx.toFixed(2));
    s.setProperty("--my", my.toFixed(2));
  });
}
function onMove(e) {
  pointer = { x: e.clientX, y: e.clientY };
  if (!raf) raf = window.requestAnimationFrame(update);
}
function watch(field) {
  if (fields.size === 0) window.addEventListener("pointermove", onMove, { passive: true });
  fields.add(field);
  return () => {
    fields.delete(field);
    if (fields.size === 0) window.removeEventListener("pointermove", onMove);
  };
}

const rnd = (a, b) => a + Math.random() * (b - a);

/** Scatter for each piece: a random direction and distance, a random tilt. */
function scatter() {
  return Array.from({ length: BITS }, () => {
    // an elliptical field: wide along the line of the action, shallow above and below it
    const angle = rnd(0, Math.PI * 2);
    const dist = rnd(44, 96);
    return { sx: Math.cos(angle) * dist, sy: Math.sin(angle) * dist * 0.5, sr: rnd(-70, 70) };
  });
}

/** Slots on the plate's edge, 6px outside it: pieces lie along the edge. */
function slots(w, h) {
  const out = 6;
  const W = w + out * 2;
  const H = h + out * 2;
  const P = 2 * (W + H);
  return Array.from({ length: BITS }, (_, i) => {
    const t = ((i + 0.5) / BITS) * P;
    if (t < W) return { tx: -W / 2 + t, ty: -H / 2, tr: 0 };
    if (t < W + H) return { tx: W / 2, ty: -H / 2 + (t - W), tr: 90 };
    if (t < 2 * W + H) return { tx: W / 2 - (t - W - H), ty: H / 2, tr: 0 };
    return { tx: -W / 2, ty: H / 2 - (t - 2 * W - H), tr: 90 };
  });
}

/**
 * The Nafureanu action — matter that assembles. At rest only the word;
 * as the pointer comes near, fourteen pieces converge from their
 * scatter to their slot on the plate's edge and the glass plate fades
 * in around the word (see .action-field in index.css). Renders a router
 * Link, or a <button> when `as="button"`. variant: "primary" | "secondary"
 * | "text" (a quiet inline link). "action-quiet" in className is the
 * compact header form, already assembled.
 * @param {{ to?: string, children: import("react").ReactNode, variant?: "primary" | "secondary" | "text", icon?: "upRight" | "right", size?: "lg" | "md" | "sm", className?: string, as?: "button", type?: "button" | "submit", onClick?: () => void }} props
 */
export default function ActionLink({
  to = "#",
  children,
  variant = "primary",
  icon = variant === "secondary" ? "right" : "upRight",
  size = "lg",
  className = "",
  as = undefined,
  type = "button",
  onClick = undefined,
}) {
  const Icon = ICONS[icon];
  const ref = useRef(null);
  const plateRef = useRef(null);
  const [geom, setGeom] = useState(/** @type {{tx:number,ty:number,tr:number}[]} */ ([]));
  const [launch, setLaunch] = useState(false);
  const bits = useMemo(scatter, []);
  const quiet = /\baction-quiet\b/.test(className);

  // measure the plate to place the slots, then watch the pointer
  useEffect(() => {
    if (variant === "text" || quiet) return undefined;
    const plate = plateRef.current;
    const field = ref.current;
    if (!plate || !field) return undefined;
    const measure = () => setGeom(slots(plate.offsetWidth, plate.offsetHeight));
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(plate);
    const unwatch = watch({ el: field, k: -1 });
    return () => { ro?.disconnect(); unwatch(); };
  }, [variant, quiet]);

  if (variant === "text") {
    return (
      <Link to={to} className={cn("group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.005em] text-accent transition-colors hover:text-accent-deep", className)}>
        {children}
        {Icon && <Icon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", icon === "upRight" ? "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" : "group-hover:translate-x-[2px]")} />}
      </Link>
    );
  }

  const fieldCls = cn("action-field", variant === "primary" ? "action-field-primary" : "action-field-secondary", quiet && "action-field-quiet", launch && "is-launch", className.replace(/\baction-quiet\b/, ""));
  const cls = cn("action", SIZES[size]);
  const fire = () => { setLaunch(true); window.setTimeout(() => setLaunch(false), 500); if (onClick) onClick(); };
  const inner = (
    <>
      <span>{children}</span>
      {Icon && <Icon aria-hidden="true" className="action__arrow h-4 w-4" />}
    </>
  );

  return (
    <span ref={ref} className={fieldCls}>
      {geom.map((g, i) => (
        <i
          key={i}
          aria-hidden="true"
          className="action__bit"
          style={/** @type {any} */ ({ "--tx": `${g.tx.toFixed(1)}px`, "--ty": `${g.ty.toFixed(1)}px`, "--tr": `${g.tr}deg`, "--sx": `${bits[i].sx.toFixed(1)}px`, "--sy": `${bits[i].sy.toFixed(1)}px`, "--sr": `${bits[i].sr.toFixed(0)}deg` })}
        />
      ))}
      {as === "button" ? (
        <button ref={plateRef} type={type} onClick={fire} className={cls}>{inner}</button>
      ) : (
        <Link ref={plateRef} to={to} onClick={fire} className={cls}>{inner}</Link>
      )}
    </span>
  );
}
