import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { langPath } from "@/i18n";

/**
 * Back control for the project index — returns the user to the
 * previous page (real history when available), falling back to the
 * localized Home route on direct entry. Distinct from BackToProjects,
 * which is the detail → index navigation.
 */
export default function BackToPrevious({ lang = "es", className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate(langPath(lang, "/"));
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-accent ${className}`}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {lang === "es" ? "Volver" : "Back"}
    </button>
  );
}