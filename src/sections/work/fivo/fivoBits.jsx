import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared pieces of the Fivo case study — chapter shell, editorial
 * heading, real-screenshot frame, code panel and small labels. The
 * visual language is Fivo's own: white and pale-blue chapters, cobalt
 * accents, graphite product surfaces, precise 1px borders.
 */

const TONES = {
  page: "bg-background",
  white: "bg-white",
  blue: "bg-[#F2F5FA]",
  tint: "bg-[#EEF3FF]",
};

export function Chapter({ tone = "page", className = "", children, ...rest }) {
  return (
    <section
      className={cn("border-t border-border px-5 py-16 md:px-10 md:py-24", TONES[tone], className)}
      {...rest}
    >
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <p className={cn("text-xs font-medium uppercase tracking-[0.22em] text-accent", className)}>
      {children}
    </p>
  );
}

export function ChapterHead({ kicker, title, intro, wide = false, className = "" }) {
  return (
    <Reveal className={className}>
      <Kicker>{kicker}</Kicker>
      <h2
        className={cn(
          "mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl",
          wide ? "max-w-4xl" : "max-w-3xl"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/* Intrinsic sizes of the sanitized assets in /public/work/fivo (for CLS). */
export const SHOTS = {
  "checkout-network": [640, 1350],
  "checkout-confirm": [646, 924],
  "checkout-processing": [652, 692],
  "checkout-complete": [652, 690],
  "product-button": [678, 1170],
  "cart-checkout": [914, 1550],
  "checkout-light": [772, 1528],
  "crosschain-progress-light": [758, 812],
  "demo-store-light": [2400, 1260],
  "merchant-dashboard": [2400, 1200],
  invoice: [1270, 760],
  "fivo-icon": [256, 256],
};

/** A real product screenshot in a quiet frame. */
export function Shot({ id, alt, className = "", frame = true, priority = false, style = undefined }) {
  const [w, h] = SHOTS[id];
  return (
    <img
      src={`/work/fivo/${id}.webp`}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={style}
      className={cn(
        "block h-auto w-full",
        frame && "rounded-xl border border-[#E1E5EF] shadow-[0_24px_60px_-28px_rgba(12,18,32,0.35)]",
        className
      )}
    />
  );
}

export function Mono({ children, className = "" }) {
  return (
    <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground", className)}>
      {children}
    </span>
  );
}

export function Tag({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/80",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CheckItem({ children, className = "" }) {
  return (
    <li className={cn("flex items-start gap-2.5 text-sm leading-relaxed text-[#4A5164]", className)}>
      <span aria-hidden="true" className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

/* Minimal token colouring for the sanitized snippets: strings, comments, tags. */
const TOKEN = /("[^"]*"|'[^']*'|#[^\n]*|<\/?[a-z-]+|\b(curl|POST|GET)\b)/g;
const colour = (t) => {
  if (t.startsWith("#")) return "text-[#7C8AA5]";
  if (t.startsWith('"') || t.startsWith("'")) return "text-[#9DB8FF]";
  if (t.startsWith("<")) return "text-[#8FD3FF]";
  return "text-[#C9B8FF]";
};

export function Code({ label, code, className = "" }) {
  const parts = code.split(TOKEN).filter((p) => p !== undefined && p !== "");
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-xl border border-[#1B2340] bg-[#0F1524] text-left shadow-[0_30px_60px_-30px_rgba(12,18,32,0.5)]", className)}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">{label}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-[1.7] text-[#D6DCEA] md:px-5">
        <code>
          {parts.map((p, i) =>
            TOKEN.test(p) && !/^(curl|POST|GET)$/.test(p) ? (
              <span key={i} className={colour(p)}>{p}</span>
            ) : /^(curl|POST|GET)$/.test(p) ? (
              <span key={i} className="text-[#C9B8FF]">{p}</span>
            ) : (
              <span key={i}>{p}</span>
            )
          )}
        </code>
      </pre>
    </div>
  );
}
