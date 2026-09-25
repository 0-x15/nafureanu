/** English copy of the CRM inmobiliario case study — loaded with the page (see src/i18n/blocks.js). Page metadata lives in en.js. */
export default {
    hero: {
      kicker: "Case study · Real estate CRM on Odoo",
      title: "When the CRM adapts to the agency. Not the other way around.",
      support:
        "A system built on Odoo to centralize properties, clients, demand, visits and operations — automating the work that normally depends on the team.",
      proof: [
        { value: "40K+", label: "Properties managed" },
        { value: "20+", label: "Custom Odoo modules" },
      ],
      tech: "Odoo · Python · PostgreSQL · Automation · AI · APIs",
    },
    problem: {
      kicker: "The problem",
      titleA: "A generic CRM stores information.",
      titleB: "A real-estate business needs a system that understands how it works.",
      intro: "The kinds of problems this type of system is built to remove:",
      howLabel: "How the CRM solves it",
      pains: [
        {
          title: "Leads nobody answers in time.",
          solutionTitle: "First-contact SLA",
          solution:
            "When a lead is assigned, the CRM starts tracking the first contact in business hours. It can warn before the deadline, mark the SLA as overdue and release the opportunity back to the queue if it remains unattended. Recording the first contact stops the clock.",
        },
        {
          title: "Client-property matching done by hand.",
          solutionTitle: "Automatic matching engine",
          solution:
            "The CRM automatically matches demand with compatible properties and also works in reverse, identifying potential interested clients from a property. It filters by essential criteria and scores compatibility using the relevant characteristics. A match can lead directly into actions such as scheduling a visit.",
        },
        {
          title: "Information duplicated across tools.",
          solutionTitle: "Unified contacts and deduplication",
          solution:
            "The system uses the normalized phone number as a uniqueness control and detects existing contacts before creating duplicates. Records arriving through connected channels can reuse an existing contact, and a merge tool archives duplicates while preserving traceability.",
        },
        {
          title: "Portals that have to be updated separately.",
          solutionTitle: "Publishing connected to the property",
          solution:
            "Idealista and Fotocasa are connected directly to the property record. The CRM supports publishing, updating and withdrawing listings from the system and detects relevant changes so portal information can stay synchronized without being entered again manually.",
        },
        {
          title: "Visits and calendar disconnected from the CRM.",
          solutionTitle: "Unified operational calendar",
          solution:
            "The CRM brings tasks, visits and call-backs into one agenda. Tasks create a mirrored Google Calendar event, and relevant changes can synchronize in both directions, keeping the schedule connected to the actual CRM record.",
        },
        {
          title: "Documentation that depends on manual review.",
          solutionTitle: "Documentation turned into a workflow",
          solution:
            "The CRM does not remove human validation when it is required; it turns it into a controlled process. Documents have states, permissions and requirements; mandatory documents can block progression such as publishing, while approval or signature can automatically update the related checklist and alerts.",
        },
        {
          title: "Follow-ups that depend on someone remembering them.",
          solutionTitle: "Calendar, tasks and automated alerts",
          solution:
            "Calls, revisits, follow-ups, documentation and reminders become tasks with an owner, date and status. The system detects overdue tasks and can also generate alerts for inactivity, stalled prospects or approaching mandate deadlines, reducing dependence on the team's memory.",
        },
        {
          title: "WhatsApp and calls outside the client's context.",
          solutionTitle: "Communication connected to the CRM",
          solution:
            "WhatsApp messages are recorded and linked to contacts and CRM processes; incoming messages can locate or create the corresponding contact and notify the responsible agent. Calls are also recorded with their context — contact, demand, prospect or property — so the conversation becomes part of the operational history.",
        },
      ],
    },
    centralizes: {
      kicker: "What it centralizes",
      title: "The entire operation lives in one system.",
      intro:
        "Information, people and processes that used to live scattered across tools.",
      closing:
        "The information is not only centralized. Each part of the system understands its relationship with the others.",
      items: [
        {
          id: "properties",
          num: "01",
          title: "Properties",
          descriptor: "Operational record of the asset",
          tags: ["Status", "Price", "Images", "Documents", "Availability"],
          detail:
            "The property record connects data, documents, alerts, matching, visits, portals and operations from a single record.",
          ui: {
            status: "Available",
            availability: "Immediate",
            portals: ["Idealista", "Fotocasa"],
            published: "Published",
            linksLabel: "Connected to",
            links: ["Matching", "Visits", "Operations", "Alerts"],
          },
        },
        {
          id: "clients",
          num: "02",
          title: "Clients",
          descriptor: "The complete relationship with each contact",
          tags: ["Buyer", "Seller", "Owner", "Tenant"],
          detail:
            "Each contact brings together activity, demand, calls, WhatsApp, visits and related operations.",
          ui: { activity: ["Active demand", "Call logged", "Visit scheduled"] },
        },
        {
          id: "demand",
          num: "03",
          title: "Demand",
          descriptor: "What each buyer or tenant is looking for",
          tags: ["Area", "Price", "Type", "Bedrooms", "Surface", "Financing"],
          detail:
            "The matching engine uses these criteria to find compatible properties automatically.",
          ui: { matches: "Matches" },
        },
        {
          id: "prospects",
          num: "04",
          title: "Prospects",
          descriptor: "Acquisition before the property is listed",
          detail:
            "The system tracks progress, activity and pending tasks, and helps detect acquisitions that have gone too long without moving forward.",
          ui: { stage: "Acquisition progress", tasks: "Pending tasks", activity: "Last activity" },
        },
        {
          id: "leads",
          num: "05",
          title: "Leads",
          descriptor: "Intake and follow-up of opportunities",
          detail:
            "Assignment, first contact, response times, activity and alerts help prevent abandoned opportunities.",
          ui: { assigned: "Assigned", first: "First contact", contacted: "Contacted" },
        },
        {
          id: "visits",
          num: "06",
          title: "Visits",
          descriptor: "The full cycle of a visit",
          statuses: ["Scheduled", "Confirmed", "Completed", "No-show", "Cancelled"],
          detail:
            "The visit stays linked to the property, client, demand, owner, calendar, feedback and any subsequent operation.",
          ui: { linksLabel: "Linked to", links: ["Property", "Client", "Demand", "Owner"] },
        },
        {
          id: "operations",
          num: "07",
          title: "Operations",
          descriptor: "The complete commercial closing",
          flow: ["Negotiation", "Offer", "Deposit", "Financing", "Deed", "After-sales"],
          detail:
            "Each phase keeps its statuses, tasks, documents and dependencies inside the same process.",
          ui: { meters: ["Tasks", "Documents", "Dependencies"] },
        },
        {
          id: "documents",
          num: "08",
          title: "Documentation",
          descriptor: "Documents inside the workflow",
          flow: ["Pending", "Review", "Approved", "Signed"],
          detail:
            "Requirements, statuses, validations, signature and checklists are part of the operational process.",
          ui: { docs: ["Lease agreement", "Energy certificate"], checklist: "File checklist" },
        },
        {
          id: "communication",
          num: "09",
          title: "Communication",
          descriptor: "Conversations inside the client's context",
          tags: ["WhatsApp", "Calls", "Follow-up"],
          detail:
            "Messages and calls stay linked to the contact and their operational context inside the CRM.",
          ui: { incoming: "Incoming", linked: "Linked to the contact and their operation" },
        },
        {
          id: "calendar",
          num: "10",
          title: "Calendar",
          descriptor: "The team's daily operation",
          tags: ["Tasks", "Visits", "Calls", "Reminders"],
          detail:
            "Dates, owners, deadlines and Google Calendar sync keep activity connected to the CRM.",
          ui: {
            rows: [["09:30", "Visit"], ["12:00", "Call"], ["16:15", "Reminder"]],
            sync: "Synced with Google Calendar",
          },
        },
      ],
    },
    system: {
      kicker: "The system",
      title: "A real-estate operation turned into software.",
      flow: {
        intake: "Acquisition",
        property: "Property",
        matching: "Matching",
        demand: "Demand / Client",
        visit: "Visit",
        negotiation: "Negotiation",
        deposit: "Deposit",
        financing: "Financing",
        deed: "Deed",
        afterSales: "After-sales",
        note: "Supply ↔ Demand — crossed automatically",
      },
      layersLabel: "System layers",
      layers: [
        "Automation",
        "AI",
        "WhatsApp",
        "Calendar",
        "Documentation",
        "Portals",
        "Reporting",
      ],
    },
    automation: {
      kicker: "Automation",
      title: "Work the CRM does on its own.",
      intro:
        "The system reacts to operational data, states and events to execute work automatically.",
      engine: "Automation engine",
      active: "Active",
      stages: ["Signal", "CRM logic", "Automatic action", "Result"],
      closing:
        "Automation is not layered on top of the CRM. It is built into how each process works.",
      modules: [
        {
          id: "matching",
          num: "01",
          title: "Automatic matching",
          text: "Crosses demand and properties and detects matches without manual search.",
          ui: {
            trigger: "New demand",
            pair: "Demand ↔ Property",
            engine: "Matching active",
            criteria: ["Area", "Price", "Type", "Bedrooms"],
            result: "Matches detected",
          },
        },
        {
          id: "leads",
          num: "02",
          title: "Lead follow-up",
          text: "The CRM tracks first contact, activity and follow-ups to detect opportunities that need attention.",
          ui: {
            steps: ["Lead assigned", "First contact", "SLA active", "Alert / follow-up"],
            noContact: "No contact",
            alert: "Alert",
            queue: "Back to the queue",
          },
        },
        {
          id: "checklists",
          num: "03",
          title: "Smart checklists",
          text: "Requirements update as the system detects that certain steps have already been completed.",
          ui: {
            file: "File",
            items: [
              ["Basic data", true],
              ["Photos", true],
              ["Documentation", false],
              ["Price", true],
              ["Publishing", false],
            ],
            autoIndex: 2,
            event: "Document approved",
            autoTag: "Automatic",
            result: "File updated",
          },
        },
        {
          id: "alerts",
          num: "04",
          title: "Alerts & reminders",
          text: "The CRM detects deadlines, inactivity and pending tasks without relying on the team's memory.",
          note: "The CRM watches the operation even when nobody is looking at the screen.",
          ui: {
            label: "Monitoring",
            live: "Watching",
            items: [
              ["Upcoming visit", "ok"],
              ["Pending document", "warn"],
              ["Overdue task", "attention"],
              ["Inactive lead", "warn"],
              ["Mandate about to expire", "attention"],
            ],
          },
        },
        {
          id: "sync",
          num: "05",
          title: "Operation sync",
          text: "Relevant events keep the CRM, the calendar and the integrations involved in each process connected.",
          ui: {
            source: "CRM",
            events: [
              { label: "Visit modified", targets: ["Calendar", "Google Calendar"] },
              { label: "Property updated", targets: ["Connected portal"] },
            ],
          },
        },
        {
          id: "ai",
          num: "06",
          title: "AI-assisted qualification",
          text: "Conversations and calls can become contacts, demand or structured information inside the CRM.",
          ui: {
            source: "WhatsApp",
            message: "I'm looking for a three-bedroom apartment, up to €300,000, around the city centre.",
            ai: "AI",
            fields: [
              ["Type", "Apartment"],
              ["Bedrooms", "3"],
              ["Budget", "≤ €300,000"],
              ["Area", "City centre"],
            ],
            result: "Demand created / updated",
          },
        },
      ],
    },
    matching: {
      kicker: "Matching",
      title: "The CRM doesn't just store data. It uses it to find opportunities.",
      paras: [
        "The matching system compares property supply with buyer and renter demand: it evaluates relevant criteria and surfaces compatible opportunities without manual searching.",
        "It works in both directions: from a client toward compatible properties, and from a property toward likely interested parties.",
      ],
      workspace: "Matching",
      relation: "Supply ↔ Demand",
      axis: { demand: "Demand", supply: "Supply" },
      engine: "Matching",
      compatible: "Compatible",
      criteriaTitle: "Compatible criteria",
      closing:
        "Finding opportunities no longer depends on someone remembering which client might fit which property.",
      modes: [
        {
          id: "demand",
          tab: "Demand → Properties",
          direction: ["Demand", "Supply"],
          source: {
            label: "Demand",
            kind: "Purchase · Home",
            fields: [
              ["Area", "City centre"],
              ["Budget", "≤ €300,000"],
              ["Type", "Apartment"],
              ["Bedrooms", "3"],
              ["Surface", "≥ 80 m²"],
            ],
          },
          criteria: ["Area", "Price", "Type", "Bedrooms", "Surface"],
          resultsLabel: "Compatible properties",
          results: [
            {
              title: "Apartment · 3 bedrooms",
              meta: ["92 m²", "€285,000", "City centre"],
              criteria: ["Area", "Price", "Type", "Bedrooms", "Surface"],
            },
            {
              title: "Apartment · 3 bedrooms",
              meta: ["88 m²", "€298,000", "City centre"],
              criteria: ["Area", "Price", "Type", "Bedrooms", "Surface"],
            },
            {
              title: "Apartment · 3 bedrooms",
              meta: ["84 m²", "€279,000", "City centre"],
              criteria: ["Area", "Price", "Type", "Bedrooms", "Surface"],
            },
          ],
          actions: ["View property", "Prepare visit"],
        },
        {
          id: "property",
          tab: "Property → Interested clients",
          direction: ["Supply", "Demand"],
          source: {
            label: "Property",
            kind: "Apartment · Available",
            fields: [
              ["Price", "€285,000"],
              ["Bedrooms", "3"],
              ["Surface", "92 m²"],
              ["Area", "City centre"],
              ["Status", "Available"],
            ],
          },
          criteria: ["Area", "Price", "Type", "Bedrooms"],
          resultsLabel: "Interested clients",
          results: [
            {
              title: "Demand A",
              meta: ["Purchase · Apartment", "3 bedrooms", "City centre"],
              criteria: ["Area", "Price", "Type", "Bedrooms"],
            },
            {
              title: "Demand B",
              meta: ["Purchase", "Up to €300,000", "3 bedrooms"],
              criteria: ["Area", "Price", "Type", "Bedrooms"],
            },
            {
              title: "Demand C",
              meta: ["Purchase · Apartment", "Up to €320,000", "City centre"],
              criteria: ["Area", "Price", "Type", "Bedrooms"],
            },
          ],
          actions: ["View demand", "Prepare visit"],
        },
      ],
    },
    documents: {
      title: "Documents are part of the process, not just attachments.",
      paras: [
        "Every document belongs to an operation: it has requirements, status, review and signature. The file advances as the system detects each requirement has been met.",
      ],
      states: ["Pending", "Review", "Approved"],
    },
    operations: {
      title: "From the visit to the closing, inside the same system.",
      paras: [
        "The CRM can model the stages of a real-estate operation — visit, follow-up, negotiation, deposit, financing, deed and after-sales — with their statuses, deadlines and dependencies.",
      ],
      stages: ["Visit", "Follow-up", "Negotiation", "Deposit", "Financing", "Deed", "After-sales"],
    },
    integrations: {
      kicker: "Integrations",
      title: "The CRM is part of the agency's ecosystem.",
      intro: "Portals, communication, scheduling and signing connected to the CRM operation.",
      core: {
        title: "CRM system",
        state: "System connected",
        activity: ["Property updated", "Message received", "Visit synchronized"],
      },
      groups: { portals: "Portals", communication: "Communication", operation: "Operation" },
      items: [
        {
          id: "idealista",
          group: "portals",
          title: "Idealista",
          category: "Property portal",
          capabilities: ["Publish", "Update", "Withdraw"],
          direction: "out",
          pulse: "out",
          ambient: true,
          directionLabel: "CRM → Idealista",
          flows: [{ dir: "out", steps: ["Property updated", "Publication"] }],
          detail:
            "The property record can manage its portal publication without manually entering the same information again.",
          coreEvent: "Publication updated",
        },
        {
          id: "fotocasa",
          group: "portals",
          title: "Fotocasa",
          category: "Portal + lead intake",
          capabilities: ["Publishing", "Updates", "Leads"],
          direction: "both",
          pulse: "in",
          ambient: true,
          directionLabel: "CRM ↔ Fotocasa",
          flows: [
            { dir: "out", steps: ["Property updated", "Publication"] },
            { dir: "in", steps: ["New lead", "CRM contact / opportunity"] },
          ],
          detail:
            "The CRM connects property management with the portal and can bring leads received from Fotocasa into the operational workflow.",
          coreEvent: "Lead added",
        },
        {
          id: "mls",
          group: "portals",
          title: "MLS",
          category: "Real-estate network",
          capabilities: ["Publishing", "Synchronization"],
          direction: "both",
          pulse: "out",
          ambient: false,
          directionLabel: "CRM ↔ MLS",
          flows: [{ dir: "both", variant: "network", steps: ["Property record", "MLS network"] }],
          detail:
            "Properties can participate in the connected MLS workflow directly from the system.",
          coreEvent: "Property synchronized",
        },
        {
          id: "whatsapp",
          group: "communication",
          title: "WhatsApp",
          category: "Communication",
          capabilities: ["Messages", "Context", "Follow-up"],
          direction: "in",
          pulse: "in",
          ambient: true,
          directionLabel: "WhatsApp → CRM",
          flows: [{ dir: "in", steps: ["Message received", "Contact located", "CRM history"] }],
          detail:
            "Messages remain linked to the contact and operational context so the conversation becomes part of the CRM history.",
          coreEvent: "Message linked",
        },
        {
          id: "calendar",
          group: "operation",
          title: "Google Calendar",
          category: "Connected calendar",
          capabilities: ["Tasks", "Visits", "Calls"],
          direction: "both",
          pulse: "out",
          ambient: true,
          directionLabel: "CRM ↔ Google Calendar",
          flows: [{ dir: "both", steps: ["CRM · Visit 10:30", "Google Calendar · 10:30 Visit"] }],
          detail:
            "Tasks, visits and call-backs can stay connected with Google Calendar so the external schedule and the CRM record do not live separately.",
          coreEvent: "Visit synchronized",
        },
        {
          id: "sign",
          group: "operation",
          title: "Odoo Sign",
          category: "Integrated signing",
          capabilities: ["Documents", "Signing", "Status"],
          direction: "loop",
          pulse: "out",
          ambient: false,
          directionLabel: "CRM → Signing → CRM",
          flows: [{ dir: "loop", variant: "states", steps: ["Pending", "Signing", "Signed"] }],
          detail:
            "Signing becomes part of the document workflow, keeping the document and its status inside the CRM process.",
          coreEvent: "Document signed",
        },
      ],
      closing:
        "The CRM does not replace the tools already used in the operation. It connects them.",
      closingMeta: "Portals · Communication · Scheduling · Signing",
    },
    ai: {
      title: "AI inside the process, not on top of the product.",
      paras: [
        "AI assists where the process needs it: conversation, lead qualification, information extraction, call workflows and document workflows.",
      ],
      key: "AI works on the system's data and rules. It doesn't replace the business logic.",
    },
    odoo: {
      kicker: "Odoo engineering",
      title: "Odoo as the base. The client's operation as the design.",
      copy: "In this project we started from Odoo's infrastructure, then adapted models, logic, automation and interface until the system worked the way the company works.",
      panelLabel: "System architecture",
      proof: {
        value: "20+",
        label: "Custom Odoo modules",
        stack: "Odoo · Python · PostgreSQL · OWL · APIs",
      },
      flowLabel: "Event → rule → action",
      layers: [
        {
          id: "operation",
          num: "06",
          label: "Real-estate operation",
          role: "Result",
          text: "The business process the system is designed around.",
          items: ["Clients", "Properties", "Demand", "Visits", "Operations", "Documentation"],
          visual: "chain",
        },
        {
          id: "ui",
          num: "05",
          label: "Custom interface",
          role: "OWL",
          text: "When the standard interface does not fit the team's work, we build dedicated surfaces for that operation.",
          items: ["Dashboards", "Property detail", "Matching", "Operations", "Navigation", "Work surfaces"],
          visual: "surface",
        },
        {
          id: "automation",
          num: "04",
          label: "Automation",
          role: "System",
          text: "Events, rules and actions the system runs on its own on top of the business logic.",
          items: ["Matching", "Alerts", "Follow-ups", "Checklists", "Synchronization"],
          flow: ["Event", "Rule", "Action"],
        },
        {
          id: "logic",
          num: "03",
          label: "Business logic",
          role: "Python",
          text: "Rules, states and validations turn the company's real process into software behaviour.",
          items: ["States", "Rules", "Validations", "Assignments", "Dependencies"],
          flow: ["Document approved", "Rule met", "Checklist updated", "Process continues"],
        },
        {
          id: "data",
          num: "02",
          label: "Data models",
          role: "Models",
          text: "The data model represents how the real-estate operation actually works.",
          items: ["Prospect", "Property", "Demand", "Visit", "Operation", "Document"],
          visual: "entities",
        },
        {
          id: "foundation",
          num: "01",
          label: "Platform foundation",
          role: "Base",
          main: "Odoo",
          text: "Starting infrastructure in this project.",
          items: ["ORM", "Users", "Permissions", "Modules", "Shared services", "PostgreSQL"],
        },
      ],
      architectureChoice: {
        title: "The platform is an architectural decision, not a limitation.",
        copy: "When a platform such as Odoo provides a useful foundation, we build on top of it. When the product requires greater control, independence or a specific architecture, we design and build the system from scratch with its own architecture.",
        start: "Business process",
        decision: "Architectural decision",
        routes: [
          {
            id: "platform",
            title: "Platform-based",
            subtitle: "Odoo",
            items: ["Adapted models", "Custom business logic", "Automation", "Custom UI", "Integrations"],
          },
          {
            id: "custom",
            title: "Custom system",
            subtitle: "Built from scratch",
            items: ["Own architecture", "Own backend", "Own data model", "APIs / services", "Infrastructure"],
          },
        ],
        result: "Custom software around the operation",
      },
      closing: "We don't start with the platform. We start with the operation.",
      closingSupport: "On Odoo when it adds value. From scratch when the system needs its own architecture.",
    },
    cta: {
      kicker: "Does your CRM not fit your operation?",
      title: "You don't need to change how your company works to fit the software.",
      copy: "We can design the system around your processes, automations and integrations.",
      primary: "Start a conversation",
      secondary: "View all projects",
    },
};
