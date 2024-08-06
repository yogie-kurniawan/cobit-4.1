import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "./style.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
