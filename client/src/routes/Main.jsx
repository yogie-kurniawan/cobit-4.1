import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/main/Home";
import Kuisioner from "../pages/main/Kuisioner";

const MainRoute = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="survey" element={<Kuisioner />} />
    </>
  );
};

export default MainRoute;
