import { createContext, useContext, useState, useEffect } from "react";
import api from "./axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Restore token and set Axios default header on app load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken); // Save token to localStorage
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token"); // Remove token from localStorage
        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Disable the ESLint warning for this export
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};