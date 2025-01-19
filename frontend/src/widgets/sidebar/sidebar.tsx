'use client'
import * as React from 'react'
import { NavMain } from '@/widgets/nav/nav-main'
import { NavUser } from '@/widgets/nav/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/shared/ui/native/sidebar'
import { NavHeader } from '../nav/nav-header'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { RootState } from '@/app/store/store'
import { sidebarData } from '@/shared/models/const'
import { Button } from '@/shared/ui/native/button'
import { LogIn, UserRoundPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.profile)
  const token = Cookies.get('token')
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain as any} />
      </SidebarContent>
      <SidebarFooter>
        {token && user ? (
          <NavUser user={user} />
        ) : state === 'expanded' ? (
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              className="flex items-center justify-center"
              onClick={() => navigate('/sign/in')}
            >
              Sign In <LogIn size={16} />
            </Button>
            <Button
              type="button"
              className="flex items-center justify-center"
              onClick={() => navigate('/sign/up')}
            >
              Sign Up <UserRoundPlus size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="flex items-center justify-center"
              onClick={() => {
                navigate('/sign/in')
              }}
            >
              <LogIn size={16} className="max-w-none" />
            </Button>
            <Button
              type="button"
              className="flex items-center justify-center"
              onClick={() => {
                navigate('/sign/up')
              }}
            >
              <UserRoundPlus size={16} className="max-w-none" />
            </Button>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
