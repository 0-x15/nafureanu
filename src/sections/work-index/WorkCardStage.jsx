import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/work/ProjectCard";
import { cn } from "@/lib/utils";
import { MONO, Rule } from "./workBits";

/**
 * Act 02 — the exhibition room. The rail along the top, then the four
 * project cards — untouched — placed in a real room: a floor drawn in
 * perspective that recedes behind them, one wide cobalt light across
 * the wall, a spotlight under each piece, an oversized cropped "04"
 * on the wall and registration marks in the corners. The cards are the
 * only catalogue; the room only holds them.
 */
export default function WorkCardStage({ lang, t, entries, viewProject }) {
  return (
    <section aria-label={t.kicker} className="relative overflow-hidden px-5 pb-28 pt-8 md:px-10 md:pb-36 md:pt-10">
      {/* the room */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-0 bg-white/40" />
        {/* the wall light */}
        <span className="absolute left-1/2 top-[40%] h-[64%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.1),transparent)] blur-2xl" />
        {/* the floor: a perspective plane of lines receding under the cards */}
        <span className="absolute inset-x-0 bottom-0 h-[46%] [perspective:900px]">
          <span className="absolute inset-x-[-30%] bottom-[-10%] top-0 origin-bottom [transform:rotateX(62deg)] bg-[linear-gradient(90deg,rgba(27,31,42,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(27,31,42,0.12)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.55),transparent_85%)]" />
        </span>
        <span className="absolute left-5 top-8 h-3 w-3 border-l border-t border-foreground/25 md:left-10" />
        <span className="absolute right-5 top-8 h-3 w-3 border-r border-t border-foreground/25 md:right-10" />
        <span className="absolute bottom-10 left-5 h-3 w-3 border-b border-l border-foreground/25 md:left-10" />
        <span className="absolute bottom-10 right-5 h-3 w-3 border-b border-r border-foreground/25 md:right-10" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the rail */}
        <div className="flex items-baseline justify-between gap-6">
          <p className={cn(MONO, "text-foreground")}>{t.stage.marker}</p>
          <p className={cn(MONO, "text-muted-foreground")}>{t.stage.meta}</p>
        </div>
        <Rule className="mt-3 bg-foreground/15" />

        {/* the pieces, exactly as they are, each on its spotlight */}
        <div className="relative mx-auto mt-14 w-full max-w-[1280px] md:mt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-16 hidden grid-cols-4 gap-5 lg:grid">
            {entries.map((e) => (
              <span key={e.project.slug} className="h-24 rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.16),transparent)] blur-xl" />
            ))}
          </div>
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {entries.map((entry, i) => (
              <Reveal key={entry.project.slug} delay={i * 0.08}>
                <ProjectCard project={entry.project} index={String(i + 1).padStart(2, "0")} lang={lang} viewProject={viewProject}>
                  {entry.visual(lang)}
                </ProjectCard>
              </Reveal>
            ))}
          </div>
          {/* the floor line, where the pieces stand */}
          <Rule className="mt-10 bg-foreground/15" delay={0.2} />
        </div>
      </div>
    </section>
  );
}
