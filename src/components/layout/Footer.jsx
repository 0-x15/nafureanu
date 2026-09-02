import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { CAPABILITIES } from "@/data/capabilities";
import { STRINGS, langPath } from "@/i18n";

export default function Footer({ lang = "es" }) {
  const s = STRINGS[lang];

  const navLinks = [
    { to: "/", label: s.footer.home },
    { to: "/services", label: s.nav.services },
    { to: "/work", label: s.nav.work },
    { to: "/about", label: s.nav.about },
    { to: "/contact", label: s.footer.contact },
  ];

  return (
    <footer className="bg-[#0B1220] text-[#F2F3F6]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <Link
            to={langPath(lang, "/")}
            className="flex items-center gap-2.5 font-heading text-2xl font-bold tracking-[-0.02em] text-white"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#2B59FF]" />
            Nafureanu
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
            {s.footer.tagline}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-block text-sm text-white underline underline-offset-4 transition-colors hover:text-[#8FA5E8]"
          >
            {SITE.email}
          </a>
        </div>
        <nav className="md:col-span-2" aria-label={s.footer.nav}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            {s.footer.nav}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link className="text-white/65 transition-colors hover:text-white" to={langPath(lang, l.to)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            {s.footer.services}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-white/65">
            {CAPABILITIES.slice(0, 6).map((c) => (
              <li key={c.id}>{c.copy[lang].title}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            {s.footer.contact}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-5 inline-block text-sm text-white/65 transition-colors hover:text-white"
          >
            {SITE.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Nafureanu — {s.footer.rights}</span>
          <span>{SITE.tagline[lang]}</span>
        </div>
      </div>
    </footer>
  );
}