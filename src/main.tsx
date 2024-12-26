'use client'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/index.tsx'
import '@/shared/assets/styles/index.css'
import Layout from '@/app/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
)
