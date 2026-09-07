import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MONO } from "./serviceBits";

/**
 * Local chapter navigation for dedicated service pages — a thin sticky
 * rail on desktop only. It
 * follows the reader with IntersectionObserver (no scroll listeners)
 * and stays out of the way: mono labels, one accent underline. Its top
 * is the header's published height, so it sits flush under the site
 * header and rises to the top edge when the header slides away.
 */
export default function ServiceNav({ items, label }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : Infinity));
        let best = null;
        let bestTop = Infinity;
        seen.forEach((top, id) => { if (top < bestTop) { bestTop = top; best = id; } });
        if (best) setActive(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    items.forEach((it) => { const el = document.getElementById(it.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav
      aria-label={label}
      style={{ top: "var(--header-offset, 56px)" }}
      className="sticky z-30 hidden border-y border-border bg-white/85 backdrop-blur-md transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block"
    >
      <ul className="mx-auto flex max-w-[1440px] items-center gap-0.5 overflow-x-auto px-6 xl:gap-1 xl:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id} className="shrink-0">
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  MONO,
                  "relative block px-2 py-3 tracking-[0.1em] outline-none xl:px-3 xl:tracking-[0.16em] transition-colors focus-visible:text-accent",
                  on ? "text-accent" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {it.label}
                <span aria-hidden="true" className={cn("absolute inset-x-2 -bottom-px xl:inset-x-3 h-[2px] bg-accent transition-opacity duration-300", on ? "opacity-100" : "opacity-0")} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
