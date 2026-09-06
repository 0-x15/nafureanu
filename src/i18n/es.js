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
      closing:
        "La información no solo está centralizada. Cada parte del sistema conoce su relación con las demás.",
      items: [
        {
          id: "properties",
          num: "01",
          title: "Inmuebles",
          descriptor: "Ficha operativa del activo",
          tags: ["Estado", "Precio", "Imágenes", "Documentación", "Disponibilidad"],
          detail:
            "La ficha del inmueble conecta datos, documentación, alertas, matching, visitas, portales y operaciones desde un único registro.",
          ui: {
            status: "Disponible",
            availability: "Inmediata",
            portals: ["Idealista", "Fotocasa"],
            published: "Publicado",
            linksLabel: "Conectado con",
            links: ["Matching", "Visitas", "Operaciones", "Alertas"],
          },
        },
        {
          id: "clients",
          num: "02",
          title: "Clientes",
          descriptor: "Relación completa con cada contacto",
          tags: ["Comprador", "Vendedor", "Propietario", "Inquilino"],
          detail:
            "Cada contacto reúne actividad, demandas, llamadas, WhatsApp, visitas y operaciones relacionadas.",
          ui: { activity: ["Demanda activa", "Llamada registrada", "Visita programada"] },
        },
        {
          id: "demand",
          num: "03",
          title: "Demandas",
          descriptor: "Lo que busca cada comprador o inquilino",
          tags: ["Zona", "Precio", "Tipo", "Habitaciones", "Superficie", "Financiación"],
          detail:
            "El motor de matching utiliza estos criterios para encontrar inmuebles compatibles automáticamente.",
          ui: { matches: "Coincidencias" },
        },
        {
          id: "prospects",
          num: "04",
          title: "Prospectos",
          descriptor: "Captación antes de incorporar el inmueble",
          detail:
            "El sistema controla evolución, actividad y tareas pendientes, y permite detectar captaciones que llevan demasiado tiempo sin avanzar.",
          ui: { stage: "Evolución de la captación", tasks: "Tareas pendientes", activity: "Última actividad" },
        },
        {
          id: "leads",
          num: "05",
          title: "Leads",
          descriptor: "Entrada y seguimiento de oportunidades",
          detail:
            "Asignación, primer contacto, tiempos de respuesta, actividad y alertas ayudan a evitar oportunidades abandonadas.",
          ui: { assigned: "Asignado", first: "Primer contacto", contacted: "Contactado" },
        },
        {
          id: "visits",
          num: "06",
          title: "Visitas",
          descriptor: "Todo el ciclo de una visita",
          statuses: ["Programada", "Confirmada", "Realizada", "No-show", "Cancelada"],
          detail:
            "La visita queda vinculada con inmueble, cliente, demanda, responsable, calendario, feedback y posible operación posterior.",
          ui: { linksLabel: "Vinculada con", links: ["Inmueble", "Cliente", "Demanda", "Responsable"] },
        },
        {
          id: "operations",
          num: "07",
          title: "Operaciones",
          descriptor: "El cierre comercial completo",
          flow: ["Negociación", "Oferta", "Arras", "Financiación", "Escritura", "Postventa"],
          detail:
            "Cada fase mantiene estados, tareas, documentación y dependencias dentro del mismo proceso.",
          ui: { meters: ["Tareas", "Documentación", "Dependencias"] },
        },
        {
          id: "documents",
          num: "08",
          title: "Documentación",
          descriptor: "Documentos dentro del workflow",
          flow: ["Pendiente", "Revisión", "Aprobado", "Firmado"],
          detail:
            "Requisitos, estados, validaciones, firma y checklists forman parte del proceso operativo.",
          ui: { docs: ["Contrato de arrendamiento", "Ficha energética"], checklist: "Checklist del expediente" },
        },
        {
          id: "communication",
          num: "09",
          title: "Comunicación",
          descriptor: "Conversaciones dentro del contexto del cliente",
          tags: ["WhatsApp", "Llamadas", "Seguimiento"],
          detail:
            "Mensajes y llamadas quedan asociados al contacto y a su contexto operativo dentro del CRM.",
          ui: { incoming: "Entrante", linked: "Vinculado al contacto y a su operación" },
        },
        {
          id: "calendar",
          num: "10",
          title: "Agenda",
          descriptor: "La operación diaria del equipo",
          tags: ["Tareas", "Visitas", "Llamadas", "Recordatorios"],
          detail:
            "Fechas, responsables, vencimientos y sincronización con Google Calendar mantienen la actividad conectada con el CRM.",
          ui: {
            rows: [["09:30", "Visita"], ["12:00", "Llamada"], ["16:15", "Recordatorio"]],
            sync: "Sincronizado con Google Calendar",
          },
        },
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
      intro:
        "El sistema reacciona a datos, estados y eventos de la operación para ejecutar trabajo automáticamente.",
      engine: "Motor de automatización",
      active: "Activo",
      stages: ["Señal", "Lógica CRM", "Acción automática", "Resultado"],
      closing:
        "La automatización no está encima del CRM. Forma parte de cómo funciona cada proceso.",
      modules: [
        {
          id: "matching",
          num: "01",
          title: "Matching automático",
          text: "Cruza demanda e inmuebles y detecta coincidencias sin búsqueda manual.",
          ui: {
            trigger: "Nueva demanda",
            pair: "Demanda ↔ Inmueble",
            engine: "Matching activo",
            criteria: ["Zona", "Precio", "Tipo", "Habitaciones"],
            result: "Coincidencias detectadas",
          },
        },
        {
          id: "leads",
          num: "02",
          title: "Seguimiento de leads",
          text: "El CRM controla primer contacto, actividad y seguimientos para detectar oportunidades que requieren atención.",
          ui: {
            steps: ["Lead asignado", "Primer contacto", "SLA activo", "Aviso / seguimiento"],
            noContact: "Sin contacto",
            alert: "Aviso",
            queue: "Vuelve a la cola",
          },
        },
        {
          id: "checklists",
          num: "03",
          title: "Checklists inteligentes",
          text: "Los requisitos se actualizan conforme el sistema detecta que determinados pasos ya se han cumplido.",
          ui: {
            file: "Expediente",
            items: [
              ["Datos básicos", true],
              ["Fotografías", true],
              ["Documentación", false],
              ["Precio", true],
              ["Publicación", false],
            ],
            autoIndex: 2,
            event: "Documento aprobado",
            autoTag: "Automático",
            result: "Expediente actualizado",
          },
        },
        {
          id: "alerts",
          num: "04",
          title: "Alertas y recordatorios",
          text: "El CRM detecta vencimientos, inactividad y tareas pendientes sin depender de la memoria del equipo.",
          note: "El CRM vigila la operación aunque nadie esté mirando la pantalla.",
          ui: {
            label: "Monitorización",
            live: "Vigilancia activa",
            items: [
              ["Visita próxima", "ok"],
              ["Documento pendiente", "warn"],
              ["Tarea vencida", "attention"],
              ["Lead sin actividad", "warn"],
              ["Mandato próximo a vencer", "attention"],
            ],
          },
        },
        {
          id: "sync",
          num: "05",
          title: "Sincronización de operaciones",
          text: "Los eventos relevantes mantienen conectados el CRM, la agenda y las integraciones que participan en cada proceso.",
          ui: {
            source: "CRM",
            events: [
              { label: "Visita modificada", targets: ["Agenda", "Google Calendar"] },
              { label: "Inmueble actualizado", targets: ["Portal conectado"] },
            ],
          },
        },
        {
          id: "ai",
          num: "06",
          title: "Cualificación asistida por IA",
          text: "Conversaciones y llamadas pueden convertirse en contactos, demandas o información estructurada dentro del CRM.",
          ui: {
            source: "WhatsApp",
            message: "Busco un piso de tres habitaciones, máximo 300.000 €, por la zona centro.",
            ai: "IA",
            fields: [
              ["Tipo", "Piso"],
              ["Habitaciones", "3"],
              ["Presupuesto", "≤ 300.000 €"],
              ["Zona", "Centro"],
            ],
            result: "Demanda creada / actualizada",
          },
        },
      ],
    },
    matching: {
      kicker: "Matching",
      title: "El CRM no solo guarda datos. Los utiliza para encontrar oportunidades.",
      paras: [
        "El sistema de matching compara la oferta de inmuebles con la demanda de compradores e inquilinos: evalúa criterios relevantes y detecta oportunidades compatibles sin búsqueda manual.",
        "Funciona en las dos direcciones: desde un cliente hacia los inmuebles compatibles, y desde un inmueble hacia los posibles interesados.",
      ],
      workspace: "Matching",
      relation: "Oferta ↔ Demanda",
      axis: { demand: "Demanda", supply: "Oferta" },
      engine: "Matching",
      compatible: "Compatible",
      criteriaTitle: "Criterios compatibles",
      closing:
        "La búsqueda deja de depender de que alguien recuerde qué cliente podía encajar con qué inmueble.",
      modes: [
        {
          id: "demand",
          tab: "Demanda → Inmuebles",
          direction: ["Demanda", "Oferta"],
          source: {
            label: "Demanda",
            kind: "Compra · Vivienda",
            fields: [
              ["Zona", "Centro"],
              ["Presupuesto", "≤ 300.000 €"],
              ["Tipo", "Piso"],
              ["Habitaciones", "3"],
              ["Superficie", "≥ 80 m²"],
            ],
          },
          criteria: ["Zona", "Precio", "Tipo", "Habitaciones", "Superficie"],
          resultsLabel: "Inmuebles compatibles",
          results: [
            {
              title: "Piso · 3 habitaciones",
              meta: ["92 m²", "285.000 €", "Centro"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones", "Superficie"],
            },
            {
              title: "Piso · 3 habitaciones",
              meta: ["88 m²", "298.000 €", "Centro"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones", "Superficie"],
            },
            {
              title: "Piso · 3 habitaciones",
              meta: ["84 m²", "279.000 €", "Centro"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones", "Superficie"],
            },
          ],
          actions: ["Ver inmueble", "Preparar visita"],
        },
        {
          id: "property",
          tab: "Inmueble → Interesados",
          direction: ["Oferta", "Demanda"],
          source: {
            label: "Inmueble",
            kind: "Piso · Disponible",
            fields: [
              ["Precio", "285.000 €"],
              ["Habitaciones", "3"],
              ["Superficie", "92 m²"],
              ["Zona", "Centro"],
              ["Estado", "Disponible"],
            ],
          },
          criteria: ["Zona", "Precio", "Tipo", "Habitaciones"],
          resultsLabel: "Posibles interesados",
          results: [
            {
              title: "Demanda A",
              meta: ["Compra · Piso", "3 habitaciones", "Zona centro"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones"],
            },
            {
              title: "Demanda B",
              meta: ["Compra", "Hasta 300.000 €", "3 habitaciones"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones"],
            },
            {
              title: "Demanda C",
              meta: ["Compra · Piso", "Hasta 320.000 €", "Centro"],
              criteria: ["Zona", "Precio", "Tipo", "Habitaciones"],
            },
          ],
          actions: ["Ver demanda", "Preparar visita"],
        },
      ],
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
      intro: "Portales, comunicación, agenda y firma conectados con la operación del CRM.",
      core: {
        title: "CRM inmobiliario",
        state: "Sistema conectado",
        activity: ["Inmueble actualizado", "Mensaje recibido", "Visita sincronizada"],
      },
      groups: { portals: "Portales", communication: "Comunicación", operation: "Operación" },
      items: [
        {
          id: "idealista",
          group: "portals",
          title: "Idealista",
          category: "Portal inmobiliario",
          capabilities: ["Publicar", "Actualizar", "Retirar"],
          direction: "out",
          pulse: "out",
          ambient: true,
          directionLabel: "CRM → Idealista",
          flows: [{ dir: "out", steps: ["Inmueble actualizado", "Publicación"] }],
          detail:
            "La ficha del inmueble puede gestionar su publicación en el portal sin volver a introducir la información manualmente.",
          coreEvent: "Publicación actualizada",
        },
        {
          id: "fotocasa",
          group: "portals",
          title: "Fotocasa",
          category: "Portal + entrada de leads",
          capabilities: ["Publicación", "Actualización", "Leads"],
          direction: "both",
          pulse: "in",
          ambient: true,
          directionLabel: "CRM ↔ Fotocasa",
          flows: [
            { dir: "out", steps: ["Inmueble actualizado", "Publicación"] },
            { dir: "in", steps: ["Nuevo lead", "Contacto / oportunidad CRM"] },
          ],
          detail:
            "El CRM conecta la gestión del inmueble con el portal y puede incorporar leads recibidos desde Fotocasa al flujo operativo.",
          coreEvent: "Lead incorporado",
        },
        {
          id: "mls",
          group: "portals",
          title: "MLS",
          category: "Red inmobiliaria",
          capabilities: ["Publicación", "Sincronización"],
          direction: "both",
          pulse: "out",
          ambient: false,
          directionLabel: "CRM ↔ MLS",
          flows: [{ dir: "both", variant: "network", steps: ["Ficha del inmueble", "Red MLS"] }],
          detail:
            "Los inmuebles pueden participar en el flujo conectado con la red MLS desde el propio sistema.",
          coreEvent: "Inmueble sincronizado",
        },
        {
          id: "whatsapp",
          group: "communication",
          title: "WhatsApp",
          category: "Comunicación",
          capabilities: ["Mensajes", "Contexto", "Seguimiento"],
          direction: "in",
          pulse: "in",
          ambient: true,
          directionLabel: "WhatsApp → CRM",
          flows: [{ dir: "in", steps: ["Mensaje recibido", "Contacto localizado", "Historial CRM"] }],
          detail:
            "Los mensajes quedan vinculados al contacto y al contexto operativo para que la conversación forme parte del historial del CRM.",
          coreEvent: "Mensaje vinculado",
        },
        {
          id: "calendar",
          group: "operation",
          title: "Google Calendar",
          category: "Agenda conectada",
          capabilities: ["Tareas", "Visitas", "Llamadas"],
          direction: "both",
          pulse: "out",
          ambient: true,
          directionLabel: "CRM ↔ Google Calendar",
          flows: [{ dir: "both", steps: ["CRM · Visita 10:30", "Google Calendar · 10:30 Visita"] }],
          detail:
            "Tareas, visitas y devoluciones de llamada pueden mantenerse conectadas con Google Calendar para que la agenda externa y el registro del CRM no vivan separados.",
          coreEvent: "Visita sincronizada",
        },
        {
          id: "sign",
          group: "operation",
          title: "Odoo Sign",
          category: "Firma integrada",
          capabilities: ["Documentos", "Firma", "Estado"],
          direction: "loop",
          pulse: "out",
          ambient: false,
          directionLabel: "CRM → Firma → CRM",
          flows: [{ dir: "loop", variant: "states", steps: ["Pendiente", "Firma", "Firmado"] }],
          detail:
            "La firma forma parte del workflow documental, manteniendo el documento y su estado dentro del proceso del CRM.",
          coreEvent: "Documento firmado",
        },
      ],
      closing:
        "El CRM no sustituye las herramientas que ya forman parte de la operación. Las conecta.",
      closingMeta: "Portales · Comunicación · Agenda · Firma",
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
      copy: "En este proyecto partimos de la infraestructura de Odoo, pero adaptamos modelos, lógica, automatizaciones e interfaz hasta que el sistema trabaja como trabaja la empresa.",
      panelLabel: "Arquitectura del sistema",
      proof: {
        value: "20+",
        label: "Módulos Odoo personalizados",
        stack: "Odoo · Python · PostgreSQL · OWL · APIs",
      },
      flowLabel: "Evento → regla → acción",
      layers: [
        {
          id: "operation",
          num: "06",
          label: "Operación inmobiliaria",
          role: "Resultado",
          text: "El proceso de negocio alrededor del cual está diseñado el sistema.",
          items: ["Clientes", "Inmuebles", "Demandas", "Visitas", "Operaciones", "Documentación"],
          visual: "chain",
        },
        {
          id: "ui",
          num: "05",
          label: "Interfaz a medida",
          role: "OWL",
          text: "Cuando la interfaz estándar no encaja con el trabajo del equipo, construimos superficies específicas para esa operación.",
          items: ["Dashboards", "Detalle de inmueble", "Matching", "Operaciones", "Navegación", "Superficies de trabajo"],
          visual: "surface",
        },
        {
          id: "automation",
          num: "04",
          label: "Automatización",
          role: "Sistema",
          text: "Eventos, reglas y acciones que el sistema ejecuta por sí mismo sobre la lógica de negocio.",
          items: ["Matching", "Alertas", "Seguimientos", "Checklists", "Sincronización"],
          flow: ["Evento", "Regla", "Acción"],
        },
        {
          id: "logic",
          num: "03",
          label: "Lógica de negocio",
          role: "Python",
          text: "Reglas, estados y validaciones convierten el proceso real de la empresa en comportamiento del software.",
          items: ["Estados", "Reglas", "Validaciones", "Asignaciones", "Dependencias"],
          flow: ["Documento aprobado", "Regla cumplida", "Checklist actualizado", "Proceso continúa"],
        },
        {
          id: "data",
          num: "02",
          label: "Modelos de datos",
          role: "Modelos",
          text: "El modelo de datos representa cómo funciona realmente la operación inmobiliaria.",
          items: ["Prospecto", "Inmueble", "Demanda", "Visita", "Operación", "Documento"],
          visual: "entities",
        },
        {
          id: "foundation",
          num: "01",
          label: "Base de plataforma",
          role: "Base",
          main: "Odoo",
          text: "Infraestructura de partida en este proyecto.",
          items: ["ORM", "Usuarios", "Permisos", "Módulos", "Servicios comunes", "PostgreSQL"],
        },
      ],
      architectureChoice: {
        title: "La plataforma es una decisión de arquitectura, no una limitación.",
        copy: "Cuando una plataforma como Odoo aporta una base útil, construimos sobre ella. Cuando el producto necesita mayor control, independencia o una arquitectura específica, diseñamos y desarrollamos el sistema desde cero con infraestructura propia.",
        start: "Proceso del negocio",
        decision: "Decisión de arquitectura",
        routes: [
          {
            id: "platform",
            title: "Plataforma base",
            subtitle: "Odoo",
            items: ["Modelos adaptados", "Lógica a medida", "Automatización", "Interfaz a medida", "Integraciones"],
          },
          {
            id: "custom",
            title: "Sistema propio",
            subtitle: "Desde cero",
            items: ["Arquitectura propia", "Backend propio", "Modelo de datos propio", "APIs / servicios", "Infraestructura"],
          },
        ],
        result: "Software a medida alrededor de la operación",
      },
      closing: "No empezamos por la plataforma. Empezamos por la operación.",
      closingSupport: "Sobre Odoo cuando aporta valor. Desde cero cuando el sistema necesita arquitectura propia.",
    },
    cta: {
      kicker: "¿Tu CRM no encaja con tu operación?",
      title: "No necesitas cambiar cómo trabaja tu empresa para adaptarte al software.",
      copy: "Podemos diseñar el sistema alrededor de tus procesos, automatizaciones e integraciones.",
      primary: "Hablar de un proyecto",
      secondary: "Ver todos los proyectos",
    },
  },
  fivo: {
    meta: {
      title: "Fivo — Infraestructura de pagos con stablecoins · Nafureanu",
      description:
        "Caso de estudio de Fivo: infraestructura de pagos con USDC y EURC en nueve redes, checkout cross-chain sobre Circle, panel de comercio, webhooks firmados y facturación automática. Diseñado y construido por Nafureanu.",
    },
    hero: {
      kicker: "Pagos · Stablecoins · Infraestructura",
      title: "Fivo",
      statement: "Una integración para aceptar stablecoins en nueve redes.",
      support:
        "Fivo es infraestructura de pagos con stablecoins para comercios online: el cliente paga en USDC o EURC desde la red donde tiene fondos y el comercio cobra con una sola integración. Las wallets, la verificación en cadena y el movimiento entre redes quedan dentro del sistema.",
      proof: [
        { value: "9", label: "Redes mainnet" },
        { value: "USDC + EURC", label: "Stablecoins" },
        { value: "3", label: "Vías de integración" },
        { value: "Testnet + Mainnet", label: "Entornos separados" },
      ],
      alliance: "Miembro de Circle Alliance",
      product: { label: "Producto en producción", host: "fivo.finance", url: "https://fivo.finance" },
      composition: {
        dashboard: "Panel del comercio de Fivo con saldos por wallet e ingresos en el tiempo",
        checkout: "Checkout de Fivo en tema claro: selección de red para un pago de 0,01 USDC",
        complete: "Pago completado en el checkout de Fivo",
        settle: { label: "Liquidación", value: "USDC · Base", status: "Verificado en cadena" },
      },
    },
    problem: {
      kicker: "El problema",
      title: "Cobrar stablecoins no debería significar integrar una blockchain detrás de otra.",
      intro:
        "Aceptar USDC suena sencillo. Debajo hay redes distintas, contratos distintos, wallets, confirmaciones y estados de pago que nadie quiere mantener dentro de una tienda online.",
      points: [
        { title: "Varias redes", text: "Cada red tiene sus contratos de USDC, sus nodos RPC y sus tiempos de confirmación." },
        { title: "Compatibilidad token y red", text: "EURC no existe en todas las redes: una cadena puede ser válida para un token y no para otro." },
        { title: "Interacción con la wallet", text: "Conectar, comprobar saldos en cada red y firmar la transacción correcta desde el navegador." },
        { title: "Movimiento entre redes", text: "Si el cliente tiene fondos en Polygon y el comercio cobra en Base, alguien tiene que mover el valor." },
        { title: "Confirmación y estado", text: "Verificar en cadena que el pago llegó, por el importe correcto, y reflejarlo en un estado fiable." },
        { title: "Integración y operación", text: "El desarrollador necesita una API; el comercio necesita ver, reembolsar, retirar y facturar." },
      ],
      without: {
        label: "Sin Fivo",
        merchant: "Comercio",
        per: "contratos · RPC · wallets · confirmaciones · estados",
        note: "Una integración por red, cada una con su propio ciclo de vida.",
      },
      with: {
        label: "Con Fivo",
        merchant: "Comercio",
        fivo: "Fivo",
        integration: "una integración",
        note: "Las redes quedan detrás del sistema.",
      },
      networks: ["Ethereum", "Polygon", "Avalanche", "Arbitrum", "Base", "Optimism", "Linea", "Unichain", "Sonic"],
      takeaway: "Fivo mueve la complejidad blockchain fuera de la integración del comercio.",
    },
    integration: {
      kicker: "Una integración",
      title: "Una integración. Diferentes formas de cobrar.",
      intro:
        "Tres vías sobre la misma infraestructura: un botón que se incrusta en cualquier página, sesiones de checkout alojadas y una API REST con claves de comercio.",
      resultLabel: "Resultado",
      methods: [
        {
          id: "widget",
          tab: "Widget",
          title: "Botón incrustable",
          text: "Un script y un elemento HTML. El botón abre el checkout de Fivo en un iframe a pantalla completa y el pago vuelve con su estado.",
          bullets: [
            "Importe fijo o importe libre",
            "Lee el total del carrito desde la página (data-amount-from)",
            "Referencia, descripción y metadatos por pago",
          ],
          codeLabel: "index.html",
          code: `<script async src="https://checkout.fivo.finance/v1/fivo.js"></script>

<fivo-button
  merchant-id="fivo_live_YOUR_ID"
  amount="29.99"
  currency="USDC"
  data-reference="order_1042">
</fivo-button>`,
          result: "Botón de Fivo en el carrito de la tienda de demostración",
        },
        {
          id: "session",
          tab: "Checkout Sessions",
          title: "Checkout alojado",
          text: "El servidor del comercio crea una sesión con importe, moneda y URL de retorno; el cliente paga en el checkout de Fivo y vuelve a la tienda.",
          bullets: [
            "Sesiones cs_live_ y cs_test_ con caducidad (30 minutos por defecto)",
            "return_url y cancel_url",
            "Hasta cinco claves de metadatos por sesión",
          ],
          codeLabel: "terminal",
          code: `curl -X POST https://api.fivo.finance/checkout/sessions \
  -H "X-API-Key: fivo_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "amount": "25.00", "currency": "USDC",
        "return_url": "https://tutienda.com/gracias" }'

# 201 Created
{ "success": true,
  "data": { "id": "cs_live_…", "url": "https://checkout.fivo.finance/…",
            "expires_at": "2026-09-06T10:30:00.000Z" } }`,
          result: "Checkout alojado de Fivo (entorno de pruebas)",
        },
        {
          id: "api",
          tab: "API REST",
          title: "API con claves de comercio",
          text: "Pagos, reembolsos, wallets, facturas y webhooks a través de una API REST autenticada con la cabecera X-API-Key.",
          bullets: [
            "Claves fivo_live_ y fivo_test_",
            "Listado y detalle de pagos, creación y cancelación de reembolsos",
            "Gestión de webhooks y descarga de facturas en PDF",
          ],
          codeLabel: "terminal",
          code: `curl https://api.fivo.finance/payments/api/list \
  -H "X-API-Key: fivo_live_YOUR_KEY"

curl -X POST https://api.fivo.finance/refunds/api/create \
  -H "X-API-Key: fivo_live_YOUR_KEY" \
  -d '{ "payment_id": "…", "amount": "10.00" }'`,
          result: "Grupos de recursos de la API",
          endpoints: [
            ["GET", "/payments/api/list"],
            ["GET", "/payments/api/{id}"],
            ["GET", "/wallets/api/balance"],
            ["POST", "/refunds/api/create"],
            ["GET", "/invoices/api/{id}/pdf"],
            ["POST", "/merchant-webhooks/api/create"],
          ],
        },
      ],
      modes: {
        label: "Modos del botón",
        items: [
          { name: "Producto", text: "Importe fijo por artículo." },
          { name: "Donación", text: "Importe libre elegido por el cliente." },
          { name: "Carrito", text: "Total leído de la propia página." },
          { name: "Varios productos", text: "Un botón por artículo en la misma página." },
        ],
      },
    },
    flow: {
      kicker: "Lo que ve el cliente",
      title: "Un pago, de principio a fin.",
      intro:
        "El cliente no elige una blockchain: elige dónde tiene fondos. Fivo consulta sus saldos en todas las redes soportadas y le muestra solo las opciones válidas.",
      steps: [
        {
          title: "Conectar la wallet",
          text: "El checkout se abre con el importe. El cliente conecta su wallet (MetaMask, WalletConnect, Coinbase Wallet y otras) y deja un email para el recibo.",
          state: { label: "Wallet conectada", value: "0x6753…Af6b" },
        },
        {
          title: "Elegir stablecoin y red",
          text: "Fivo lee los saldos de USDC y EURC en cada red y marca si el pago será directo (misma red) o con puente.",
          image: "checkout-network",
          alt: "Checkout de Fivo con la lista de redes donde el cliente tiene saldo",
        },
        {
          title: "Revisar importe y comisiones",
          text: "Si la red del cliente no es la del comercio, el checkout desglosa producto, comisión de puente y gas antes de firmar.",
          image: "checkout-confirm",
          alt: "Confirmación de pago cross-chain de Polygon a Base con desglose de comisiones",
        },
        {
          title: "Confirmar en la wallet",
          text: "El cliente firma la aprobación y la transferencia desde su propia wallet. El pago sale directamente de ella.",
          state: { label: "Firma", value: "Aprobación + transferencia" },
        },
        {
          title: "Confirmación en cadena",
          text: "Aprobación, quema, verificación y entrega: el progreso se muestra paso a paso hasta que los fondos llegan a la wallet del comercio.",
          image: "checkout-processing",
          alt: "Pago en proceso con los pasos aprobación, quema, verificación y entrega",
        },
        {
          title: "Pago completado",
          text: "El backend verifica la transacción en cadena y marca el pago como completado. El cliente ve el hash y el comercio recibe el evento.",
          image: "checkout-complete",
          alt: "Pantalla de pago completado con el importe y los hashes de la transacción",
        },
      ],
      note: "Pantallas reales del checkout de Fivo en tema claro. Importe de prueba: 0,01 USDC, de Polygon a Base.",
    },
    crosschain: {
      kicker: "Cross-chain",
      title: "El cliente paga desde su red. El comercio recibe donde necesita.",
      intro:
        "Cuando la red del cliente y la del comercio no coinciden, Fivo usa Circle Bridge Kit sobre CCTP v2 para mover USDC entre cadenas dentro del mismo pago. El comercio recibe el importe exacto en su wallet; el cliente asume la comisión de puente y el gas.",
      lanes: [
        { id: "customer", label: "Cliente", name: "USDC · Polygon", sub: "Wallet del cliente" },
        { id: "checkout", label: "Checkout de Fivo", name: "Estimación y confirmación", sub: "Desglose de comisiones antes de firmar" },
        { id: "circle", label: "Capa cross-chain de Circle", name: "Bridge Kit · CCTP v2", sub: "approve → burn → attestation → mint" },
        { id: "merchant", label: "Comercio", name: "USDC · Base", sub: "Wallet del comercio" },
        { id: "backend", label: "Backend de Fivo", name: "Verificación en cadena", sub: "quema verificada → pago completado → webhook" },
      ],
      message: { primary: "Red distinta para el cliente.", secondary: "Una integración para el comercio." },
      technical: {
        show: "Ver la capa técnica",
        hide: "Ocultar la capa técnica",
        label: "Lo que hace Circle por debajo",
        steps: [
          { name: "Approve", text: "La wallet del cliente autoriza el importe al contrato de CCTP en la red de origen." },
          { name: "Burn", text: "El USDC se quema en la red de origen (TokenMessengerV2)." },
          { name: "Attestation", text: "El servicio de atestación de Circle firma el mensaje de quema." },
          { name: "Mint", text: "El Forwarding Service de Circle acuña el USDC en la red de destino, directamente en la wallet del comercio." },
        ],
        note: "Fivo registra los hashes de quema y acuñación, verifica la quema en cadena y solo entonces marca el pago como completado.",
      },
      sameChain: {
        title: "Misma red",
        text: "Si el cliente ya tiene USDC o EURC en la red del comercio, el pago es una transferencia directa: una confirmación y verificación del recibo en el backend.",
      },
      eurc: {
        title: "EURC",
        text: "EURC se acepta en Ethereum, Avalanche y Base, siempre en la misma red: no se mueve entre cadenas.",
      },
      imageAlt: "Confirmación de un pago cross-chain en el checkout de Fivo: producto, comisión de puente, gas y ruta entre redes",
      imageCaption: "Pantalla real del checkout (entorno de pruebas): el cliente ve la ruta entre redes, las comisiones y cuánto ahorraría pagando desde la red del comercio.",
    },
    networks: {
      kicker: "Redes",
      title: "Nueve redes mainnet. Una sola integración.",
      intro:
        "La lista de redes vive en la configuración del sistema, no en el código del comercio. USDC se acepta en todas; EURC en las redes donde Circle lo emite.",
      columns: ["Red", "USDC", "EURC", "Cross-chain USDC"],
      legend: { yes: "Sí", no: "No", direct: "Misma red" },
      rows: [
        { name: "Ethereum", usdc: true, eurc: true, cross: true },
        { name: "Polygon", usdc: true, eurc: false, cross: true },
        { name: "Avalanche", usdc: true, eurc: true, cross: true },
        { name: "Arbitrum", usdc: true, eurc: false, cross: true },
        { name: "Base", usdc: true, eurc: true, cross: true },
        { name: "Optimism", usdc: true, eurc: false, cross: true },
        { name: "Linea", usdc: true, eurc: false, cross: true },
        { name: "Unichain", usdc: true, eurc: false, cross: true },
        { name: "Sonic", usdc: true, eurc: false, cross: true },
      ],
      footnotes: [
        "Cross-chain: el cliente puede pagar en USDC desde cualquiera de las nueve redes; el comercio recibe en la suya.",
        "EURC se acepta solo en la misma red del comercio.",
        "Arc está disponible en el entorno de pruebas (testnet).",
      ],
    },
    merchant: {
      kicker: "Plataforma del comercio",
      title: "El pago termina. La operación continúa.",
      intro:
        "El panel del comercio no es un visor de transacciones: gestiona wallets por red, retiros, reembolsos, facturas, webhooks y claves de API desde el mismo sitio.",
      live: "Actualización en tiempo real",
      imageAlt: "Panel del comercio de Fivo: saldos por wallet, analítica de ingresos y navegación a transacciones, wallets, webhooks y claves de API",
      callouts: [
        { title: "Transacciones", text: "Listado con filtros guardados, búsqueda, detalle de cada pago y exportación a Excel o PDF." },
        { title: "Wallets y saldos", text: "Una wallet por red con saldos de USDC y EURC; retiros a la dirección del comercio protegidos con 2FA." },
        { title: "Reembolsos", text: "Totales o parciales, en cadena, con recibo en PDF para el cliente." },
        { title: "Facturas", text: "Una factura automática por cada retiro, numerada y en el idioma del país de facturación." },
        { title: "Webhooks", text: "Alta de endpoints, prueba, regeneración del secreto y registro de entregas." },
        { title: "Claves de API", text: "Claves live y test, mostradas una sola vez y almacenadas con hash." },
      ],
    },
    operations: {
      kicker: "Automatización operativa",
      title: "Lo que ocurre después del pago también está resuelto.",
      intro:
        "Pago, reembolso y retiro son flujos completos: cada uno termina en un registro, una notificación y, cuando toca, un documento.",
      flows: [
        {
          title: "Pago",
          steps: ["Transacción en cadena", "Verificación del recibo", "payment.completed", "Webhook firmado y email al comercio", "Recibo al cliente"],
        },
        {
          title: "Reembolso",
          steps: ["Solicitud total o parcial, con 2FA", "Transacción en cadena desde la wallet del comercio", "refund.completed", "Recibo en PDF al cliente"],
        },
        {
          title: "Retiro",
          steps: ["Lote en cadena: importe al comercio, comisión del 0,5 % a Fivo", "Retiro completado", "Factura FIV-AAAA-NNNN en PDF", "Email con la factura"],
        },
      ],
      automation: {
        title: "Recuperación automática",
        items: [
          { title: "Escáner de intenciones de pago", text: "Cada dos minutos revisa en cadena los pagos en la misma red que aún no se han confirmado." },
          { title: "Escáner de recuperación cross-chain", text: "Cada cinco minutos busca acuñaciones de CCTP que no llegaron a registrarse y completa el pago." },
          { title: "Reintentos de webhooks", text: "Tres reintentos con espera creciente y desactivación automática tras diez fallos seguidos." },
        ],
      },
      invoiceAlt: "Factura generada automáticamente por Fivo tras un retiro",
      invoiceCaption: "Factura automática por retiro: comisión, IVA cuando aplica, contravalor en euros y referencia en cadena.",
    },
    developer: {
      kicker: "Infraestructura para desarrolladores",
      title: "Construido para integrarse, no para obligarte a reconstruir tu producto.",
      intro:
        "La misma superficie que usa el checkout está disponible para el desarrollador: API REST, webhooks firmados, claves por entorno y documentación pública.",
      cards: [
        { title: "API REST", text: "Pagos, reembolsos, wallets, facturas y webhooks bajo api.fivo.finance, autenticados con X-API-Key.", meta: "api.fivo.finance" },
        { title: "Webhooks firmados", text: "Cinco eventos de pago y reembolso, firma HMAC-SHA256 con marca de tiempo, reintentos y registro de entregas.", meta: "X-Fivo-Signature" },
        { title: "Claves de API", text: "Prefijos fivo_live_ y fivo_test_, visibles una sola vez y guardadas con hash.", meta: "fivo_live_ · fivo_test_" },
        { title: "Documentación", text: "Guía rápida, referencia de la API, webhooks, CCTP, facturación y entorno de pruebas.", meta: "fivo.finance/docs" },
      ],
      webhook: {
        label: "Un evento, de extremo a extremo",
        event: "payment.completed",
        headers: ["X-Fivo-Event: payment.completed", "X-Fivo-Timestamp: 1757152200", "X-Fivo-Signature: sha256=…"],
        signature: "HMAC-SHA256( timestamp . body )",
        endpoint: "Endpoint del comercio",
        response: "200 OK",
        retry: "Reintentos: 1 s · 5 s · 25 s",
        events: ["payment.completed", "payment.failed", "refund.created", "refund.completed", "refund.failed"],
      },
      environments: {
        kicker: "Testnet y mainnet",
        message: "Dos despliegues independientes: se integra y se prueba sin tocar fondos reales.",
        build: {
          title: "Construir",
          items: ["test.fivo.finance", "api-test.fivo.finance", "checkout-test.fivo.finance", "Claves fivo_test_ · sesiones cs_test_", "USDC de prueba desde el faucet de Circle"],
        },
        live: {
          title: "Salir a producción",
          items: ["fivo.finance", "api.fivo.finance", "checkout.fivo.finance", "Claves fivo_live_ · sesiones cs_live_", "Nueve redes mainnet"],
        },
      },
    },
    security: {
      kicker: "Seguridad",
      title: "La seguridad no vive en una sola capa.",
      intro: "Cada capa del sistema tiene sus propios controles. Ninguno es un eslogan: están en el código.",
      layers: [
        { name: "Usuario", title: "Autenticación", items: ["2FA obligatorio en cada inicio de sesión: email, aplicación TOTP o SMS", "Sesiones cortas con renovación rotativa", "Aviso por email al entrar desde un dispositivo nuevo"] },
        { name: "API", title: "Claves y límites", items: ["Claves de API con hash, visibles una sola vez", "Límite de peticiones por endpoint: inicio de sesión, retiros, pagos públicos", "Validación de esquemas y captcha en formularios públicos"] },
        { name: "Eventos", title: "Webhooks firmados", items: ["Firma HMAC-SHA256 con marca de tiempo", "Protección contra SSRF y redirecciones en los endpoints del comercio", "Verificación de los webhooks de Circle con firma ECDSA"] },
        { name: "Pagos", title: "Verificación en cadena", items: ["Lectura del recibo: contrato correcto, destinatario, remitente e importe", "Escáneres de recuperación para pagos no registrados", "Retiros y reembolsos con 2FA"] },
        { name: "Sistema", title: "Trazabilidad", items: ["Registro de auditoría de retiros y reembolsos con IP, dispositivo y contexto 2FA", "Cabeceras CSP y HSTS", "Secretos TOTP cifrados con AES-256-GCM"] },
      ],
      note: "Sin promesas de «nivel bancario»: controles concretos, verificables en la implementación.",
    },
    circle: {
      kicker: "Circle",
      title: "Construido sobre infraestructura de Circle.",
      intro: "Fivo no reinventa las stablecoins ni los puentes: construye la capa de pagos para comercios sobre los raíles de Circle.",
      badge: "Miembro de Circle Alliance",
      components: [
        { title: "USDC y EURC", text: "Las stablecoins emitidas por Circle, en las redes donde están disponibles." },
        { title: "Programmable Wallets", text: "Wallets de comercio gestionadas por el sistema (developer-controlled, cuentas SCA), con Gas Station para retiros y reembolsos." },
        { title: "Bridge Kit y CCTP v2", text: "Movimiento de USDC entre redes dentro del pago, con el Forwarding Service de Circle para la atestación y la acuñación." },
        { title: "Webhooks de Circle", text: "Eventos de wallet verificados con la clave pública de Circle." },
      ],
      disclaimer: "Fivo es un producto independiente. La membresía en Circle Alliance no implica propiedad, respaldo ni exclusividad por parte de Circle.",
    },
    engineering: {
      kicker: "Ingeniería",
      title: "Un producto financiero completo, no una integración aislada.",
      intro:
        "Fivo es el tipo de sistema que Nafureanu diseña y construye: varios componentes con responsabilidades claras, conectados por eventos y en producción.",
      areas: [
        { name: "Pagos", title: "Checkout y estados de pago", text: "Widget en React, escaneo de saldos multi-red, sesiones alojadas y una máquina de estados desde pendiente hasta completado o fallido." },
        { name: "Blockchain", title: "Nueve redes y cross-chain", text: "Configuración de redes y tokens por entorno, transferencias directas y puentes CCTP v2 con verificación del recibo." },
        { name: "Backend", title: "API y procesamiento de eventos", text: "Node.js y Express en TypeScript, PostgreSQL con Prisma y workers periódicos para retiros, reembolsos y recuperación de pagos." },
        { name: "Producto para comercios", title: "Panel de operaciones", text: "Next.js con actualización en tiempo real: transacciones, wallets, retiros, reembolsos, facturas, webhooks y claves." },
        { name: "Automatización", title: "Notificaciones, facturas y reembolsos", text: "Emails transaccionales, facturas PDF en 22 idiomas con reglas de IVA de la UE y recibos de reembolso." },
        { name: "Seguridad", title: "Autenticación, firmas y auditoría", text: "2FA obligatorio, claves con hash, webhooks firmados, límites de peticiones y registros de auditoría." },
        { name: "Infraestructura", title: "Despliegue y nodos", text: "Frontends en Vercel, API y base de datos en Railway, RPC de Alchemy con nodos públicos de respaldo y almacenamiento de PDF en R2." },
        { name: "Experiencia de desarrollador", title: "Documentación y entorno de pruebas", text: "Tres vías de integración, documentación pública y testnet independiente con prefijos de clave y sesión propios." },
      ],
      stack: {
        label: "Stack",
        items: ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "wagmi · viem", "Circle Programmable Wallets", "Circle Bridge Kit", "CCTP v2", "Alchemy", "Vercel", "Railway"],
      },
    },
    surfaces: {
      kicker: "El producto por dentro",
      title: "Superficies reales del producto.",
      intro: "Capturas del checkout, del panel y de la tienda de demostración, todas en tema claro. Datos de prueba; ninguna información de comercios reales.",
      items: [
        { id: "demo-store-light", size: "large", title: "Tienda de demostración", text: "El botón de Fivo conectado a un carrito: lee el total de la página y abre el checkout con ese importe." },
        { id: "connect-wallet", size: "medium", title: "Conexión de la wallet", text: "El checkout se abre con el importe y pide el email del recibo antes de conectar la wallet del cliente." },
        { id: "merchant-dashboard", size: "large", title: "Panel del comercio", text: "Saldos por wallet, ingresos en el tiempo y acceso a transacciones, wallets, facturas, reembolsos, webhooks y claves de API." },
        { id: "crosschain-progress", size: "medium", title: "Pago cross-chain en curso", text: "Aprobación, quema, verificación y entrega: el cliente ve cada paso hasta que llegan los fondos." },
        { id: "invoice", size: "medium", title: "Factura automática", text: "Generada tras cada retiro, con la comisión, el IVA aplicable y la referencia en cadena." },
        { id: "payment-complete-store", size: "large", title: "Pago completado sobre la tienda", text: "El estado final del checkout sobre la tienda de demostración: importe, transacción y entrega confirmadas." },
      ],
    },
    cta: {
      kicker: "Siguiente paso",
      title: "¿Tu producto necesita pagos, automatización o infraestructura que no existe todavía?",
      copy: "Diseñamos y construimos software alrededor del problema, desde la arquitectura hasta producción.",
      primary: "Cuéntanos qué necesitas",
      secondary: "Ver todos los proyectos",
      product: { label: "Sobre el producto", text: "Fivo es un producto en producción con soporte propio:", host: "fivo.finance", url: "https://fivo.finance", support: "support@fivo.finance" },
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