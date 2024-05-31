/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import { getChatMessages } from "../../utils/services";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import useChat from '../../utils/useChat';
import { useNavigate } from 'react-router-dom';
import ChatHeader from "./ChatHeader";
import ChatDetails from "./ChatDetails";
import GroupChatDetails from "./GroupChatDetails";
import useSocket from '../../utils/useSocket';
import Loading from "../Loading";

function ChatPage() {
    const [messageList, setMessageList] = useState([]);
    const [isDetailPage, setIsDetailPage] = useState(false);
    const { chat } = useChat();
    const { chatId, isGroupChat } = chat;
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { socket } = useSocket();
    
    useEffect(() => {
        getMessages();
        
        const receivedMessage = (data) => {
            if(chatId === data?.chatId) {
                setMessageList([data, ...messageList]);
            }
        }

        socket.on('receivedMessage', receivedMessage);

        return () => {
            socket.off('receivedMessage', receivedMessage);
        }

    }, [chat]);

    async function getMessages() {
        try {
            const data = await getChatMessages(auth, chatId);
            if(data?.success) {
                setMessageList(data?.data);
            } else if(data?.message === "Not a valid user") {
                navigate('/login');
            }
            console.log(data?.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    if(messageList.length === 0) {
        return <Loading />
    }

    return (
        <section className="w-[67vw] bg-slate-800 relative">
            <ChatHeader openChatDetails={setIsDetailPage}/>
            
            <div className="mx-10 flex flex-col-reverse overflow-y-scroll h-[75%] no-scrollbar">
                { messageList?.map(message => {
                    return <MessageItem 
                        key={message._id}
                        isSender={message.sender.username === auth.user.username}
                        content={message.content}
                        sentAt={message.sentAt}
                        senderName={message.sender.username}
                    />
                })}
            </div>
            { isDetailPage && ( isGroupChat ? <GroupChatDetails closePage={setIsDetailPage} /> : <ChatDetails closePage={setIsDetailPage} /> )  }
            <MessageInput addMessage={setMessageList} />
        </section>
    );
}

export default ChatPage;