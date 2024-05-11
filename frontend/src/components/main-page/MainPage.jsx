import { useState } from "react";
import ChatPage from "../chat-page/ChatPage";
import ChatList from "./ChatList";

function MainPage() {
    const [currentChat, setCurrentChat] = useState(null);

    return (
        <main className="bg-black h-[100vh] w-[100vw] text-white flex">
            <ChatList changeChat={setCurrentChat}/>
            { currentChat && <ChatPage chatId={currentChat} /> } 
        </main>
    );
}

export default MainPage;