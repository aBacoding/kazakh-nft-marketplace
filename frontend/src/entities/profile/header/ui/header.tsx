import { PageHeader } from '@/shared/ui/components/page-header'
import { profileHeaderBreadcrumbs } from '../model'
import { Button } from '@/shared/ui/native/button'
import { Edit } from 'lucide-react'

export const ProfileHeader = () => {
  return (
    <PageHeader title="Profile" breadcrumbs={profileHeaderBreadcrumbs}>
      <Button
        className="w-fit"
        type="button"
        onClick={() => {
          // TODO: change with real action
          console.log('edit')
        }}
      >
        <span className="flex items-center gap-2">
          <Edit /> Edit Profile
        </span>
      </Button>
    </PageHeader>
  )
}
