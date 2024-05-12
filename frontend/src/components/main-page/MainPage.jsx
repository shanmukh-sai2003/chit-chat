import ChatPage from "../chat-page/ChatPage";
import ChatList from "./ChatList";
import useChat from '../../utils/useChat';

function MainPage() {
    const { chat } = useChat();

    return (
        <main className="bg-black h-[100vh] w-[100vw] text-white flex">
            <ChatList />
            { chat && <ChatPage /> } 
        </main>
    );
}

export default MainPage;