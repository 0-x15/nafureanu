import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Plain Vite + React — no platform runtime required.
// Builds a fully static site deployable anywhere (e.g. Hostinger).
export default defineConfig({
  plugins: [react()],
  // Local development only: the contact endpoint is a PHP file served by the
  // host in production. Run a PHP server on 8794 to exercise it locally.
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