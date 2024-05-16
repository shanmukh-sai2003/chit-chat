/* eslint-disable react/prop-types */
import useChat from "../../utils/useChat";
import { MdCancel } from "react-icons/md";
import defaultDp from '../../images/default-image.jpg';
import ParticipantItem from "./ParticipantItem";
import useAuth from "../../utils/useAuth";
import { Link } from 'react-router-dom';

function GroupChatDetails(props) {
    const { closePage } = props;
    const { chat } = useChat();
    const { participants, groupName, admin } = chat;
    const { auth } = useAuth();


    return (
        <div className="top-0 absolute right-0 z-10 bg-slate-900 p-4 flex justify-center h-[100%] w-[50%]">
            <div className="my-4">
                <div className="flex flex-col items-center">
                    <img src={defaultDp} alt="profile picture" className="rounded-full w-[30%]" />
                    <h2 className="font-bold text-3xl my-2">{ groupName }</h2>
                </div>
                <h3 className="text-left font-bold text-xl my-4">Participants ({ participants.length })</h3>
                <div className="h-[50%] overflow-y-scroll">
                    { participants?.map(participant => {
                        return <ParticipantItem 
                            key={participant._id}
                            username={participant.username}
                            avatar={participant.avatar}
                            isAdmin={participant._id === admin}
                            admin={admin}
                        />
                    }) }
                </div>
                <div>
                    { admin === auth?.user?.userId && <button className="bg-red-600 p-2 rounded-lg mx-2">delete group</button> }
                    { admin === auth?.user?.userId && <Link to={'/addParticipant'}><button className="bg-blue-600 p-2 rounded-lg mx-2">add participant</button></Link> }
                    <button className="p-2 rounded-lg mx-2 bg-black">leave group</button>
                </div>
            </div>
            <div>
                <MdCancel className="text-4xl text-red-600 absolute cursor-pointer top-6 right-4" onClick={() => closePage(false)} />
            </div>
        </div>
    );
}

export default GroupChatDetails;