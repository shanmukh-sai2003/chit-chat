import ChatPage from "../chat-page/ChatPage";
import useChat from '../../utils/useChat';
import ChatSideBar from "./ChatSideBar";
import NoChatPage from "../chat-page/NoChatPage";

function MainPage() {
    const { chat } = useChat();

    return (
        <main className="bg-black h-[100vh] w-[100vw] text-white flex">
            <ChatSideBar />
            { chat ? <ChatPage /> : <NoChatPage /> } 
        </main>
    );
}

export default MainPage;