import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared pieces of the Life Admin case study. The visual language is
 * the product's own: warm paper and sand grounds, graphite text,
 * Fraunces display serif for titles, and the app's calm status
 * colours (terracotta, amber, moss, stone) — not the cobalt-heavy
 * language of the other case studies.
 */
/* Kept outside cn(): tailwind-merge would drop this arbitrary family when a weight class follows. */
export const DISPLAY = "font-[Fraunces,Georgia,serif]";
export const INK = "#201F1D";

const TONES = {
  page: "bg-background",
  paper: "bg-[#F9F8F4]",
  sand: "bg-[#F1EEE9]",
  white: "bg-white",
};

export const STATUS = {
  urgent: { text: "text-[#BD4E32]", bg: "bg-[#FBEFEA]", dot: "bg-[#BD4E32]", border: "border-[#F0D5CB]" },
  today: { text: "text-[#B67520]", bg: "bg-[#FBF3E6]", dot: "bg-[#B67520]", border: "border-[#EEDDBF]" },
  week: { text: "text-[#4F7267]", bg: "bg-[#EAF1EE]", dot: "bg-[#4F7267]", border: "border-[#CFE0D9]" },
  soon: { text: "text-[#706B66]", bg: "bg-[#F1EEE9]", dot: "bg-[#928C86]", border: "border-[#E8E4DE]" },
};

export function Chapter({ tone = "page", className = "", children, ...rest }) {
  return (
    <section className={cn("border-t border-[#E8E4DE] px-5 py-16 md:px-10 md:py-24", TONES[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function Kicker({ children, className = "" }) {
  return <p className={cn("text-xs font-medium uppercase tracking-[0.22em] text-accent", className)}>{children}</p>;
}

export function ChapterHead({ kicker, title, intro, wide = false, className = "" }) {
  return (
    <Reveal className={className}>
      <Kicker>{kicker}</Kicker>
      <h2 className={`${DISPLAY} ${cn("mt-4 text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-[#201F1D] md:text-5xl", wide ? "max-w-4xl" : "max-w-3xl")}`}>
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#706B66] md:text-lg">{intro}</p>}
    </Reveal>
  );
}

/* Intrinsic sizes of the sanitized captures in /public/work/life-admin (identical in both languages). */
export const SHOTS = {
  dashboard: [2400, 1383],
  subscriptions: [2400, 1383],
  purchase: [2000, 1383],
  question: [1558, 254],
  upcoming: [1520, 1680],
  import: [1700, 1050],
  privacy: [1220, 1440],
  ask: [1700, 1150],
};

/** A real product capture, in the language of the page. */
export function Shot({ id, lang = "es", alt, className = "", frame = true, priority = false }) {
  const [w, h] = SHOTS[id];
  return (
    <img
      src={`/work/life-admin/${id}.${lang}.webp`}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-auto w-full", frame && "rounded-xl border border-[#E8E4DE] shadow-[0_24px_60px_-30px_rgba(32,31,29,0.35)]", className)}
    />
  );
}

/**
 * On phones a full application capture would be unreadable; this shows
 * its top-left region enlarged inside a 4:3 window and the whole
 * capture from md up.
 */
export function Window({ id, lang, alt, className = "", priority = false }) {
  return (
    <div className={cn("max-md:aspect-[4/3] max-md:overflow-hidden max-md:rounded-xl max-md:border max-md:border-[#E8E4DE] max-md:bg-white max-md:shadow-[0_24px_60px_-30px_rgba(32,31,29,0.35)]", className)}>
      <Shot id={id} lang={lang} alt={alt} priority={priority} className="max-md:w-[210%] max-md:max-w-none max-md:rounded-none max-md:border-0 max-md:shadow-none" />
    </div>
  );
}

export function Mono({ children, className = "" }) {
  return <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em] text-[#928C86]", className)}>{children}</span>;
}

export function Pill({ tone = "soon", children, className = "" }) {
  const t = STATUS[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", t.bg, t.text, t.border, className)}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
      {children}
    </span>
  );
}

export function Card({ className = "", children }) {
  return <div className={cn("rounded-xl border border-[#E8E4DE] bg-white", className)}>{children}</div>;
}
