import React, { useContext, useEffect, useState } from "react";
import skillsIcon from "../assets/skills.png";
import usersIcon from "../assets/users.png";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const AdminPage = () => {
  const { users, skills, token, backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/user/delete-user/` + userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeStatus = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/change-availability/" + userId
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-10 p-4 md:p-8 bg-gray-50">
      {/* Stats Section */}
      <div className="flex flex-wrap gap-6">
        {/* Total Users Card */}
        <div className="flex items-center gap-4 bg-white shadow-md border border-blue-100 p-5 w-full sm:w-60 rounded-xl">
          <img src={usersIcon} alt="users" className="w-10 h-10" />
          <div>
            <p className="text-3xl font-semibold text-gray-800">
              {users.length}
            </p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
        </div>

        {/* Total Skills Card */}
        <div className="flex items-center gap-4 bg-white shadow-md border border-blue-100 p-5 w-full sm:w-60 rounded-xl">
          <img src={skillsIcon} alt="skillsIcon" className="w-10 h-10" />
          <div>
            <p className="text-3xl font-semibold text-gray-800">
              {skills.length}
            </p>
            <p className="text-sm text-gray-500">Total Skills for All Users</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-6xl w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Skills for All Users
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  #
                </th>
                {/* <th className="px-4 py-3">profile Image</th> */}
                <th className="px-4 py-3">Profile Image</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3 text-center">Email</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center hidden md:table-cell text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3 text-gray-700 justify-center">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-left  md:table-cell text-gray-500">
                    <span className="truncate">{user.firstName}</span>
                  </td>
                  <td className="px-4 py-3 text-left  md:table-cell text-gray-500">
                    <span className="truncate">{user.lastName}</span>
                  </td>
                  <td
                    className={`px-4 py-3 text-gray-600 truncate ${
                      user.active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600 truncate md:table-cell">
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="w-32 h-10 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md transition duration-300 ease-in-out ml-2"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleChangeStatus(user._id)}
                        className={`text-white text-sm font-semibold rounded-full transition duration-300 ease-in-out 
                                       w-32 h-10 shadow-md ml-2
                                                    ${
                                                      user.active
                                                        ? "bg-rose-500 hover:bg-rose-600"
                                                        : "bg-emerald-500 hover:bg-emerald-600"
                                                    }
                                                    `}
                      >
                        {user.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
