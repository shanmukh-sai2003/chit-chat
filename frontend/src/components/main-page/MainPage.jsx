import ChatPage from "../chat-page/ChatPage";
import useChat from '../../utils/useChat';
import ChatSideBar from "./ChatSideBar";

function MainPage() {
    const { chat } = useChat();

    return (
        <main className="bg-black h-[100vh] w-[100vw] text-white flex">
            <ChatSideBar />
            { chat && <ChatPage /> } 
        </main>
    );
}

export default MainPage;