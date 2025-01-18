import { ThemeProvider } from '@/app/providers/withTheme'
import { Toaster } from '@/shared/ui/native/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from '@/app/store/store'
import { ModeToggle } from '@/widgets/mode-toggle/mode-toggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="flex flex-col gap-4 w-full min-h-screen">
            <header className="flex flex-row justify-end items-center h-fit w-full p-3 sticky top-0 z-10 bg-background">
              <ModeToggle />
            </header>
            <div className="w-full px-2 pb-4 relative">{children}</div>
          </main>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </QueryClientProvider>
  )
}
