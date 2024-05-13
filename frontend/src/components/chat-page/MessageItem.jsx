import moment from "moment";
import useChat from '../../utils/useChat';

function MessageItem(props) {
    // eslint-disable-next-line react/prop-types
    const { isSender, content, sentAt, senderName } = props;
    const { chat } = useChat();

    return (
        <div className={`flex ${ isSender && 'flex-row-reverse'} `}>
            <div className={`text-lg  ${ isSender && "text-right" } ${ isSender ? "bg-blue-500" : "bg-slate-700" } w-fit p-2 m-1 rounded-lg`}>
                { chat?.isGroupChat && !isSender && <p className="font-bold text-green-500">{senderName}</p>}
                <p className="text-white text-lg">{ content }</p>
                <p className="text-slate-400 text-xs">{ moment(sentAt).format("LT") }</p>
            </div>
        </div>
    );
}

export default MessageItem;