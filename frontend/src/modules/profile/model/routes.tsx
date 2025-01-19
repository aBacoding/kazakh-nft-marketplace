import { SuspenseLayout } from '@/shared/ui/layouts/suspense'
import React from 'react'

const ProfilePage = React.lazy(() =>
  import('@/pages/profile').then((module) => ({
    default: module.Profile.ProfilePage,
  }))
)

export const ProfileRoutes = {
  path: '/profile',
  element: (
    <SuspenseLayout>
      <ProfilePage />
    </SuspenseLayout>
  ),
}
