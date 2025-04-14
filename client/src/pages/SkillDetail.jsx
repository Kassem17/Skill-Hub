import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import Loader from "../components/Loader";

const SkillDetails = () => {
  const { skills, token, user, getSkills, backendUrl } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [updatedProgress, setUpdatedProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const editSkillId = searchParams.get("edit");

  const handleEditClick = (skillId) => {
    setSearchParams({ edit: skillId });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/skills/delete-skill/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getSkills();
        navigate("/skills");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const saveEditedProgress = async (skill) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/skills/update-skill/${skill._id}`,
        { progress: updatedProgress[skill._id] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setSearchParams({}); // Clear ?edit= from URL
        toast.success(data.message);
        setIsEditing(false);
        navigate("/skills");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return token ? (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          Skill Details
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {user.role === "user" &&
            skills.map((skill) => (
              <div
                key={skill._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  {skill.name}
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  {skill.description}
                </p>
                <p className="text-gray-700 font-medium">
                  Goal: <span className="text-blue-500">{skill.goal}</span>
                </p>

                {editSkillId === skill._id && isEditing ? (
                  <div className="mt-2">
                    <input
                      type="number"
                      value={updatedProgress[skill._id] || ""}
                      onChange={(e) =>
                        setUpdatedProgress({
                          ...updatedProgress,
                          [skill._id]: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                      min={0}
                      max={100}
                    />
                    <button
                      onClick={() => {
                        saveEditedProgress(skill);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700 font-medium mt-2">
                    Progress:
                    <span className="text-green-500"> {skill.progress}%</span>
                  </p>
                )}

                {/* Progress Bar */}
                <div className="mt-4 bg-gray-300 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>

                {/* Edit / cancel Button */}

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-6">
                  {isEditing ? (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        navigate("/skills");
                      }}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg text-base font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        handleEditClick(skill._id);
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  >
                    Delete Skill
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <UserDetails />
  );
};

export default SkillDetails;
