import api from "./api";
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    async function refresh() {
        const response = await api.get('/users/refresh', { withCredentials: true });

        setAuth(prev => {
            return {...prev, accessToken: response?.data?.accessToken }
        });

        return response?.data?.accessToken;
    }

    return refresh;
}

export default useRefreshToken;