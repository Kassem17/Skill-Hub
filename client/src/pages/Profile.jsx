import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.8 }} // Start from low opacity and small scale
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale up to full size
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Profile
        </motion.h1>

        <div className="flex flex-col items-center justify-center">
          <motion.p
            className="mb-2 text-lg font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Username: <span className="text-blue-500">{user.username}</span>
          </motion.p>

          <motion.p
            className="mb-2 text-lg font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            Email: <span className="text-blue-500">{user.email}</span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
