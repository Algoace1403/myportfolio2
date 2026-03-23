import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/global.css'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SENTRY SETUP:
// 1. Create free account at https://sentry.io
// 2. Create a React project → get your DSN
// 3. Replace the DSN below (or set VITE_SENTRY_DSN env var)
// 4. Errors in production will be captured automatically
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    // Only send errors in production
    enabled: import.meta.env.PROD,
    // Sample 100% of errors, 10% of transactions
    sampleRate: 1.0,
    tracesSampleRate: 0.1,
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
