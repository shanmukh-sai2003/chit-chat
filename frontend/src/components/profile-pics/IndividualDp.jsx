/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';

function IndividualDp(props) {
    const { receiver, extraClasses, i } = props;
    const left = `left-${(2 -i) * 5}`;

    return (
        <>
            <img src={ receiver?.avatar || defaultDp } alt="profile picture"  className={`rounded-full ${extraClasses} ${left}`}/>
        </>
    );
}

export default IndividualDp;