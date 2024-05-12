import { useEffect } from 'react';
import { apiPrivate } from './api';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

function useApiPrivate() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const responseInterceptor = apiPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                if(err?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiPrivate(prevRequest);
                }

                return Promise.reject(err);
            }
        );

        return () => {
            apiPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refresh]);

    return apiPrivate;
}

export default useApiPrivate;