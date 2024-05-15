/* eslint-disable react/prop-types */
import { MdCancel } from 'react-icons/md';

function AddedParticipant(props) {
    const { removeParticipant, addUser, participant } = props;

    function handleClick() {
        removeParticipant(prev => prev.filter(participants => participants._id !== participant._id ));
        addUser(prev => [...prev, participant]);
    }

    return (
        <div className='flex p-2 m-2 gap-2 bg-slate-700 rounded-lg font-bold'>
            <p>{participant.username}</p>
            <button className='text-red-400 text-xl' onClick={handleClick}><MdCancel /></button>
        </div>
    );
}

export default AddedParticipant;