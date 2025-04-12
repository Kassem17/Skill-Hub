import React, { useContext } from "react";
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
import Undefined from "./pages/Undefined";
import { AppContext } from "./context/AppContext";
import Loader from "./components/Loader";
import AddUser from "./adminPages/AddUser";

const App = () => {
  const { token, user } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 min-h-screen  flex flex-col">
      <ToastContainer />
      <Navbar />
      <div className="flex-grow p-8  rounded-2xl mx-auto my-4 max-w-7xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skills" element={<SkillDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skills/:userId" element={<SkillDetails />} />
          <Route
            path={user.role !== "user" ? "/add-skills" : "/add-user"}
            element={token && user.role === "user" ? <AddSkill /> : <AddUser />}
          />
          <Route path="/add-skills" element={<AddSkill />} />

          <Route path="/add-users" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/loading/path" element={<Loader />} />
          <Route path="/*" element={<Undefined />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
