import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

// QUAN TRỌNG: Phải có chữ 'export' ở đây
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    const login = (newToken) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};