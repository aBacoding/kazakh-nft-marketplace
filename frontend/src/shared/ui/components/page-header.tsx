import { Card, CardContent } from '@/shared/ui/native/card'
import { BreadcrumbComplex } from '@/shared/ui/native/breadcrumbs'
import { Breadcrumb } from '@/shared/types/breadcrumb'
import { FC, ReactNode } from 'react'

interface PageHeaderProps {
  title?: string
  breadcrumbs?: Breadcrumb[]
  children?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const { children, title, breadcrumbs = [] } = props

  return (
    <Card className="border-slate-100">
      <CardContent className="p-4 flex flex-col gap-2 relative card-title ">
        <BreadcrumbComplex list={breadcrumbs} />
        <p className="text-foreground py-2 text-3xl font-semibold leading-9">
          {title}
        </p>
        {children}
      </CardContent>
    </Card>
  )
}
