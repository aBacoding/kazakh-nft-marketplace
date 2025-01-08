import { Route, Routes } from 'react-router-dom'
import { RegisterRoutes } from '@/modules/register/model/routes'
import { Trending } from '../pages/trend/ui/Trending'
import { LoginRoutes } from '@/modules/login/model/routes'
import { ProfileRoutes } from '@/modules/profile'

function App() {
  return (
    <Routes>
      <Route {...RegisterRoutes} />
      <Route {...LoginRoutes} />
      <Route {...ProfileRoutes} />
      <Route path="/explore/trending" element={<Trending />} />
      {/* TODO: add home page */}
      <Route path="/" element={<></>} />
      <Route
        path="*"
        element={
          <div className="text-center flex flex-row items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">404</h1>
            <span className="text-2xl font-bold">|</span>
            <p className="text-xl">Page not found</p>
          </div>
        }
      />
    </Routes>
  )
}

export default App
