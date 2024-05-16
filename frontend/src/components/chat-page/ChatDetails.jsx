/* eslint-disable react/prop-types */
import useAuth from "../../utils/useAuth";
import useChat from "../../utils/useChat";
import defaultDp from '../../images/default-image.jpg';
import moment from "moment";
import { MdCancel } from 'react-icons/md';

function ChatDetails(props) {
    const { closePage } = props;
    const { chat } = useChat();
    const { auth } = useAuth();
    const { participants } = chat;
    const receiver = participants.filter(participant => participant.username !== auth?.user?.username)[0];

    return (
        <div className="top-0 absolute right-0 z-10 bg-slate-900 p-4 flex justify-center h-[100%] w-[50%]">
            <div className="w-[50%] text-center my-4">
                <img src={ receiver.avatar || defaultDp } alt="profile picture" className="rounded-full"/>
                <h2 className="font-bold text-3xl">{ receiver.username }</h2>
                <p>{ receiver.email }</p>
                <p>{ moment(receiver.joinedAt).format('MMM Do YYYY') }</p>
            </div>
            <div>
                <MdCancel className="text-4xl text-red-600 absolute cursor-pointer top-6 right-4" onClick={() => closePage(false)} />
            </div>
        </div>
    );
}

export default ChatDetails;