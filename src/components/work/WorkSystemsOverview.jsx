import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const T = {
  es: {
    label: "Índice de producción",
    rows: [
      {
        n: "01",
        name: "CRM inmobiliario",
        desc: "Odoo · Automatización · Matching",
        status: "En producción",
        live: true,
        fragment: "matching",
      },
      {
        n: "02",
        name: "Fivo",
        desc: "Pagos · Stablecoins · Infraestructura",
        status: "En producción",
        live: true,
        fragment: "payment",
      },
      {
        n: "03",
        name: "CRM de gestión interna",
        desc: "Gestión · Flujos · Automatización",
        status: "Privado",
        live: false,
      },
      {
        n: "04",
        name: "Web y productos digitales",
        desc: "Producto · Interfaz · Ingeniería",
        status: "Entregado",
        live: false,
        fragment: "web",
      },
    ],
  },
  en: {
    label: "Production index",
    rows: [
      {
        n: "01",
        name: "Real-estate CRM",
        desc: "Odoo · Automation · Matching",
        status: "In production",
        live: true,
        fragment: "matching",
      },
      {
        n: "02",
        name: "Fivo",
        desc: "Payments · Stablecoins · Infrastructure",
        status: "In production",
        live: true,
        fragment: "payment",
      },
      {
        n: "03",
        name: "Internal management CRM",
        desc: "Management · Flows · Automation",
        status: "Private",
        live: false,
      },
      {
        n: "04",
        name: "Web & digital products",
        desc: "Product · Interface · Engineering",
        status: "Delivered",
        live: false,
        fragment: "web",
      },
    ],
  },
};

/** Micro product fragment — a tiny matching line (property ↔ client). */
function MatchingFragment() {
  return (
    <span aria-hidden="true" className="hidden items-center gap-1 md:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="h-[1px] w-7 bg-accent/40" />
      <span className="h-1.5 w-1.5 rounded-full border border-accent/50 bg-white" />
    </span>
  );
}

/** Micro product fragment — a tiny payment route (USDC → settlement). */
function PaymentFragment() {
  return (
    <span
      aria-hidden="true"
      className="hidden items-center gap-1 font-mono text-[9px] text-accent/80 md:flex"
    >
      USDC
      <span className="h-[1px] w-5 bg-accent/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
    </span>
  );
}

/** Micro product fragment — a tiny browser line. */
function WebFragment() {
  return (
    <span aria-hidden="true" className="hidden items-center gap-1.5 md:flex">
      <span className="h-1 w-1 rounded-full bg-[#D9D5C8]" />
      <span className="h-1 w-1 rounded-full bg-[#D9D5C8]" />
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span className="h-[1px] w-7 bg-[#D9D5C8]" />
    </span>
  );
}

const FRAGMENTS = {
  matching: MatchingFragment,
  payment: PaymentFragment,
  web: WebFragment,
};

/**
 * /work hero visual — an architectural production index: one large
 * translucent plane acting as a systems registry, four horizontal
 * records separated by thin lines, verified statuses and tiny
 * abstract product fragments. No dashboards, no floating cards.
 */
export default function WorkSystemsOverview({ lang = "es" }) {
  const t = T[lang];
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* faint back plane — one offset material layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border border-white/70 bg-white/30 backdrop-blur-[22px]"
      />

      {/* main plane */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative rounded-xl border border-white/80 bg-white/60 p-5 shadow-[0_40px_80px_-44px_rgba(49,87,246,0.35)] backdrop-blur-[26px] md:p-7"
      >
        <div className="flex items-center gap-2.5 pb-4">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.label}
          </p>
        </div>

        {t.rows.map((r, i) => {
          const Fragment = r.fragment ? FRAGMENTS[r.fragment] : null;
          return (
            <motion.div
              key={r.n}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.14, ease: EASE }}
              className="flex items-center justify-between gap-4 border-t border-[#E3E7F0] py-[19px] md:py-[21px]"
            >
              <div className="flex min-w-0 items-baseline gap-3.5">
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  {r.n}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-[15px] font-bold tracking-[-0.01em] text-foreground">
                    {r.name}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {r.desc}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                {Fragment && <Fragment />}
                <span
                  className={
                    r.live
                      ? "flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent"
                      : "font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"
                  }
                >
                  {r.live && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                  {r.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}