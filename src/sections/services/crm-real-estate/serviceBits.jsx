import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Shared pieces of the service pages: chapters, heads and small type. */
const TONES = { page: "bg-background", white: "bg-white", blue: "bg-[#F2F5FA]" };

export const KICKER = "text-xs font-medium uppercase tracking-[0.22em] text-accent";
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";

export function Chapter({ tone = "page", className = "", children, ...rest }) {
  return (
    <section className={cn("border-t border-border px-5 py-16 md:px-10 md:py-24", TONES[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function ChapterHead({ kicker, title, titleMuted = undefined, intro = undefined, id = undefined, className = "" }) {
  return (
    <Reveal className={className}>
      <p className={KICKER}>{kicker}</p>
      <h2 id={id} className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground md:text-5xl [text-wrap:balance]">
        {titleMuted && <span className="block text-muted-foreground">{titleMuted}</span>}
        <span className="block">{title}</span>
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function Num({ n, className = "" }) {
  return <span className={cn("font-mono text-[11px] tracking-[0.18em] text-accent", className)}>{String(n).padStart(2, "0")}</span>;
}
