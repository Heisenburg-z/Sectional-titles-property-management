import { useState, createContext, useContext } from 'react'
import React from 'react'

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
        console.log(user && true);
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = () => {


    return useContext(AuthContext)
}