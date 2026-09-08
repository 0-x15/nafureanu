import { cn } from "@/lib/utils";
import { SERIF } from "./webBits";

/*
 * The construction specimen: a compact editorial page composed in three
 * vertical bands so a vertical divider reveals its layers spatially.
 * Left: semantics, content, component. Centre: grid, media. Right:
 * interaction, performance, accessibility. The blueprint keeps the exact
 * layout and swaps paint for outlines and layer chips.
 */
export default function BuildSpecimen({ s, layers, blueprint = false, hot = undefined }) {
  const L = Object.fromEntries(layers.map((l) => [l.id, l]));
  const region = (id, extra = "") => ({ "data-region": id, "data-hot": hot === id ? "true" : "false", className: cn("wd-region relative", blueprint && "pt-[1.9em]", extra) });
  const chip = (id, side = "left") => blueprint && <span className={cn("pointer-events-none absolute top-[0.25em] z-10 max-w-[96%] truncate px-[0.4em] py-[0.15em] font-mono text-[0.4em] uppercase tracking-[0.12em] transition-colors", side === "left" ? "left-[0.25em]" : "right-[0.25em]", hot === id ? "bg-[#2563EB] text-white" : "bg-white text-[#2563EB] outline outline-1 outline-[#2563EB]/40")}>{L[id].label} · {L[id].tag}</span>;
  return (
    <div className={cn("h-full w-full overflow-hidden text-[12.5px] sm:text-[13px] md:text-[15px] lg:text-[16px]", blueprint ? "wd-blue text-[#1B1F2A]/50" : "bg-[#F6F3EC] text-[#1C1B19]")} aria-hidden="true">
      <div className={cn("grid h-full grid-cols-[1.1fr_1.2fr] gap-x-[4%] px-[4%] pb-[3%] sm:grid-cols-[1.1fr_1.4fr_0.9fr] sm:gap-x-[3%]", blueprint ? "pt-[2%]" : "pt-[3%]")}>
        {/* left band */}
        <div className="flex min-w-0 flex-col">
          <div {...region("semantics", "pb-[0.6em]")}>{chip("semantics")}
            <span className={cn(SERIF, "text-[1.05em] font-semibold")}>{s.brand}</span>
            <span className="ml-[1em] font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-60">{s.nav.join(" · ")}</span>
          </div>
          <div {...region("content", "mt-[1.6em]")}>{chip("content")}
            <p className="font-mono text-[0.42em] uppercase tracking-[0.2em] opacity-60">{s.kicker}</p>
            <h4 className={cn(SERIF, "mt-[0.4em] max-w-[14ch] text-[1.9em] font-medium leading-[1.02] tracking-[-0.02em]")}>{s.title}</h4>
            <p className="mt-[0.9em] max-w-[30ch] text-[0.66em] leading-[1.55] opacity-80">{s.lead}</p>
          </div>
          <div {...region("component", "mt-auto pt-[1em]")}>{chip("component")}
            <span className={cn("inline-flex items-center gap-2 px-[1.1em] py-[0.6em] text-[0.6em] font-semibold", blueprint ? "border border-[#2563EB]/60 text-[#2563EB] outline outline-2 outline-offset-2 outline-[#2563EB]/40" : "bg-[#1C1B19] text-white")}>{s.cta} <span>↗</span></span>
            <span className="ml-[1em] text-[0.55em] opacity-70 underline underline-offset-4 decoration-current/30">{s.secondary}</span>
          </div>
        </div>
        {/* centre band */}
        <div {...region("grid", "flex min-w-0 flex-col")}>{chip("grid", "right")}
          {blueprint && <span className="pointer-events-none absolute inset-0 grid grid-cols-6 gap-[3%]">{Array.from({ length: 6 }).map((_, i) => <i key={i} className="block h-full border-x border-[#2563EB]/20" />)}</span>}
          <div {...region("media", "relative flex-1 overflow-hidden")}>{chip("media")}
            <span className={cn("absolute inset-0", blueprint ? "" : "wd-plate")} />
            {blueprint && <span className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),rgba(37,99,235,0.35),transparent_calc(50%+0.5px)),linear-gradient(to_top_left,transparent_calc(50%-0.5px),rgba(37,99,235,0.35),transparent_calc(50%+0.5px))]" />}
            <span className={cn("absolute bottom-[4%] left-[4%] font-mono text-[0.42em] uppercase tracking-[0.16em]", blueprint ? "text-[#2563EB]" : "text-white/85")}>{s.mediaCaption}</span>
          </div>
          <p className="mt-[0.8em] font-mono text-[0.4em] uppercase tracking-[0.14em] opacity-60">{s.mediaNote}</p>
        </div>
        {/* right band */}
        <div className="hidden min-w-0 flex-col gap-[1.2em] sm:flex">
          <div {...region("interaction", cn("border-t border-current/15", !blueprint && "pt-[0.8em]"))}>{chip("interaction")}
            {!blueprint && <span className="font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-60">{s.side[0].label}</span>}
            <p className="mt-[0.3em] text-[0.62em] leading-snug">{s.side[0].text}</p>
          </div>
          <div {...region("performance", cn("border-t border-current/15", !blueprint && "pt-[0.8em]"))}>{chip("performance")}
            {!blueprint && <span className="font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-60">{s.side[1].label}</span>}
            <p className="mt-[0.3em] text-[0.62em] leading-snug">{s.side[1].text}</p>
          </div>
          <div {...region("a11y", cn("mt-auto border-t border-current/15", !blueprint && "pt-[0.8em]"))}>{chip("a11y")}
            {!blueprint && <span className="font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-60">{s.side[2].label}</span>}
            <p className="mt-[0.3em] text-[0.62em] leading-snug">{s.side[2].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
