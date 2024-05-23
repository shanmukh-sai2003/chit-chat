import logo from '../../images/chit-chat-high-resolution-logo-transparent.png'

function NoChatPage() {

    return (
        <section className='w-[77vw] flex justify-center items-center'>
            <div className='w-[50%]'>
                <img src={ logo } alt="" />
                <p className='text-center mt-4 text-2xl italic text-blue-400'>Meet Strangers, Share Moments</p>
            </div>
        </section>
    );
}

export default NoChatPage;