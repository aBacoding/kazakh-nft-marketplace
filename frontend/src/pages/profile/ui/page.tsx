import { MenuCard, ProfileHeader } from '@/entities/profile'
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
      <div className="flex flex-row gap-4 justify-between">
        <MenuCard />
      </div>
    </div>
  )
}
