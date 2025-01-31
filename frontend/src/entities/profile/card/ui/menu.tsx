import { Card } from '@/shared/ui/native/card'
import { generalMenu } from '../model'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { useSearchParams } from 'react-router-dom'

export const MenuCard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const isActive = (tab: string) => searchParams.get('tab') === tab

  useEffect(() => {
    const tab = searchParams.get('tab')
    const menuIndex = generalMenu.findIndex((item) =>
      item.to.includes(`tab=${tab}`)
    )
    setExpandedItem(menuIndex !== -1 ? menuIndex : null)
  }, [searchParams])

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'general' })
    }
  }, [searchParams])

  const handleItemClick = (index: number, to: string) => {
    setExpandedItem(expandedItem === index ? null : index)
    const params = new URLSearchParams(to.split('?')[1])
    setSearchParams(params)
  }

  const handleChildClick = (to: string) => {
    const params = new URLSearchParams(to.split('?')[1])
    setSearchParams(params)
  }

  return (
    <Card className="p-4 sticky top-0 z-5">
      <ul className="flex flex-col gap-2">
        {generalMenu.map((item, index) => (
          <li key={index}>
            <div
              title={item.title}
              onClick={() => handleItemClick(index, item.to)}
              className={cn(
                'hover:bg-muted rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]',
                isActive(item.to.split('=')[1]) && 'bg-muted'
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </div>
            </div>
            {item.children && (
              <ul
                className={cn(
                  'pl-4 overflow-hidden transition-all duration-200',
                  expandedItem === index ? 'max-h-[500px] mt-2' : 'max-h-0'
                )}
              >
                {item.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    onClick={() => handleChildClick(child.to)}
                    className="hover:bg-muted rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2">
                      {child.icon}
                      <span className="text-md">{child.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
