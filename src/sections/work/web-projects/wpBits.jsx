import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared pieces of the web-projects showcase. The shell stays neutral
 * (white, warm neutral, a little #F2F5FA) so that each project's own
 * colours come from its screenshots; frames are quiet and large.
 */
const TONES = { page: "bg-background", white: "bg-white", blue: "bg-[#F2F5FA]" };

export function Chapter({ tone = "page", className = "", children, ...rest }) {
  return (
    <section className={cn("border-t border-border px-5 py-16 md:px-10 md:py-24", TONES[tone], className)} {...rest}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function Kicker({ children, className = "" }) {
  return <p className={cn("text-xs font-medium uppercase tracking-[0.22em] text-accent", className)}>{children}</p>;
}

export function ChapterHead({ kicker, title, intro, className = "" }) {
  return (
    <Reveal className={className}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">{title}</h2>
      {intro && <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

/* Intrinsic sizes of the captures in /public/work/web-projects/<project>/<id>.webp */
export const SIZES = {
  "dd-evecom": { desktop: [2400, 1500], tall: [2000, 3750], mobile: [780, 1688], detail: [2000, 1250] },
  "dental-goya": { desktop: [2400, 1500], tall: [2160, 3600], mobile: [780, 1688], detail: [2000, 1250] },
  "reformas-octavian": { desktop: [2400, 1500], detail: [2000, 1250], detail2: [2000, 1250], mobile: [780, 1688] },
  "mp-monitor": { desktop: [2400, 1500], detail: [2000, 1250], mobile: [780, 1688] },
};

/** A real capture of a live site. */
export function Shot({ project, id, alt, className = "", priority = false, style = undefined }) {
  const [w, h] = SIZES[project][id];
  return (
    <img
      src={`/work/web-projects/${project}/${id}.webp`}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={style}
      className={cn("block h-auto w-full", className)}
    />
  );
}

/**
 * A quiet browser frame: thin border, a minimal chrome bar with the
 * host name, very soft shadow. `dark` for application surfaces.
 */
export function Frame({ host = undefined, dark = false, chrome = true, className = "", children }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border shadow-[0_30px_70px_-40px_rgba(12,18,32,0.35)]", dark ? "border-[#1E2432] bg-[#0B0F17]" : "border-[#E3E0D8] bg-white", className)}>
      {chrome && (
        <div className={cn("flex items-center gap-2 border-b px-3 py-2", dark ? "border-white/10 bg-[#10151F]" : "border-[#EFEBE3] bg-[#FAF8F3]")}>
          <span aria-hidden="true" className="flex gap-1">
            {[0, 1, 2].map((i) => <span key={i} className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-white/15" : "bg-[#DEDAD0]")} />)}
          </span>
          {host && <span className={cn("ml-1 rounded px-2 py-0.5 font-mono text-[9px] tracking-[0.04em]", dark ? "bg-white/[0.06] text-white/50" : "bg-white text-[#9A94A6]")}>{host}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/** A phone-sized frame without a fake device bezel: just a narrow rounded window. */
export function PhoneFrame({ className = "", children }) {
  return <div className={cn("overflow-hidden rounded-[18px] border border-[#E3E0D8] bg-white shadow-[0_24px_50px_-28px_rgba(12,18,32,0.45)]", className)}>{children}</div>;
}

/**
 * Full-page preview: a tall capture inside a fixed 16:10 viewport. On
 * hover or keyboard focus it slowly travels to the bottom of the page
 * and back; under prefers-reduced-motion it stays on the homepage top.
 * `reveal` is the share of the image height hidden below the viewport.
 */
export function ScrollFrame({ project, alt, host, reveal, label }) {
  return (
    <div
      tabIndex={0}
      aria-label={label}
      className="group relative rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2"
    >
      <Frame host={host}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Shot
            project={project}
            id="tall"
            alt={alt}
            style={{ "--reveal": `-${reveal}%` }}
            className="motion-safe:transition-transform motion-safe:duration-[9000ms] motion-safe:ease-[cubic-bezier(0.4,0,0.6,1)] motion-safe:group-hover:translate-y-[var(--reveal)] motion-safe:group-focus-visible:translate-y-[var(--reveal)]"
          />
        </div>
      </Frame>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[#E3E0D8] bg-white/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9A94A6] opacity-0 transition-opacity motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100">
        {label}
      </span>
    </div>
  );
}

export function VisitLink({ href, host, label, hint, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-center gap-2 rounded-[6px] border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent", className)}
    >
      {label}
      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-accent/80">{host}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
      <span className="sr-only">({hint})</span>
    </a>
  );
}

export function Signal({ children }) {
  return <li className="rounded-full border border-border bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/75">{children}</li>;
}

export function Number({ n, className = "" }) {
  return <span className={cn("font-mono text-[11px] tracking-[0.16em] text-accent", className)}>{String(n).padStart(2, "0")}</span>;
}
