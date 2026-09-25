/** Spanish copy of the CRM inmobiliario case study — loaded with the page (see src/i18n/blocks.js). Page metadata lives in es.js. */
export default {
    hero: {
      kicker: "Caso real · CRM inmobiliario sobre Odoo",
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
};
