import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import "./style.css";
import SidebarContext from "../../contexts/admin/SidebarContext";

const AdminLayout = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  return (
    <>
      <Sidebar />
      <main
        className={`${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        } duration-300 ease-in bg-gray-100`}
        style={{
          width: `${isSidebarOpen ? "calc(100% - 250px)" : "100%"}`,
        }}
      >
        <Header />
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
