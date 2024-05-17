import { useState } from "react";
import Popup from "../Popup";
import { deleteGroup } from "../../utils/services";
import useAuth from '../../utils/useAuth';
import useChat from '../../utils/useChat';

function DeleteGroup() {
    const [openPopup, setOpenPopup] = useState(false);
    const [okTodeleteGroup, setOkToDeleteGroup] = useState(false);
    const { auth } = useAuth();
    const { chat, setChat } = useChat();

    async function handleDelete() {
        try {
            const data = await deleteGroup(auth, chat?.chatId);
            if(data?.success) {
                setChat(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if(okTodeleteGroup) {
        handleDelete();
    }

    return (
        <>
            { openPopup && <Popup message={"Do you want to delete this group?"} closePopup={setOpenPopup} takeAction={setOkToDeleteGroup} />}
            <button className="bg-red-600 p-2 rounded-lg mx-2" onClick={() => setOpenPopup(true)}>delete group</button>
        </>
    );
}

export default DeleteGroup;