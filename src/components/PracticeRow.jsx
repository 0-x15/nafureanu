import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Compact row for secondary work items (engineering practice, web work).
 */
export default function PracticeRow({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex items-baseline justify-between gap-4 border-b border-[#E0E0DE] py-6"
    >
      <span className="font-heading text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-[#E63946] md:text-2xl">
        {project.title}
      </span>
      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#848482]">
        {project.type}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}