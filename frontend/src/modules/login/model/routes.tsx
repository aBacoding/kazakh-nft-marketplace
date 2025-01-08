import { SuspenseLayout } from '@/shared/ui/layouts/suspense'
import React from 'react'

const LoginPage = React.lazy(() =>
  import('@/pages/login').then((module) => ({
    default: module.Login.LoginPage,
  }))
)

export const LoginRoutes = {
  path: '/sign/in',
  element: (
    <SuspenseLayout>
      <LoginPage />
    </SuspenseLayout>
  ),
}
