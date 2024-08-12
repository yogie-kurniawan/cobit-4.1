import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create a context
const AuthContext = createContext();

// AuthProvider component that wraps your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check if user is logged in by looking for the token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setIsLoggedIn(true);
    setUserRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  console.log(isLoggedIn, setIsLoggedIn, userRole);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
