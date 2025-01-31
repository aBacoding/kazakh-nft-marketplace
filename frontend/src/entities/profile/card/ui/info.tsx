import { RootState } from '@/app/store/store'
import { Card, CardContent, CardHeader } from '@/shared/ui/native/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/native/avatar'
import { useSelector } from 'react-redux'
import { CalendarCheck, CalendarIcon, MailIcon, UserIcon } from 'lucide-react'
import {
  calculateAgeFromIIN,
  formatDate,
  getInitials,
} from '@/shared/lib/utils'
import { useSearchParams } from 'react-router-dom'

export const InfoCard = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const { user } = useSelector((state: RootState) => state.profile)

  const renderUserInfo = () => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-24 w-24 border-[1px] border-foreground">
            <AvatarImage src={user?.avatar} className="object-cover" />
            <AvatarFallback>
              {getInitials(user?.first_name + ' ' + user?.last_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span>IIN: {user?.iin}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              <span>Age: {calculateAgeFromIIN(String(user?.iin))}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {formatDate(user?.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tab === 'general' && renderUserInfo()}
    </div>
  )
}
