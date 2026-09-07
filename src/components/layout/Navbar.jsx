import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ActionLink from "@/components/ActionLink";
import MobileMenu from "@/components/layout/MobileMenu";
import ServicesMenu from "@/components/layout/ServicesMenu";
import LanguageSwitch from "@/components/LanguageSwitch";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { path: "/", key: "home" },
  { path: "/services", key: "services" },
  { path: "/work", key: "work" },
  { path: "/about", key: "about" },
];

/**
 * Corporate header with editorial scroll behavior:
 * - top of page: spacious (72px desktop / 64px mobile)
 * - after ~80px: smoothly compresses (56px / 52px)
 * - scrolling down: slides away above the viewport (translateY)
 * - scrolling up, near the top, or while in use: always available
 */
export default function Navbar({ lang = "es" }) {
  const s = STRINGS[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const interactingRef = useRef(false);
  const { compact, hidden, reveal } = useHeaderScroll({
    menuOpenRef,
    interactingRef,
  });

  /* Any open overlay (mobile menu, services dropdown) keeps the header in place. */
  useEffect(() => {
    menuOpenRef.current = menuOpen || servicesOpen;
    if (menuOpen || servicesOpen) reveal();
  }, [menuOpen, servicesOpen, reveal]);

  const visible = !hidden || menuOpen || servicesOpen;

  /* Publish the header's effective height so sticky elements below it
     (e.g. a page's local chapter rail) can sit flush against it and
     follow it when it slides away. Desktop values: the only consumers
     render at lg and up. */
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", visible ? (compact ? "56px" : "72px") : "0px");
  }, [visible, compact]);

  return (
    <header
      onPointerEnter={() => {
        interactingRef.current = true;
      }}
      onPointerLeave={() => {
        interactingRef.current = false;
      }}
      onFocusCapture={() => {
        interactingRef.current = true;
        reveal();
      }}
      onBlurCapture={() => {
        interactingRef.current = false;
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        visible ? "translate-y-0" : "-translate-y-full",
        compact
          ? "border-b border-border bg-background/80 shadow-[0_12px_32px_-24px_rgba(12,18,32,0.4)] backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav
        className={cn(
          "relative mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 md:px-10",
          compact ? "h-[52px] md:h-[56px]" : "h-16 md:h-[72px]"
        )}
        aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
      >
        <Link
          to={langPath(lang, "/")}
          className={cn(
            "flex items-center gap-2.5 font-heading font-bold tracking-[-0.02em] text-foreground transition-all duration-500",
            compact ? "text-[17px]" : "text-lg"
          )}
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
          Nafureanu
        </Link>
        <div
          className={cn(
            "hidden items-center transition-all duration-500 lg:flex",
            compact ? "gap-7" : "gap-9"
          )}
        >
          {LINKS.map((l) => l.key === "services" ? (
            <ServicesMenu key={l.path} lang={lang} onOpenChange={setServicesOpen} />
          ) : (
            <NavLink
              key={l.path}
              to={langPath(lang, l.path)}
              end={l.path === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-accent" : "text-[#4A5164] hover:text-foreground"
                )
              }
            >
              {s.nav[l.key]}
            </NavLink>
          ))}
          <span aria-hidden="true" className="h-4 w-px bg-border" />
          <LanguageSwitch lang={lang} />
          <ActionLink
            to={langPath(lang, "/contact")}
            size="sm"
            className={cn(
              "action-quiet ml-2 transition-transform duration-500",
              compact ? "py-2" : "py-2.5"
            )}
          >
            {s.nav.start}
          </ActionLink>
        </div>
        <div className="lg:hidden">
          <MobileMenu lang={lang} open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </nav>
    </header>
  );
}