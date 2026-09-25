/** English copy of the Fivo case study — loaded with the page (see src/i18n/blocks.js). Page metadata lives in en.js. */
export default {
    hero: {
      kicker: "Payments · Stablecoins · Infrastructure",
      title: "Fivo",
      statement: "One integration to accept stablecoins across nine networks.",
      support:
        "Fivo is stablecoin payment infrastructure for online merchants: the customer pays in USDC or EURC from the network where they hold funds, and the merchant gets paid through a single integration. Wallets, on-chain verification and cross-network movement stay inside the system.",
      proof: [
        { value: "9", label: "Mainnet networks" },
        { value: "USDC + EURC", label: "Stablecoins" },
        { value: "3", label: "Integration methods" },
        { value: "Testnet + Mainnet", label: "Separate environments" },
      ],
      alliance: "Circle Alliance Member",
      product: { label: "Live product", host: "fivo.finance", url: "https://fivo.finance" },
      composition: {
        store: "Demo store with the Fivo button in the cart",
        checkout: "Fivo light-theme checkout: network selection for a 0.01 USDC payment",
        complete: "Completed payment in the Fivo checkout",
        settle: { label: "Settlement", value: "USDC · Base", status: "Verified on-chain" },
      },
    },
    problem: {
      kicker: "The problem",
      title: "Accepting stablecoins shouldn't mean integrating one blockchain after another.",
      intro:
        "Accepting USDC sounds simple. Underneath there are different networks, different contracts, wallets, confirmations and payment states that nobody wants to maintain inside an online store.",
      points: [
        { title: "Multiple networks", text: "Each network has its own USDC contracts, RPC nodes and confirmation times." },
        { title: "Token and network compatibility", text: "EURC does not exist on every network: a chain can be valid for one token and not for another." },
        { title: "Wallet interaction", text: "Connect, check balances on each network and sign the right transaction from the browser." },
        { title: "Cross-network movement", text: "If the customer holds funds on Polygon and the merchant collects on Base, someone has to move the value." },
        { title: "Confirmation and state", text: "Verify on-chain that the payment arrived, for the right amount, and reflect it in a reliable state." },
        { title: "Integration and operations", text: "The developer needs an API; the merchant needs to see, refund, withdraw and invoice." },
      ],
      without: {
        label: "Without Fivo",
        merchant: "Merchant",
        per: "contracts · RPC · wallets · confirmations · states",
        note: "One integration per network, each with its own life cycle.",
      },
      with: {
        label: "With Fivo",
        merchant: "Merchant",
        fivo: "Fivo",
        integration: "one integration",
        note: "The networks sit behind the system.",
      },
      networks: ["Ethereum", "Polygon", "Avalanche", "Arbitrum", "Base", "Optimism", "Linea", "Unichain", "Sonic"],
      takeaway: "Fivo moves blockchain complexity away from the merchant integration.",
    },
    integration: {
      kicker: "One integration",
      title: "One integration. Multiple ways to accept payments.",
      intro:
        "Three paths on the same infrastructure: a button that embeds in any page, hosted checkout sessions and a REST API with merchant keys.",
      resultLabel: "Result",
      methods: [
        {
          id: "widget",
          tab: "Widget",
          title: "Embeddable button",
          text: "One script and one HTML element. The button opens the Fivo checkout in a full-screen iframe and the payment comes back with its state.",
          bullets: [
            "Fixed or open amount",
            "Reads the cart total from the page (data-amount-from)",
            "Reference, description and metadata per payment",
          ],
          codeLabel: "index.html",
          code: `<script async src="https://checkout.fivo.finance/v1/fivo.js"></script>

<fivo-button
  merchant-id="fivo_live_YOUR_ID"
  amount="29.99"
  currency="USDC"
  data-reference="order_1042">
</fivo-button>`,
          result: "Fivo button in the demo store cart",
        },
        {
          id: "session",
          tab: "Checkout Sessions",
          title: "Hosted checkout",
          text: "The merchant's server creates a session with amount, currency and return URL; the customer pays in the Fivo checkout and comes back to the store.",
          bullets: [
            "cs_live_ and cs_test_ sessions with expiry (30 minutes by default)",
            "return_url and cancel_url",
            "Up to five metadata keys per session",
          ],
          codeLabel: "terminal",
          code: `curl -X POST https://api.fivo.finance/checkout/sessions \
  -H "X-API-Key: fivo_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "amount": "25.00", "currency": "USDC",
        "return_url": "https://yourstore.com/thanks" }'

# 201 Created
{ "success": true,
  "data": { "id": "cs_live_…", "url": "https://checkout.fivo.finance/…",
            "expires_at": "2026-09-06T10:30:00.000Z" } }`,
          result: "Fivo hosted checkout (test environment)",
        },
        {
          id: "api",
          tab: "REST API",
          title: "API with merchant keys",
          text: "Payments, refunds, wallets, invoices and webhooks through a REST API authenticated with the X-API-Key header.",
          bullets: [
            "fivo_live_ and fivo_test_ keys",
            "Payment list and detail, refund creation and cancellation",
            "Webhook management and PDF invoice download",
          ],
          codeLabel: "terminal",
          code: `curl https://api.fivo.finance/payments/api/list \
  -H "X-API-Key: fivo_live_YOUR_KEY"

curl -X POST https://api.fivo.finance/refunds/api/create \
  -H "X-API-Key: fivo_live_YOUR_KEY" \
  -d '{ "payment_id": "…", "amount": "10.00" }'`,
          result: "API resource groups",
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
        label: "Button modes",
        items: [
          { name: "Product", text: "Fixed amount per item." },
          { name: "Donation", text: "Open amount chosen by the customer." },
          { name: "Cart", text: "Total read from the page itself." },
          { name: "Multiple products", text: "One button per item on the same page." },
        ],
      },
    },
    flow: {
      kicker: "What the customer sees",
      title: "One payment, start to finish.",
      intro:
        "The customer doesn't pick a blockchain: they pick where they hold funds. Fivo checks their balances across every supported network and shows only the valid options.",
      steps: [
        {
          title: "Connect the wallet",
          text: "The checkout opens with the amount. The customer connects their wallet (MetaMask, WalletConnect, Coinbase Wallet and others) and leaves an email for the receipt.",
          state: { label: "Wallet connected", value: "0x6753…Af6b" },
        },
        {
          title: "Choose stablecoin and network",
          text: "Fivo reads USDC and EURC balances on each network and marks whether the payment will be direct (same network) or bridged.",
          image: "checkout-network",
          alt: "Fivo checkout listing the networks where the customer holds a balance",
        },
        {
          title: "Review amount and fees",
          text: "If the customer's network is not the merchant's, the checkout breaks down product, bridge fee and gas before signing.",
          image: "checkout-confirm",
          alt: "Cross-chain payment confirmation from Polygon to Base with the fee breakdown",
        },
        {
          title: "Confirm in the wallet",
          text: "The customer signs the approval and the transfer from their own wallet. The payment leaves directly from it.",
          state: { label: "Signature", value: "Approval + transfer" },
        },
        {
          title: "On-chain confirmation",
          text: "Approval, burn, verification and delivery: progress is shown step by step until the funds reach the merchant wallet.",
          image: "checkout-processing",
          alt: "Payment in progress with the approving, burning, verifying and delivering steps",
        },
        {
          title: "Payment complete",
          text: "The backend verifies the transaction on-chain and marks the payment as completed. The customer sees the hash and the merchant receives the event.",
          image: "checkout-complete",
          alt: "Payment complete screen with the amount and the transaction hashes",
        },
      ],
      note: "Real Fivo checkout screens in the light theme. Test amount: 0.01 USDC, from Polygon to Base.",
    },
    crosschain: {
      kicker: "Cross-chain",
      title: "The customer pays from their network. The merchant receives where needed.",
      intro:
        "When the customer's network and the merchant's don't match, Fivo uses Circle Bridge Kit on CCTP v2 to move USDC between chains inside the same payment. The merchant receives the exact amount in their wallet; the customer covers the bridge fee and gas.",
      lanes: [
        { id: "customer", label: "Customer", name: "USDC · Polygon", sub: "Customer wallet" },
        { id: "checkout", label: "Fivo checkout", name: "Estimate and confirmation", sub: "Fee breakdown before signing" },
        { id: "circle", label: "Circle cross-chain layer", name: "Bridge Kit · CCTP v2", sub: "approve → burn → attestation → mint" },
        { id: "merchant", label: "Merchant", name: "USDC · Base", sub: "Merchant wallet" },
        { id: "backend", label: "Fivo backend", name: "On-chain verification", sub: "burn verified → payment completed → webhook" },
      ],
      message: { primary: "A different network for the customer.", secondary: "One integration for the merchant." },
      technical: {
        show: "Show the technical layer",
        hide: "Hide the technical layer",
        label: "What Circle does underneath",
        steps: [
          { name: "Approve", text: "The customer's wallet authorises the amount to the CCTP contract on the source network." },
          { name: "Burn", text: "The USDC is burned on the source network (TokenMessengerV2)." },
          { name: "Attestation", text: "Circle's attestation service signs the burn message." },
          { name: "Mint", text: "Circle's Forwarding Service mints the USDC on the destination network, directly into the merchant wallet." },
        ],
        note: "Fivo records the burn and mint hashes, verifies the burn on-chain and only then marks the payment as completed.",
      },
      sameChain: {
        title: "Same network",
        text: "If the customer already holds USDC or EURC on the merchant's network, the payment is a direct transfer: one confirmation and receipt verification in the backend.",
      },
      eurc: {
        title: "EURC",
        text: "EURC is accepted on Ethereum, Avalanche and Base, always on the same network: it is not moved across chains.",
      },
      imageAlt: "Confirmation of a cross-chain payment in the Fivo checkout: product, bridge fee, gas and the route between networks",
      imageCaption: "Real checkout screen (test environment): the customer sees the route between networks, the fees and how much they would save by paying from the merchant's network.",
    },
    networks: {
      kicker: "Networks",
      title: "Nine mainnet networks. One integration.",
      intro:
        "The list of networks lives in the system configuration, not in the merchant's code. USDC is accepted on all of them; EURC on the networks where Circle issues it.",
      columns: ["Network", "USDC", "EURC", "Cross-chain USDC"],
      legend: { yes: "Yes", no: "No", direct: "Same network" },
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
        "Cross-chain: the customer can pay in USDC from any of the nine networks; the merchant receives on theirs.",
        "EURC is accepted only on the merchant's own network.",
        "Arc is available in the test environment (testnet).",
      ],
    },
    merchant: {
      kicker: "Merchant platform",
      title: "The payment completes. The operation continues.",
      intro:
        "The merchant dashboard is not a transaction viewer: it manages wallets per network, withdrawals, refunds, invoices, webhooks and API keys from the same place.",
      live: "Real-time updates",
      imageAlt: "Fivo merchant dashboard: balances per wallet, revenue analytics and navigation to transactions, wallets, webhooks and API keys",
      callouts: [
        { title: "Transactions", text: "List with saved filters, search, detail for each payment and export to Excel or PDF." },
        { title: "Wallets and balances", text: "One wallet per network with USDC and EURC balances; withdrawals to the merchant's address protected with 2FA." },
        { title: "Refunds", text: "Full or partial, on-chain, with a PDF receipt for the customer." },
        { title: "Invoices", text: "One automatic invoice per withdrawal, numbered and in the language of the billing country." },
        { title: "Webhooks", text: "Endpoint setup, testing, secret regeneration and delivery logs." },
        { title: "API keys", text: "Live and test keys, shown once and stored hashed." },
      ],
    },
    operations: {
      kicker: "Operational automation",
      title: "What happens after the payment is handled too.",
      intro:
        "Payment, refund and withdrawal are complete flows: each one ends in a record, a notification and, when needed, a document.",
      flows: [
        {
          title: "Payment",
          steps: ["On-chain transaction", "Receipt verification", "payment.completed", "Signed webhook and email to the merchant", "Receipt to the customer"],
        },
        {
          title: "Refund",
          steps: ["Full or partial request, with 2FA", "On-chain transaction from the merchant wallet", "refund.completed", "PDF receipt to the customer"],
        },
        {
          title: "Withdrawal",
          steps: ["On-chain batch: amount to the merchant, 0.5% fee to Fivo", "Withdrawal completed", "FIV-YYYY-NNNN invoice as PDF", "Email with the invoice"],
        },
      ],
      automation: {
        title: "Automatic recovery",
        items: [
          { title: "Payment-intent scanner", text: "Every two minutes it checks on-chain for same-network payments that have not been confirmed yet." },
          { title: "Cross-chain recovery scanner", text: "Every five minutes it looks for CCTP mints that were never recorded and completes the payment." },
          { title: "Webhook retries", text: "Three retries with growing delays and automatic disabling after ten consecutive failures." },
        ],
      },
      invoiceAlt: "Invoice generated automatically by Fivo after a withdrawal",
      invoiceCaption: "Automatic invoice per withdrawal: fee, VAT when applicable, EUR equivalent and on-chain reference.",
    },
    developer: {
      kicker: "Developer infrastructure",
      title: "Built to integrate, not to make you rebuild your product.",
      intro:
        "The same surface the checkout uses is available to the developer: REST API, signed webhooks, keys per environment and public documentation.",
      cards: [
        { title: "REST API", text: "Payments, refunds, wallets, invoices and webhooks under api.fivo.finance, authenticated with X-API-Key.", meta: "api.fivo.finance" },
        { title: "Signed webhooks", text: "Five payment and refund events, HMAC-SHA256 signature with timestamp, retries and delivery logs.", meta: "X-Fivo-Signature" },
        { title: "API keys", text: "fivo_live_ and fivo_test_ prefixes, visible once and stored hashed.", meta: "fivo_live_ · fivo_test_" },
        { title: "Documentation", text: "Quick start, API reference, webhooks, CCTP, invoicing and test environment.", meta: "fivo.finance/docs" },
      ],
      webhook: {
        label: "One event, end to end",
        event: "payment.completed",
        headers: ["X-Fivo-Event: payment.completed", "X-Fivo-Timestamp: 1757152200", "X-Fivo-Signature: sha256=…"],
        signature: "HMAC-SHA256( timestamp . body )",
        endpoint: "Merchant endpoint",
        response: "200 OK",
        retry: "Retries: 1 s · 5 s · 25 s",
        events: ["payment.completed", "payment.failed", "refund.created", "refund.completed", "refund.failed"],
      },
      environments: {
        kicker: "Testnet and mainnet",
        message: "Two independent deployments: integrate and test without touching real funds.",
        build: {
          title: "Build",
          items: ["test.fivo.finance", "api-test.fivo.finance", "checkout-test.fivo.finance", "fivo_test_ keys · cs_test_ sessions", "Test USDC from the Circle faucet"],
        },
        live: {
          title: "Go live",
          items: ["fivo.finance", "api.fivo.finance", "checkout.fivo.finance", "fivo_live_ keys · cs_live_ sessions", "Nine mainnet networks"],
        },
      },
    },
    security: {
      kicker: "Security",
      title: "Security does not live in a single layer.",
      intro: "Each layer of the system has its own controls. None of them is a slogan: they are in the code.",
      layers: [
        { name: "User", title: "Authentication", items: ["Mandatory 2FA on every login: email, TOTP app or SMS", "Short sessions with rotating renewal", "Email alert when signing in from a new device"] },
        { name: "API", title: "Keys and limits", items: ["Hashed API keys, visible once", "Request limits per endpoint: login, withdrawals, public payments", "Schema validation and captcha on public forms"] },
        { name: "Events", title: "Signed webhooks", items: ["HMAC-SHA256 signature with timestamp", "SSRF and redirect protection on merchant endpoints", "Circle webhooks verified with ECDSA signatures"] },
        { name: "Payments", title: "On-chain verification", items: ["Receipt check: correct contract, recipient, sender and amount", "Recovery scanners for unrecorded payments", "Withdrawals and refunds with 2FA"] },
        { name: "System", title: "Traceability", items: ["Audit log of withdrawals and refunds with IP, device and 2FA context", "CSP and HSTS headers", "TOTP secrets encrypted with AES-256-GCM"] },
      ],
      note: "No “bank-grade” promises: concrete controls, verifiable in the implementation.",
    },
    circle: {
      kicker: "Circle",
      title: "Built on Circle infrastructure.",
      intro: "Fivo doesn't reinvent stablecoins or bridges: it builds the merchant payment layer on top of Circle's rails.",
      badge: "Circle Alliance Member",
      components: [
        { title: "USDC and EURC", text: "The stablecoins issued by Circle, on the networks where they are available." },
        { title: "Programmable Wallets", text: "Merchant wallets managed by the system (developer-controlled, SCA accounts), with Gas Station for withdrawals and refunds." },
        { title: "Bridge Kit and CCTP v2", text: "USDC movement between networks inside the payment, with Circle's Forwarding Service for attestation and minting." },
        { title: "Circle webhooks", text: "Wallet events verified with Circle's public key." },
      ],
      disclaimer: "Fivo is an independent product. Circle Alliance membership does not imply ownership, endorsement or exclusivity on Circle's part.",
    },
    engineering: {
      kicker: "Engineering",
      title: "A complete financial product, not an isolated integration.",
      intro:
        "Fivo is the kind of system Nafureanu designs and builds: several components with clear responsibilities, connected by events, and in production.",
      areas: [
        { name: "Payments", title: "Checkout and payment states", text: "React widget, multi-network balance scanning, hosted sessions and a state machine from pending to completed or failed." },
        { name: "Blockchain", title: "Nine networks and cross-chain", text: "Network and token configuration per environment, direct transfers and CCTP v2 bridges with receipt verification." },
        { name: "Backend", title: "API and event processing", text: "Node.js and Express in TypeScript, PostgreSQL with Prisma and periodic workers for withdrawals, refunds and payment recovery." },
        { name: "Merchant product", title: "Operations dashboard", text: "Next.js with real-time updates: transactions, wallets, withdrawals, refunds, invoices, webhooks and keys." },
        { name: "Automation", title: "Notifications, invoices and refunds", text: "Transactional emails, PDF invoices in 22 languages with EU VAT rules and refund receipts." },
        { name: "Security", title: "Authentication, signatures and audit", text: "Mandatory 2FA, hashed keys, signed webhooks, request limits and audit logs." },
        { name: "Infrastructure", title: "Deployment and nodes", text: "Frontends on Vercel, API and database on Railway, Alchemy RPC with public fallback nodes and PDF storage on R2." },
        { name: "Developer experience", title: "Documentation and test environment", text: "Three integration paths, public documentation and an independent testnet with its own key and session prefixes." },
      ],
      stack: {
        label: "Stack",
        items: ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "wagmi · viem", "Circle Programmable Wallets", "Circle Bridge Kit", "CCTP v2", "Alchemy", "Vercel", "Railway"],
      },
    },
    surfaces: {
      kicker: "Inside the product",
      title: "Real product surfaces.",
      intro: "Screenshots of the checkout, the dashboard and the demo store, all in the light theme. Test data; no real merchant information.",
      items: [
        { id: "checkout-store", size: "large", title: "Checkout over the store", text: "The button opens the Fivo checkout on top of the store itself: balances per network, payment type and the amount read from the cart." },
        { id: "connect-wallet", size: "medium", title: "Wallet connection", text: "The checkout opens with the amount and asks for the receipt email before connecting the customer's wallet." },
        { id: "payment-complete-store", size: "large", title: "Payment completed over the store", text: "The checkout's final state: amount, transaction and delivery confirmed without leaving the store." },
        { id: "crosschain-progress", size: "medium", title: "Cross-chain payment in progress", text: "Approval, burn, verification and delivery: the customer sees each step until the funds arrive." },
        { id: "invoice", size: "medium", title: "Automatic invoice", text: "Generated after each withdrawal, with the fee, applicable VAT and the on-chain reference." },
        { id: "merchant-dashboard", size: "medium", title: "Merchant dashboard", text: "Balances per wallet, revenue over time and access to transactions, invoices, refunds, webhooks and API keys." },
      ],
    },
    cta: {
      kicker: "Next step",
      title: "Does your product need payments, automation or infrastructure that doesn't exist yet?",
      copy: "We design and build software around the problem, from architecture to production.",
      primary: "Tell us what you need",
      secondary: "See all projects",
      product: { label: "About the product", text: "Fivo is a live product with its own support.", host: "fivo.finance", url: "https://fivo.finance" },
    },
};
