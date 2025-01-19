'use client'

import { SidebarProvider, SidebarTrigger } from '@/shared/ui/native/sidebar'
import { AppSidebar } from '@/widgets/sidebar/sidebar'
import { ThemeProvider } from '@/app/providers/withTheme'
import { Toaster } from '@/shared/ui/native/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from '@/app/store/store'
import { useTitle } from 'ahooks'
import { useLocation } from 'react-router-dom'
import { ModeToggle } from '@/widgets/mode-toggle/mode-toggle'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  const formatWord = (word: string) => {
    if (word.toLowerCase() === 'nft') return 'NFT'
    if (word.toLowerCase() === 'nfts') return 'NFTs'
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.split('-').map(formatWord).join(' '))

  const title =
    pathname === '/'
      ? 'Kazakh NFT Marketplace'
      : segments.length === 1
        ? segments[0]
        : segments.join(' | ')

  useTitle(title)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col gap-4 w-full min-h-screen p-2">
              <header className="flex flex-row justify-between items-center h-fit w-full p-3 sticky top-0 z-10 bg-background">
                <SidebarTrigger />
                <ModeToggle />
              </header>
              <div className="w-full px-2 pb-4 relative">{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </QueryClientProvider>
  )
}
