import { BarChart, Compass, Home, Info, Plus } from 'lucide-react'

export const sidebarData = {
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
      url: '/about-us',
      icon: Info,
      items: [
        {
          title: 'Developers',
          url: '/about-us/developers',
        },
        {
          title: 'Contact us',
          url: '/about-us/contact',
        },
        {
          title: 'Terms of service',
          url: '/about-us/terms',
        },
      ],
    },
  ],
}
