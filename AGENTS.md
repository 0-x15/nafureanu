# AGENTS.md

## Project Context

This repository is the public corporate website of Nafureanu: a Vite + React site, statically prerendered at build time and deployed on Vercel. There is no Base44 runtime, SDK, Vite plugin or authentication layer — the site makes no platform request. The contact form posts to `/api/contact`, a Vercel serverless function.

Treat it as user-owned application code: keep changes focused on the request and preserve the existing conventions. The current local working tree is the source of truth; do not infer behaviour from older tooling or documentation.

Start with `README.md` — the sections "Production build and prerendering", "Performance architecture" and "Contact form" describe the current architecture. Earlier sections about the Base44 CLI are historical and no longer apply.

## Key Files

- `src/`: application source. `src/AppRoutes.jsx` is the route tree shared by the browser and the prerender; `src/data/routes.js` is the public route manifest; `src/lib/seo.js` the single SEO model (title, description, canonical, hreflang, JSON-LD).
- `src/i18n/`: `es.js` / `en.js` hold the core copy and every page's metadata; the copy of each service page and case study lives in `src/i18n/<lang>/<block>.js` and loads with that page's chunk.
- `scripts/`: `build.mjs` (client build → SSR build → prerender → sitemap → validation), `prerender.mjs`, `sitemap.mjs`, `validate-seo.mjs` (SEO and performance guards; fails the build on regressions), `vercel-config.mjs` (regenerates `vercel.json` from the manifest — commit it when it changes), `dev-api.mjs` (local harness for the contact endpoint).
- `api/contact.js`: the contact endpoint (Vercel function). Its recipient and API key come only from Vercel environment variables.
- `vite.config.js`: plain Vite + React; the `/api` proxy targets the local harness in development.
- `vercel.json`: generated — do not edit by hand.

## Working Notes

- `npm run dev` runs the site locally. For the contact form, run `node scripts/dev-api.mjs` alongside it.
- Before finishing any code change, run `npm run lint`, `npm run typecheck` and `npm run build`. The build prerenders every public URL and validates metadata, JSON-LD, sitemap and performance guards; it must pass.
- Do not break the prerender/SEO architecture: components must render on the server and hydrate without mismatches (no `window`/`matchMedia` reads during the first render), every route must stay in the manifest, metadata comes from the SEO model only.
- Keep framer-motion imports as `m as motion` (LazyMotion); give above-the-fold entrances a CSS animation; keep new page copy in its i18n block.
- Never commit secrets. No email address, API key or platform identifier belongs in the frontend, the HTML or the repository; environment values live only in Vercel (and local, gitignored `.env*` files).
