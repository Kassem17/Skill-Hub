import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { motion } from "framer-motion";

const Navbar = () => {
  const { token, setToken, user } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      // Send request to logout
      const { data } = await axios.post(
        "http://localhost:5000/api/user/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

        {/* Navigation Links */}

        {/* user name */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to={`/profile/${user._id}`}
            className="hover:text-yellow-200 transition duration-300"
          >
            {user.username}
          </Link>
        </motion.div>

        <div className="flex gap-6 items-center text-sm font-medium">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="hover:text-yellow-200 transition duration-300"
            >
              Dashboard
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/skills"
              className="hover:text-yellow-200 transition duration-300"
            >
              Skills
            </Link>
          </motion.div>

          {token && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/add-skills"
                className="hover:text-yellow-200 transition duration-300"
              >
                Add Skills
              </Link>
            </motion.div>
          )}

          {token ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleLogout}
                className="text-red-200 hover:text-white transition duration-300"
              >
                Log out
              </button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:bg-yellow-200 transition duration-300"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
