import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const DEMO_PATH = { es: "/work/crm-inmobiliario/demo", en: "/en/work/real-estate-crm/demo" };

/**
 * "El sistema por dentro" — the invitation to the interactive CRM demo:
 * a real-looking application window (sidebar, dashboard, KPIs,
 * pipeline, activity) as preview, plus the CTA that opens the dedicated
 * full-screen demo route. The application itself is not embedded here.
 */
function PreviewWindow({ p }) {
  const bars = [1, 2, 2, 1, 2, 1];
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-[#E5E1D6] bg-white text-left shadow-[0_36px_70px_-30px_rgba(12,18,32,0.35)]">
      <div className="flex items-center gap-3 border-b border-[#EFEBE0] bg-[#F9F7F2] px-4 py-2.5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />)}
        </div>
        <span className="rounded-md bg-white px-3 py-1 font-mono text-[10px] text-[#9A94A6]">crm-demo · {p.title.toLowerCase()}</span>
      </div>
      <div className="flex">
        <aside className="hidden w-36 shrink-0 bg-[#0F2A6B] p-3 sm:block">
          <p className="flex items-center gap-2 text-[11px] font-semibold text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/15 font-mono text-[8px]">CRM</span>
            CRM Demo
          </p>
          <ul className="mt-3 space-y-0.5">
            {p.nav.map((item, i) => (
              <li key={item} className={cn("rounded px-2 py-1 text-[10.5px]", i === 0 ? "bg-white/15 font-medium text-white" : "text-blue-100/70")}>
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 bg-[#F4F6FA] p-3 md:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold text-slate-900">{p.title}</p>
            <span className="rounded border border-yellow-300 bg-yellow-50 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-yellow-800">demo</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {p.kpis.map(([label, value]) => (
              <div key={label} className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
                <p className="truncate text-[9.5px] text-slate-500">{label}</p>
                <p className="text-[15px] font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 grid gap-2 lg:grid-cols-5">
            <div className="rounded-md border border-slate-200 bg-white p-2.5 lg:col-span-3">
              <p className="text-[10px] font-semibold text-slate-700">{p.pipeline}</p>
              <div className="mt-2 grid grid-cols-6 gap-1.5">
                {p.stages.map((stage, i) => (
                  <div key={stage} className="min-w-0">
                    <div className="flex h-10 items-end rounded bg-slate-50">
                      <span className="w-full rounded bg-blue-600/85" style={{ height: `${bars[i] * 45}%` }} />
                    </div>
                    <p className="mt-1 truncate text-[8px] text-slate-500">{stage}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-2.5 lg:col-span-2">
              <p className="text-[10px] font-semibold text-slate-700">{p.activity}</p>
              <ul className="mt-1.5 space-y-1">
                {p.lines.map((line) => (
                  <li key={line} className="flex items-center gap-1.5 truncate text-[9.5px] text-slate-600">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                    <span className="truncate">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CrmGallery({ lang = "es", c }) {
  const g = c.gallery;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{g.kicker}</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
              {g.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground">{g.copy}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70">{g.badge}</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {g.env}
              </span>
            </div>
            <Link
              to={DEMO_PATH[lang]}
              className="action-primary group mt-8 inline-flex items-center gap-2 rounded-[6px] px-7 py-3.5 text-sm font-medium text-accent-foreground"
            >
              {g.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">{g.meta}</p>
          </Reveal>
          <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
            <Link to={DEMO_PATH[lang]} aria-label={g.cta} className="block transition-transform duration-500 hover:-translate-y-1">
              <PreviewWindow p={g.preview} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
