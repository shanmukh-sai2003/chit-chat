/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import { getChatMessages } from "../../utils/services";
import MessageItem from "./MessageItem";

function ChatPage(props) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState();
    const { chatId } = props;
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
        <section className="w-[67vw]">
            <form method="post" className="w-[70%] fixed bottom-4 text-center">
                <input type="text" name="message" id="message-input" 
                    required
                    autoComplete="off"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                    className="w-[70%] p-4 m-4 bg-slate-800 rounded-lg focus:outline-none focus:border-white focus:border-2"
                />
                <button type="submit" className="p-4 w-fit bg-blue-700 rounded-lg font-bold">Send</button>
            </form>
            <div className="my-2 mx-10">
                { messageList?.map(message => {
                    return <MessageItem 
                        key={message._id}
                        isSender={message.sender.username === auth.user.username}
                        content={message.content}
                        sentAt={message.sentAt}
                    />
                })}
            </div>
            
        </section>
    );
}

export default ChatPage;