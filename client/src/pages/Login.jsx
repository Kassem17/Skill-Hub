import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { toast } from "react-toastify";

const Login = () => {
  const [focusedField, setFocusedField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { token, setToken } = useContext(AppContext);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/add-skills");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return !token ? (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-indigo-600 to-blue-500 px-4 py-10">
      <form className="bg-white/20 mb-20 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col space-y-8 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white text-center animate__animated animate__fadeIn animate__delay-1s">
          Welcome Back!
        </h2>

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

        {/* Submit Button */}
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          Log In
        </button>

        {/* Sign Up Prompt */}
        <div className="text-center text-sm text-white mt-4 animate__animated animate__fadeIn animate__delay-2s">
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="underline text-blue-400 hover:text-blue-500 transition duration-300"
            >
              Create one
            </a>
          </p>
        </div>
      </form>
    </div>
  ) : (
    <Dashboard />
  );
};

export default Login;
