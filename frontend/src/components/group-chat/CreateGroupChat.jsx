import { useEffect, useRef, useState } from "react";
import ParticipantItem from "./ParticipantItem";
import { createGroup, getAllUsers } from "../../utils/services";
import useAuth from "../../utils/useAuth";
import AddedParticipant from "./AddedParticipant";
import useChat from '../../utils/useChat';
import { useNavigate } from 'react-router-dom';

function CreateGroupChat() {
    const [name, setName] = useState('');
    const { auth } = useAuth();
    const inputRef = useRef();
    const [ participantsList, setParticipantsList ] = useState([]);
    const [ usersList, setUsersList ] = useState([]); 
    const { setChat } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        async function getUsers() {
            try {
                const data = await getAllUsers(auth);
                if(data?.success) {
                    setUsersList(data?.data);
                }
                console.log(data?.message);
            } catch (error) {
                console.log(error.message);
            }
        }

        getUsers();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const participants = participantsList.map(participant => participant._id);
            const data = await createGroup(auth, { name, participants});
            if(data?.success) {
                const { chatId, isGroupChat, groupName, participants } = data;
                setChat({ chatId, isGroupChat, groupName, participants });
                setName('');
                setParticipantsList([]);
                navigate('/chats');
            } else {
                console.log(data?.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    

    return (
        <div className="h-[100%]">
            <form method="post" className="flex flex-col m-2 h-[100%]" onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-xl font-bold">Name:</label>
                <input type="text" name="name" id="name" 
                    ref={inputRef}
                    placeholder="Enter group name..."
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    autoComplete="off"
                    required
                    className="bg-slate-700 focus:outline-none focus:border-white focus:border-2 p-4 rounded-md my-2"
                />
                { participantsList.length > 0 && <p className="font-bold text-xl">Participants:</p> }

                <div className="flex flex-wrap">
                    { participantsList?.map(participant => {
                        return <AddedParticipant 
                            key={participant._id}
                            participant={participant}
                            removeParticipant={setParticipantsList}
                            addUser={setUsersList}
                        />
                    })}
                </div>

                { participantsList.length > 1 && <button className="bg-blue-500 font-bold rounded-lg w-fit p-2" type="submit">create</button> }

                <h4 className="text-2xl font-bold">Add partcipants</h4>
                <p className="text-xs">*Add atleast 2 members to create group</p>
                <div className="overflow-y-scroll">
                    <div className="my-2">
                        {usersList?.map(user => {
                            return <ParticipantItem 
                                key={user._id}
                                addParticipant={setParticipantsList}
                                removeUser={setUsersList}
                                user={user}
                            />
                        })}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateGroupChat;