import { Button } from '@/shared/ui/native/button'
import { Plus } from 'lucide-react'
import { ModeToggle } from '../mode-toggle/mode-toggle'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

export const ActionButtons = () => {
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    const token = Cookies.get('token')
    setHasToken(!!token)

    const checkToken = () => {
      const currentToken = Cookies.get('token')
      setHasToken(!!currentToken)
    }

    const interval = setInterval(checkToken, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center gap-2 items-center h-fit">
      {hasToken && (
        <Button type="button" variant="default">
          <Plus />
          Connect Wallet
        </Button>
      )}
      <ModeToggle />
    </div>
  )
}
