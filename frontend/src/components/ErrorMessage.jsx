/* eslint-disable react/prop-types */
function ErrorMessage(props) {
    const { message } = props;

    return (
        <>
            <h3 className="font-semibold my-2 bg-red-100 text-red-500 p-2 rounded-md text-xl">{ message }</h3>
        </>
    );
}

export default ErrorMessage;