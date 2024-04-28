import { useState, createContext, useContext } from "react";
import React from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [profileId, setProfileId] = useState(null);

	const login = (user, id) => {
		setUser(user);
		setProfileId(id);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, profileId, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => {
	return useContext(AuthContext);
};
