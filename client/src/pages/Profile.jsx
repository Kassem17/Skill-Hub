import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";


const Profile = () => {
  const { user } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="text-center mb-8">
        <motion.h1
          className="text-5xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My Profile
        </motion.h1>
      </div>
      <div className="flex flex-col p-6 items-center justify-center  bg-gradient-to-r from-blue-400 to-purple-600">
        <motion.div
          className=" p-8  shadow-xl max-w-md w-full mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Profile Image with Initials */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
             {user.profileImage && <img src={user.profileImage}  className="w-full h-full object-cover rounded-full" />}
             
              {/* Display initials (uppercase) from first and last name if user is defined */}
              {/* {user && user.firstName && user.lastName && user.role === "user"
                ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
                : "Admin"}{" "} */}
              {/* Fallback to "?" if user data is not yet available */}
            </div>
          </div>

          {/* Profile Title */}
          <motion.h1
            className="text-4xl font-bold text-center text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {user.firstName} {user.lastName}
          </motion.h1>

          {/* Profile Details */}
          <div className="flex flex-col items-center justify-center">
            <motion.p
              className="mb-4 text-xl font-semibold text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              First Name:{" "}
              <span className="text-orange-400">{user.firstName}</span>
              <br />
              Last Name:{" "}
              <span className="text-orange-400">{user.lastName}</span>
            </motion.p>

            <motion.p
              className="mb-4 text-xl font-semibold text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              Email:{" "}
              <span className="text-orange-400 underline">{user.email}</span>
            </motion.p>

            {/* Edit or Save Button */}

            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 font-semibold text-lg"
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
