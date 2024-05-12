/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import { getChatMessages } from "../../utils/services";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import useChat from '../../utils/useChat';

function ChatPage() {
    const [messageList, setMessageList] = useState();
    const { chat } = useChat();
    const { chatId } = chat;
    const { auth } = useAuth();

    useEffect(() => {
        getMessages();
    }, [chatId]);

    async function getMessages() {
        try {
            const data = await getChatMessages(auth, chatId);
            if(data?.success) {
                setMessageList(data?.data);
            }
            console.log(data?.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section className="w-[67vw] bg-slate-800">
            <MessageInput addMessage={setMessageList} />
            <div className="my-2 mx-10 flex flex-col-reverse overflow-y-scroll h-[80%] no-scrollbar">
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
            
        </section>
    );
}

export default ChatPage;