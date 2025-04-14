import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [focusedField, setFocusedField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, backendUrl } = useContext(AppContext);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        navigate("/add-skills");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return !token ? (
    <div className=" flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-700 to-blue-600 px-6 py-10">
      <div className="w-full max-w-4xl bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 rounded-br-full rounded-tl-full p-1">
        <div className="w-full h-full bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 rounded-bl-full rounded-tr-full p-1 flex items-center justify-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-10 py-14 shadow-2xl space-y-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-300/30"
          >
            {/* Welcome Text */}
            <h2 className="text-4xl font-extrabold text-white text-center tracking-wide">
              Welcome Back!
            </h2>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className="w-full h-14 bg-transparent border-b border-gray-300 outline-none text-white px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 rounded-full peer"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 text-white transition-all duration-300 pointer-events-none 
      ${
        focusedField === "email" || email
          ? "top-1 text-sm text-gray-300"
          : "top-1/2 -translate-y-1/2"
      }`}
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                className="w-full h-14 bg-transparent border-b border-gray-300 outline-none text-white px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 rounded-full peer pr-12"
              />

              <label
                htmlFor="password"
                className={`absolute left-4 text-white transition-all duration-300 pointer-events-none ${
                  focusedField === "password" || password
                    ? "top-1 text-sm text-gray-300"
                    : "top-1/2 -translate-y-1/2"
                }`}
              >
                Password
              </label>

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-transform duration-150 active:scale-90"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Log In
            </button>

            {/* Sign Up */}
            <p className="text-sm text-white text-center">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Dashboard />
  );
};

export default Login;
