import { refreshToken } from "../utils/services";
import { Outlet } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import { useEffect, useState } from "react";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        async function verifyRefreshToken() {
            try {
                const data = await refreshToken();
                if(data?.success) {
                    setAuth({ user: data?.data, accessToken: data?.accessToken });
                }
                console.log(data?.message);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return (
        <>
            { isLoading ? <p>loading...</p> : <Outlet /> }
        </>
    )
}

export default PersistLogin;