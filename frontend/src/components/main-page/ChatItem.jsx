/* eslint-disable react/prop-types */
import moment from 'moment';

function ChatItem(props) {
    const { username, email, joinedAt } = props;

    return (
        <div className="p-4 border-slate-800 border-b-2 cursor-pointer hover:bg-slate-700">
            <h3 className="font-bold text-2xl">{ username }</h3>
            <p>{ email }</p>
            <p>{ moment(joinedAt).format("MMM Do YYYY") }</p>
        </div>
    );
}

export default ChatItem;