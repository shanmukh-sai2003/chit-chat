import AuthContext from "./authContext";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;