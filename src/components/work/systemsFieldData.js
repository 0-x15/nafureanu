/**
 * The systems field on /work: four independent operational flows
 * (input → engineered logic → output), one per project family. Labels
 * stay abstract and operational — the project cards below already say
 * which projects these are. Geometry is authored in a 1000 × 620 box.
 */
export const T = {
  es: {
    title: "Mapa de sistemas en funcionamiento",
    hint: "Cuatro flujos independientes: entrada, lógica, salida",
    stages: ["Entrada", "Lógica", "Salida"],
    view: "Ver proyecto",
    select: "Elige un sistema",
    flows: {
      "crm-inmobiliario": {
        name: "CRM inmobiliario",
        stages: ["Demanda", "Matching", "Visita / operación"],
        fragment: ["Inmueble", "Demanda"],
        event: "Compatible",
      },
      fivo: {
        name: "Fivo",
        stages: ["Checkout", "Cross-chain", "Liquidación"],
        fragment: ["USDC", "Destino"],
        event: "Confirmada",
      },
      "life-admin": {
        name: "Life Admin",
        stages: ["Documento", "Extracción", "Obligación"],
        fragment: ["Campos extraídos", "Recurrente"],
        event: "Creada",
      },
      "web-projects": {
        name: "Web y producto digital",
        stages: ["Negocio", "Interfaz", "Producto digital"],
        fragment: ["Escritorio", "Móvil"],
        event: "Publicado",
      },
    },
  },
  en: {
    title: "Map of systems at work",
    hint: "Four independent flows: input, logic, output",
    stages: ["Input", "Logic", "Output"],
    view: "View project",
    select: "Choose a system",
    flows: {
      "crm-inmobiliario": {
        name: "Real-estate CRM",
        stages: ["Demand", "Matching", "Visit / operation"],
        fragment: ["Property", "Demand"],
        event: "Compatible",
      },
      fivo: {
        name: "Fivo",
        stages: ["Checkout", "Cross-chain", "Settlement"],
        fragment: ["USDC", "Destination"],
        event: "Confirmed",
      },
      "life-admin": {
        name: "Life Admin",
        stages: ["Document", "Extraction", "Obligation"],
        fragment: ["Fields extracted", "Recurring"],
        event: "Created",
      },
      "web-projects": {
        name: "Web & digital product",
        stages: ["Business", "Interface", "Digital product"],
        fragment: ["Desktop", "Mobile"],
        event: "Live",
      },
    },
  },
};

/* depth 0 = far (thin, light) · 2 = front (full contrast). `path` runs
   input → through the logic chip → output so a signal can follow it. */
export const FLOWS = [
  {
    id: "life-admin",
    n: "03",
    depth: 0,
    enter: "M520 6 V58",
    input: { x: 520, y: 78, kind: "doc" },
    logic: { x: 690, y: 118, w: 106 },
    output: { x: 872, y: 178 },
    path: "M520 100 C520 152 610 118 690 118 C790 118 820 178 864 178",
    exit: "M880 178 H1000",
    fragment: { x: 740, y: 206 },
  },
  {
    id: "web-projects",
    n: "04",
    depth: 1,
    enter: "M62 548 C98 486 120 434 150 424",
    input: { x: 160, y: 420, kind: "square" },
    logic: { x: 380, y: 385, w: 98 },
    output: { x: 600, y: 432 },
    path: "M170 420 C240 412 300 385 380 385 C480 385 520 432 592 432",
    exit: "M608 432 C700 432 760 470 806 470",
    fragment: { x: 430, y: 452 },
  },
  {
    id: "fivo",
    n: "02",
    depth: 1,
    enter: "M300 616 V552",
    input: { x: 300, y: 540, kind: "dot" },
    logic: { x: 560, y: 505, w: 114 },
    output: { x: 842, y: 548 },
    path: "M308 540 C400 540 460 505 560 505 C690 505 740 548 834 548",
    exit: "M850 548 H1000",
    fragment: { x: 640, y: 564 },
  },
  {
    id: "crm-inmobiliario",
    n: "01",
    depth: 2,
    enter: "M0 250 H82",
    input: { x: 90, y: 250, kind: "dot" },
    logic: { x: 400, y: 215, w: 110 },
    output: { x: 700, y: 262 },
    path: "M98 250 C210 250 280 215 400 215 C540 215 600 262 692 262",
    exit: "M708 262 H770",
    fragment: { x: 470, y: 296 },
  },
];

/* Presentation order on the compact (mobile) surface and in the DOM. */
export const ORDER = ["crm-inmobiliario", "fivo", "life-admin", "web-projects"];
