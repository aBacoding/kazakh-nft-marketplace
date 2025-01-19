import {Route, Routes} from 'react-router-dom'
import {RegisterRoutes} from '@/modules/register/model/routes'
import {TrendingRoutes} from '../modules/explore/trending/model/routes';

function App() {
    return (
        <Routes>
            <Route {...RegisterRoutes} />
            <Route {...TrendingRoutes}/>
        </Routes>
    )
}

export default App
