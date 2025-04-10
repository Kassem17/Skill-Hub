import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const SkillDetails = () => {
  const { skills, setSkills } = useContext(AppContext);

  const [IsEdit, setIsEdit] = useState(false);
  const [updatedProgress, setUpdatedProgress] = useState();

  const handleEdit = (skill) => {
    setIsEdit(true);
    setUpdatedProgress(skill.progress);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          Skill Details
        </h2>

        {/* Skill Details Card */}
        <div className="grid grid-cols-1 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                {skill.name}
              </h3>
              <p className="text-gray-600 text-lg mb-4">{skill.description}</p>
              <p className="text-gray-700 font-medium">
                Goal: <span className="text-blue-500">{skill.goal}</span>
              </p>

              {IsEdit ? (
                <div>
                  <input
                    value={updatedProgress}
                    onChange={(e) => setUpdatedProgress(e.target.value)}
                    type="number"
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => setIsEdit(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 font-medium">
                  Progress:
                  <span className="text-green-500">{skill.progress}%</span>
                </p>
              )}

              {/* Progress Bar */}
              <div className="mt-4 bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <div className="text-center p-5">
                <button
                  onClick={() => setIsEdit(true)}
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
