import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token, isAuthenticated: true } : null;
    });

    function login(token) {
        localStorage.setItem("token", token);
        setUser({ token, isAuthenticated: true });
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}