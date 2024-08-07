import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const handleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    isNavbarOpen(false);
  };

  const handleScrolledDown = () => {
    if (window.scrollY > 20) {
      setIsScrolledDown(true);
    } else {
      setIsScrolledDown(false);
    }
  };

  useEffect(() => {
    handleScrolledDown();
  }, [isScrolledDown]);

  return (
    <nav
      className={`relative w-full ${
        isScrolledDown ? "bg-white" : "bg-transparent"
      } z-[1000]`}
    >
      <div className="relative max-w-screen-xl mx-auto flex justify-between items-center text-gray-700 px-4 py-4">
        <div>
          <a href="">
            <h1 className="text-2xl text-primary font-semibold">LTRW</h1>
          </a>
        </div>
        <div className="relative hidden md:flex gap-2">
          <ul className="flex flex-col md:flex-row justify-center items-center gap-8">
            <li>
              <NavLink
                to="/"
                className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/survey"
                className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
              >
                Survey
              </NavLink>
            </li>
            <li></li>
          </ul>
          <div className="flex items-center justify-center gap-2">
            <a href="" className="btn-sm-primary">
              Login
            </a>
            <a href="" className="btn-sm-secondary">
              Register
            </a>
          </div>
          <div className="absolute flex items-center justify-center md:hidden top-2 right-2">
            <MdClose size={20} onClick={closeNavbar} />
          </div>
        </div>
        <div className="flex md:hidden justify-center items-center">
          <FaBars size={20} onClick={handleNavbar} className="cursor-pointer" />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-screen bg-white z-[1001] ${
          isNavbarOpen ? "flex" : "hidden"
        } px-4 py-8 flex-col gap-2 `}
      >
        <ul className="flex flex-col md:flex-row justify-center items-center gap-8">
          <li>
            <NavLink
              to="/"
              className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/survey"
              className="text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
            >
              Survey
            </NavLink>
          </li>
          <li></li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          <a href="" className="btn-sm-primary">
            Login
          </a>
          <a href="" className="btn-sm-secondary">
            Register
          </a>
        </div>
        <div className="absolute flex items-center justify-center md:hidden top-2 right-2">
          <MdClose size={20} onClick={closeNavbar} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
