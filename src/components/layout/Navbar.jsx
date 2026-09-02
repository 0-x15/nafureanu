import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import LanguageSwitch from "@/components/LanguageSwitch";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";

const BASE_LINKS = [
  { path: "/work", key: "work", num: "01" },
  { path: "/services", key: "services", num: "02" },
  { path: "/about", key: "about", num: "03" },
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-[#1E2530] bg-[#07090E]/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10"
        aria-label="Main navigation"
      >
        <Link
          to={langPath(lang, "/")}
          className="flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-[-0.02em] text-[#F0EFEA]"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#3D7BFF]" />
          Nafureanu
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {BASE_LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={langPath(lang, l.path)}
              className={({ isActive }) =>
                cn(
                  "font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  isActive
                    ? "text-[#3D7BFF]"
                    : "text-[#F0EFEA] hover:text-[#3D7BFF]"
                )
              }
            >
              <span className="mr-1.5 text-[#55607A]">{l.num}</span>
              {s.nav[l.key]}
            </NavLink>
          ))}
          <span aria-hidden="true" className="h-4 w-px bg-[#1E2530]" />
          <LanguageSwitch lang={lang} />
          <Link
            to={langPath(lang, "/contact")}
            data-cursor="start"
            className="ml-2 inline-flex items-center gap-1.5 bg-[#F0EFEA] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[#07090E] transition-colors hover:bg-[#3D7BFF] hover:text-[#F0EFEA]"
          >
            {s.nav.start} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="md:hidden">
          <MobileMenu lang={lang} />
        </div>
      </nav>
    </header>
  );
}