import defaultDp from '../../images/default-image.jpg';
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';

function ChatHeader() {
    const { chat } = useChat();
    const { participants, isGroupChat, groupName } = chat;
    const { auth } = useAuth();
    const receivers = participants.filter(participant => participant.username !== auth.user.username);
    const receiversNames = receivers.map(receiver => receiver.username);

    return (
        <div className='p-4 bg-slate-700 flex gap-2'>
            <div className='w-[8%]'>
                <img src={receivers[0]?.avatar || defaultDp} alt="user profile pic" className='rounded-full'/>
            </div>
            <div className='ml-8 mt-2'>
                <h2 className='text-3xl font-bold '>{isGroupChat ? groupName : receivers[0]?.username}</h2>
                <p>{isGroupChat ? receiversNames.join(',') : receivers[0].email}</p>
            </div> 
            
        </div>
    );
}

export default ChatHeader;