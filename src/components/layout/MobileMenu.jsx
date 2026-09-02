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
        className="-mr-2 p-2 text-[#F0EFEA]"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-[#07090E]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-[-0.02em] text-[#F0EFEA]">
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#3D7BFF]" />
              Nafureanu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 p-2 text-[#F0EFEA]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-5" aria-label="Mobile navigation">
            {BASE_LINKS.map((l) => (
              <Link
                key={l.path}
                to={langPath(lang, l.path)}
                className="flex items-baseline gap-3 border-b border-[#1E2530] py-5 font-heading text-4xl font-bold tracking-[-0.02em] text-[#F0EFEA]"
              >
                <span className="font-mono text-xs text-[#3D7BFF]">{l.num}</span>
                {s.nav[l.key]}
              </Link>
            ))}
            <Link
              to={langPath(lang, "/contact")}
              className="mt-10 inline-flex items-center justify-center gap-2 bg-[#F0EFEA] px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#07090E]"
            >
              {s.nav.start} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 border-t border-[#1E2530] pt-6">
              <LanguageSwitch lang={lang} />
            </div>
          </nav>
          <p className="px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8A93A6]">
            {STRINGS[lang].hero.eyebrow}
          </p>
        </div>
      )}
    </>
  );
}