import useAuth from '../utils/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

function RouteProtector() {
    const { auth } = useAuth();

    return (
        auth ? <Outlet /> : <Navigate to={'/login'} /> 
    );
}

export default RouteProtector;