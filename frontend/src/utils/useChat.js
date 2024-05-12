import { useContext } from "react";
import ChatContext from '../context/chatContext';

function useChat() {
    return useContext(ChatContext);
}

export default useChat;