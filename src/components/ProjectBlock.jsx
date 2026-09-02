import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import { langPath, pick } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Large art-directed project presentation with the product mockup
 * as the hero. environment: "dark" | "light"; flip swaps the columns.
 */
export default function ProjectBlock({
  project,
  lang,
  environment = "dark",
  flip = false,
  viewCase,
}) {
  const c = project.copy[lang];
  const dark = environment === "dark";
  const Visual = project.slug === "sophia" ? SophIADashboard : FivoCheckout;

  return (
    <section
      className={cn(
        dark ? "bg-[#0B1220] text-white" : "bg-[#F1EEE6] text-foreground",
        "overflow-hidden"
      )}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-20 pb-24 md:grid-cols-2 md:px-10 md:py-28 lg:gap-16">
        <Reveal variant={flip ? "left" : "up"} className={flip ? "md:order-2" : ""}>
          <p
            className={cn(
              "text-sm font-medium",
              dark ? "text-[#8FA5E8]" : "text-accent"
            )}
          >
            {pick(project.discipline, lang)}
          </p>
          <h3 className="mt-3 font-heading text-4xl font-bold tracking-[-0.02em] md:text-6xl">
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed md:text-lg",
              dark ? "text-white/60" : "text-[#5A6070]"
            )}
          >
            {c.summary}
          </p>
          {project.stats?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {project.stats.map((st) => (
                <p key={pick(st.label, lang)}>
                  <span
                    className={cn(
                      "font-heading text-3xl font-bold tracking-tight",
                      dark ? "text-white" : "text-foreground"
                    )}
                  >
                    {st.value}
                  </span>
                  <span
                    className={cn(
                      "ml-2 text-sm",
                      dark ? "text-white/50" : "text-muted-foreground"
                    )}
                  >
                    {pick(st.label, lang)}
                  </span>
                </p>
              ))}
            </div>
          )}
          <Link
            to={langPath(lang, `/work/${project.slug}`)}
            className={cn(
              "group mt-9 inline-flex items-center gap-2 text-sm font-medium",
              dark ? "text-[#8FA5E8] transition-colors hover:text-white" : "text-accent"
            )}
          >
            {viewCase}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <Reveal variant="scale" className={cn("pb-8", flip ? "md:order-1" : "")}>
          <Visual lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}