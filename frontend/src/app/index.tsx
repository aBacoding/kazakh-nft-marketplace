import { Route, Routes } from 'react-router-dom'
import { RegisterRoutes } from '@/modules/register/model/routes'
import { Trending } from '../pages/trend/ui/Trending'
import { LoginRoutes } from '@/modules/login/model/routes'

function App() {
  return (
    <Routes>
      <Route {...RegisterRoutes} />
      <Route {...LoginRoutes} />
      <Route path="/explore/trending" element={<Trending />} />
    </Routes>
  )
}

export default App
