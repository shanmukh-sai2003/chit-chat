import moment from "moment";

function MessageItem(props) {
    // eslint-disable-next-line react/prop-types
    const { isSender, content, sentAt } = props;
    return (
        <div className={`text-lg ${ isSender && "float-right" } ${ isSender && "text-right" } bg-slate-700 w-fit p-2 m-2 rounded-lg`}>
            <p className="text-white text-lg">{ content }</p>
            <p className="text-slate-400 text-xs">{ moment(sentAt).format("LT") }</p>
        </div>
    );
}

export default MessageItem;