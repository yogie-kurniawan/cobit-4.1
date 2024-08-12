import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const PrivateRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, userRole } = useAuth();
  console.log(useAuth());
  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // If the user is logged in but doesn't have the required role, redirect to an unauthorized page
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the requested component
  return children;
};

export default PrivateRoute;
