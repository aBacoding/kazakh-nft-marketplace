import { SuspenseLayout } from '@/shared/ui/layouts/suspense'
import React from 'react'

const RegisterPage = React.lazy(() =>
  import('@/pages/register').then((module) => ({
    default: module.Register.RegisterPage,
  }))
)

export const RegisterRoutes = {
  path: '/register',
  element: (
    <SuspenseLayout>
      <RegisterPage />
    </SuspenseLayout>
  ),
}
