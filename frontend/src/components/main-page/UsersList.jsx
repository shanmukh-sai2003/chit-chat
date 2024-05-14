/* eslint-disable react/prop-types */
import useAuth from "../../utils/useAuth";
import { getAllUsers } from "../../utils/services";
import { useEffect, useState } from "react";
import UserItem from "./UserItem";

function UserList(props) {
    const [userList, setUserList] = useState([]);
    const { auth } = useAuth();
    const { changeAddChat } = props;

    useEffect(() => {
        async function getUsers() {
            try {
                const data = await getAllUsers(auth);
                if(data?.success) {
                    setUserList(data?.data);
                } 
            } catch (error) {
                console.log(error.message);
            }
        }

        getUsers();
    }, []);

    return (
        <div>
            {userList?.map(user => {
                return <UserItem 
                    key={user._id}
                    username={user.username}
                    email={user.email}
                    joinedAt={user.joinedAt}
                    avatar={user.avatar}
                    userId={user._id}
                    setAddChat={changeAddChat}
                />
            })}
        </div>
    );
}

export default UserList;