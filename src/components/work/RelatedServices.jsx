import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { STRINGS } from "@/i18n";
import { SERVICES, servicePath } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * The quiet line under a case study's close: the commercial service(s)
 * this system proves, named as they are on the services index and
 * linked to their canonical page in the current language.
 * @param {{ lang: string, ids: string[], className?: string }} props
 */
export default function RelatedServices({ lang, ids, className = "" }) {
  const s = STRINGS[lang];
  const services = ids.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean);
  if (!services.length) return null;
  return (
    <p className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 text-sm", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.caseStudy.related}</span>
      {services.map((service) => (
        <Link key={service.id} to={servicePath(service, lang)} className="group inline-flex items-center gap-1.5 font-medium text-foreground/80 outline-none transition-colors hover:text-accent focus-visible:text-accent">
          {s.servicesPage.names[service.id]}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" />
        </Link>
      ))}
    </p>
  );
}
