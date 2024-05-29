import useAuth from "../../utils/useAuth";
import defaultDp from '../../images/default-image.jpg';
import { useState } from "react";
import { userLogout } from "../../utils/services";
import { useNavigate } from 'react-router-dom';
import { Outlet, Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function ChatSideBar() {
    const { auth, setAuth } = useAuth();
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const data = await userLogout();
            console.log(data);
            if(data?.success) {
                setAuth({});
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section className="p-4 w-[33vw] bg-slate-900 h-[100vh] border-black border-2">
            <div className="flex justify-center flex-col h-[23%]">
                <div className="flex items-center">
                    <img src={ auth?.user?.avatar || defaultDp } alt="profile picture" className="w-[5vw] rounded-full m-2 cursor-pointer"/>
                    <input type="text" name="search" 
                        placeholder="Search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value )}}
                        className="rounded-full p-4 my-2 mx-4 bg-slate-800 focus:outline-none focus:border-white focus:border-2 h-fit w-[100%] text-xl"
                        autoComplete="off"
                    />
                </div>
                <div className="flex justify-between">
                    <NavLink to={`/chats`}><button className="p-4 bg-blue-600 rounded-lg my-2 mx-1 text-xl"><FaHome /></button></NavLink>
                    <Link to={`/addChat`}><button className="p-4 font-bold bg-blue-600 rounded-lg h-fit my-2 mx-1">+Add chat</button></Link>
                    <Link to={'/createGroup'}><button className="p-4 bg-blue-600 font-bold my-2 mx-1 rounded-lg">Create group</button></Link>
                    <button className="p-4 font-bold bg-blue-600 rounded-lg h-fit my-2 mx-1" onClick={handleLogout}>logout</button>
                </div> 
            </div>
            <div className="h-[77%]">
                <Outlet />
            </div>
        </section>
    );
}

export default ChatSideBar;