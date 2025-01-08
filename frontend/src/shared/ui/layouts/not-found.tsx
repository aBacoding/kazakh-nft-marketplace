'use client'

import { ThemeProvider } from '@/app/providers/withTheme'
import { ModeToggle } from '@/widgets/mode-toggle/mode-toggle'
import { Toaster } from '@/shared/ui/native/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from '@/app/store/store'

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="flex flex-col w-full min-h-screen">
            <header className="flex flex-row justify-end items-center h-fit w-full p-3 sticky top-0 z-10 bg-background">
              <ModeToggle />
            </header>
            <div className="w-full px-2 pb-4 relative flex-1 flex items-center justify-center">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </QueryClientProvider>
  )
}
