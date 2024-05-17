/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';

function ChatHeader(props) {
    const { openChatDetails } = props;
    const { chat } = useChat();
    const { participants, isGroupChat, groupName } = chat;
    const { auth } = useAuth();
    const receivers = participants?.filter(participant => participant.username !== auth.user.username);
    const receiversNames = receivers?.map(receiver => receiver.username);

    return (
        <div className='p-4 bg-slate-900 flex gap-2 cursor-pointer' onClick={() => openChatDetails(true)}>
            <div className='w-[5%]'>
                <img src={receivers[0]?.avatar || defaultDp} alt="user profile pic" className='rounded-full'/>
            </div>
            <div className='ml-4'>
                <h2 className='text-xl font-bold '>{isGroupChat ? groupName : receivers[0]?.username}</h2>
                <p className='text-sm'>{isGroupChat ? receiversNames?.join(',') : receivers[0]?.email}</p>
            </div> 
        </div>
    );
}

export default ChatHeader;