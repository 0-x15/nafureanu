import { cn } from "@/lib/utils";

const T = {
  es: {
    url: "crm-inmobiliario — panel de operaciones",
    brand: "CRM Inmobiliario",
    panel: "Panel de operaciones",
    nav: ["Panel", "Propiedades", "Clientes", "Matching", "Marketing"],
    kpis: [
      ["Propiedades", "Catálogo centralizado"],
      ["Clientes", "Cartera y seguimiento"],
      ["Matching", "Automático oferta-demanda"],
      ["Operaciones", "Seguimiento continuo"],
    ],
    chart: "Actividad semanal",
    rows: [
      ["Ático Ruzafa", "Valencia", "€ 319.000", "Publicado"],
      ["Piso Malasaña", "Madrid", "€ 265.000", "Reservado"],
      ["Loft Eixample", "Barcelona", "€ 410.000", "Publicado"],
    ],
    chatTitle: "Asistente IA · WhatsApp",
    chatQ: "Busco un piso de 3 habitaciones en Ruzafa",
    chatA: "He encontrado coincidencias que encajan. Te envío las mejores ahora mismo.",
  },
  en: {
    url: "real-estate-crm — operations dashboard",
    brand: "Real-estate CRM",
    panel: "Operations dashboard",
    nav: ["Dashboard", "Properties", "Clients", "Matching", "Marketing"],
    kpis: [
      ["Properties", "Centralized catalogue"],
      ["Clients", "Pipeline and tracking"],
      ["Matching", "Automatic supply-demand"],
      ["Operations", "Continuous pipeline"],
    ],
    chart: "Weekly activity",
    rows: [
      ["Ruzafa penthouse", "Valencia", "€ 319,000", "Published"],
      ["Malasaña apartment", "Madrid", "€ 265,000", "Reserved"],
      ["Eixample loft", "Barcelona", "€ 410,000", "Published"],
    ],
    chatTitle: "AI assistant · WhatsApp",
    chatQ: "I'm looking for a 3-bedroom apartment in Ruzafa",
    chatA: "I found matches that fit. Sending you the best ones right now.",
  },
};

const BARS = [34, 46, 40, 55, 48, 62, 58, 70, 66, 78, 74, 88, 82, 96];

/**
 * SophIA product mockup — CRM/operations dashboard with the AI
 * WhatsApp assistant floating alongside. Pure CSS/SVG, no images.
 */
export default function SophIADashboard({
  lang = "es",
  className = "",
  bare = false,
}) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-xl border border-[#E5E1D6] bg-white text-left shadow-[0_30px_60px_-20px_rgba(12,18,32,0.25)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-[#EFEBE0] bg-[#F9F7F2] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
          </div>
          <span className="rounded-md bg-white px-3 py-1 text-[10px] text-[#9A94A6]">
            {t.url}
          </span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-40 shrink-0 border-r border-[#EFEBE0] p-4 sm:block">
            <p className="font-heading text-sm font-bold tracking-tight text-[#171C29]">
              {t.brand}
            </p>
            <nav className="mt-4 space-y-1">
              {t.nav.map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "block rounded-md px-2.5 py-1.5 text-xs",
                    i === 0
                      ? "bg-[#EDF2FF] font-medium text-[#3157F6]"
                      : "text-[#8A8FA0]"
                  )}
                >
                  {item}
                </span>
              ))}
            </nav>
          </aside>

          {/* Main panel */}
          <div className="min-w-0 flex-1 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-sm font-bold text-[#171C29]">
                {t.panel}
              </p>
              <span className="rounded-full bg-[#EDF2FF] px-2.5 py-1 text-[10px] font-medium text-[#3157F6]">
                40K+ {lang === "es" ? "propiedades" : "properties"}
              </span>
            </div>

            {/* KPI cards */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {t.kpis.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-[#EFEBE0] bg-[#FCFBF8] p-3"
                >
                  <p className="font-heading text-lg font-bold tracking-tight text-[#171C29]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-[#9A94A6]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Activity chart */}
            <div className="mt-2.5 rounded-lg border border-[#EFEBE0] bg-[#FCFBF8] p-3">
              <p className="text-[10px] text-[#9A94A6]">{t.chart}</p>
              <div className="mt-2 flex h-16 items-end gap-1.5">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex-1 rounded-sm",
                      i === BARS.length - 1 ? "bg-[#3157F6]" : "bg-[#B9CDFB]"
                    )}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Property rows */}
            <div className="mt-2.5 space-y-1.5">
              {t.rows.map(([name, zone, price, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-[#EFEBE0] bg-white px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-7 w-7 shrink-0 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
                    />
                    <div>
                      <p className="text-xs font-medium text-[#171C29]">{name}</p>
                      <p className="text-[10px] text-[#9A94A6]">{zone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#171C29]">
                      {price}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px]",
                        status === "Reservado" || status === "Reserved"
                          ? "bg-[#F1EEE7] text-[#8A8FA0]"
                          : "bg-[#EDF2FF] text-[#3157F6]"
                      )}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI assistant card */}
      {!bare && (
      <div className="absolute -bottom-8 -right-2 hidden w-60 rotate-1 rounded-xl border border-[#E5E1D6] bg-white p-3.5 text-left shadow-[0_20px_40px_-16px_rgba(12,18,32,0.3)] sm:block md:-right-6">
        <p className="flex items-center gap-2 text-[10px] font-medium text-[#9A94A6]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
          {t.chatTitle}
        </p>
        <p className="mt-2.5 rounded-lg rounded-tl-sm bg-[#F4F2EB] px-3 py-2 text-[11px] leading-snug text-[#4A5164]">
          {t.chatQ}
        </p>
        <p className="mt-1.5 rounded-lg rounded-tl-sm bg-[#3157F6] px-3 py-2 text-[11px] leading-snug text-white">
          {t.chatA}
        </p>
      </div>
      )}
    </div>
  );
}