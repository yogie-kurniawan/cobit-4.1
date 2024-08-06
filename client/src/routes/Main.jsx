import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/main/Home";
import Kuisioner from "../pages/main/Kuisioner";

const Main = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="survey" element={<Kuisioner />} />
    </>
  );
};

export default Main;
