import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, Frame, Kicker, Number, Shot } from "./wpBits";

/**
 * Selected-work index — four compact rows that navigate to their
 * chapter. Hovering or focusing a row swaps the preview beside the
 * list; the preview is decoration, the rows carry the information.
 */
export default function WebProjectsIndex({ c }) {
  const [active, setActive] = useState(c.projects[0].id);
  const reduce = useReducedMotion();
  const current = c.projects.find((p) => p.id === active) || c.projects[0];
  return (
    <Chapter tone="white" aria-labelledby="wp-index">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <Kicker>{c.index.kicker}</Kicker>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{c.index.hint}</span>
            </div>
            <ol className="mt-5 border-t border-border" id="wp-index">
              {c.projects.map((p, i) => (
                <li key={p.id}>
                  <a
                    href={`#wp-${p.id}`}
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    className={cn("group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-border py-5 transition-colors md:grid-cols-[3.5rem_1.2fr_1fr_auto]", active === p.id ? "text-foreground" : "text-foreground/80")}
                  >
                    <Number n={i + 1} />
                    <span className="font-heading text-xl font-bold tracking-[-0.01em] md:text-2xl">{p.name}</span>
                    <span className="hidden text-sm text-muted-foreground md:block">{p.category}</span>
                    <ArrowDownRight className={cn("h-4 w-4 transition-all", active === p.id ? "translate-x-0 text-accent opacity-100" : "-translate-x-1 opacity-30")} />
                    <span className="col-span-3 -mt-2 text-sm text-muted-foreground md:hidden">{p.category}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.08} className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{c.index.preview} · {current.name}</p>
            <Frame host={current.host} dark={current.id === "mp-monitor"}>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F2ED]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Shot project={current.id} id="desktop" alt={current.images.desktop} className="h-full w-full object-cover object-top" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Frame>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
