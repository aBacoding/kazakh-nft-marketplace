import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

export const SuspenseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <Loader2 className="animate-spin" size={36} />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
