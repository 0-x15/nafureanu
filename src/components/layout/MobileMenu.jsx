import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { STRINGS, langPath } from "@/i18n";

const LINKS = [
  { path: "/services", key: "services" },
  { path: "/work", key: "work" },
  { path: "/about", key: "about" },
];

export default function MobileMenu({ lang = "es", open = false, onOpenChange = () => {} }) {
  const { pathname } = useLocation();
  const s = STRINGS[lang];

  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
        aria-expanded={open}
        className="-mr-2 p-2 text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "es" ? "Menú" : "Menu"}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-[-0.02em] text-foreground">
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
              Nafureanu
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
              className="-mr-2 p-2 text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-5" aria-label={lang === "es" ? "Navegación" : "Navigation"}>
            {LINKS.map((l) => (
              <Link
                key={l.path}
                to={langPath(lang, l.path)}
                className="border-b border-border py-5 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground"
              >
                {s.nav[l.key]}
              </Link>
            ))}
            <Link
              to={langPath(lang, "/contact")}
              className="mt-10 inline-flex items-center justify-center gap-2 bg-accent px-6 py-4 text-sm font-medium text-accent-foreground"
            >
              {s.nav.start}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 pt-2">
              <LanguageSwitch lang={lang} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}