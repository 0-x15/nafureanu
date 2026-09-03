export const ES = {
  meta: {
    home: {
      title: "Nafureanu — Software, IA y automatización para empresas",
      description:
        "Diseñamos y construimos software a medida, automatización e inteligencia artificial alrededor de procesos reales de negocio — desde sistemas internos hasta plataformas completas.",
    },
    services: {
      title: "Servicios — Nafureanu",
      description:
        "Software a medida, IA y automatización, sistemas de negocio, ingeniería Odoo, integraciones, productos digitales y pagos con stablecoins.",
    },
    work: {
      title: "Proyectos — Nafureanu",
      description:
        "Sistemas en producción: plataforma de operaciones inmobiliarias, infraestructura de pagos con stablecoins, ingeniería Odoo y software a medida.",
    },
    about: {
      title: "Estudio — Nafureanu",
      description:
        "Compañía de ingeniería de software. Construimos tecnología alrededor de procesos de negocio reales.",
    },
    contact: {
      title: "Contacto — Nafureanu",
      description:
        "Cuéntanos qué necesitas construir. Respondemos con preguntas reales y una propuesta de sistema.",
    },
  },
  nav: {
    work: "Proyectos",
    services: "Servicios",
    about: "Estudio",
    start: "Hablar de un proyecto",
  },
  hero: {
    eyebrow: "Software · IA · Automatización",
    titleA: "Software que elimina",
    titleB: "trabajo.",
    sub: "Diseñamos software, automatización e inteligencia artificial alrededor de procesos reales de negocio — desde sistemas internos hasta plataformas completas.",
    ctaPrimary: "Hablar de un proyecto",
    ctaSecondary: "Ver proyectos",
  },
  stats: {
    title: "Sistemas en producción",
    subtitle: "Lo que ya hemos puesto a trabajar.",
    intro:
      "No hablamos solo de lo que podemos construir. Aquí hay sistemas que ya hemos diseñado, desarrollado y puesto a funcionar.",
    states: [
      {
        headline: "De la idea a producción.",
        copy: "Diseñamos y desarrollamos software, automatización y productos digitales de principio a fin — desde la arquitectura hasta el despliegue.",
        context: "Software · Automatización · Productos digitales",
        proof: { value: 50, suffix: "+", label: "Proyectos entregados" },
        to: "/work",
        cta: "Ver proyectos",
      },
      {
        headline: "Operaciones inmobiliarias, convertidas en sistema.",
        copy: "Un CRM inmobiliario a medida centraliza propiedades, clientes y operaciones, automatiza procesos y adapta Odoo a la forma real de trabajar del negocio.",
        context: "CRM inmobiliario · Odoo · Automatización · Integraciones",
        proof: { value: 40, suffix: "K+", label: "Propiedades gestionadas" },
        to: "/work",
        cta: "Ver proyectos",
      },
      {
        headline: "Software que se adapta al negocio.",
        copy: "Construimos lógica, módulos, automatizaciones e integraciones alrededor de los procesos reales de cada empresa — no al revés.",
        context: "Odoo · Python · PostgreSQL · Integrations",
        proof: { value: 20, suffix: "+", label: "Módulos Odoo personalizados" },
        to: "/work",
        cta: "Ver proyectos",
      },
      {
        headline: "Infraestructura compleja. Experiencia simple.",
        copy: "Fivo conecta pagos con stablecoins, verificación on-chain y liquidación cross-chain para que la complejidad ocurra detrás del producto.",
        context: "Fivo · Payments · USDC / EURC · Circle CCTP",
        proof: { value: 9, suffix: "", label: "Redes blockchain" },
        to: "/work",
        cta: "Ver proyectos",
      },
    ],
  },
  build: {
    kicker: "Qué construimos",
    title: "Tecnología para operar mejor.",
    intro:
      "No partimos de una tecnología concreta. Partimos de cómo funciona tu empresa, qué consume tiempo y qué debería funcionar mejor. Después diseñamos el sistema adecuado.",
    whenLabel: "Cuándo lo necesitas",
    buildLabel: "Qué construimos",
    capabilities: [
      {
        name: "Software",
        headline: "Cuando la herramienta que necesitas no existe.",
        copy: "Diseñamos software alrededor de tu operación: plataformas internas, productos SaaS, dashboards y aplicaciones construidas para procesos concretos.",
        when: "Cuando hojas de cálculo, herramientas genéricas o procesos manuales ya no acompañan cómo funciona la empresa.",
        items: ["Plataformas a medida", "SaaS", "Herramientas internas", "Dashboards", "Aplicaciones"],
        evidence: "React · Node.js · Python · PostgreSQL · APIs",
        cta: "Explorar software a medida",
      },
      {
        name: "Automatización e IA",
        headline: "Trabajo que no debería necesitar a una persona.",
        copy: "Automatizamos tareas, decisiones y flujos repetitivos conectando software, datos e inteligencia artificial.",
        when: "Cuando el equipo dedica tiempo a clasificar, copiar, responder, revisar, mover información o hacer seguimiento manualmente.",
        items: ["Asistentes IA", "Agentes", "Procesamiento de documentos", "Workflows inteligentes", "Automatización operativa", "Sistemas conversacionales"],
        evidence: "LLMs · OpenAI · Claude · Webhooks · Automation",
        cta: "Explorar automatización e IA",
      },
      {
        name: "Sistemas de negocio",
        headline: "Una operación conectada en lugar de herramientas aisladas.",
        copy: "Centralizamos clientes, procesos, datos y operaciones en sistemas construidos alrededor de cómo funciona realmente la empresa.",
        when: "Cuando CRM, ERP, hojas de cálculo y herramientas independientes obligan al equipo a trabajar alrededor del software.",
        items: ["CRM", "ERP", "Odoo", "Sistemas internos", "Operaciones", "Dashboards", "Automatización"],
        evidence: "Odoo · Python · PostgreSQL · APIs",
        cta: "Explorar sistemas de negocio",
      },
      {
        name: "Integraciones",
        headline: "Tus sistemas deberían hablar entre ellos.",
        copy: "Conectamos herramientas, plataformas y datos para que la información se mueva automáticamente entre sistemas.",
        when: "Cuando una persona está haciendo de puente entre dos programas: copiando datos, descargando archivos o repitiendo la misma información.",
        items: ["REST APIs", "Webhooks", "Bots", "Sincronización", "Mensajería", "Integraciones externas"],
        evidence: "REST · Webhooks · APIs · Data synchronization",
        cta: "Explorar integraciones",
      },
      {
        name: "Productos digitales",
        headline: "La tecnología también es la experiencia.",
        copy: "Diseñamos y desarrollamos productos web donde estrategia, interfaz e ingeniería forman parte del mismo sistema.",
        when: "Cuando necesitas lanzar, renovar o convertir una idea en una experiencia digital profesional y preparada para crecer.",
        items: ["Webs corporativas", "Aplicaciones web", "Productos digitales", "Experiencias interactivas", "Interfaces"],
        evidence: "React · JavaScript · Responsive · Performance",
        cta: "Explorar productos digitales",
      },
      {
        name: "Infraestructura avanzada",
        headline: "La complejidad detrás. La simplicidad delante.",
        copy: "Construimos infraestructura para productos que necesitan pagos, blockchain, verificación, wallets o backends con lógica compleja.",
        when: "Cuando el producto depende de tecnología compleja que el usuario final nunca debería tener que entender.",
        items: ["Pagos con stablecoins", "Infraestructura de wallets", "Liquidación cross-chain", "Verificación on-chain", "Backends complejos", "APIs de pago"],
        evidence: "USDC · EURC · Circle · CCTP · Alchemy",
        cta: "Explorar infraestructura",
      },
    ],
    close: {
      kicker: "Empieza por el problema",
      title: "No necesitas saber qué tecnología necesitas.",
      copy: "Cuéntanos qué ocurre hoy. Nosotros decidimos qué conviene construir, automatizar, integrar o simplificar.",
      question: "¿No sabes qué tecnología necesitas?",
      fragments: [
        "Seguimos copiando datos manualmente.",
        "Tenemos herramientas que no se hablan.",
        "El CRM no encaja con nuestro proceso.",
        "Hay tareas que se repiten todos los días.",
        "Tenemos una idea pero no sabemos cómo construirla.",
        "Demasiadas cosas dependen de una persona.",
        "Los datos están repartidos en varios sistemas.",
      ],
      cta: "Cuéntanos qué necesitas resolver",
      all: "Ver todos los servicios",
      trust: "Primero entendemos el proceso. Después proponemos la tecnología.",
    },
  },
  workSection: {
    kicker: "Proyectos destacados",
    title: "Trabajo que opera en producción.",
    viewCase: "Ver el caso",
    intro:
      "Dos proyectos distintos. Una misma idea: convertir complejidad operativa en software que trabaja.",
    moreKicker: "Más trabajo",
    moreLink: "Ver todos los proyectos",
    sophia: {
      index: "01",
      name: "CRM inmobiliario a medida",
      role: "CRM y plataforma de operaciones inmobiliarias",
      headlineA: "Una operación inmobiliaria convertida en sistema.",
      copy: "Un CRM inmobiliario a medida centraliza propiedades, clientes, matching, inteligencia artificial e integraciones dentro de una plataforma construida alrededor de la operación real.",
      proof: [
        { value: "40K+", label: "Propiedades gestionadas" },
        { value: "20+", label: "Módulos Odoo personalizados" },
      ],
      caps: [
        "Matching automático",
        "IA conversacional y llamadas",
        "Integraciones inmobiliarias",
        "KPIs y operaciones",
      ],
      tech: "Odoo · Python · PostgreSQL · IA · APIs",
      showsKicker: "Lo que demuestra",
      shows:
        "Podemos convertir una operación compleja, con datos, personas, herramientas y procesos distintos, en un sistema único que automatiza trabajo y ayuda a tomar decisiones.",
      cta: "Ver caso completo",
      scene: {
        title: "Asistente IA · WhatsApp",
        request: "Busco un piso de 3 habitaciones en Ruzafa",
        matching: "Matching automático",
        found: "Coincidencias encontradas",
        answer:
          "He encontrado coincidencias que encajan. Te envío las mejores ahora mismo.",
      },
    },
    fivo: {
      index: "02",
      name: "Fivo",
      role: "Infraestructura de pagos con stablecoins",
      headlineA: "Una integración.",
      headlineB: "Nueve redes.",
      copy: "Fivo permite aceptar pagos en USDC y EURC desde nueve redes blockchain mediante una única integración. La infraestructura gestiona verificación, liquidación y movimiento cross-chain detrás de una experiencia simple.",
      proof: [
        { value: "9", label: "Redes blockchain" },
        { value: "2", label: "Stablecoins · USDC + EURC" },
        { value: "<2 min", label: "Liquidación cross-chain" },
      ],
      caps: [
        "Checkout embebible",
        "REST API",
        "Payment links",
        "Webhooks",
        "Verificación on-chain",
        "Circle CCTP",
        "Programmable Wallets",
      ],
      security:
        "Circle Programmable Wallets · 2FA · Rate limiting · Audit trail · Verificación on-chain",
      tech: "USDC / EURC · Circle CCTP · Programmable Wallets · REST API · Webhooks · Alchemy",
      showsKicker: "Lo que demuestra",
      shows:
        "Podemos construir producto, API e infraestructura de pagos compleja detrás de una experiencia simple para el usuario.",
      cta: "Ver caso completo",
      scene: {
        title: "Liquidación",
        confirmed: "Pago confirmado",
        verifying: "Verificación on-chain",
        settling: "Liquidación cross-chain",
        done: "Completada · 9 redes",
        networks: "9 redes · una integración",
      },
    },
  },
  homeProcess: {
    kicker: "Cómo trabajamos",
    title: "De proceso a sistema.",
    intro:
      "No empezamos escribiendo código. Primero entendemos cómo funciona la operación; después diseñamos el sistema que debe ejecutarla.",
    inputLabel: "Entrada",
    inputName: "Proceso real",
    inputFragments: ["Cliente", "Excel", "CRM", "Email", "Equipo", "Datos"],
    outputLabel: "Salida",
    outputName: "Sistema en producción",
    outputLine:
      "Un sistema conectado, automatizado y preparado para evolucionar con la empresa.",
    status: "En producción",
    ops: "Operar · mantener · evolucionar",
    movements: ["Comprender", "Construir", "Operar"],
  },
  process: [
    { num: "01", title: "Entender", text: "Estudiamos cómo funciona tu negocio y dónde se pierde el tiempo." },
    { num: "02", title: "Arquitectar", text: "Diseñamos el sistema: datos, flujos, integraciones y automatización." },
    { num: "03", title: "Construir", text: "Desarrollamos, probamos y entregamos en iteraciones." },
    { num: "04", title: "Integrar", text: "Conectamos el sistema con tus herramientas y tus datos." },
    { num: "05", title: "Automatizar", text: "Los procesos repetitivos empiezan a ejecutarse solos." },
    { num: "06", title: "Desplegar", text: "El sistema entra en producción, se mantiene y evoluciona." },
  ],
  why: {
    kicker: "Por qué Nafureanu",
    title: "No entregamos interfaces. Diseñamos el sistema detrás de la operación.",
    points: [
      {
        title: "Primero el proceso",
        text: "Entendemos cómo opera tu negocio antes de escribir una línea de código.",
      },
      {
        title: "Automatización por defecto",
        text: "Si una tarea se repite, el sistema la ejecuta solo.",
      },
      {
        title: "Sistemas que duran",
        text: "Documentados, mantenibles y preparados para evolucionar con la empresa.",
      },
    ],
    sub: "La interfaz es solo la parte visible. El valor está en cómo se conectan los procesos, los datos, las automatizaciones y las herramientas que hacen funcionar la operación.",
    surfaceLabel: "Lo que se ve",
    surfaceName: "Interfaz",
    surfaceItems: ["Dashboard", "Clientes", "Operaciones", "Automatización"],
    systemLabel: "Lo que construimos",
    systemLayers: [
      { name: "Proceso", note: "Cómo funciona el negocio" },
      { name: "Datos", note: "Lo que el sistema sabe" },
      { name: "Lógica", note: "Reglas y decisiones" },
      { name: "Integraciones", note: "Cómo se comunican las herramientas" },
      { name: "Automatización", note: "Lo que se ejecuta sin trabajo manual" },
      { name: "Operación", note: "Lo que ocurre cada día" },
    ],
    anchors: [
      "Proceso · Datos · Lógica",
      "Lógica · Integraciones · Automatización",
      "Arquitectura · Operación · Evolución",
    ],
    closingA: "La interfaz es el resultado.",
    closingB: "El sistema es el producto.",
  },
  homeCta: {
    kicker: "Hablemos",
    title: "¿Qué necesitas construir?",
    note: "Cuéntanos tu proceso y te diremos cómo convertirlo en sistema.",
    button: "Hablar del proyecto",
    reassurance: "No necesitas llegar con una solución definida.",
    explain:
      "Cuéntanos qué ocurre hoy. Nosotros hacemos las preguntas necesarias para entender qué conviene construir.",
    briefKicker: "Empieza por aquí",
    brief: [
      {
        num: "01",
        title: "Qué ocurre hoy",
        text: "¿Qué proceso, tarea o sistema no está funcionando como debería?",
      },
      {
        num: "02",
        title: "Qué quieres cambiar",
        text: "¿Qué consume tiempo, crea errores o depende demasiado de personas?",
      },
      {
        num: "03",
        title: "Qué resultado buscas",
        text: "¿Qué debería ocurrir automáticamente o funcionar mejor?",
      },
    ],
    trust: "Respondemos con preguntas reales, no con una propuesta genérica.",
  },
  servicesPage: {
    kicker: "Servicios",
    h1: "Qué construimos.",
    intro:
      "Siete disciplinas, una forma de trabajar: primero entender el proceso, después construir el sistema que lo ejecuta.",
    when: "Cuándo lo necesitas",
    heardKicker: "Lo que escuchamos",
    heardTitle: "Las empresas llegan con frases como estas.",
    heardNote: "Si alguna te suena, es buen momento para hablar.",
    processKicker: "Cómo trabajamos",
    processTitle: "De proceso a sistema.",
    cta: {
      kicker: "Contacto",
      title: "¿Te reconoces en algo de esto?",
      note: "Cuéntanos el cuello de botella. Lo convertimos en sistema.",
    },
  },
  heard: [
    "Dedicamos demasiado tiempo a hacer esto manualmente.",
    "Nuestro CRM no encaja con nuestro negocio.",
    "Nuestro software no se comunica.",
    "Necesitamos una plataforma interna a medida.",
    "Queremos usar IA dentro de la empresa.",
    "Necesitamos automatizar operaciones repetitivas.",
    "Necesitamos una integración.",
    "Necesitamos desarrollo Odoo a medida.",
    "Tenemos un proceso de negocio y no sabemos cómo automatizarlo.",
  ],
  workPage: {
    kicker: "Proyectos",
    h1: "Sistemas que ya están trabajando.",
    intro:
      "Software, automatización e infraestructura construidos alrededor de problemas reales de negocio.",
    secondary:
      "Explora cómo convertimos operaciones, procesos y productos en sistemas que funcionan.",
    viewProject: "Ver proyecto",
    close: {
      line: "Cada proyecto empezó con un proceso que podía funcionar mejor.",
      cta: "Hablar de un proyecto",
    },
  },
  crm: {
    hero: {
      kicker: "CRM inmobiliario a medida",
      title: "Cuando el CRM se adapta a la inmobiliaria. No al revés.",
      support:
        "Un sistema construido sobre Odoo para centralizar propiedades, clientes, demandas, visitas y operaciones — automatizando el trabajo que normalmente depende del equipo.",
      proof: [
        { value: "40K+", label: "Propiedades gestionadas" },
        { value: "20+", label: "Módulos Odoo a medida" },
      ],
      tech: "Odoo · Python · PostgreSQL · Automatización · IA · APIs",
    },
    problem: {
      kicker: "El problema",
      titleA: "Un CRM genérico almacena información.",
      titleB: "Una inmobiliaria necesita que el sistema entienda cómo trabaja.",
      intro: "Tipos de problemas que este tipo de sistema está construido para eliminar:",
      howLabel: "Cómo lo resuelve el CRM",
      pains: [
        {
          title: "Leads que nadie atiende a tiempo.",
          solutionTitle: "SLA de primer contacto",
          solution:
            "Cuando un lead se asigna, el CRM inicia el control del primer contacto en horas laborables. El sistema puede avisar antes de que venza el plazo, marcar el SLA como vencido y liberar la oportunidad a la cola si continúa sin atenderse. Al registrar el primer contacto, el reloj se detiene.",
        },
        {
          title: "Matching entre clientes e inmuebles hecho manualmente.",
          solutionTitle: "Motor de cruces automático",
          solution:
            "El CRM cruza automáticamente la demanda con los inmuebles compatibles y también trabaja en sentido inverso: desde un inmueble puede detectar posibles interesados. Filtra por criterios esenciales y puntúa la compatibilidad según las características de cada caso. Desde un cruce se puede continuar directamente hacia acciones como una visita.",
        },
        {
          title: "Información duplicada entre herramientas.",
          solutionTitle: "Contacto unificado y deduplicación",
          solution:
            "El sistema utiliza el teléfono normalizado como control de unicidad y detecta contactos existentes antes de crear duplicados. Las entradas procedentes de canales conectados pueden reutilizar el contacto existente y existe una herramienta de fusión que archiva duplicados conservando la trazabilidad.",
        },
        {
          title: "Portales que hay que actualizar por separado.",
          solutionTitle: "Publicación conectada al inmueble",
          solution:
            "Idealista y Fotocasa están conectados directamente con la ficha del inmueble. El CRM permite publicar, actualizar y retirar anuncios desde el propio sistema y detecta cambios relevantes para que la información del portal pueda mantenerse sincronizada sin volver a introducirla manualmente.",
        },
        {
          title: "Visitas y calendario desconectados del CRM.",
          solutionTitle: "Agenda operativa unificada",
          solution:
            "El CRM reúne tareas, visitas y devoluciones de llamada dentro de una misma agenda. Las tareas generan un evento espejo en Google Calendar y los cambios relevantes pueden sincronizarse en ambos sentidos, manteniendo la planificación conectada con el registro real del CRM.",
        },
        {
          title: "Documentación que depende de revisión manual.",
          solutionTitle: "Documentación convertida en workflow",
          solution:
            "El CRM no elimina la validación humana cuando es necesaria: la convierte en un proceso controlado. Cada documento tiene estados, permisos y requisitos; los documentos obligatorios pueden bloquear avances como la publicación, y su aprobación o firma puede actualizar automáticamente el checklist y las alertas asociadas.",
        },
        {
          title: "Seguimientos que dependen de que alguien los recuerde.",
          solutionTitle: "Agenda, tareas y alertas automáticas",
          solution:
            "Llamadas, revisitas, seguimientos, documentación y recordatorios se convierten en tareas con fecha, responsable y estado. El sistema detecta tareas vencidas y también puede generar avisos por inactividad, prospectos sin avance o mandatos próximos a vencer, reduciendo la dependencia de la memoria del equipo.",
        },
        {
          title: "WhatsApp y llamadas fuera del contexto del cliente.",
          solutionTitle: "Comunicación vinculada al CRM",
          solution:
            "Los mensajes de WhatsApp se registran y vinculan con los contactos y procesos del CRM; los mensajes entrantes pueden localizar o crear el contacto correspondiente y notificar al agente responsable. Las llamadas también se registran con su contexto — contacto, demanda, prospecto o inmueble — para que la conversación forme parte del historial operativo.",
        },
      ],
    },
    centralizes: {
      kicker: "Qué centraliza",
      title: "Toda la operación vive en el mismo sistema.",
      intro:
        "Información, personas y procesos que antes vivían repartidos entre herramientas.",
      list: [
        "Inmuebles",
        "Clientes",
        "Demandas",
        "Prospectos",
        "Leads",
        "Visitas",
        "Operaciones",
        "Documentación",
        "Comunicación",
        "Agenda",
      ],
    },
    system: {
      kicker: "El sistema",
      title: "Una operación inmobiliaria convertida en software.",
      flow: {
        intake: "Captación",
        property: "Inmueble",
        matching: "Matching",
        demand: "Demanda / Cliente",
        visit: "Visita",
        negotiation: "Negociación",
        deposit: "Arras",
        financing: "Financiación",
        deed: "Escritura",
        afterSales: "Postventa",
        note: "Oferta ↔ Demanda — cruzadas automáticamente",
      },
      layersLabel: "Capas del sistema",
      layers: [
        "Automatización",
        "IA",
        "WhatsApp",
        "Calendario",
        "Documentación",
        "Portales",
        "Reporting",
      ],
    },
    automation: {
      kicker: "Automatización",
      title: "Trabajo que el CRM hace solo.",
      modules: [
        {
          title: "Matching automático",
          text: "Cruza demanda e inmuebles y detecta coincidencias sin búsqueda manual.",
        },
        {
          title: "Seguimiento de leads",
          text: "El sistema controla tiempos de respuesta, actividad y seguimientos pendientes.",
        },
        {
          title: "Checklists inteligentes",
          text: "Los requisitos del expediente avanzan conforme el propio sistema detecta que se han cumplido.",
        },
        {
          title: "Alertas y recordatorios",
          text: "Visitas, documentación, tareas, exclusivas y operaciones dejan de depender de la memoria.",
        },
        {
          title: "Sincronización de operaciones",
          text: "Los cambios se propagan entre CRM, agenda, portales y herramientas conectadas.",
        },
        {
          title: "Cualificación asistida por IA",
          text: "Conversaciones y llamadas pueden convertirse en información estructurada dentro del CRM.",
        },
      ],
    },
    matching: {
      title: "El CRM no solo guarda datos. Los utiliza para encontrar oportunidades.",
      paras: [
        "El sistema de matching compara la oferta de inmuebles con la demanda de compradores e inquilinos: evalúa criterios relevantes y detecta oportunidades compatibles sin búsqueda manual.",
        "Funciona en las dos direcciones: desde un cliente hacia los inmuebles compatibles, y desde un inmueble hacia los posibles interesados.",
      ],
      demo: {
        demand: "Demanda",
        criteria: ["3 dormitorios", "Zona", "Presupuesto", "Características"],
        engine: "Matching",
        results: "Coincidencias",
        resultRow: "Inmueble compatible",
      },
    },
    documents: {
      title: "Los documentos forman parte del proceso, no son simples archivos adjuntos.",
      paras: [
        "Cada documento pertenece a una operación: tiene requisitos, estado, revisión y firma. El expediente avanza conforme el sistema detecta que se ha cumplido.",
      ],
      states: ["Pendiente", "Revisión", "Aprobado"],
    },
    operations: {
      title: "De la visita al cierre, dentro del mismo sistema.",
      paras: [
        "El CRM puede modelar las etapas de la operación inmobiliaria — visita, seguimiento, negociación, arras, financiación, escritura y postventa — con sus estados, plazos y dependencias.",
      ],
      stages: ["Visita", "Seguimiento", "Negociación", "Arras", "Financiación", "Escritura", "Postventa"],
    },
    integrations: {
      kicker: "Integraciones",
      title: "El CRM forma parte del ecosistema de la inmobiliaria.",
      note: "Herramientas y portales conectados con el sistema en este proyecto.",
      list: ["Idealista", "Fotocasa", "MLS", "WhatsApp", "Google Calendar", "Odoo Sign"],
    },
    ai: {
      title: "IA dentro del proceso, no encima del producto.",
      paras: [
        "La IA asiste donde el proceso lo necesita: conversación, cualificación de leads, extracción de información, flujos de llamadas y flujos de documentos.",
      ],
      key: "La IA trabaja sobre los datos y reglas del sistema. No sustituye la lógica del negocio.",
    },
    odoo: {
      kicker: "Ingeniería Odoo",
      title: "Odoo como base. La operación del cliente como diseño.",
      copy: "Partimos de la infraestructura de Odoo, pero adaptamos modelos, lógica, automatizaciones e interfaz hasta que el sistema trabaja como trabaja la empresa.",
      items: [
        {
          title: "Módulos propios",
          text: "Creamos funcionalidad que Odoo no ofrece de serie.",
        },
        {
          title: "Módulos adaptados",
          text: "Extendemos y modificamos módulos existentes alrededor del proceso real.",
        },
        {
          title: "Lógica de negocio",
          text: "Implementamos reglas, validaciones y automatizaciones específicas en Python.",
        },
        {
          title: "Interfaces propias",
          text: "Cuando la experiencia estándar no encaja, construimos superficies de trabajo adaptadas al equipo.",
        },
        {
          title: "Integraciones",
          text: "Conectamos Odoo con las herramientas que ya participan en la operación.",
        },
      ],
    },
    gallery: {
      kicker: "El sistema por dentro",
      title: "Vistas del entorno de demostración.",
      items: [
        "Panel de operaciones",
        "Ficha de inmueble",
        "Matching",
        "Demanda",
        "Visitas",
        "Documentación",
        "Automatización",
        "Integraciones",
      ],
    },
    cta: {
      kicker: "¿Tu CRM no encaja con tu operación?",
      title: "No necesitas cambiar cómo trabaja tu empresa para adaptarte al software.",
      copy: "Podemos diseñar el sistema alrededor de tus procesos, automatizaciones e integraciones.",
      primary: "Hablar de un proyecto",
      secondary: "Ver todos los proyectos",
    },
  },
  caseStudy: {
    specs: ["Cliente", "Estado", "Disciplina"],
    product: "El producto",
    stack: "Tecnologías",
    architecture: "Arquitectura",
    next: "Siguiente proyecto",
    notFound: "Este caso no existe.",
    back: "Volver a proyectos",
    cta: {
      kicker: "Contacto",
      title: "¿Tienes un proceso como este?",
      note: "Cuéntanos qué necesitas construir.",
    },
  },
  about: {
    kicker: "Estudio",
    h1: "Una compañía de ingeniería de software.",
    lead: "Nafureanu diseña y construye la tecnología sobre la que operan las empresas: software a medida, sistemas de IA y automatización pensados para procesos de negocio reales. Primero entendemos el negocio; después eliminamos su trabajo repetitivo con ingeniería.",
    principlesKicker: "Cómo trabajamos",
    principlesTitle: "Cuatro principios.",
    principles: [
      {
        num: "01",
        title: "Sistemas, no pantallas",
        text: "Diseñamos el proceso completo, no solo la interfaz que hay encima.",
      },
      {
        num: "02",
        title: "Automatización por defecto",
        text: "Si una tarea se repite, debe ejecutarse sin que una persona la empuje.",
      },
      {
        num: "03",
        title: "Precisión",
        text: "Cada decisión de ingeniería se toma deliberadamente y se puede explicar.",
      },
      {
        num: "04",
        title: "Mantenibilidad",
        text: "Los sistemas se construyen para operarse, entenderse y evolucionarse durante años.",
      },
    ],
    founderKicker: "Fundador",
    founderTitle:
      "Nafureanu fue fundado por Daniel, ingeniero de software enfocado en software a medida, IA y automatización de negocio.",
    founderNote:
      "La compañía está construida para crecer más allá de una persona: cada sistema se entrega documentado, estructurado y mantenible por diseño.",
    cta: {
      kicker: "Contacto",
      title: "Trabaja con Nafureanu.",
      note: "Trae un problema, un proceso roto o una idea sin forma — nosotros ponemos la ingeniería.",
    },
  },
  contact: {
    kicker: "Contacto",
    h1: "Cuéntanos qué necesitas construir.",
    sub: "Cuanto más contexto nos des, mejor será nuestra primera respuesta.",
    fields: {
      name: "Nombre y apellidos",
      company: "Empresa",
      email: "Email",
      need: "¿Qué necesitas construir?",
      problem: "¿Qué problema quieres resolver?",
      result: "¿Qué resultado esperas?",
    },
    ph: {
      name: "María García",
      company: "Empresa S.L.",
      email: "maria@empresa.com",
      need: "Ej. automatizar la gestión de pedidos…",
      problem: "Ej. dedicamos horas a pasar datos entre sistemas…",
      result: "Ej. que el proceso se ejecute solo…",
    },
    submit: "Enviar mensaje",
    error: "Necesitamos al menos tu nombre y tu email para poder responderte.",
    subjectPrefix: "Proyecto — ",
    nextKicker: "Qué pasa después",
    steps: [
      "Leemos tu mensaje.",
      "Respondemos con preguntas reales.",
      "Mapeamos tu proceso.",
      "Proponemos un sistema.",
    ],
    emailKicker: "Email directo",
    note: "Aceptamos un número limitado de proyectos a la vez para mantener el nivel de cada sistema.",
  },
  footer: {
    tagline: "Software, IA y automatización para empresas.",
    crm: "CRM inmobiliario a medida",
    nav: "Navegación",
    services: "Servicios",
    work: "Trabajo",
    contact: "Contacto",
    home: "Inicio",
    rights: "Todos los derechos reservados",
    ctaQuestion: "¿Tienes un proceso que debería funcionar mejor?",
  },
};