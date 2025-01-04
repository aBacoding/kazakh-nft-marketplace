import { Route, Routes } from 'react-router-dom'
import { RegisterRoutes } from '@/modules/register/model/routes'
import { Trending } from '../pages/trend/ui/Trending';

function App() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route {...RegisterRoutes} />
      <Route path ="/explore/trending" element = {<Trending/>} />
    </Routes>
  )
}

export default App
