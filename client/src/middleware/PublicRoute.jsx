import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, redirect them to the dashboard or another page
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If the user is not logged in, render the children components (e.g., the login page)
  return children;
};

export default PublicRoute;
