import { Link, useLocation } from "react-router-dom";

/**
 * ES / EN switch. Toggles the /en prefix while preserving the
 * current page (case studies included).
 */
export default function LanguageSwitch({ lang, className }) {
  const { pathname } = useLocation();
  const target =
    lang === "es"
      ? pathname === "/"
        ? "/en"
        : `/en${pathname}`
      : pathname === "/en"
        ? "/"
        : pathname.replace(/^\/en/, "") || "/";

  return (
    <Link
      to={target}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] ${className || ""}`}
    >
      <span className={lang === "es" ? "text-[#E63946]" : "text-[#848482] transition-colors hover:text-[#121212]"}>
        ES
      </span>
      <span aria-hidden="true" className="text-[#E0E0DE]">/</span>
      <span className={lang === "en" ? "text-[#E63946]" : "text-[#848482] transition-colors hover:text-[#121212]"}>
        EN
      </span>
    </Link>
  );
}