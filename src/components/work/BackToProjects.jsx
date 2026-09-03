import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Understated back navigation for project detail pages — small muted
 * text link that gains cobalt on hover. Points to the project index.
 */
export default function BackToProjects({ lang = "es", className = "" }) {
  return (
    <Link
      replace
      to={langPath(lang, "/work")}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-accent",
        className
      )}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {STRINGS[lang].caseStudy.back}
    </Link>
  );
}