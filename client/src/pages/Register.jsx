import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [focusedField, setFocusedField] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, backendUrl } = useContext(AppContext);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", image);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/register",
        formData
      );
      console.log(formData);

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
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-700 to-blue-600  px-6 py-12">
      <div className="w-full max-w-4xl bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 rounded-br-full rounded-tl-full p-1">
        <div className="w-full h-full bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 rounded-bl-full rounded-tr-full p-1 flex items-center justify-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full max-w-3xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl px-10 py-14 shadow-2xl space-y-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-300/30"
          >
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-white text-center tracking-wide">
              Create an Account
            </h2>

            {/* Row 1: Image Upload */}
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-indigo-500 file:text-white hover:file:brightness-110"
              />
            </div>

            {/* Row 2: First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => handleFocus("firstName")}
                  onBlur={handleBlur}
                  className="w-full h-14 bg-transparent border-b border-gray-300 outline-none text-white px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 rounded-full peer"
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-4 text-white transition-all duration-300 pointer-events-none ${
                    focusedField === "firstName" || firstName
                      ? "top-1 text-sm text-gray-300"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  First Name
                </label>
              </div>

              {/* Last Name */}
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => handleFocus("lastName")}
                  onBlur={handleBlur}
                  className="w-full h-14 bg-transparent border-b border-gray-300 outline-none text-white px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 rounded-full peer"
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-4 text-white transition-all duration-300 pointer-events-none ${
                    focusedField === "lastName" || lastName
                      ? "top-1 text-sm text-gray-300"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  Last Name
                </label>
              </div>
            </div>

            {/* Row 3: Email & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  className={`absolute left-4 text-white transition-all duration-300 pointer-events-none ${
                    focusedField === "email" || email
                      ? "top-1 text-sm text-gray-300"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative">
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Sign Up!
            </button>

            {/* Login Link */}
            <p className="text-sm text-white text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                Login
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

export default Register;
