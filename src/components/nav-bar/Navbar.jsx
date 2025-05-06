import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-indigo-700">
            CF EXT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/problems" currentPath={location.pathname}>
              Problems
            </NavLink>
            <NavLink to="/contests" currentPath={location.pathname}>
              Contests
            </NavLink>
            <NavLink to="/profiles" currentPath={location.pathname}>
              profiles
            </NavLink>
            <div className="ml-8 flex items-center space-x-4">
              {/* <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-700 transition-colors duration-200">
                Sign in
              </Link> */}
              <Link
                to="/#"
                className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 text-sm">
                Get started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-indigo-700 focus:outline-none transition-colors duration-200">
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1">
          <MobileNavLink to="/problems" currentPath={location.pathname}>
            Problems
          </MobileNavLink>
          <MobileNavLink to="/contests" currentPath={location.pathname}>
            Contests
          </MobileNavLink>
          <MobileNavLink to="/profiles" currentPath={location.pathname}>
            Profiles
          </MobileNavLink>
          <div className="pt-4 border-t border-gray-100">
            {/* <MobileNavLink to="/login">Sign in</MobileNavLink> */}
            <MobileNavLink to="/#" isButton>
              Get started
            </MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component
const NavLink = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
        isActive ? "text-indigo-700" : "text-gray-600 hover:text-indigo-700"
      }`}>
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
      )}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, currentPath, children, isButton = false }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        isButton
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
      }`}>
      {children}
    </Link>
  );
};

export default Navbar;
