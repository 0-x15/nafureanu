export const PROJECTS = [
  {
    slug: "fivo",
    title: { es: "Fivo", en: "Fivo" },
    featured: true,
    client: { es: "Producto independiente", en: "Independent product" },
    status: { es: "Producto en producción", en: "Live product" },
    discipline: { es: "Pagos / Blockchain", en: "Payments / Blockchain" },
    card: {
      category: { es: "Infraestructura de pagos · Stablecoins", en: "Payment infrastructure · Stablecoins" },
      description: {
        es: "Infraestructura de pagos con USDC y EURC para comercios online, con checkout cross-chain en nueve redes.",
        en: "USDC and EURC payment infrastructure for online merchants, with cross-chain checkout across nine networks.",
      },
      signals: [
        { es: "9 redes", en: "9 networks" },
        { es: "REST API", en: "REST API" },
        { es: "Circle CCTP v2", en: "Circle CCTP v2" },
      ],
    },
    /* The case study itself lives in src/sections/work/fivo (i18n: fivo.*);
       this copy only feeds the generic project lookup and metadata. */
    copy: {
      es: {
        type: "Infraestructura de pagos",
        summary:
          "Infraestructura de pagos con stablecoins — USDC y EURC — para comercios online, con aceptación en nueve redes y checkout cross-chain sobre Circle.",
        sections: [],
      },
      en: {
        type: "Payment infrastructure",
        summary:
          "Stablecoin payment infrastructure — USDC and EURC — for online merchants, accepting payments across nine networks with cross-chain checkout on Circle.",
        sections: [],
      },
    },
  },
  {
    slug: "crm-inmobiliario",
    slugEn: "real-estate-crm",
    title: { es: "CRM inmobiliario a medida", en: "Custom real-estate CRM" },
    featured: true,
    client: { es: "Empresa del sector inmobiliario", en: "Real-estate company" },
    status: { es: "En producción", en: "In production" },
    discipline: { es: "Odoo / Operaciones", en: "Odoo / Operations" },
    card: {
      category: { es: "CRM · Odoo · Automatización", en: "CRM · Odoo · Automation" },
      description: {
        es: "CRM y plataforma de operaciones construidos alrededor del funcionamiento real de una inmobiliaria.",
        en: "A CRM and operations platform built around how a real-estate agency actually works.",
      },
      signals: [
        { es: "Matching automático", en: "Automatic matching" },
        { es: "20+ módulos Odoo", en: "20+ Odoo modules" },
        { es: "Integraciones", en: "Integrations" },
      ],
    },
    stack: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "IA generativa",
      "WhatsApp",
      "Idealista",
      "Fotocasa",
      "MLS",
      "Firma electrónica",
      "Dashboards KPI",
    ],
    stats: [
      { value: "40K+", label: { es: "Propiedades gestionadas", en: "Properties managed" } },
      { value: "20+", label: { es: "Módulos Odoo a medida", en: "Custom Odoo modules" } },
    ],
    diagram: {
      variant: "radial",
      title: { es: "Arquitectura del sistema", en: "System architecture" },
      center: "CRM",
      nodes: [
        { label: { es: "Propiedades", en: "Properties" } },
        { label: { es: "Clientes", en: "Clients" } },
        { label: { es: "Motor de matching", en: "Matching engine" }, active: true },
        { label: { es: "Asistente IA", en: "AI assistant" }, active: true },
        { label: { es: "Centro de llamadas IA", en: "AI call center" }, active: true },
        { label: "WhatsApp" },
        { label: "Idealista" },
        { label: "Fotocasa" },
        { label: "MLS" },
        { label: { es: "Firma electrónica", en: "E-signature" } },
        { label: "Marketing" },
        { label: { es: "Datos KPI", en: "KPI data" }, active: true },
      ],
    },
    copy: {
      es: {
        type: "CRM y plataforma de operaciones inmobiliarias",
        summary:
          "CRM inmobiliario a medida y plataforma de operaciones sobre Odoo: un entorno de más de 40.000 propiedades con matching automático, IA e integraciones.",
        sections: [
          {
            label: "Contexto",
            body: [
              "Una empresa del sector inmobiliario opera en un entorno inmobiliario de más de 40.000 propiedades.",
              "La información de propiedades y clientes, y las operaciones del negocio, vivían en procesos que exigían intervención manual constante.",
            ],
          },
          {
            label: "Plataforma",
            body: [
              "El sistema es un CRM y plataforma de operaciones inmobiliarias construida sobre Odoo: lógica de negocio en Python, PostgreSQL y más de 20 módulos Odoo personalizados, diseñados alrededor de los flujos reales del negocio — no de los valores por defecto del ERP.",
            ],
            list: [
              "Entorno de más de 40.000 propiedades",
              "Más de 20 módulos Odoo a medida",
              "Lógica de negocio en Python",
              "PostgreSQL",
              "Migración desde el CRM anterior",
            ],
          },
          {
            label: "Automatización",
            body: [
              "El corazón del sistema es un motor de matching que cruza oferta y demanda automáticamente: propiedades y clientes se encuentran sin intervención manual.",
              "Un asistente conversacional de IA generativa y un centro de llamadas con IA atienden, filtran y cualifican clientes; la integración con WhatsApp lleva la conversación al canal donde ya está el cliente.",
            ],
            list: [
              "Motor automático de matching oferta-demanda",
              "Asistente conversacional con IA generativa",
              "Centro de llamadas con IA",
              "Integración con WhatsApp",
            ],
          },
          {
            label: "Integraciones y operaciones",
            body: [
              "El CRM se conecta con los portales y sistemas que mueven el negocio inmobiliario y devuelve métricas operativas en tiempo real.",
            ],
            list: [
              "Idealista",
              "Fotocasa",
              "Integraciones MLS",
              "Firma electrónica",
              "Integraciones de marketing",
              "Dashboards de KPI en tiempo real",
            ],
          },
          {
            label: "Impacto",
            body: [
              "No es «un CRM de Odoo» estándar: es un sistema de negocio completo — análisis de procesos, ingeniería de flujos y desarrollo Odoo a medida, con un resultado claro: operaciones inmobiliarias que se ejecutan sin trabajo manual repetitivo.",
              "El resultado se nota en cómo trabaja la agencia cada día.",
            ],
          },
        ],
      },
      en: {
        type: "Real-estate CRM and operations platform",
        summary:
          "A custom real-estate CRM and operations platform on Odoo: an environment of more than 40,000 properties with automated matching, AI and integrations.",
        sections: [
          {
            label: "Context",
            body: [
              "A real-estate company operates inside a real-estate environment involving more than 40,000 properties.",
              "Property and client information, and the operations of the business, lived in processes that demanded constant manual intervention.",
            ],
          },
          {
            label: "Platform",
            body: [
              "The system is a custom real-estate CRM and operations platform built on Odoo: Python business logic, PostgreSQL and more than 20 custom Odoo modules, designed around the business's real workflows — not the ERP's defaults.",
            ],
            list: [
              "Environment of 40,000+ properties",
              "More than 20 custom Odoo modules",
              "Python business logic",
              "PostgreSQL",
              "Migration from the previous CRM",
            ],
          },
          {
            label: "Automation",
            body: [
              "The heart of the system is a matching engine that crosses supply and demand automatically: properties and clients find each other without manual intervention.",
              "A generative AI conversational assistant and an AI call center handle, filter and qualify clients; the WhatsApp integration carries the conversation to the channel where the client already is.",
            ],
            list: [
              "Automated supply-demand matching engine",
              "Generative AI conversational assistant",
              "AI call center",
              "WhatsApp integration",
            ],
          },
          {
            label: "Integrations & operations",
            body: [
              "The CRM connects to the portals and systems that move the real-estate business, and returns operational metrics in real time.",
            ],
            list: [
              "Idealista",
              "Fotocasa",
              "MLS integrations",
              "Electronic signature",
              "Marketing integrations",
              "Real-time KPI dashboards",
            ],
          },
          {
            label: "Business impact",
            body: [
              "This is not “an Odoo CRM” off the shelf. It is a complete business system: process analysis, workflow engineering and custom Odoo development, with one clear result — real-estate operations that run without repetitive manual work.",
              "The change is visible in how the agency works every day.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "life-admin",
    title: { es: "Life Admin", en: "Life Admin" },
    featured: true,
    client: { es: "Producto propio", en: "Own product" },
    status: { es: "Privado · desplegado en Base44", en: "Private · deployed on Base44" },
    discipline: { es: "Software de administración personal", en: "Personal administration software" },
    card: {
      category: { es: "Administración personal · IA aplicada", en: "Personal admin · Applied AI" },
      description: {
        es: "Convierte facturas y contratos en obligaciones estructuradas: ciclos, estado de pago, compras, beneficios y privacidad en un solo sistema.",
        en: "Turns invoices and contracts into structured obligations: cycles, payment state, purchases, benefits and privacy in one system.",
      },
      signals: [
        { es: "Extracción con IA", en: "AI extraction" },
        { es: "Motor de recurrencia", en: "Recurrence engine" },
        { es: "Base44 + Deno", en: "Base44 + Deno" },
      ],
    },
    /* The case study lives in src/sections/work/life-admin (i18n: lifeAdmin.*);
       this copy only feeds the generic project lookup and metadata. */
    copy: {
      es: {
        type: "Software de administración personal",
        summary:
          "Sistema personal de administración que convierte documentos en obligaciones estructuradas y deriva ciclos, estados de pago, compras y beneficios. Producto privado construido sobre Base44.",
        sections: [],
      },
      en: {
        type: "Personal administration software",
        summary:
          "A personal administration system that turns documents into structured obligations and derives cycles, payment states, purchases and benefits. A private product built on Base44.",
        sections: [],
      },
    },
  },
  {
    slug: "odoo-engineering",
    title: { es: "Odoo Engineering", en: "Odoo Engineering" },
    featured: true,
    client: { es: "Múltiples proyectos", en: "Multiple engagements" },
    status: { es: "Práctica activa", en: "Ongoing practice" },
    discipline: { es: "Odoo ERP", en: "Odoo ERP" },
    stack: ["Módulos a medida", "Python", "Odoo", "PostgreSQL", "Integraciones", "Migraciones"],
    stats: [
      { value: "20+", label: { es: "Módulos de negocio", en: "Business modules" } },
    ],
    diagram: null,
    copy: {
      es: {
        type: "Práctica de ingeniería",
        summary:
          "Más de 20 módulos de negocio en Odoo desarrollados a medida — ingeniería que va más allá de un solo caso de estudio.",
        sections: [
          {
            label: "Contexto",
            body: [
              "La mayoría de empresas doblan su proceso para encajar en el ERP que compraron. Nosotros hacemos lo contrario: el módulo se diseña alrededor del proceso que la empresa realmente ejecuta.",
            ],
          },
          {
            label: "Capacidades",
            body: [
              "A lo largo de múltiples proyectos hemos diseñado y construido funcionalidad Odoo a medida de principio a fin — la misma disciplina visible en nuestro CRM inmobiliario a medida, aplicada a una gama de negocios.",
            ],
            list: [
              "Módulos a medida",
              "Lógica de negocio en Python",
              "Automatización",
              "Flujos de CRM",
              "Integraciones",
              "Gestión de datos",
              "Herramientas operativas",
              "Migraciones",
            ],
          },
          {
            label: "Enfoque",
            body: [
              "Cada proyecto empieza por el flujo, no por la lista de módulos: primero cómo funciona el negocio, después qué piezas de Odoo construir, conectar o sustituir.",
            ],
          },
        ],
      },
      en: {
        type: "Engineering practice",
        summary:
          "20+ custom business modules built in Odoo across engagements — engineering that goes beyond any single case study.",
        sections: [
          {
            label: "Context",
            body: [
              "Most companies bend their process to fit the ERP they bought. We do the reverse: the module is engineered around the process the company actually runs.",
            ],
          },
          {
            label: "Capabilities",
            body: [
              "Across multiple engagements we have designed and built custom Odoo functionality end to end — the same discipline visible in our custom real-estate CRM, applied to a range of businesses.",
            ],
            list: [
              "Custom modules",
              "Python business logic",
              "Automation",
              "CRM workflows",
              "Integrations",
              "Data management",
              "Operational tools",
              "Migrations",
            ],
          },
          {
            label: "Approach",
            body: [
              "Every engagement starts from the workflow, not the module list: first how the business runs, then which pieces of Odoo to build, connect or replace.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "web-projects",
    title: { es: "Web y productos digitales", en: "Web & digital products" },
    featured: false,
    client: { es: "Clientes pymes", en: "SME clients" },
    status: { es: "Entregado", en: "Delivered" },
    discipline: { es: "Web", en: "Web" },
    card: {
      category: { es: "Web · Producto digital", en: "Web · Digital product" },
      description: {
        es: "Una selección de webs y productos digitales construidos con criterio de producto: webs de servicios, una experiencia 3D y una aplicación en tiempo real.",
        en: "A selection of websites and digital products built with product thinking: service websites, a 3D experience and a real-time application.",
      },
      signals: [
        { es: "4 proyectos", en: "4 projects" },
        { es: "Web responsive", en: "Responsive web" },
        { es: "Diseño + desarrollo", en: "Design + development" },
      ],
    },
    /* The showcase lives in src/sections/work/web-projects (i18n: webProjects.*);
       this copy only feeds the generic project lookup and metadata. */
    copy: {
      es: {
        type: "Web y productos digitales",
        summary:
          "Una selección de proyectos web diseñados y desarrollados para negocios y productos reales: webs de servicios, una experiencia 3D en el navegador y una aplicación de datos en tiempo real.",
        sections: [],
      },
      en: {
        type: "Web & digital products",
        summary:
          "A selection of web projects designed and built for real businesses and products: service websites, a 3D experience in the browser and a real-time data application.",
        sections: [],
      },
    },
  },
];

/** Public per-language project slug — English uses slugEn when defined. */
export const projectSlug = (project, lang) =>
  lang === "en" && project.slugEn ? project.slugEn : project.slug;