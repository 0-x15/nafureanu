/** Spanish copy of the Web projects exhibition — loaded with the page (see src/i18n/blocks.js). Page metadata lives in es.js. */
export default {
    visit: "Visitar sitio",
    visitHint: "Se abre en una pestaña nueva",
    scope: "Diseño y desarrollo web",
    exhibition: {
      lines: ["Experiencias", "digitales", "seleccionadas"],
      meta: ["04 proyectos", "Diseño + desarrollo", "Web / Producto digital"],
      lead: "Cuatro webs y productos reales, presentados como una exposición. Desplázate para recorrerla.",
      scroll: "Desplázate para entrar",
      cursor: "Visitar",
      stageLabel: "Exposición de proyectos",
      railLabel: "Ir a un proyecto",
      progressLabel: "Progreso de la exposición",
      statement: ["Diseño y desarrollo", "no son dos entregables.", "Son el mismo producto."],
      capability: "Diseño · Desarrollo · Web / Producto digital",
      outro: {
        question: "¿Qué debería existir después?",
        copy: "Webs, productos y sistemas alrededor de lo que tu negocio necesita.",
        primary: "Cuéntanos qué quieres construir",
        secondary: "Ver todos los proyectos",
      },
      swipe: "Desliza para ver más vistas",
    },
    projects: [
      {
        id: "dd-evecom",
        name: "DD Evecom Comfort",
        short: "DD Evecom",
        lines: ["DD Evecom", "Comfort"],
        line:
          "Web comercial de un instalador de ventanas acústicas en Madrid: explica un servicio técnico con claridad y lleva al presupuesto.",
        category: "Web de servicios · Aislamiento acústico y térmico",
        url: "https://dd-evecom-comfort.es",
        host: "dd-evecom-comfort.es",
        description:
          "Web comercial de un instalador de ventanas acústicas y aislamiento en Madrid, partner oficial de Kömmerling. La página tenía que explicar un servicio técnico con claridad y convertir: presupuesto, teléfono y WhatsApp siempre a mano, un simulador de ahorro y una sección de proyectos con casos reales.",
        signals: ["Responsive", "Simulador de ahorro", "Flujo de presupuesto", "Página de proyectos"],
        images: {
          desktop: "Portada de DD Evecom Comfort: titular, comparativa antes/después en decibelios y llamada a presupuesto",
          tall: "Portada de DD Evecom Comfort, desplazable para ver las secciones de ventajas y ventanas acústicas",
          mobile: "Portada de DD Evecom Comfort en móvil",
          detail: "Página de proyectos realizados de DD Evecom Comfort",
        },
        captions: { desktop: "Portada · escritorio", mobile: "Portada · móvil", detail: "Proyectos realizados" },
      },
      {
        id: "dental-goya",
        name: "Clínica Dental Goya, 116",
        short: "Goya 116",
        lines: ["Clínica", "Dental", "Goya 116"],
        line:
          "Web de una clínica dental de Madrid que ordena tratamientos, primera visita y tarifas, y lleva al paciente a reservar cita.",
        category: "Web sanitaria · Clínica dental",
        url: "https://clinicadentalgoya116.com/",
        host: "clinicadentalgoya116.com",
        description:
          "Web de una clínica dental del barrio de Salamanca, en Madrid. Tenía que ordenar mucha información (tratamientos, primera visita, tarifas orientativas, horarios) y llevar al paciente a un solo gesto: reservar cita o llamar. Identidad verde y cálida, fotografía real de la clínica y una arquitectura de contenidos sencilla.",
        signals: ["Reserva de cita", "Catálogo de tratamientos", "Primera visita", "Responsive"],
        images: {
          desktop: "Portada de Clínica Dental Goya 116: titular, botón de reserva y fotografía de la fachada",
          tall: "Portada de Clínica Dental Goya 116, desplazable para ver la galería y los tratamientos",
          mobile: "Portada de Clínica Dental Goya 116 en móvil",
          detail: "Página Tu primera visita de Clínica Dental Goya 116",
        },
        captions: { desktop: "Portada · escritorio", mobile: "Portada · móvil", detail: "Tu primera visita" },
      },
      {
        id: "reformas-octavian",
        name: "Reformas Octavian",
        short: "Octavian",
        lines: ["Reformas", "Octavian"],
        line:
          "Una web de reformas convertida en experiencia 3D: escenas modeladas por sección y navegación por pantallas.",
        category: "Experiencia web 3D · Empresa de reformas",
        url: "https://reformasoctavian.es/",
        host: "reformasoctavian.es",
        description:
          "Una web de reformas que no se parece a una web de reformas: una experiencia 3D en el navegador, con escenas modeladas para cada sección (bienvenida, nosotros, servicios, proyectos) y navegación por pantallas en lugar de scroll. Tipografía display, mucho aire y contacto directo por WhatsApp, email o teléfono.",
        signals: ["3D en el navegador", "Navegación por escenas", "Tipografía display", "Adaptada a móvil"],
        images: {
          desktop: "Pantalla de bienvenida de Reformas Octavian con herramientas modeladas en 3D",
          detail: "Escena 3D de la sección Servicios de Reformas Octavian",
          detail2: "Escena 3D de la sección Nosotros de Reformas Octavian",
          mobile: "Pantalla de bienvenida de Reformas Octavian en móvil",
        },
        captions: { desktop: "Bienvenida", detail: "Servicios", detail2: "Nosotros", mobile: "Móvil" },
      },
      {
        id: "mp-monitor",
        name: "MP Monitor",
        short: "MP Monitor",
        lines: ["MP", "Monitor"],
        line:
          "Una aplicación que sigue decenas de activos en vivo, los puntúa con reglas fijas y explica cada cifra en lenguaje llano.",
        category: "Aplicación web · Panel de mercado en tiempo real",
        url: "https://mpmonitor.netlify.app",
        host: "mpmonitor.netlify.app",
        description:
          "No es una web: es una aplicación. Un panel que sigue decenas de activos en vivo, los puntúa con reglas fijas y explica cada cifra en lenguaje llano. Siete pantallas (panel, mercado, suelos y techos, gráfico, activo, riesgo, sistema), búsqueda, atajos de teclado y un gráfico interactivo integrado.",
        signals: ["Datos en tiempo real", "Siete vistas", "Atajos de teclado", "Gráfico interactivo"],
        images: {
          desktop: "Vista de mercado de MP Monitor: tabla de activos con puntuación, señales y filtros",
          detail: "Vista de gráfico de MP Monitor con velas y panel de evaluación del activo",
          mobile: "Vista de mercado de MP Monitor en móvil",
        },
        captions: { desktop: "Mercado", detail: "Gráfico y evaluación", mobile: "Móvil" },
      },
    ],
};
