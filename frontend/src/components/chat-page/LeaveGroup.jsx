import { useState } from "react";
import Popup from "../Popup";
import { leaveGroup } from "../../utils/services";
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';

function LeaveGroup() {
    const [openPopup, setOpenPopup] = useState(false);
    const [okToLeaveGroup, setOkToLeaveGroup] = useState(false);
    const { auth } = useAuth();
    const { chat, setChat } = useChat();

    async function handleDelete() {
        try {
            const data = await leaveGroup(auth, chat?.chatId);
            if(data?.success) {
                setChat(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if(okToLeaveGroup) {
        handleDelete();
    }

    return (
        <>
            { openPopup && <Popup message={"Do you want to leave this group?"} closePopup={setOpenPopup} takeAction={setOkToLeaveGroup} />}
            <button className="bg-black p-2 rounded-lg mx-2" onClick={() => setOpenPopup(true)}>leave group</button>
        </>
    );
}

export default LeaveGroup;