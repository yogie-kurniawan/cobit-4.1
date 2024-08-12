import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/main/Home";
import Kuisioner from "../pages/main/Kuisioner";
import Login from "../pages/main/auth/Login";
import Logout from "../pages/main/auth/Logout";
import Register from "../pages/main/auth/Register";
import PrivateRoute from "../middleware/PrivateRoute";
import PublicRoute from "../middleware/PublicRoute";

const MainRoute = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route
        path="register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="logout" element={<Logout />} />
      {/* <Route path="about" /> */}
      <Route
        path="survey"
        element={
          <PrivateRoute requiredRole="admin">
            <Kuisioner />
          </PrivateRoute>
        }
      />
    </>
  );
};

export default MainRoute;
