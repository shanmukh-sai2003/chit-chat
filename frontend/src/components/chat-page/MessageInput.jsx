/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import useAuth from "../../utils/useAuth";
import useChat from '../../utils/useChat';
import { sendMessage } from "../../utils/services";
import { useNavigate } from "react-router-dom";

function MessageInput(props) {
    const { chat } = useChat();
    const [message, setMessage] = useState('');
    const { auth } = useAuth();
    const inputRef = useRef();
    const { addMessage } = props;
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await sendMessage(auth, chat?.chatId, { content: message });
            if(data?.success) {
                console.log(data);
                addMessage(prev => [data?.data, ...prev]);
                setMessage('');
            } else if(data?.message === "Not a valid user") {
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [chat]);

    return (
        <form method="post" className="w-[70%] fixed bottom-4 text-center" onSubmit={handleSubmit}>
            <input type="text" name="message" id="message-input" 
                required
                ref={inputRef}
                autoComplete="off"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                className="w-[70%] p-4 m-4 bg-slate-900 rounded-lg focus:outline-none focus:border-white focus:border-2"
            />
            <button type="submit" className="p-4 w-fit bg-blue-700 rounded-lg font-bold">Send</button>
        </form>
    );
}

export default MessageInput;