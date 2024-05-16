/* eslint-disable react/prop-types */
import defaultDp from '../../images/default-image.jpg';
import useAuth from '../../utils/useAuth';

function ParticipantItem(props) {
    const { avatar, username, isAdmin, admin } = props;
    const { auth } = useAuth();

    return (
        <div className="my-4 py-4 px-2 bg-slate-700 rounded-lg flex justify-between">
            <div className="flex gap-2">
                <img src={ avatar || defaultDp } alt="profile-pic" className="rounded-full w-[10%]"/>
                <p className="font-bold text-xl">{ username }</p>
            </div>
            <div>
                { isAdmin && <span className="bg-green-200 text-green-800 border-2 border-solid border-green-900 p-1 rounded-lg">admin</span> }
            </div>
            {
                admin === auth?.user?.userId && !isAdmin &&  <div>
                    <button className='bg-red-300 text-red-800 p-1 rounded-lg border-2 border-red-900'>remove</button>
                </div>
            }
        </div>
    );
}

export default ParticipantItem;