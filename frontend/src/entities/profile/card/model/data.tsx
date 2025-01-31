import {
  Clock,
  Heart,
  Images,
  SquareLibrary,
  SquareMinus,
  SquarePlus,
  User,
} from 'lucide-react'
import { IGeneralMenu } from './types'

export const generalMenu: IGeneralMenu[] = [
  {
    title: 'General Information',
    icon: <User size={18} className="min-w-4.5 min-h-4.5" />,
    to: '/profile?tab=general',
  },
  {
    title: 'My NFTs',
    icon: <Images size={18} className="min-w-4.5 min-h-4.5" />,
    to: '/profile?tab=nfts',
    children: [
      {
        title: 'Bought',
        icon: <SquarePlus size={18} className="min-w-4.5 min-h-4.5" />,
        to: '/profile?tab=nfts&subtab=bought',
      },
      {
        title: 'Sold',
        icon: <SquareMinus size={18} className="min-w-4.5 min-h-4.5" />,
        to: ' /profile?tab=nfts&subtab=sold',
      },
    ],
  },
  {
    title: 'My Liked NFTs',
    icon: <Heart size={18} className="min-w-4.5 min-h-4.5" />,
    to: '/profile?tab=liked',
  },
  {
    title: 'My Collections',
    icon: <SquareLibrary size={18} className="min-w-4.5 min-h-4.5" />,
    to: '/profile?tab=collections',
  },
  {
    title: 'My Bids',
    icon: <Clock size={18} className="min-w-4.5 min-h-4.5" />,
    to: '/profile?tab=bids',
  },
]
