import { Route, Routes } from 'react-router-dom'
import { RegisterRoutes } from '@/modules/register/model/routes'
import { Loader2 } from 'lucide-react'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="h-screen w-full flex items-center justify-center">
            <Loader2 className="animate-spin" size={36} />
          </div>
        }
      />
      <Route {...RegisterRoutes} />
    </Routes>
  )
}

export default App
