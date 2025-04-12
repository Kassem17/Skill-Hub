import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import SkillCard from "../components/SkillCard";
import Loader from "../components/Loader";

const UserDetails = () => {
  const { userId } = useParams();
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/skills/get-skills-for-user/${userId}`
        );
        if (data.success) {
          setSkills(data.skills);
          setUser(data.user);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSkills();
  }, [userId]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Skills for{" "}
        <span className="text-blue-600 font-semibold underline">
          {user.username}
        </span>
      </h1>

      {/* Alert positioned directly under the header if no skills */}
      {skills.length === 0 && (
        <div className="flex justify-center mb-6">
          {/* This ensures proper spacing between header and the alert */}
          <div className="bg-red-600 text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center relative">
            {/* Optional Background Ellipse */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 opacity-40 rounded-xl"></div>

            <h1 className="text-3xl font-extrabold mb-4">Oops!</h1>
            <p className="text-xl font-semibold mb-4">Something Went Wrong.</p>
            <p className="text-lg mb-6 text-gray-200">
              No skills found for this user. Please try again later or contact
              support.
            </p>

            {/* Icon */}
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto mb-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 102 0V7zM10 12a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate("/")}
              className="bg-white text-red-600 hover:bg-red-100 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              Go Back to Homepage
            </button>
          </div>
        </div>
      )}

      {/* Skills Grid if skills are available */}
      {skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
