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
    to: '',
  },
  {
    title: 'My NFTs',
    icon: <Images size={18} className="min-w-4.5 min-h-4.5" />,
    to: '',
    children: [
      {
        title: 'Bought',
        icon: <SquarePlus size={18} className="min-w-4.5 min-h-4.5" />,
        to: '',
      },
      {
        title: 'Sold',
        icon: <SquareMinus size={18} className="min-w-4.5 min-h-4.5" />,
        to: '',
      },
    ],
  },
  {
    title: 'My Liked NFTs',
    icon: <Heart size={18} className="min-w-4.5 min-h-4.5" />,
    to: '',
  },
  {
    title: 'My Collections',
    icon: <SquareLibrary size={18} className="min-w-4.5 min-h-4.5" />,
    to: '',
  },
  {
    title: 'My Bids',
    icon: <Clock size={18} className="min-w-4.5 min-h-4.5" />,
    to: '',
  },
]
