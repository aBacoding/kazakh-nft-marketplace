import { SuspenseLayout } from '@/shared/ui/layouts/suspense'
import React from 'react'

const TrendingPage = React.lazy(() =>
    import('@/pages/trend').then((module) => ({
        default: module.Trending.TrendingPage,
    }))
)

export const TrendingRoutes = {
    path: '/explore/trending',
    element: (
        <SuspenseLayout>
            <TrendingPage />
        </SuspenseLayout>
    ),
}
