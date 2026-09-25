import { Link, useLocation } from "react-router-dom";
import { translatePath } from "@/data/routes";

/**
 * ES / EN switch. Links straight to the same page in the other language,
 * translated slug included, through the public route manifest.
 */
export default function LanguageSwitch({ lang, className = "" }) {
  const { pathname } = useLocation();
  const target = translatePath(pathname, lang === "es" ? "en" : "es");

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