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

  const onCls = "text-[#3D7BFF]";
  const offCls = "text-[#8A93A6] transition-colors hover:text-[#F0EFEA]";

  return (
    <Link
      to={target}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] ${className || ""}`}
    >
      <span className={lang === "es" ? onCls : offCls}>ES</span>
      <span aria-hidden="true" className="text-[#2A3550]">/</span>
      <span className={lang === "en" ? onCls : offCls}>EN</span>
    </Link>
  );
}