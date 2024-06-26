import { useEffect, useState } from "react";
import { getAllChats } from "../../utils/services";
import useAuth from "../../utils/useAuth";
import ChatItem from "./ChatItem";
import useChat from "../../utils/useChat";
import useSocket from '../../utils/useSocket';
import Loading from "../Loading";

function ChatList() {
    const { auth } = useAuth();
    const [ chatsList, setChatsList ] = useState([]);
    const { chat } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        async function getChats() {
            try {
                const data = await getAllChats(auth);
                if(data?.success) {
                    setChatsList(data?.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        socket.on('receivedMessage', getChats);

        getChats();

        return () => {
            socket.off('receivedMessage', getChats)
        }
    }, [chat]);

    if(chatsList.length === 0) {
        return <Loading/>
    }

    return(
        <div className="my-2 h-[100%] overflow-hidden hover:overflow-auto">
            { chatsList?.map(chat => {
                return <ChatItem 
                    key={chat._id}
                    chatId={chat._id}
                    participants={chat.participants}
                    isGroupChat={chat.isGroupChat}
                    groupName={chat.groupName}
                    lastMessage={chat.lastMessage}
                    admin={chat.admin}
                />
            })}
        </div>
    );
}

export default ChatList;