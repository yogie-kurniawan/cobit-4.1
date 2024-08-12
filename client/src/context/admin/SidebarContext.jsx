import React, { useState, createContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, setIsSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
