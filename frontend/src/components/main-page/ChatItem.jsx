/* eslint-disable react/prop-types */
import moment from 'moment';
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';
import IndividualDp from '../profile-pics/IndividualDp';
import GroupDp from '../profile-pics/GroupDp';

function ChatItem(props) {
    const { participants, chatId, isGroupChat, groupName, lastMessage, admin } = props;
    const { auth } = useAuth();
    const { chat, setChat } = useChat();

    const receiver = participants.filter(participant => participant.username !== auth.user.username)[0];

    function handleClick() {
        setChat({ chatId, isGroupChat, groupName, participants, admin });
    }

    return (
        <div className={`p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700 flex gap-4 ${chat?.chatId === chatId && 'bg-slate-700'} w-[100%]`} id={chatId} onClick={handleClick} >
            <div className={`${!isGroupChat && 'flex-[20]'}`}>
                { isGroupChat ? <GroupDp participants={participants} /> : <IndividualDp receiver={receiver} /> }
            </div>
            <div className={`w-[80%] ${!isGroupChat && 'flex-[80]'}`}>
                <h3 className="font-bold text-2xl">{ isGroupChat ? groupName : receiver?.username }</h3>
                <div className='flex justify-between'>
                    <p>{ lastMessage?.content }</p>
                    <p className='text-xs'>{ lastMessage && moment(lastMessage?.sentAt).format('LT')}</p>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;