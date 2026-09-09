import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/work/ProjectCard";
import { cn } from "@/lib/utils";
import { MONO, Meta, Rule } from "./workBits";

/**
 * The exhibition. First a thin archive ruler and a short statement,
 * then the four project cards — untouched — on a designed stage: a
 * cleaner field, one large blurred cobalt light crossing behind the
 * middle of the row, a faint floor line beneath, and tiny catalogue
 * references aligned under each card. The cards are the objects; the
 * room is built around them.
 */
export default function ProjectStage({ lang, t, entries, viewProject }) {
  const s = t.stage;
  return (
    <section aria-label={t.kicker} className="relative overflow-hidden bg-[#F6F8FB] px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-14">
      {/* the light behind the row */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-[38%] h-[70%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.1),transparent)] blur-2xl" />
        <span className="absolute right-[6%] top-[26%] h-[40%] w-[28%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)] blur-xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the ruler */}
        <Rule className="bg-foreground/15" />
        <Meta left={s.rule} right={s.view} className="pt-3" />
        <Reveal>
          <p className="mt-8 max-w-[26ch] font-heading text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:mt-10">{s.statement}</p>
        </Reveal>

        {/* the cards, exactly as they are */}
        <div className="mx-auto mt-10 grid w-full max-w-[1280px] grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry, i) => (
            <Reveal key={entry.project.slug} delay={i * 0.05}>
              <ProjectCard project={entry.project} index={String(i + 1).padStart(2, "0")} lang={lang} viewProject={viewProject}>
                {entry.visual(lang)}
              </ProjectCard>
            </Reveal>
          ))}
        </div>

        {/* the floor and the catalogue references */}
        <div className="mx-auto mt-6 w-full max-w-[1280px]">
          <Rule className="bg-foreground/12" delay={0.2} />
          <ol className="mt-3 hidden grid-cols-4 gap-5 lg:grid">
            {s.refs.map((ref, i) => (
              <li key={ref} className={cn(MONO, "text-muted-foreground")}>
                <span className="text-foreground/70">{String(i + 1).padStart(2, "0")}</span> / {ref}
              </li>
            ))}
          </ol>
          <Meta left={s.edition} className="mt-3 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
