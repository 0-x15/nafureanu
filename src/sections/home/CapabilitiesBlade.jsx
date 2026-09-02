import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CAPABILITIES } from "@/data/capabilities";
import { cn } from "@/lib/utils";

/**
 * The Vertical Accordion Blade: on desktop, hovering a blade expands it to
 * ~60% of the row while the others compress; on mobile the capabilities
 * stack as always-readable rows.
 */
export default function CapabilitiesBlade() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="capabilities-title">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
            <span className="text-[#E63946]">02</span> — Capabilities
          </p>
          <h2
            id="capabilities-title"
            className="mt-6 font-heading text-4xl font-bold tracking-[-0.02em] md:text-6xl"
          >
            How we solve.
          </h2>
        </div>
        <Link
          to="/services"
          className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#E63946] md:inline-flex"
        >
          All capabilities →
        </Link>
      </div>

      <div className="mt-12 flex flex-col border-y border-[#E0E0DE] md:h-[78vh] md:min-h-[600px] md:flex-row">
        {CAPABILITIES.map((cap, i) => {
          const isActive = active === i;
          return (
            <div
              key={cap.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-full overflow-hidden border-[#E0E0DE] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                "border-t first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0",
                isActive
                  ? "grow-[3] md:shadow-[inset_3px_0_0_0_#E63946]"
                  : "grow md:shadow-[inset_1px_0_0_0_transparent]"
              )}
            >
              {/* Collapsed vertical label (desktop) */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 hidden items-start justify-center pt-8 transition-opacity duration-500 md:flex",
                  isActive ? "opacity-0" : "opacity-100 delay-300"
                )}
              >
                <span className="[writing-mode:vertical-rl] font-mono text-[11px] uppercase tracking-[0.2em] text-[#121212]">
                  <span className="text-[#E63946]">{cap.num}</span> · {cap.title}
                </span>
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex h-full flex-col justify-between p-6 transition-opacity duration-500 md:p-10",
                  isActive ? "opacity-100" : "opacity-100 md:opacity-0"
                )}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
                    <span className="text-[#E63946]">{cap.num}</span> / 06
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-bold tracking-[-0.02em] md:text-3xl lg:text-4xl">
                    {cap.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5C5C58] md:text-base">
                    {cap.short}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-[#E0E0DE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#848482]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/services"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#121212] transition-colors hover:text-[#E63946]"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}