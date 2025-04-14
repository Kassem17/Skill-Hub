import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { token, setToken, user, backendUrl } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials =
    user?.firstName?.[0]?.toUpperCase() + user?.lastName?.[0]?.toUpperCase();

  const handleLogout = async () => {
    try {
      // Send request to logout
      const { data } = await axios.post(backendUrl + "/api/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        localStorage.removeItem("token");

        setToken(null);

        window.location.href = "/login";
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-bold tracking-wider"
        >
          <Link to="/" className="hover:text-gray-100 transition duration-300">
            Skill<span className="text-yellow-300">Hub</span>
          </Link>
        </motion.div>

        {/* Hamburger menu (Mobile) */}
        <div className="md:hidden ">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Main Nav Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link
            to="/"
            className="hover:text-yellow-200 transition duration-300"
          >
            Dashboard
          </Link>

          {token && user?.role === "user" && (
            <Link
              to="/skills"
              className="hover:text-yellow-200 transition duration-300"
            >
              Skills
            </Link>
          )}

          {token && (
            <Link
              to={user.role === "user" ? "/add-skills" : "/add-users"}
              className="hover:text-yellow-200 transition duration-300"
            >
              {user.role === "user" ? "Add Skills" : "Add Users"}
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:bg-yellow-200 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Profile Dropdown */}
        {token && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-yellow-400 text-indigo-900 font-bold flex items-center justify-center text-lg shadow-md hover:scale-105 transition overflow-hidden"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : user?.role === "admin" ? (
                "A"
              ) : (
                initials
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <p
                    className={`block px-4 py-2 hover:bg-gray-100  ${
                      user.role === "admin"
                        ? "font-bold text-green-500"
                        : "text-blue-600"
                    }`}
                  >
                    {user.firstName}
                  </p>

                  <Link
                    to={`/profile/${user._id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-indigo-700 text-white px-6 py-4 space-y-3"
          >
            <p className="block hover:text-yellow-200 text-xl text-center">
              {user.firstName} {user.lastName}
            </p>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/"
              className="block hover:text-yellow-200"
            >
              Dashboard
            </Link>
            {token && user.role === "user" && (
              <Link
                onClick={() => setMenuOpen(false)}
                to="/skills"
                className="block hover:text-yellow-200"
              >
                Skills
              </Link>
            )}
            {token && (
              <Link
                onClick={() => setMenuOpen(false)}
                to={user.role === "user" ? "/add-skills" : "/add-users"}
                className="block hover:text-yellow-200"
              >
                {user.role === "user" ? "Add Skills" : "Add Users"}
              </Link>
            )}
            {token && (
              <>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to={`/profile/${user._id}`}
                  className="block hover:text-yellow-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-left w-full hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}
            {!token && (
              <Link
                to="/login"
                className="md:hidden block hover:text-yellow-200"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
