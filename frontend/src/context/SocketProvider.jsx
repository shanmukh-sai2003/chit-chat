/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SocketContext from "./socketContext";
import { io } from 'socket.io-client';
import useAuth from '../utils/useAuth';

function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const { auth } = useAuth();

    function getSocket() {
        const socket = io('http://localhost:3000', {
            auth: {
                token: auth?.accessToken
            }
        });
        setSocket(socket);
    }

    useEffect(() => {
        getSocket();

        return () => {
            socket?.on('disconnect', () => {
                socket.removeAllListeners();
            });
        }
    }, [auth]);

    return (
        <SocketContext.Provider value={{setSocket, socket}}>
            { children }
        </SocketContext.Provider>
    );
}

export default SocketProvider;