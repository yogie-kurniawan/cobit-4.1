import React, { useContext, useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import SidebarContext from "../../context/admin/SidebarContext";

function Navbar() {
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <nav className="min-h-[50px] flex items-center p-3 w-full h-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex items-center justify-center">
            <button
              className="toggle-btn inline-block text-gray-700"
              onClick={toggleSidebar}
            >
              <HiBars3 size={24} className="text-primary font-bold" />
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2s">
              <span className="text-gray-700 text-md font-normal">John</span>
              <span className="text-gray-400 text-xs font-normal">Admin</span>
            </div>
            <div className="rounded-full w-8 h-8 border border-gray-300 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
