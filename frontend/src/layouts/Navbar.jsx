import React, { useState } from "react";
import { toast } from "react-toastify";
import { Badge } from "antd";
import useAuth from "../hooks/useAuth";
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { auth, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="text-blue-600 hover:text-blue-800">
            Campus<span className="text-orange-500">Cart</span>
          </NavLink>
        </h1>
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                <i className="ri-search-line"></i>
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/dashboard/wishlist" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                <Badge count={0} overflowCount={5}>
                  <i className="ri-heart-line"></i>
                </Badge>
                <span>Wishlist</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                <Badge count={0} overflowCount={5}>
                  <i className="ri-shopping-bag-line"></i>
                </Badge>
                <span>Cart</span>
              </NavLink>
            </li>
            <li className="relative">
              {!auth?.user ? (
                <>
                  <NavLink to="/register" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="px-4 py-2 ml-2 text-white bg-green-600 rounded hover:bg-green-700">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <button onClick={toggleDropdown} className="flex items-center text-gray-700 hover:text-blue-600">
                    <i className="ri-user-line"></i>
                    <span className="ml-1">
                      {auth?.user?.name} <i className="ri-arrow-down-s-line"></i>
                    </span>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <li>
                        <NavLink
                          to={`/${auth?.user?.role === 1 ? "admin/dashboard" : "user/dashboard"}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                          onClick={handleDropdownItemClick}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            logout();
                            handleDropdownItemClick();
                          }}
                          to="/login"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around p-2 bg-white shadow-md md:hidden">
        <NavLink to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <i className="ri-home-line"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <i className="ri-search-line"></i>
          <span>Search</span>
        </NavLink>
        <NavLink to="/user/wishlist" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <Badge count={0} overflowCount={5}>
            <i className="ri-heart-line"></i>
          </Badge>
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <Badge count={0} overflowCount={5}>
            <i className="ri-shopping-bag-line"></i>
          </Badge>
          <span>Cart</span>
        </NavLink>
        {!auth?.user ? (
          <NavLink to="/login" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
            <i className="ri-user-line"></i>
            <span>Login</span>
          </NavLink>
        ) : (
          <>
            <button onClick={toggleMobileDropdown} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
              <i className="ri-user-line"></i>
              <span>{auth?.user?.name}</span>
            </button>
            {mobileDropdownOpen && (
              <ul className="absolute bottom-16 right-2 w-48 bg-white border rounded shadow-lg">
                <li>
                  <NavLink
                    to={`/${auth?.user?.role === 1 ? "admin/dashboard" : "user/dashboard"}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={() => setMobileDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      logout();
                      setMobileDropdownOpen(false);
                    }}
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;