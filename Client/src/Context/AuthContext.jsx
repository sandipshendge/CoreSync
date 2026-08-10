import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token") || null;

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  // Login
  const login = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/Auth/userLogin`, userData);
      const { token, ...user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false };
    }

  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
