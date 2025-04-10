import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { toast } from "react-toastify";

const Register = () => {
  const [focusedField, setFocusedField] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { token, setToken } = useContext(AppContext);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          username,
          email,
          password,
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return !token ? (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-800 via-indigo-600 to-blue-500 px-4 py-10">
      <form className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col space-y-8 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white text-center animate__animated animate__fadeIn animate__delay-1s">
          Create an Account
        </h2>

        {/* Username Input */}
        {/* Password Input */}
        <div className="relative group">
          <label
            htmlFor="username"
            className={`absolute left-4 text-white text-base pointer-events-none transition-all duration-300 transform ${
              focusedField === "username" || username
                ? "-translate-y-6 text-sm text-gray-300"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => handleFocus("username")}
            onBlur={handleBlur}
            className="w-full h-14 bg-transparent border-b-2 border-gray-400 outline-none text-white placeholder-transparent focus:ring-2 focus:ring-blue-400 px-4 py-3 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <label
            htmlFor="email"
            className={`absolute left-4 text-white text-base pointer-events-none transition-all duration-300 transform ${
              focusedField === "email" || email
                ? "-translate-y-6 text-sm text-gray-300"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            className="w-full h-14 bg-transparent border-b-2 border-gray-400 outline-none text-white placeholder-transparent focus:ring-2 focus:ring-blue-400 px-4 py-3 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <label
            htmlFor="password"
            className={`absolute left-4 text-white text-base pointer-events-none transition-all duration-300 transform ${
              focusedField === "password" || password
                ? "-translate-y-6 text-sm text-gray-300"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
            onBlur={handleBlur}
            className="w-full h-14 bg-transparent border-b-2 border-gray-400 outline-none text-white placeholder-transparent focus:ring-2 focus:ring-blue-400 px-4 py-3 transition-all duration-300 ease-in-out"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          Sign UP!
        </button>

        <div className="text-center text-sm text-white mt-4 animate__animated animate__fadeIn animate__delay-2s">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="underline text-blue-400 hover:text-blue-500 transition duration-300"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  ) : (
    <Dashboard />
  );
};

export default Register;
