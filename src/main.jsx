import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

/* Production pages are prerendered: hydrate the static DOM instead of rebuilding it. The dev server ships an empty root. */
const container = document.getElementById('root')
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />)
} else {
  createRoot(container).render(<App />)
}
