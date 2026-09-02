import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";

/**
 * Cinematic case-study preview: the interface layer sits on top of a
 * dashed "logic layer" wireframe that separates on hover.
 */
export default function CaseRow({ project, index }) {
  return (
    <Reveal>
      <Link
        to={`/work/${project.slug}`}
        className="group mt-14 grid gap-8 border-t border-[#E0E0DE] pt-10 md:mt-20 md:grid-cols-12 md:gap-10"
        aria-label={`${project.title} case study`}
      >
        <div className="relative md:col-span-7">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 border border-dashed border-[#121212]/25 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"
          >
            <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#848482]">
              Logic layer
            </span>
          </div>
          <div className="relative overflow-hidden bg-[#EDEDEA] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.summary}`}
              className="aspect-[16/10] w-full"
              fittingType="fill"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between md:col-span-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
              <span className="text-[#E63946]">{String(index + 1).padStart(2, "0")}</span> —{" "}
              {project.type}
            </p>
            <h3 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[-0.02em] md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5C5C58] md:text-base">
              {project.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((s) => (
                <li
                  key={s}
                  className="border border-[#E0E0DE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#848482]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#121212] transition-colors group-hover:text-[#E63946]">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}