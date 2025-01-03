'use client'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/index.tsx'
import '@/shared/assets/styles/index.css'
import '@/shared/assets/styles/app.scss'
import Layout from '@/shared/ui/layouts/layout'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthLayout from './shared/ui/layouts/auth'

const path = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      {path.includes('sign') ? (
        <AuthLayout>
          <App />
        </AuthLayout>
      ) : (
        <Layout>
          <App />
        </Layout>
      )}
    </Router>
  </React.StrictMode>
)
