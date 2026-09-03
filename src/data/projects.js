export const PROJECTS = [
  {
    slug: "fivo",
    title: { es: "Fivo", en: "Fivo" },
    featured: true,
    client: { es: "Producto independiente", en: "Independent product" },
    status: { es: "Producto en producción", en: "Live product" },
    discipline: { es: "Pagos / Blockchain", en: "Payments / Blockchain" },
    card: {
      category: { es: "Pagos · Stablecoins", en: "Payments · Stablecoins" },
      description: {
        es: "Infraestructura de pagos con USDC y EURC a través de múltiples redes blockchain.",
        en: "Payment infrastructure with USDC and EURC across multiple blockchain networks.",
      },
      signals: [
        { es: "9 redes", en: "9 networks" },
        { es: "REST API", en: "REST API" },
        { es: "Circle CCTP", en: "Circle CCTP" },
      ],
    },
    stack: [
      "USDC / EURC",
      "Circle CCTP",
      "Circle Programmable Wallets",
      "REST API",
      "Webhooks",
      "Alchemy",
      "Vercel",
    ],
    stats: [
      { value: "9", label: { es: "Redes blockchain", en: "Blockchain networks" } },
    ],
    diagram: {
      variant: "flow",
      title: { es: "Arquitectura de pagos", en: "Payment architecture" },
      nodes: [
        { label: { es: "Comercio", en: "Merchant" } },
        { label: { es: "Checkout / enlace de pago", en: "Checkout / payment link" } },
        { label: { es: "Motor de pagos Fivo", en: "Fivo payment engine" }, active: true },
        { label: "USDC / EURC" },
        { label: "Circle CCTP" },
        { label: { es: "Red blockchain", en: "Blockchain network" } },
        { label: { es: "Verificación on-chain", en: "On-chain verification" }, active: true },
        {
          label: { es: "Webhook / liquidación / factura", en: "Webhook / settlement / invoice" },
        },
      ],
    },
    copy: {
      es: {
        type: "Infraestructura de pagos",
        summary:
          "Infraestructura de pagos con stablecoins — USDC y EURC — para comercios online, con liquidación entre 9 redes blockchain.",
        sections: [
          {
            label: "Contexto",
            body: [
              "Los comercios que quieren aceptar stablecoins se enfrentan a un ecosistema fragmentado: múltiples redes blockchain, herramientas inconsistentes e integraciones que nunca se diseñaron para pagos.",
              "Fivo elimina esa complejidad del lado del comercio.",
            ],
          },
          {
            label: "Sistema",
            body: [
              "Fivo es infraestructura de pagos con stablecoins para comercios online, construida dentro del ecosistema Circle, con liquidación entre 9 redes blockchain.",
            ],
            list: [
              "USDC / EURC",
              "Circle Alliance Member",
              "Circle Programmable Wallets",
              "Circle CCTP — transferencia cross-chain",
              "Liquidación en 9 redes blockchain",
            ],
          },
          {
            label: "Producto",
            body: [
              "Todo lo que un comercio necesita para cobrar, integrado sin fricción para el desarrollador.",
            ],
            list: [
              "API REST",
              "Checkout embebible",
              "Enlaces de pago",
              "Webhooks y notificaciones",
              "Facturación PDF automatizada multilingüe",
              "Cálculo de impuestos",
              "Reembolsos on-chain",
              "Verificación de pagos on-chain",
            ],
          },
          {
            label: "Ingeniería y seguridad",
            body: [
              "La infraestructura está diseñada para operar con criterio: seguridad aplicada en cada capa del sistema.",
            ],
            list: [
              "Autenticación 2FA",
              "Rate limiting",
              "Audit logs",
              "Infraestructura en Vercel",
              "Infraestructura RPC de Alchemy",
            ],
          },
          {
            label: "Impacto",
            body: [
              "Fivo demuestra ingeniería de tecnología financiera compleja: arquitectura multi-chain, automatización de pagos y una experiencia de integración pensada para desarrolladores.",
            ],
          },
        ],
      },
      en: {
        type: "Payment infrastructure",
        summary:
          "Stablecoin payment infrastructure — USDC and EURC — for online merchants, with settlement across 9 blockchain networks.",
        sections: [
          {
            label: "Context",
            body: [
              "Merchants who want to accept stablecoins face a fragmented ecosystem: multiple blockchain networks, inconsistent tooling, and integrations that were never designed for payments.",
              "Fivo removes that complexity from the merchant's side.",
            ],
          },
          {
            label: "System",
            body: [
              "Fivo is stablecoin payment infrastructure for online merchants, built inside the Circle ecosystem, with settlement across 9 blockchain networks.",
            ],
            list: [
              "USDC / EURC",
              "Circle Alliance Member",
              "Circle Programmable Wallets",
              "Circle CCTP — cross-chain transfer",
              "Settlement across 9 blockchain networks",
            ],
          },
          {
            label: "Product",
            body: [
              "Everything a merchant needs to charge, integrated without friction for the developer.",
            ],
            list: [
              "REST API",
              "Embeddable checkout",
              "Payment links",
              "Webhooks and notifications",
              "Multilingual automated PDF invoicing",
              "Tax calculations",
              "On-chain refunds",
              "On-chain payment verification",
            ],
          },
          {
            label: "Engineering & security",
            body: [
              "The infrastructure is engineered to operate deliberately: security applied at every layer of the system.",
            ],
            list: [
              "2FA authentication",
              "Rate limiting",
              "Audit logs",
              "Vercel infrastructure",
              "Alchemy RPC infrastructure",
            ],
          },
          {
            label: "Business impact",
            body: [
              "Fivo demonstrates our ability to build complex financial technology: multi-chain architecture, payment automation, and a developer experience built for real integrations.",
            ],
          },
        ],
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
    title: { es: "CRM de gestión interna", en: "Internal management CRM" },
    featured: true,
    client: { es: "Interno / privado", en: "Internal / private" },
    status: { es: "Privado — no lanzado", en: "Private — not publicly launched" },
    discipline: { es: "CRM a medida", en: "Custom CRM" },
    card: {
      category: { es: "CRM · Gestión · Automatización", en: "CRM · Management · Automation" },
      description: {
        es: "Sistema interno de gestión y CRM para centralizar clientes, estados y procesos administrativos.",
        en: "An internal CRM and management system that centralizes clients, statuses and administrative processes.",
      },
      signals: [
        { es: "CRM a medida", en: "Custom CRM" },
        { es: "Gestión de flujos", en: "Workflow management" },
        { es: "Automatización", en: "Automation" },
      ],
    },
    stack: ["Arquitectura a medida", "Gestión de flujos", "CRM", "Administración", "Automatización"],
    stats: [],
    diagram: null,
    copy: {
      es: {
        type: "Sistema de gestión interno",
        summary:
          "Sistema interno de gestión y CRM para la administración de un negocio — un proyecto de software privado.",
        sections: [
          {
            label: "Contexto",
            body: [
              "La parte administrativa de un negocio está llena de coordinación repetitiva: información dispersa y procesos que solo avanzan si alguien los empuja.",
            ],
          },
          {
            label: "Sistema",
            body: [
              "El sistema es un CRM y sistema de gestión a medida construido alrededor de esa realidad: arquitectura de software propia, gestión de flujos, administración y automatización en un solo lugar.",
            ],
          },
          {
            label: "Impacto",
            body: [
              "El producto no se ha lanzado públicamente, así que se presenta como un proyecto interno y privado — sin tracción pública atribuida.",
              "Lo que demuestra es arquitectónico: cómo un sistema a medida puede modelar un proceso administrativo de principio a fin y hacerlo ejecutarse solo.",
            ],
          },
        ],
      },
      en: {
        type: "Internal management system",
        summary:
          "A custom CRM and management system for business administration — a private, internal software project.",
        sections: [
          {
            label: "Context",
            body: [
              "The administrative side of running a business is full of repetitive coordination: information scattered across places, and processes that run only if someone remembers to push them.",
            ],
          },
          {
            label: "System",
            body: [
              "The system is a custom CRM and management system built around that administrative reality: custom software architecture, workflow management, business administration and automation in one place.",
            ],
          },
          {
            label: "Business impact",
            body: [
              "The product has not been publicly launched, so it is presented here as an internal, private software project — no public traction is claimed.",
              "What it demonstrates is architectural: how a custom system can model an administrative process end to end and make it execute itself.",
            ],
          },
        ],
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
        es: "Webs y experiencias digitales diseñadas y desarrolladas con criterio de producto e ingeniería.",
        en: "Websites and digital experiences designed and built with product and engineering discipline.",
      },
      signals: [
        { es: "React", en: "React" },
        { es: "Responsive", en: "Responsive" },
        { es: "Performance", en: "Performance" },
      ],
    },
    stack: ["React", "Webs corporativas", "Experiencias interactivas", "Rendimiento"],
    stats: [],
    diagram: null,
    copy: {
      es: {
        type: "Web y productos digitales",
        summary:
          "Webs corporativas y experiencias interactivas para pequeñas y medianas empresas.",
        sections: [
          {
            label: "Contexto",
            body: [
              "Nafureanu ha diseñado y desarrollado webs para pequeñas y medianas empresas — pero no nos posicionamos como una agencia de webs.",
              "El desarrollo web es una parte de una capacidad de ingeniería de software más amplia.",
            ],
          },
          {
            label: "Sistema",
            body: [
              "Cada web se construye con criterio de ingeniería: rendimiento, accesibilidad y mantenibilidad se tratan igual que en nuestros sistemas internos.",
            ],
          },
          {
            label: "Enfoque",
            body: [
              "Diseño y desarrollo ocurren internamente, con una sola forma de pensar — por eso nuestro trabajo web se sostiene junto a nuestro trabajo de software.",
            ],
          },
        ],
      },
      en: {
        type: "Web & digital products",
        summary:
          "Corporate websites and interactive web experiences for small and medium-sized businesses.",
        sections: [
          {
            label: "Context",
            body: [
              "Nafureanu has designed and developed websites for small and medium-sized businesses — but we are not positioned as a website agency.",
              "Web development is one part of a broader software engineering capability.",
            ],
          },
          {
            label: "System",
            body: [
              "Every website is engineered, not assembled: performance, accessibility and maintainability are treated the same way as in our internal systems.",
            ],
          },
          {
            label: "Approach",
            body: [
              "Design and development happen in-house, in one system of thinking — which is why our web work holds up next to our software work.",
            ],
          },
        ],
      },
    },
  },
];

/** Public per-language project slug — English uses slugEn when defined. */
export const projectSlug = (project, lang) =>
  lang === "en" && project.slugEn ? project.slugEn : project.slug;