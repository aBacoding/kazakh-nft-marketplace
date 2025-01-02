'use client'
import * as React from 'react'
import { BarChart, Compass, Home, Info, Plus } from 'lucide-react'
import { NavMain } from '@/widgets/nav/nav-main'
import { NavUser } from '@/widgets/nav/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/native/sidebar'
import { NavHeader } from '../nav/nav-header'

const data = {
  user: {
    first_name: 'Test',
    last_name: 'Testov',
    email: 'test@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/124599?v=4',
  },
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Explore',
      url: '/explore',
      icon: Compass,
      items: [
        {
          title: 'All NFTs',
          url: '/explore/all-nfts',
        },
        {
          title: 'Live Auctions',
          url: '/explore/live-auctions',
        },
        {
          title: 'Trending',
          url: '/explore/trending',
        },
        {
          title: 'My Liked NFTs',
          url: '/explore/my-liked-nfts',
        },
        {
          title: 'My NFTs',
          url: '/explore/my-nfts',
        },
        {
          title: 'My Collections',
          url: '/explore/my-collections',
        },
        {
          title: 'My Bids',
          url: '/explore/my-bids',
        },
      ],
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: BarChart,
      items: [
        {
          title: 'Top sellers',
          url: '/dashboard/top-sellers',
        },
        {
          title: 'Top NFTs',
          url: '/dashboard/top-nfts',
        },
      ],
    },
    {
      title: 'Create',
      url: '/create',
      icon: Plus,
      items: [
        {
          title: 'Create NFT',
          url: '/create/nft',
        },
        {
          title: 'Create Collection',
          url: '/create/collection',
        },
      ],
    },
    {
      title: 'About us',
      url: '/about',
      icon: Info,
      items: [
        {
          title: 'Developers',
          url: '/about/developers',
        },
        {
          title: 'Contact us',
          url: '/about/contact',
        },
        {
          title: 'Terms of service',
          url: '/about/terms',
        },
      ],
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain as any} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user as any} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
