/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';

function IndividualDp(props) {
    const { receiver, extraClasses } = props;

    return (
        <>
            <img src={ receiver?.avatar || defaultDp } alt="profile picture"  className={`rounded-full ${extraClasses}`}/>
        </>
    );
}

export default IndividualDp;