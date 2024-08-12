import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Logout = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to the homepage
    navigate("/");
  }, [navigate]);

  return null; // You can return null or a simple loading spinner if needed
};

export default Logout;
