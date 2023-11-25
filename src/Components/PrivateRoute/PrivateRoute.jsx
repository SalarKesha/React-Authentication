import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useAuthState } from '../../Context/auth-context'
export default function PrivateRoute() {
    const { token } = useAuthState()
    const location = useLocation()
    return (
        <>
            {token ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location.pathname }} />}
        </>
    )
}
