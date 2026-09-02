import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { CAPABILITIES } from "@/data/capabilities";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E0E0DE] bg-[#F9F9F7]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <Link
            to="/"
            className="flex items-center gap-2 font-heading text-3xl font-bold uppercase tracking-[-0.02em]"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-[#E63946]" />
            Nafureanu
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5C5C58]">
            {SITE.description}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-block font-mono text-sm underline underline-offset-4 transition-colors hover:text-[#E63946]"
          >
            {SITE.email}
          </a>
        </div>
        <nav className="md:col-span-2" aria-label="Sitemap">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
            Sitemap
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link className="transition-colors hover:text-[#E63946]" to="/">Home</Link></li>
            <li><Link className="transition-colors hover:text-[#E63946]" to="/work">Work</Link></li>
            <li><Link className="transition-colors hover:text-[#E63946]" to="/services">Services</Link></li>
            <li><Link className="transition-colors hover:text-[#E63946]" to="/about">About</Link></li>
            <li><Link className="transition-colors hover:text-[#E63946]" to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
            Capabilities
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-[#5C5C58]">
            {CAPABILITIES.slice(0, 5).map((c) => (
              <li key={c.id}>{c.title}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">Soon</p>
          <p className="mt-5 text-sm text-[#848482]">Insights — in development</p>
        </div>
      </div>
      <div className="border-t border-[#E0E0DE]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#848482] md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Nafureanu — All rights reserved</span>
          <span className="flex items-center gap-1.5">
            System status:
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#E63946]" />
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
}