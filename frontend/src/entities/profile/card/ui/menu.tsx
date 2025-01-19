import { Card } from '@/shared/ui/native/card'
import { generalMenu } from '../model'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

export const MenuCard = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  return (
    <Card className="p-4 sticky">
      <ul className="flex flex-col gap-2">
        {generalMenu.map((item, index) => (
          <li key={index}>
            <div
              title={item.title}
              onClick={() =>
                setExpandedItem(expandedItem === index ? null : index)
              }
              className="hover:bg-muted rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-md">{item.title}</span>
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
