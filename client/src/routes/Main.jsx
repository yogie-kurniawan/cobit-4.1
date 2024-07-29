import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/main/Home";

const Main = () => {
  return (
    <>
      <Route index element={<Home />} />
    </>
  );
};

export default Main;
