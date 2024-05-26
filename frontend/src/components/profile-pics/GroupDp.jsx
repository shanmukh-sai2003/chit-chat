/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';

function GroupDp(props) {
    const { participants } = props;

    return (
        <div className="">
            <div className="flex pl-16 justify-center items-center relative w-full h-max gap-3 flex-row-reverse">
                { participants.slice(0, 3)?.map((participant) => {
                    return <img 
                        src={ participant.avatar || defaultDp }
                        key={participant._id}
                        // className={`absolute w-[70%] h-[80%] bg-black p-1 rounded-full left-${(2 - index) * 5}`}
                        className={"w-24 h-20 -ml-16 rounded-full outline outline-4 outline-black"}
                    />
                })}
            </div>
        </div>
    );
}

export default GroupDp;