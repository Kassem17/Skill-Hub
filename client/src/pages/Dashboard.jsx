import React, { useContext, useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import AdminPage from "../adminPages/AdminPage";

const Dashboard = () => {
  const { skills, token, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }
  return !token ? (
    <Users />
  ) : user.role === "admin" ? (
    <AdminPage />
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
        user.role === "user" &&
        skills.slice(0, 6).map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
            onClick={() => {
              navigate(`/skills/${skill._id}`);
            }}
          />
        ))}
      </div>
      <div className="text-center w-full">
        <button
          onClick={() => navigate("/skills")}
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
