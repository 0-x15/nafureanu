import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { langPath } from "@/i18n";

/**
 * Compact row for secondary work items (engineering practice, web work).
 */
export default function PracticeRow({ project, lang }) {
  return (
    <Link
      to={langPath(lang, `/work/${project.slug}`)}
      className="group flex items-baseline justify-between gap-4 border-b border-border py-6"
    >
      <span className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent md:text-2xl">
        {project.title}
      </span>
      <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
        {project.copy[lang].type}
        <ArrowUpRight className="h-4 w-4 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}