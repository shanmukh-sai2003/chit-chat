/* eslint-disable react/prop-types */
import defaultDP from '../../images/default-image.jpg';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa';

function ParticipantItem(props) {
    const { addParticipant, removeUser, user } = props;

    function handleClick() {
        addParticipant(prev => [...prev, user]);
        removeUser(prev => prev.filter(users => users._id !== user._id));
    }

    return (
        <div className='p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700 flex gap-4 justify-between' id={user.userId}>
            <div className='flex gap-4'>
                <div className='w-[20%]'>
                    <img src={ user.avatar || defaultDP } alt="profile picture" className='rounded-full'/>
                </div>
                <div>
                    <h3 className='font-bold text-xl'>{ user.username }</h3>
                    <p>{ user.email }</p>
                    <p>{ moment(user.joinedAt).format('MMM Do YYYY') }</p>
                </div>
            </div>
            <div className='flex items-center' >
                <div>
                    <button className='text-4xl text-green-700 rounded-full bg-green-200 h-fit p-2' onClick={handleClick}><FaPlus /></button>
                </div>
            </div>
        </div>
    );
}

export default ParticipantItem;