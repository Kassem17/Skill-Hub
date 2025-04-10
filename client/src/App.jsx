import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import SkillDetails from "./pages/SkillDetail";
import AddSkill from "./pages/AddSkill";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 min-h-screen  flex flex-col">
      <ToastContainer />
      <Navbar />
      <div className="flex-grow p-8  rounded-2xl mx-auto my-4 max-w-7xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skills" element={<SkillDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skills/:id" element={<SkillDetails />} />
          <Route path="/add-skills" element={<AddSkill />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
