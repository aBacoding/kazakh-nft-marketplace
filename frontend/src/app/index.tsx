import { ActionButtons } from '@/widgets/action-buttons/action-buttons'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ActionButtons />} />
    </Routes>
  )
}

export default App
