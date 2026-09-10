import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Plain Vite + React — no platform runtime required.
// Builds a fully static site; /api/contact is a Vercel function (see api/).
export default defineConfig({
  plugins: [react()],
  // Local development only: in production /api/contact is a Vercel function.
  // Run `node scripts/dev-api.mjs` (port 8794) to exercise it locally.
  server: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:8794', changeOrigin: false },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})