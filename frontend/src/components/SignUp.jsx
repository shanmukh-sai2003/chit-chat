import { useEffect, useState } from "react";
import ErrorMessage from './ErrorMessage';
import { createUser } from '../utils/services';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        setError('');
    }, [username, email, password, confirmPassword, name]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await createUser({ name, username, email, password, confirmPassword }, setError);
            if(data.success) {
                setUsername('');
                setPassword('');
                setEmail('');
                setName('');
                setConfirmPassword('');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex justify-center items-center h-[100vh] bg-slate-900">
            <form method="post" onSubmit={handleSubmit} className="flex flex-col text-xl w-[90vw] md:w-[30vw] sm:w-[50vw] p-4 rounded-md bg-slate-800 text-white">
                <h1 className="text-4xl font-bold text-center mt-2 mb-4">Sign up</h1>
                { error.length !== 0 && <ErrorMessage message={error} />}
                <label htmlFor="name">name:</label>
                <input type="text" name="name" id="name" 
                    placeholder="Enter name"
                    value={name}
                    required
                    onChange={(e) => { setName(e.target.value) }}
                    className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                    autoComplete="off"
                />
                <label htmlFor="username">username:</label>
                <input type="text" name="username" id="username" 
                    placeholder="Enter username"
                    value={username}
                    required
                    onChange={(e) => { setUsername(e.target.value) }}
                    className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                    autoComplete="off"
                />
                <label htmlFor="email">email:</label>
                <input type="email" name="email" id="email" 
                    placeholder="Enter email address"
                    value={email}
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                    autoComplete="off"
                />
                <label htmlFor="password">password:</label>
                <input type="password" name="password" id="password" 
                    placeholder="Enter password"
                    value={password}
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                    autoComplete="off"
                />
                <label htmlFor="cPassword">confirm Password:</label>
                <input type="password" name="cPassword" id="cPassword" 
                    placeholder="Enter password again"
                    value={confirmPassword}
                    required
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                    autoComplete="off"
                />
                <button type="submit" className="w-fit p-4 rounded-lg bg-slate-900 font-bold mt-4 hover:shadow-md hover:shadow-blue-500/20">sign up</button>
            </form>
        </section>
    );
}

export default SignUp;