import { Button } from "@/shared/ui/native/button"
import { Plus } from "lucide-react"
import { ModeToggle } from "../mode-toggle/mode-toggle"

export const ActionButtons = () => {
  return (
    <div className="flex justify-center gap-2 items-center h-fit">
      <Button variant="default">
        <Plus />
        Connect Wallet
      </Button>
      <ModeToggle />
    </div>
  )
}
