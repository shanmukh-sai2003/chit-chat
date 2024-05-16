/* eslint-disable react/prop-types */
import moment from 'moment';
import defaultDP from '../../images/default-image.jpg';
import { FaPlus } from "react-icons/fa";
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';
import { addParticipant, createChat } from '../../utils/services';
import { useLocation, useNavigate } from 'react-router-dom';

function UserItem(props) {
    const { username, email, joinedAt, avatar, userId } = props;
    const { auth } = useAuth();
    const { chat, setChat } = useChat();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.slice(1, location.pathname.length);

    async function handleClickForCreateChat() {
        try {
            const data = await createChat(auth, userId);
            if(data?.success) {
                const { chatId, isGroupchat, groupName, participants } = data;
                setChat({ chatId, isGroupchat, groupName, participants });
                navigate('/chats');
            } else {
                alert(data?.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleClickForAddParticipant() {
        try {
            const data = await addParticipant(auth, chat?.chatId, userId);
            if(data?.success) {
                const { _id, isGroupChat, admin, participants, groupName, updatedAt } = data.data;
                setChat({ chatId:_id, isGroupChat, admin, participants, groupName, updatedAt });
                navigate('/chats');
            } else {
                alert(data?.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700 flex gap-4 justify-between' id={userId}>
            <div className='flex gap-4'>
                <div className='w-[20%]'>
                    <img src={ avatar || defaultDP } alt="profile picture" className='rounded-full'/>
                </div>
                <div>
                    <h3 className='font-bold text-xl'>{ username }</h3>
                    <p>{ email }</p>
                    <p>{ moment(joinedAt).format('MMM Do YYYY') }</p>
                </div>
            </div>
            <div className='flex items-center' >
                <div>
                    <button className='text-4xl text-green-700 rounded-full bg-green-200 h-fit p-2' onClick={ pathname === 'addParticipant' ? handleClickForAddParticipant : handleClickForCreateChat }><FaPlus /></button>
                </div>
            </div>
        </div>
    );
}

export default UserItem;