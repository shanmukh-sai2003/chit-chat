/* eslint-disable react/prop-types */
import useChat from "../../utils/useChat";
import { MdCancel } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import ParticipantItem from "./ParticipantItem";
import useAuth from "../../utils/useAuth";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { changeGroupName, getGroupChatDetails } from "../../utils/services";
import DeleteGroup from "./DeleteGroup";
import LeaveGroup from "./LeaveGroup";
import GroupDp from "../profile-pics/GroupDp";

function GroupChatDetails(props) {
    const { closePage } = props;
    const [ chatDetails, setChatDetails ] = useState();
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState('');
    const { chat, setChat } = useChat();
    const { auth } = useAuth();

    useEffect(() => {
        getChatDetails();
    }, [chat]);

    async function getChatDetails() {
        try {
            const data = await getGroupChatDetails(auth, chat?.chatId);
            if(data?.success) {
                setChatDetails(data?.data[0]);
                setName(data?.data[0].groupName);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleSaveName() {
        setEditName(false);
        try {
            const data = await changeGroupName(auth, chat?.chatId, { name });
            if(data?.success) {
                setChat(prev => {
                    return { ...prev, groupName: name }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(!chatDetails) {
        return <p>loading...</p>
    }

    const { participants, admin } = chatDetails;

    return (
        <div className="top-0 absolute right-0 z-10 bg-slate-900 p-4 flex justify-center h-[100%] w-[50%]">
            <div className="my-4">
                <div className="flex flex-col items-center">
                    <GroupDp participants={participants}/>
                    <div className="flex">
                        <input 
                            className={`font-bold text-3xl my-2 bg-slate-900 text-center focus:outline-none ${editName && 'border-2 border-white'} rounded-md`} 
                            value={name} 
                            readOnly={!editName} 
                            onChange={(e) => setName(e.target.value) }
                        />
                        { admin === auth?.user?.userId && 
                            ( editName ? <button className="rounded-lg bg-green-500 font-bold h-fit my-4 p-2 mx-2" onClick={handleSaveName}>Save</button> 
                                : <FaEdit className="text-2xl my-4 cursor-pointer" onClick={() => setEditName(true)}/> ) 
                        }
                    </div>
                </div>
                <h3 className="text-left font-bold text-xl my-4">Participants ({ participants?.length })</h3>
                <div className="h-[50%] overflow-hidden hover:overflow-auto">
                    { participants?.map(participant => {
                        return <ParticipantItem 
                            key={participant._id}
                            username={participant.username}
                            avatar={participant.avatar}
                            isAdmin={participant._id === admin}
                            admin={admin}
                            chatId={chat?.chatId}
                            userId={participant._id}
                            refresh={getChatDetails}
                        />
                    }) }
                </div>
                <div className="my-4">
                    { admin === auth?.user?.userId && <DeleteGroup /> }
                    { admin === auth?.user?.userId && <Link to={'/addParticipant'}><button className="bg-blue-600 p-2 rounded-lg mx-2">add participant</button></Link> }
                    <LeaveGroup />
                </div>
            </div>
            <div>
                <MdCancel className="text-4xl text-red-600 absolute cursor-pointer top-6 right-4" onClick={() => closePage(false)} />
            </div>
        </div>
    );
}

export default GroupChatDetails;