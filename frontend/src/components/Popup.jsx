/* eslint-disable react/prop-types */

function Popup(props) {
    const { message, closePopup, takeAction } = props;

    return (
        <div className="w-[100vw] h-[100vh] fixed z-10 top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-40">
            <div className="bg-slate-800 p-4 h-fit rounded-lg">
                <p className="font-bold text-xl mb-4">{message}</p>
                <div className="flex justify-between mt-10">
                    <button onClick={() => closePopup(false)} className="px-2 py-1 font-bold bg-blue-500 rounded-lg">No</button>
                    <button onClick={() => { takeAction(true); closePopup(false)}} className="px-2 py-1 font-bold bg-blue-500 rounded-lg">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;