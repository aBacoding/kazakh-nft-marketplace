'use client'

import ReactDOM from 'react-dom/client'
import App from '@/app/index.tsx'
import '@/shared/assets/styles/index.css'
import '@/shared/assets/styles/app.scss'
import Layout from '@/shared/ui/layouts/layout'
import {
  BrowserRouter as Router,
  useLocation,
  matchPath,
} from 'react-router-dom'
import AuthLayout from './shared/ui/layouts/auth'
import NotFoundLayout from './shared/ui/layouts/not-found'
import { RegisterRoutes } from '@/modules/register/model/routes'
import { LoginRoutes } from '@/modules/login/model/routes'

const validPaths = [
  // TODO: remove '/' soon after home page is implemented
  '/',
  '/explore/trending',
  RegisterRoutes.path,
  LoginRoutes.path,
]

const AppWithLayouts = () => {
  const location = useLocation()
  const isAuthPage = location.pathname.includes('sign')

  const hasValidPath = validPaths.some(
    (path) => path && matchPath(path, location.pathname)
  )

  if (!hasValidPath) {
    return (
      <NotFoundLayout>
        <App />
      </NotFoundLayout>
    )
  }

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
