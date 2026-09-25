import { cn } from "@/lib/utils";

/**
 * Monumental stacked typography. The size is derived from the longest
 * line so any language fits the available width without measuring. Each
 * line after the first starts with a space so the heading reads as words
 * in the DOM ("Experiencias digitales seleccionadas"), not as one token;
 * the lines are block boxes, so the space never renders.
 */
export default function KineticTitle({ lines, as = "h1", className = "", lineAttr = "", maxVw = 12, availVw = 78, lgMaxVw = undefined, lgAvailVw = undefined, factor = 0.66, attrs = {} }) {
  /** @type {any} */
  const Tag = as;
  const maxLen = Math.max(...lines.map((l) => l.length));
  const size = (max, avail) => `min(${max}vw, calc(${avail}vw / ${(factor * maxLen).toFixed(2)}))`;
  /** @type {any} */
  const style = { "--kt-size": size(maxVw, availVw), "--kt-size-lg": size(lgMaxVw ?? maxVw, lgAvailVw ?? availVw) };
  return (
    <Tag className={cn("wpx-kinetic", className)} style={style} {...attrs}>
      {lines.map((l, i) => (
        <span key={l} className="wpx-kinetic-line" {...(lineAttr ? { [lineAttr]: i } : {})}>
          {i > 0 ? " " : ""}
          {l}
        </span>
      ))}
    </Tag>
  );
}
