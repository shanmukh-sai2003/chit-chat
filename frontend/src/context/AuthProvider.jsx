import AuthContext from "./authContext";
import { useState } from "react";
import api, { apiPrivate } from '../utils/api';

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    const refresh = async () => {
        try {
            const response = await api.get('/users/refresh');
            setAuth(prev => {
                return { ...prev, accessToken:response?.data?.accessToken }
            });
            return response?.data?.accessToken;
        } catch (error) {
            console.log(error.message);   
        }
    }

    apiPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevReq = error?.config;
            if(error?.response?.status === 403 && !prevReq.sent) {
                prevReq.sent = true;
                
                const newAccessToken = await refresh();
                prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiPrivate(prevReq);
            }

            return Promise.reject(error);
        }
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;