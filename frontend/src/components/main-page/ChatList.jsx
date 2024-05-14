import { useEffect, useState } from "react";
import { getAllChats } from "../../utils/services";
import useAuth from "../../utils/useAuth";
import ChatItem from "./ChatItem";

function ChatList() {
    const { auth } = useAuth();
    const [ chatsList, setChatsList ] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                const data = await getAllChats(auth);
                console.log(data);
                if(data?.success) {
                    setChatsList(data?.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getUsers();
    }, []);

    return(
        <div className="my-2">
            { chatsList.map(chat => {
                return <ChatItem 
                    key={chat._id}
                    chatId={chat._id}
                    participants={chat.participants}
                    isGroupChat={chat.isGroupChat}
                    groupName={chat.groupName}
                    createdAt={chat.createdAt}
                />
            })}
        </div>
    );
}

export default ChatList;