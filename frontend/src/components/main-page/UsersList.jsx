/* eslint-disable react/prop-types */
import useAuth from "../../utils/useAuth";
import { getAllUsers } from "../../utils/services";
import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import Loading from "../Loading";

function UserList() {
    const [userList, setUserList] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        async function getUsers() {
            try {
                const data = await getAllUsers(auth);
                if(data?.success) {
                    setUserList(data?.data);
                    console.log(data.data);
                } 
            } catch (error) {
                console.log(error.message);
            }
        }

        getUsers();
    }, []);

    if(userList.length === 0) {
        return <Loading />
    }

    return (
        <div className="h-[100%] overflow-hidden hover:overflow-auto">
            {userList?.map(user => {
                return <UserItem 
                    key={user._id}
                    username={user.username}
                    email={user.email}
                    joinedAt={user.joinedAt}
                    avatar={user.avatar}
                    userId={user._id}
                />
            })}
        </div>
    );
}

export default UserList;