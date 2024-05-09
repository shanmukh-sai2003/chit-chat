import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import api from '../utils/api';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage ] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { username, password });
            setAuth({ user: response.data, accessToken: response.accessToken });
            navigate('/');
        } catch (err) {
            setErrorMessage(err?.response?.data?.message);
            console.log(err?.message);
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    return (
        <>
           <section className="flex justify-center items-center h-[100vh] bg-slate-900">
                
                <form method="post" className="flex flex-col text-xl w-[30vw] p-4 rounded-md bg-slate-800 text-white" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center mt-2 mb-4">Login</h1>
                    { errorMessage?.length !== 0 && <ErrorMessage message={errorMessage} />}
                    <label htmlFor="username">username:</label>
                    <input type="text" name="username" id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                        autoComplete="off"
                    />
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password" id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-md p-3 my-2 bg-slate-900 focus:outline-none focus:border-white focus:border-2"
                        autoComplete="off"
                    />
                    <button type="submit" className="w-fit p-4 rounded-lg bg-slate-900 font-bold mt-4 hover:shadow-md hover:shadow-blue-500/20">login</button>
                </form>
           </section> 
        </>
    );
}

export default Login;