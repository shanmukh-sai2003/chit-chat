/* eslint-disable react/prop-types */
import moment from 'moment';
import defaultDP from '../../images/default-image.jpg';
import useAuth from '../../utils/useAuth';

function ChatItem(props) {
    const { avatar, participants, chatId, createdAt, isGroupChat, groupName, setChat } = props;
    const { auth } = useAuth();

    const username = participants.filter(participant => participant.username !== auth.user.username)[0];

    function handleClick() {
        setChat(chatId);
    }

    return (
        <div className={`p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700 flex gap-4 `} id={chatId} onClick={handleClick} >
            <div className='w-[20%]'>
                <img src={ avatar || defaultDP } alt="profile pic" className=' rounded-full' />
            </div>
            <div>
                <h3 className="font-bold text-2xl">{ isGroupChat ? groupName : username.username }</h3>
                <p>{ moment(createdAt).format("MMM Do YYYY") }</p>
            </div>
        </div>
    );
}

export default ChatItem;