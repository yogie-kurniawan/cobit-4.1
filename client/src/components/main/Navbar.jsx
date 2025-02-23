import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { menu } from "../../data/main/data";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {}, [isLoggedIn]);

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
            <h1 className="text-2xl text-primary font-semibold">Cobit 4.1</h1>
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
          {!isLoggedIn ? (
            <div className="flex items-center justify-center gap-2">
              <Link to="/login" className="btn-md-primary">
                Login
              </Link>
              <Link to="/register" className="btn-md-secondary">
                Register
              </Link>
            </div>
          ) : (
            ""
          )}
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
          {menu.map((menuItem, index) => (
            <li key={index}>
              <NavLink
                to={menuItem.url}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "text-primary text-md font-medium hover:text-primary transition-all duration-300 ease-in"
                    : "text-gray-700 text-md font-medium hover:text-primary transition-all duration-300 ease-in"
                }
              >
                {menuItem.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-2">
          <Link to="/register" className="btn-md-secondary">
            Registrasi
          </Link>
          <Link to="/login" className="btn-md-primary">
            Login
          </Link>
        </div>
        <div className="absolute flex items-center justify-center md:hidden top-2 right-2">
          <MdClose size={20} onClick={closeNavbar} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
