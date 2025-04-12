import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="flex items-center justify-center ">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8 }} // Start from low opacity and small scale
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale up to full size
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          {/* Placeholder for Profile Image */}
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">Profile</span>
          </div>
        </div>

        <motion.h1
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Profile
        </motion.h1>

        <div className="flex flex-col items-center justify-center">
          <motion.p
            className="mb-4 text-xl font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            First Name: <span className="text-blue-500">{user.firstName}</span>
            <br />
            Last Name: <span className="text-blue-500">{user.lastName}</span>
          </motion.p>

          <motion.p
            className="mb-4 text-xl font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            Email: <span className="text-blue-500 underline">{user.email}</span>
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-5 py-2 rounded-2xl shadow-md hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Edit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
