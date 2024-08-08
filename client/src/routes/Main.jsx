import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/main/Home";
import Kuisioner from "../pages/main/Kuisioner";
import Login from "../pages/main/auth/Login";
import Register from "../pages/main/auth/Register";

const MainRoute = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="survey" element={<Kuisioner />} />
    </>
  );
};

export default MainRoute;
