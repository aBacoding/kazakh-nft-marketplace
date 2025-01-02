'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/native/sidebar'
import { Logo } from '../logo/logo'
import { useNavigate } from 'react-router-dom'

export function NavHeader() {
  const navigate = useNavigate()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={() => {
            navigate('/')
          }}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Logo />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Kazakh NFT Marketplace</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
