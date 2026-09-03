import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { langPath } from "@/i18n";

/**
 * Back control for the project index — deterministic content
 * hierarchy: Projects → Home. It never inspects browser history and
 * always targets the localized Home route.
 */
export default function BackToHome({ lang = "es", className = "" }) {
  return (
    <Link
      to={langPath(lang, "/")}
      className={`inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-accent ${className}`}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {lang === "es" ? "Volver" : "Back"}
    </Link>
  );
}