/** Spanish copy of the Fivo case study — loaded with the page (see src/i18n/blocks.js). Page metadata lives in es.js. */
export default {
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
        store: "Tienda de demostración con el botón de Fivo en el carrito",
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
        { id: "checkout-store", size: "large", title: "Checkout sobre la tienda", text: "El botón abre el checkout de Fivo sobre la propia tienda: saldos por red, tipo de pago y el importe leído del carrito." },
        { id: "connect-wallet", size: "medium", title: "Conexión de la wallet", text: "El checkout se abre con el importe y pide el email del recibo antes de conectar la wallet del cliente." },
        { id: "payment-complete-store", size: "large", title: "Pago completado sobre la tienda", text: "El estado final del checkout: importe, transacción y entrega confirmadas sin salir de la tienda." },
        { id: "crosschain-progress", size: "medium", title: "Pago cross-chain en curso", text: "Aprobación, quema, verificación y entrega: el cliente ve cada paso hasta que llegan los fondos." },
        { id: "invoice", size: "medium", title: "Factura automática", text: "Generada tras cada retiro, con la comisión, el IVA aplicable y la referencia en cadena." },
        { id: "merchant-dashboard", size: "medium", title: "Panel del comercio", text: "Saldos por wallet, ingresos en el tiempo y acceso a transacciones, facturas, reembolsos, webhooks y claves de API." },
      ],
    },
    cta: {
      kicker: "Siguiente paso",
      title: "¿Tu producto necesita pagos, automatización o infraestructura que no existe todavía?",
      copy: "Diseñamos y construimos software alrededor del problema, desde la arquitectura hasta producción.",
      primary: "Cuéntanos qué necesitas",
      secondary: "Ver todos los proyectos",
      product: { label: "Sobre el producto", text: "Fivo es un producto en producción con soporte propio.", host: "fivo.finance", url: "https://fivo.finance" },
    },
};
