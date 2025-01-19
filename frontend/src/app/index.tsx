import {Route, Routes} from 'react-router-dom'
import {RegisterRoutes} from '@/modules/register/model/routes'
import {LoginRoutes} from '@/modules/login/model/routes'
import {ProfileRoutes, setUser} from '@/modules/profile'
import {useGetUser} from '@/entities/profile/shared'
import Cookies from 'js-cookie'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {TrendingRoutes} from "@/modules/explore/trending/model/routes.tsx";

function App() {
    const dispatch = useDispatch()
    const token = Cookies.get('token')
    const {data} = useGetUser({
        enabled: !!token,
    })

    useEffect(() => {
        if (!!token && data) {
            dispatch(setUser(data))
        }
    }, [data, token])

    return (
        <Routes>
            <Route {...RegisterRoutes} />
            <Route {...LoginRoutes} />
            <Route {...ProfileRoutes} />
            <Route {...TrendingRoutes}/>
            {/* TODO: add home page */}
            <Route path="/" element={<></>}/>
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
