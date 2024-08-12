import React, { useState, useEffect, useContext } from "react";
import { menu } from "../../data/admin/data";
import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import SidebarContext from "../../context/admin/SidebarContext";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleCloseSidebar = () => {
    if (isSidebarOpen && screenSize < 600) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 600) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [screenSize]);
  return (
    <div
      className={`${
        isSidebarOpen ? "w-[250px]" : "w-0"
      } h-screen fixed top-0 left-0 bg-white text-primary shadow-md overflow-x-hidden overflow-y-auto duration-300 ease-in`}
    >
      <div className="flex gap-3 flex-col p-4">
        <div className="text-center">
          <Link to="/admin">
            <h1 className="text-xl text-nowrap">COBIT 4.1</h1>
          </Link>
        </div>
        <div className="overflow-y-auto overflow-x-hidden py-4">
          <ul className="w-full flex flex-col capitalize">
            <li className="nav-list">
              <NavLink
                to="/admin/dashboard"
                onClick={handleCloseSidebar}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "w-full flex gap-3 items-center py-2 px-3 rounded  duration-300 ease-in cursor-pointer text-sm font-[400] text-white text-nowrap bg-primary"
                    : "w-full flex gap-3 items-center py-2 px-3 rounded  duration-300 ease-in cursor-pointer text-sm font-[400] text-gray-600 text-nowrap hover:bg-primary hover:text-white"
                }
              >
                <RxDashboard size={20} />
                Dashboard
              </NavLink>
            </li>
          </ul>
          {menu.map((menuItem, index) => (
            <div key={index}>
              <p className="text-xs font-semibold text-gray-400 my-3 uppercase text-nowrap">
                {menuItem.title}
              </p>
              <ul className="w-full flex flex-col capitalize">
                {menuItem.links.map((menu, index) => {
                  const { id, url, text, icon } = menu;
                  index++;
                  return (
                    <li className="nav-list" key={index}>
                      <NavLink
                        to={url}
                        onClick={handleCloseSidebar}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "w-full flex gap-3 items-center py-2 px-3 rounded  duration-300 ease-in cursor-pointer text-sm font-[400] text-white text-nowrap bg-primary"
                            : "w-full flex gap-3 items-center py-2 px-3 rounded  duration-300 ease-in cursor-pointer text-sm font-[400] text-gray-600 text-nowrap hover:bg-primary hover:text-white"
                        }
                      >
                        {icon}
                        <span className="capitalize">{text}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
