import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import LanguageSwitch from "@/components/LanguageSwitch";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { path: "/services", key: "services" },
  { path: "/work", key: "work" },
  { path: "/about", key: "about" },
];

export default function Navbar({ lang = "es" }) {
  const [scrolled, setScrolled] = useState(false);
  const s = STRINGS[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10"
        aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
      >
        <Link
          to={langPath(lang, "/")}
          className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-[-0.02em] text-foreground"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
          Nafureanu
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={langPath(lang, l.path)}
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
          <Link
            to={langPath(lang, "/contact")}
            className="ml-2 inline-flex items-center gap-1.5 bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-[#1E44D6]"
          >
            {s.nav.start}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="md:hidden">
          <MobileMenu lang={lang} />
        </div>
      </nav>
    </header>
  );
}