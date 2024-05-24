/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';

function GroupDp(props) {
    const { participants } = props;

    return (
        <div className="relative w-[100px] h-[85px]">
            <div className="flex flex-wrap">
                { participants.slice(0, 3)?.map((participant, index) => {
                    return <img 
                        src={ participant.avatar || defaultDp }
                        key={participant._id}
                        className={`absolute w-[70%] h-[80%] bg-black p-1 rounded-full left-${(2 - index) * 2}`}
                    />
                })}
            </div>
        </div>
    );
}

export default GroupDp;