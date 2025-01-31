import { PageHeader } from '@/shared/ui/components/page-header'
import { profileHeaderBreadcrumbs } from '../model'
import { Button } from '@/shared/ui/native/button'
import { Edit } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditProfileModal } from '@/modules/profile'
import { RootState } from '@/app/store/store'

export const ProfileHeader = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.profile)

  return (
    <PageHeader title="Profile" breadcrumbs={profileHeaderBreadcrumbs}>
      <Button
        className="w-fit"
        type="button"
        onClick={() => {
          dispatch(setEditProfileModal({ state: true, data: user! }))
        }}
      >
        <span className="flex items-center gap-2">
          <Edit /> Edit Profile
        </span>
      </Button>
    </PageHeader>
  )
}
