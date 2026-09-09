import { Link } from "react-router-dom";
import { projectSlug } from "@/data/projects";
import { langPath, pick } from "@/i18n";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { MONO, Rule } from "./workBits";

/**
 * The close belongs to the archive: the register once more — 01 to
 * 04 — and then 05, an empty entry. The blank is the visitor's own
 * project. On hover or focus the blank line extends, a cobalt
 * registration mark appears and four words surface one after another
 * (process · idea · system · product); without a pointer the words are
 * simply there. Then the door.
 */
export default function WorkNextSlot({ lang, t, projects }) {
  const n = t.next;
  return (
    <section aria-labelledby="work-next" className="relative overflow-hidden bg-[#E8EDF8]/65 px-5 py-20 md:px-10 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -bottom-[30%] left-[30%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.12),transparent)]" />
        <span className="absolute -right-[8%] top-[10%] h-[24vh] w-[30vw] -rotate-2 rounded-[36px] border border-white/70 bg-white/35 backdrop-blur-[28px]" />
      </div>
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* the register, closed with an empty entry */}
          <div className="lg:col-span-5">
            <p className={cn(MONO, "text-muted-foreground")}>{n.label}</p>
            <ol className="mt-3 border-t border-foreground/15">
              {projects.map((p, i) => (
                <li key={p.slug} className="border-b border-foreground/12">
                  <Link to={langPath(lang, `/work/${projectSlug(p, lang)}`)} className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#EDF0F8]">
                    <span className={cn(MONO, "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading text-[17px] font-bold tracking-[-0.02em] text-foreground/75 transition-colors group-hover:text-foreground md:text-[18px]">{pick(p.title, lang)}</span>
                  </Link>
                </li>
              ))}
              {/* 05 — the empty slot */}
              <li className="border-b border-accent/40">
                <div tabIndex={0} aria-label={n.blank} className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#EDF0F8]">
                  <span className={cn(MONO, "text-accent")}>05</span>
                  <span className="relative block">
                    {/* the blank line */}
                    <span aria-hidden="true" className="relative mt-[0.55em] block h-px w-[52%] bg-foreground/35 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-focus-visible:w-full">
                      <span className="absolute -right-px -top-[4px] h-[9px] w-[9px] border border-accent bg-[#EDF0F8] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </span>
                    {/* the words that could fill it */}
                    <span className="next-words mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {n.words.map((w, i) => (
                        <span key={w} className={cn(MONO, "next-word text-foreground/70")} style={{ animationDelay: `${i * 0.9}s` }}>{w}</span>
                      ))}
                    </span>
                  </span>
                </div>
              </li>
            </ol>
          </div>

          {/* the statement and the door */}
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="work-next" className="max-w-[18ch] font-heading text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground [text-wrap:balance]">{n.line}</h2>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{n.support}</p>
            <div className="mt-9">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{n.cta}</ActionLink>
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-20">
          <Rule className="bg-foreground/15" />
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{n.signature}</p>
        </div>
      </div>
    </section>
  );
}
