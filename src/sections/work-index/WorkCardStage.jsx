import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/work/ProjectCard";
import { cn } from "@/lib/utils";
import { MONO, Rule } from "./workBits";

/**
 * Act 02 — the exhibition. One editorial marker, then the four project
 * cards — untouched — in a designed room: a clean field, one large
 * blurred cobalt light crossing behind the middle of the row, an
 * oversized cropped "04" in the background, registration marks and a
 * faint floor line beneath. The cards are the only catalogue.
 */
export default function WorkCardStage({ lang, t, entries, viewProject }) {
  return (
    <section aria-label={t.kicker} className="relative overflow-hidden px-5 pb-24 pt-8 md:px-10 md:pb-32 md:pt-10">
      {/* the room */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-0 bg-white/35" />
        <span className="absolute left-1/2 top-[46%] h-[70%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)] blur-2xl" />
        <span className="absolute -left-10 bottom-[-6%] hidden select-none font-heading text-[26rem] font-bold leading-none tracking-[-0.06em] text-foreground/[0.03] lg:block">04</span>
        <span className="absolute left-5 top-8 h-3 w-3 border-l border-t border-foreground/25 md:left-10" />
        <span className="absolute right-5 top-8 h-3 w-3 border-r border-t border-foreground/25 md:right-10" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the marker */}
        <div className="flex items-baseline justify-between gap-6">
          <p className={cn(MONO, "text-foreground")}>{t.stage.marker}</p>
          <p className={cn(MONO, "text-muted-foreground")}>{t.stage.meta}</p>
        </div>
        <Rule className="mt-3 bg-foreground/15" />

        {/* the cards, exactly as they are */}
        <div className="mx-auto mt-12 grid w-full max-w-[1280px] grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry, i) => (
            <Reveal key={entry.project.slug} delay={i * 0.06}>
              <ProjectCard project={entry.project} index={String(i + 1).padStart(2, "0")} lang={lang} viewProject={viewProject}>
                {entry.visual(lang)}
              </ProjectCard>
            </Reveal>
          ))}
        </div>

        {/* the floor */}
        <div className="mx-auto mt-8 w-full max-w-[1280px]">
          <Rule className="bg-foreground/12" delay={0.2} />
        </div>
      </div>
    </section>
  );
}
