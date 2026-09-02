export const CAPABILITIES = [
  {
    id: "custom-software",
    num: "01",
    tech: ["React", "Node.js", "Python", "PostgreSQL", "REST APIs"],
    copy: {
      es: {
        title: "Software a medida",
        short:
          "Plataformas, herramientas internas, SaaS, dashboards y aplicaciones construidas para necesidades concretas.",
        detail:
          "Construimos software con la forma de un negocio concreto, en lugar de forzar el negocio a caber en herramientas genéricas: plataformas internas, herramientas operativas, dashboards, productos SaaS y aplicaciones diseñadas desde tu flujo real.",
      },
      en: {
        title: "Custom Software",
        short:
          "Custom platforms, internal tools, SaaS, dashboards and applications built around specific business needs.",
        detail:
          "We build software shaped around one specific business instead of forcing a business into generic tools: internal platforms, operational tools, dashboards, SaaS products and applications designed from your actual workflow.",
      },
    },
    needs: {
      es: [
        "Tu proceso no encaja en las herramientas del mercado",
        "Necesitas una plataforma interna o un SaaS propio",
        "Los datos viven dispersos entre sistemas",
      ],
      en: [
        "Your process doesn't fit off-the-shelf tools",
        "You need an internal platform or your own SaaS",
        "Your data lives scattered across systems",
      ],
    },
  },
  {
    id: "ai-automation",
    num: "02",
    tech: ["OpenAI", "Claude", "LLMs", "Webhooks", "Orquestación de flujos"],
    copy: {
      es: {
        title: "IA y automatización",
        short:
          "Asistentes IA, integraciones LLM, flujos inteligentes, automatización de negocio y sistemas conversacionales.",
        detail:
          "Introducimos IA donde aporta: asistentes con IA generativa, integraciones de LLM, procesamiento de documentos y datos, y flujos que toman decisiones operativas — para eliminar trabajo repetitivo, no para decorar un pitch.",
      },
      en: {
        title: "AI & Automation",
        short:
          "AI assistants, LLM integrations, intelligent workflows, business automation and conversational systems.",
        detail:
          "We introduce AI where it earns its place: AI assistants, LLM integrations, document and data processing, and workflows that make operational decisions — designed to remove repetitive work, not to decorate a pitch deck.",
      },
    },
    needs: {
      es: [
        "Tareas administrativas que se repiten cada día",
        "Clasificación y procesamiento manual de información",
        "Asistentes IA para clientes y equipos",
      ],
      en: [
        "Administrative tasks that repeat every day",
        "Manual classification and processing of information",
        "AI assistants for clients and teams",
      ],
    },
  },
  {
    id: "business-systems",
    num: "03",
    tech: ["CRM", "ERP", "PostgreSQL", "APIs"],
    copy: {
      es: {
        title: "Sistemas de negocio",
        short:
          "CRM, ERP, herramientas internas, software operativo y digitalización de procesos de negocio.",
        detail:
          "Digitalizamos cómo opera una empresa: CRM, ERP, herramientas internas y software operativo que centralizan la información y ejecutan los procesos del negocio en un solo sistema.",
      },
      en: {
        title: "Business Systems",
        short:
          "CRM, ERP, internal tools, operational software and digitalization of business processes.",
        detail:
          "We digitalize how a company operates: CRM, ERP, internal tools and operational software that centralize information and execute the business's processes in one system.",
      },
    },
    needs: {
      es: [
        "La información de la empresa está dispersa",
        "El CRM o ERP actual no encaja con el negocio",
        "Necesitas digitalizar operaciones internas",
      ],
      en: [
        "Company information lives scattered",
        "The current CRM or ERP doesn't fit the business",
        "You need to digitalize internal operations",
      ],
    },
  },
  {
    id: "odoo-engineering",
    num: "04",
    tech: ["Python", "Odoo", "PostgreSQL", "APIs"],
    copy: {
      es: {
        title: "Ingeniería Odoo",
        short:
          "Módulos a medida, lógica de negocio en Python, flujos de CRM, integraciones, dashboards, automatización y migraciones.",
        detail:
          "Ingeniería de Odoo alrededor de tu proceso: más de 20 módulos de negocio desarrollados, lógica en Python, flujos de CRM, integraciones, dashboards y migraciones — el sistema se adapta a la empresa, nunca al revés.",
      },
      en: {
        title: "Odoo Engineering",
        short:
          "Custom modules, Python business logic, CRM workflows, integrations, dashboards, automation and migrations.",
        detail:
          "Odoo engineered around your process: 20+ business modules developed, Python logic, CRM workflows, integrations, dashboards and migrations — the system fits the company, never the other way around.",
      },
    },
    needs: {
      es: [
        "Necesitas módulos Odoo que no existen",
        "Tus flujos no encajan en el ERP estándar",
        "Migras desde otro sistema",
      ],
      en: [
        "You need Odoo modules that don't exist",
        "Your workflows don't fit the standard ERP",
        "You are migrating from another system",
      ],
    },
  },
  {
    id: "integrations-apis",
    num: "05",
    tech: ["REST APIs", "Webhooks", "Bots", "Sincronización de datos"],
    copy: {
      es: {
        title: "Integraciones y APIs",
        short:
          "APIs REST, webhooks, bots, servicios externos, mensajería y sincronización de datos entre sistemas.",
        detail:
          "Hacemos que los sistemas se hablen: APIs REST, webhooks, bots e integraciones que mueven la información entre tus herramientas automáticamente, en lugar de mediante copiar y pegar.",
      },
      en: {
        title: "Integrations & APIs",
        short:
          "REST APIs, webhooks, bots, external services, messaging systems and data synchronization.",
        detail:
          "We make systems talk to each other: REST APIs, webhooks, bots and integrations that move information between your tools automatically, instead of through copy-paste.",
      },
    },
    needs: {
      es: [
        "Tus sistemas no se comunican entre sí",
        "La información se copia a mano entre herramientas",
        "Necesitas bots o mensajería conectada",
      ],
      en: [
        "Your systems don't talk to each other",
        "Information is copied by hand between tools",
        "You need bots or connected messaging",
      ],
    },
  },
  {
    id: "web-digital",
    num: "06",
    tech: ["React", "JavaScript", "Vercel", "Git"],
    copy: {
      es: {
        title: "Web y productos digitales",
        short:
          "Webs corporativas, experiencias interactivas, aplicaciones React y productos digitales.",
        detail:
          "Diseñamos y construimos webs corporativas, experiencias interactivas y aplicaciones web con la misma disciplina de ingeniería que nuestros sistemas internos — rápidas, accesibles y mantenibles.",
      },
      en: {
        title: "Web & Digital Products",
        short:
          "Corporate websites, interactive experiences, React applications and digital products.",
        detail:
          "We design and build corporate websites, interactive experiences and web applications with the same engineering discipline as our internal systems — fast, accessible and maintainable.",
      },
    },
    needs: {
      es: [
        "Web corporativa con criterio de ingeniería",
        "Aplicación web o experiencia interactiva",
        "Producto digital que debe funcionar y posicionar",
      ],
      en: [
        "A corporate website with real engineering",
        "A web application or interactive experience",
        "A digital product that must work and position",
      ],
    },
  },
  {
    id: "web3-payments",
    num: "07",
    tech: ["Circle", "CCTP", "Stablecoins", "Alchemy"],
    copy: {
      es: {
        title: "Web3 y pagos",
        short:
          "Pagos con stablecoins, wallets, infraestructura cross-chain, verificación on-chain y arquitectura de pagos.",
        detail:
          "Ingeniería de pagos avanzada: infraestructura de stablecoins, Circle Programmable Wallets, liquidación cross-chain con CCTP y verificación on-chain — una capacidad más de la compañía, no su posicionamiento completo.",
      },
      en: {
        title: "Web3 & Payments",
        short:
          "Stablecoin payments, wallets, cross-chain infrastructure, on-chain verification and payment architecture.",
        detail:
          "Advanced payment engineering: stablecoin infrastructure, Circle Programmable Wallets, cross-chain settlement with CCTP and on-chain verification — one capability of the company, not its whole positioning.",
      },
    },
    needs: {
      es: [
        "Quieres aceptar pagos con stablecoins",
        "Necesitas infraestructura cross-chain",
        "Verificación y liquidación on-chain",
      ],
      en: [
        "You want to accept stablecoin payments",
        "You need cross-chain infrastructure",
        "On-chain verification and settlement",
      ],
    },
  },
];