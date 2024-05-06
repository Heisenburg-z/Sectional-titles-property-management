import { useState, createContext, useContext } from "react";
import React from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const login = (user, id, role) => {
    setUser(user);
    setProfileId(id);
    setUserRole(role);
  };

  const logout = () => {
    setUser(null);
    setProfileId(null);
    setProfileId(null);
  };

  return (
    <AuthContext.Provider value={{ user, profileId, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
