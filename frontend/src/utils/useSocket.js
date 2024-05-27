import { useContext } from 'react';
import SocketContext from '../context/socketContext';

function useSocket() {
    return useContext(SocketContext);
}

export default useSocket;