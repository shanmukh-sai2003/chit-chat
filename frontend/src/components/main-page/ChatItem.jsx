/* eslint-disable react/prop-types */
import moment from 'moment';
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';
import IndividualDp from '../profile-pics/IndividualDp';
import GroupDp from '../profile-pics/GroupDp';
import useSocket from '../../utils/useSocket';
import { useEffect, useState } from 'react';

function ChatItem(props) {
    const { participants, chatId, isGroupChat, groupName, lastMessage, admin } = props;
    const [ isTyping, setIsTyping ] = useState(false);
    const { auth } = useAuth();
    const { chat, setChat } = useChat();
    const { socket } = useSocket();

    const receiver = participants.filter(participant => participant.username !== auth.user.username)[0];

    function handleClick() {
        setChat({ chatId, isGroupChat, groupName, participants, admin });

        socket.emit('joinChat', chatId);
    }

    useEffect(() => {
        let typingTimeOut;
        function changingTypingStatus(receivedChatId) {
            if(chatId === receivedChatId) {
                setIsTyping(true);
                clearTimeout(typingTimeOut);
                typingTimeOut = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        }
        socket.on('typing', changingTypingStatus);
        socket.on('stopTyping', (receivedChatId) => {
            if(chatId === receivedChatId) {
                setIsTyping(false);
            }
        });

        return () => {
            socket.off('typing', changingTypingStatus);
            socket.off('stopTyping', (receivedChatId) => {
                if(chatId === receivedChatId) {
                    setIsTyping(false);
                }
            });
        }   
    }, []);

    return (
        <div className={`p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700 flex gap-4 ${chat?.chatId === chatId && 'bg-slate-700'} w-[100%]`} id={chatId} onClick={handleClick} >
            <div className={`${!isGroupChat && 'flex-[20]'}`}>
                { isGroupChat ? <GroupDp participants={participants} /> : <IndividualDp receiver={receiver} /> }
            </div>
            <div className={`w-[80%] ${!isGroupChat && 'flex-[80]'}`}>
                <h3 className="font-bold text-2xl">{ isGroupChat ? groupName : receiver?.username }</h3>
                <div className='flex justify-between'>
                    { isTyping ? <p className='text-lg font-semibold text-green-500'>typing...</p> : <p>{lastMessage?.content}</p> }
                    <p className='text-xs'>{ lastMessage && moment(lastMessage?.sentAt).format('LT')}</p>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;