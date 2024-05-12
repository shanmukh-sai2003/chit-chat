/* eslint-disable react/prop-types */
import { useState } from "react";
import ChatContext from "./chatContext";

function ChatProvider({ children }) {
    const [ chat, setChat ] = useState(null);

    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            { children }
        </ChatContext.Provider>
    );
}

export default ChatProvider;