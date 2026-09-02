import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { CAPABILITIES } from "@/data/capabilities";
import { STRINGS, langPath } from "@/i18n";

export default function Footer({ lang = "es" }) {
  const s = STRINGS[lang];

  const navLinks = [
    { to: "/", label: s.footer.home },
    { to: "/work", label: s.nav.work },
    { to: "/services", label: s.nav.services },
    { to: "/about", label: s.nav.about },
    { to: "/contact", label: s.nav.start },
  ];

  return (
    <footer className="relative z-10 border-t border-[#1E2530] bg-[#05060A]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <Link
            to={langPath(lang, "/")}
            className="flex items-center gap-2 font-heading text-3xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA]"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#3D7BFF]" />
            Nafureanu
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A6AEBD]">
            {SITE.description[lang]}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-block font-mono text-sm text-[#F0EFEA] underline underline-offset-4 transition-colors hover:text-[#3D7BFF]"
          >
            {SITE.email}
          </a>
        </div>
        <nav className="md:col-span-2" aria-label="Sitemap">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
            {s.footer.sitemap}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  className="text-[#A6AEBD] transition-colors hover:text-[#3D7BFF]"
                  to={langPath(lang, l.to)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
            {s.footer.capabilities}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-[#A6AEBD]">
            {CAPABILITIES.slice(0, 5).map((c) => (
              <li key={c.id}>{c.copy[lang].title}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
            {s.footer.soon}
          </p>
          <p className="mt-5 text-sm text-[#8A93A6]">{s.footer.insights}</p>
        </div>
      </div>
      <div className="border-t border-[#1E2530]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#8A93A6] md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Nafureanu — {s.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            {s.footer.status}:
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#5CDBEA]"
            />
            {s.footer.operational}
          </span>
        </div>
      </div>
    </footer>
  );
}