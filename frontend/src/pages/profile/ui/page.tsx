import {
  EditProfileModal,
  InfoCard,
  MenuCard,
  ProfileHeader,
} from '@/entities/profile'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

export const ProfilePage = () => {
  const token = Cookies.get('token')

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader />
      <div className="flex gap-4 justify-between relative">
        <div className="w-3/4">
          <InfoCard />
        </div>
        <div className="w-1/4">
          <MenuCard />
        </div>
      </div>
      <EditProfileModal />
    </div>
  )
}
