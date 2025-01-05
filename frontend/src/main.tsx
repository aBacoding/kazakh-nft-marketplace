'use client'

import ReactDOM from 'react-dom/client'
import App from '@/app/index.tsx'
import '@/shared/assets/styles/index.css'
import '@/shared/assets/styles/app.scss'
import Layout from '@/shared/ui/layouts/layout'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import AuthLayout from './shared/ui/layouts/auth'

const AppWithLayouts = () => {
  const location = useLocation()
  const isAuthPage = location.pathname.includes('sign')

  return isAuthPage ? (
    <AuthLayout>
      <App />
    </AuthLayout>
  ) : (
    <Layout>
      <App />
    </Layout>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <AppWithLayouts />
  </Router>
)
