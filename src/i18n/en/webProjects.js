/** English copy of the Web projects exhibition — loaded with the page (see src/i18n/blocks.js). Page metadata lives in en.js. */
export default {
    visit: "Visit site",
    visitHint: "Opens in a new tab",
    scope: "Web design and development",
    exhibition: {
      lines: ["Selected", "digital", "experiences"],
      meta: ["04 projects", "Design + development", "Web / Digital product"],
      lead: "Four real websites and products, presented as an exhibition. Scroll to walk through it.",
      scroll: "Scroll to enter",
      cursor: "Visit",
      stageLabel: "Project exhibition",
      railLabel: "Go to a project",
      progressLabel: "Exhibition progress",
      statement: ["Design and development", "are not two deliverables.", "They are the same product."],
      capability: "Design · Development · Web / Digital product",
      outro: {
        question: "What should exist next?",
        copy: "Websites, products and systems around what your business needs.",
        primary: "Tell us what you want to build",
        secondary: "See all projects",
      },
      swipe: "Swipe to see more views",
    },
    projects: [
      {
        id: "dd-evecom",
        name: "DD Evecom Comfort",
        short: "DD Evecom",
        lines: ["DD Evecom", "Comfort"],
        line:
          "Commercial site for an acoustic-window installer in Madrid: it explains a technical service clearly and leads to the quote.",
        category: "Service website · Acoustic and thermal insulation",
        url: "https://dd-evecom-comfort.es",
        host: "dd-evecom-comfort.es",
        description:
          "Commercial website for an acoustic-window and insulation installer in Madrid, an official Kömmerling partner. The site had to explain a technical service clearly and convert: quote, phone and WhatsApp always within reach, a savings simulator and a projects section with real cases.",
        signals: ["Responsive", "Savings simulator", "Quote flow", "Projects page"],
        images: {
          desktop: "DD Evecom Comfort homepage: headline, before/after decibel comparison and quote call to action",
          tall: "DD Evecom Comfort homepage, scrollable to reveal the benefits and acoustic-window sections",
          mobile: "DD Evecom Comfort homepage on mobile",
          detail: "DD Evecom Comfort completed-projects page",
        },
        captions: { desktop: "Homepage · desktop", mobile: "Homepage · mobile", detail: "Completed projects" },
      },
      {
        id: "dental-goya",
        name: "Clínica Dental Goya, 116",
        short: "Goya 116",
        lines: ["Clínica", "Dental", "Goya 116"],
        line:
          "Website for a Madrid dental clinic that organises treatments, first visit and prices, and leads the patient to book.",
        category: "Healthcare website · Dental clinic",
        url: "https://clinicadentalgoya116.com/",
        host: "clinicadentalgoya116.com",
        description:
          "Website for a dental clinic in Madrid's Salamanca district. It had to organise a lot of information (treatments, first visit, indicative prices, opening hours) and lead the patient to a single gesture: book an appointment or call. A warm green identity, real photography of the clinic and a simple content architecture.",
        signals: ["Appointment booking", "Treatment catalogue", "First visit", "Responsive"],
        images: {
          desktop: "Clínica Dental Goya 116 homepage: headline, booking button and photograph of the façade",
          tall: "Clínica Dental Goya 116 homepage, scrollable to reveal the gallery and treatments",
          mobile: "Clínica Dental Goya 116 homepage on mobile",
          detail: "Clínica Dental Goya 116 first-visit page",
        },
        captions: { desktop: "Homepage · desktop", mobile: "Homepage · mobile", detail: "Your first visit" },
      },
      {
        id: "reformas-octavian",
        name: "Reformas Octavian",
        short: "Octavian",
        lines: ["Reformas", "Octavian"],
        line:
          "A renovation website turned into a 3D experience: modelled scenes per section and screen-by-screen navigation.",
        category: "3D web experience · Renovation company",
        url: "https://reformasoctavian.es/",
        host: "reformasoctavian.es",
        description:
          "A renovation website that doesn't look like one: a 3D experience in the browser, with modelled scenes for each section (welcome, about, services, projects) and screen-by-screen navigation instead of scrolling. Display typography, plenty of air and direct contact via WhatsApp, email or phone.",
        signals: ["3D in the browser", "Scene navigation", "Display typography", "Mobile-adapted"],
        images: {
          desktop: "Reformas Octavian welcome screen with 3D-modelled tools",
          detail: "3D scene of the Reformas Octavian Services section",
          detail2: "3D scene of the Reformas Octavian About section",
          mobile: "Reformas Octavian welcome screen on mobile",
        },
        captions: { desktop: "Welcome", detail: "Services", detail2: "About", mobile: "Mobile" },
      },
      {
        id: "mp-monitor",
        name: "MP Monitor",
        short: "MP Monitor",
        lines: ["MP", "Monitor"],
        line:
          "An application that follows dozens of assets live, scores them with fixed rules and explains every figure in plain language.",
        category: "Web application · Real-time market dashboard",
        url: "https://mpmonitor.netlify.app",
        host: "mpmonitor.netlify.app",
        description:
          "Not a website: an application. A dashboard that follows dozens of assets live, scores them with fixed rules and explains every figure in plain language. Seven screens (dashboard, market, floors and ceilings, chart, asset, risk, system), search, keyboard shortcuts and an embedded interactive chart.",
        signals: ["Real-time data", "Seven views", "Keyboard shortcuts", "Interactive chart"],
        images: {
          desktop: "MP Monitor market view: asset table with score, signals and filters",
          detail: "MP Monitor chart view with candles and the asset evaluation panel",
          mobile: "MP Monitor market view on mobile",
        },
        captions: { desktop: "Market", detail: "Chart and evaluation", mobile: "Mobile" },
      },
    ],
};
