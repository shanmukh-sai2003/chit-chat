/* eslint-disable react/prop-types */
import { useState } from 'react';
import defaultDp from '../../images/default-image.jpg';
import { removeParticipant } from '../../utils/services';
import useAuth from '../../utils/useAuth';
import Popup from '../Popup';

function ParticipantItem(props) {
    const { avatar, username, isAdmin, admin, chatId, userId, refresh } = props;
    const { auth } = useAuth();
    const [openPopup, setOpenPopup] = useState(false);
    const [okToRemove, setOkToRemove] = useState(false);

    async function handleRemove() {
        setOpenPopup(true);
    }

    async function removeUser() {
        try {
            const data = await removeParticipant(auth, chatId, userId);
            if(data?.success) {
                refresh();
            }
        } catch (error) {
            console.log(error.message);   
        }
    }

    if(okToRemove) {
        removeUser();
    }

    return (
        <div className="my-4 py-4 px-2 bg-slate-700 rounded-lg flex justify-between">
            { openPopup && <Popup message={"Do you want to remove the participant?"} closePopup={setOpenPopup} takeAction={setOkToRemove} />}
            <div className="flex gap-2">
                <img src={ avatar || defaultDp } alt="profile-pic" className="rounded-full w-[10%]"/>
                <p className="font-bold text-xl">{ username }</p>
            </div>
            <div>
                { isAdmin && <span className=" text-violet-800 bg-violet-400 bg-opacity-20 p-1 text-md font-bold rounded-lg border-2 border-violet-800">admin</span> }
            </div>
            {
                admin === auth?.user?.userId && !isAdmin &&  <div>
                    <button className='bg-red-600 p-1 rounded-lg shadow-lg' onClick={handleRemove}>remove</button>
                </div>
            }
        </div>
    );
}

export default ParticipantItem;