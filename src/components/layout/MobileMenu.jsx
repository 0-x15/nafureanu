import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { STRINGS, langPath } from "@/i18n";

const BASE_LINKS = [
  { path: "/work", key: "work", num: "01" },
  { path: "/services", key: "services", num: "02" },
  { path: "/about", key: "about", num: "03" },
];

export default function MobileMenu({ lang = "es" }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const s = STRINGS[lang];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-mr-2 p-2"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-[#F9F9F7]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-heading text-lg font-bold uppercase tracking-[-0.02em]">
              Nafureanu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-5" aria-label="Mobile navigation">
            {BASE_LINKS.map((l) => (
              <Link
                key={l.path}
                to={langPath(lang, l.path)}
                className="flex items-baseline gap-3 border-b border-[#E0E0DE] py-5 font-heading text-4xl font-bold tracking-[-0.02em]"
              >
                <span className="font-mono text-xs text-[#E63946]">{l.num}</span>
                {s.nav[l.key]}
              </Link>
            ))}
            <Link
              to={langPath(lang, "/contact")}
              className="mt-10 inline-flex items-center justify-center gap-2 bg-[#121212] px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#F9F9F7]"
            >
              {s.nav.start} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 border-t border-[#E0E0DE] pt-6">
              <LanguageSwitch lang={lang} />
            </div>
          </nav>
          <p className="px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#848482]">
            {STRINGS[lang].hero.eyebrow}
          </p>
        </div>
      )}
    </>
  );
}