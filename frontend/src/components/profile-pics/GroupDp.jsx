/* eslint-disable react/prop-types */
import IndividualDp from "./IndividualDp";

function GroupDp(props) {
    const { participants } = props;

    return (
        <div className="relative w-[120px] h-[90px]">
            <div className="flex flex-wrap">
                { participants.slice(0, 3)?.map((participant, index) => {
                    return <IndividualDp 
                        extraClasses={`absolute w-[60%] h-[80%] bg-black p-1`}
                        receiver={participant} 
                        key={participant._id}
                        i={index}
                    />
                })}
            </div>
        </div>
    );
}

export default GroupDp;