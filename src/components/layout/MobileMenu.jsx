import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ActionLink from "@/components/ActionLink";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LogoInline } from "@/components/brand/Logo";
import ServicesMobileNav from "@/components/layout/ServicesMobileNav";
import { STRINGS, langPath } from "@/i18n";

const LINK_CLASS = "block border-b border-border py-5 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground";

const LINKS = [
  { path: "/", key: "home" },
  { path: "/services", key: "services" },
  { path: "/work", key: "work" },
  { path: "/about", key: "about" },
];

export default function MobileMenu({
  lang = "es",
  open = false,
  onOpenChange = (_open) => {},
}) {
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
      {/* Rendered through a portal: the header animates with transforms, which would otherwise make this fixed layer position itself inside the 64px header instead of the viewport. */}
      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "es" ? "Menú" : "Menu"}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <LogoInline className="text-lg" />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
              className="-mr-2 p-2 text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4" aria-label={lang === "es" ? "Navegación" : "Navigation"}>
            <div className="my-auto flex flex-col">
              {LINKS.map((l) => l.key === "services" ? (
                <ServicesMobileNav key={l.path} lang={lang} linkClassName={LINK_CLASS} />
              ) : (
                <Link key={l.path} to={langPath(lang, l.path)} className={LINK_CLASS}>
                  {s.nav[l.key]}
                </Link>
              ))}
              <ActionLink
                to={langPath(lang, "/contact")}
                className="mt-10 w-full justify-center px-6 py-4"
              >
                {s.nav.start}
              </ActionLink>
              <div className="mt-8 pt-2">
                <LanguageSwitch lang={lang} />
              </div>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}