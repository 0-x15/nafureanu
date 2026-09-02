import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/work", label: "Work", num: "01" },
  { to: "/services", label: "Services", num: "02" },
  { to: "/about", label: "About", num: "03" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-b border-[#E0E0DE] bg-[#F9F9F7]/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-[-0.02em]"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#E63946]" />
          Nafureanu
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  isActive ? "text-[#E63946]" : "text-[#121212] hover:text-[#E63946]"
                )
              }
            >
              <span className="mr-1.5 text-[#848482]">{l.num}</span>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-4 inline-flex items-center gap-1.5 bg-[#121212] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[#F9F9F7] transition-colors hover:bg-[#E63946]"
          >
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="md:hidden">
          <MobileMenu links={LINKS} />
        </div>
      </nav>
    </header>
  );
}