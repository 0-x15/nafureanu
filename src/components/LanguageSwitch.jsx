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
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] ${className || ""}`}
    >
      <span className={lang === "es" ? "text-accent" : "text-muted-foreground transition-colors hover:text-foreground"}>
        ES
      </span>
      <span aria-hidden="true" className="text-border">/</span>
      <span className={lang === "en" ? "text-accent" : "text-muted-foreground transition-colors hover:text-foreground"}>
        EN
      </span>
    </Link>
  );
}