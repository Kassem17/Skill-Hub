import React, { use, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Undefined from "../pages/Undefined";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";

const AddUser = () => {
  const { token, user ,backendUrl } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", image);

      const { data } = await axios.post(
        backendUrl+ "/api/user/add-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return token && user.role === "admin" ? (
    <div className="flex items-center justify-center  w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <motion.div
        className="w-full max-w-4xl rounded-3xl shadow-2xl bg-white/60 backdrop-blur-xl border border-white/40 p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h2
          className="text-4xl font-extrabold text-center text-blue-700 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🌟 Add a New User
        </motion.h2>

        {/* Form */}
        <form className="grid gap-8">
          {/* Image input */}
          {/* Image Upload */}
          <div className="flex items-center">
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="flex items-center gap-2 text-sm text-white px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 cursor-pointer hover:brightness-110"
            >
              <FiUploadCloud />
              Upload Image
            </label>
          </div>

          {/* Row 1: first name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <motion.label
                htmlFor="firstName"
                animate={{
                  top: firstName ? -12 : 12,
                  left: 16,
                  fontSize: firstName ? "0.75rem" : "1rem",
                  color: firstName ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: firstName ? "#ffffff" : "transparent",
                  padding: firstName ? "0 0.25rem" : "0",
                  borderRadius: firstName ? "0.375rem" : "0",
                  boxShadow: firstName ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                First Name
              </motion.label>

              <motion.input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* last name */}
            <div className="relative">
              <motion.label
                htmlFor="lastName"
                animate={{
                  top: lastName ? -12 : 12,
                  left: 16,
                  fontSize: lastName ? "0.75rem" : "1rem",
                  color: lastName ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: lastName ? "#ffffff" : "transparent",
                  padding: lastName ? "0 0.25rem" : "0",
                  borderRadius: lastName ? "0.375rem" : "0",
                  boxShadow: lastName ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Last Name
              </motion.label>

              <motion.input
                type="text"
                id="firstName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* Row 2: password */}

            <div className="relative">
              <motion.label
                htmlFor="password"
                animate={{
                  top: password ? -12 : 12,
                  left: 16,
                  fontSize: password ? "0.75rem" : "1rem",
                  color: password ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: password ? "#ffffff" : "transparent",
                  padding: password ? "0 0.25rem" : "0",
                  borderRadius: password ? "0.375rem" : "0",
                  boxShadow: password ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Password
              </motion.label>

              <motion.input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* Row 2: email */}
            <div className="relative ">
              <motion.label
                htmlFor="email"
                animate={{
                  top: email ? -12 : 12,
                  left: 16,
                  fontSize: email ? "0.75rem" : "1rem",
                  color: email ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: email ? "#ffffff" : "transparent",
                  padding: email ? "0 0.25rem" : "0",
                  borderRadius: email ? "0.375rem" : "0",
                  boxShadow: email ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Email
              </motion.label>

              <motion.input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          {/* Row 4: Button */}
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl"
            >
              ADD
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  ) : (
    <Undefined />
  );
};

export default AddUser;
