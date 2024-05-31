/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import SocketContext from "./socketContext";
import { io } from 'socket.io-client';
import useAuth from '../utils/useAuth';
import { API_BASE_URL } from "../utils/constants";

function SocketProvider({ children }) {
    const { auth } = useAuth();

    const socket = useMemo(() => io(API_BASE_URL, {
            auth: {
                token: auth?.accessToken
            }
    }), [auth]);

    useEffect(() => {
        console.log(socket.id);

        return () => {
            socket?.on('disconnect', () => {
                socket.removeAllListeners();
            });

            socket.disconnect();
        }
    }, [auth]);

    return (
        <SocketContext.Provider value={{socket}}>
            { children }
        </SocketContext.Provider>
    );
}

export default SocketProvider;