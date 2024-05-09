import { useState } from "react";

function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);


    return (
        <section>
            <form method="post">
                <h1>Sign up</h1>
                <label htmlFor="name">name:</label>
                <input type="text" name="name" id="name" 
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <label htmlFor="username">username:</label>
                <input type="text" name="username" id="username" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <label htmlFor="email">email:</label>
                <input type="email" name="email" id="email" 
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <label htmlFor="password">password:</label>
                <input type="password" name="password" id="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <label htmlFor="cPassword">confirm Password</label>
                <input type="password" name="cPassword" id="cPassword" 
                    placeholder="Enter password again"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
                <button type="submit">sign up</button>
            </form>
        </section>
    );
}

export default SignUp;