import { Route, Routes } from 'react-router-dom'
import { RegisterRoutes } from '@/modules/register/model/routes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route {...RegisterRoutes} />
    </Routes>
  )
}

export default App
