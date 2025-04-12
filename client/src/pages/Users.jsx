import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-users"
      );
      if (data.success) {
        console.log(data.users);
        setUsers(data.users);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className={` p-6 rounded-lg shadow-lg max-w-sm w-full hover:shadow-2xl transform transition-all duration-300 ${
              user.active ? "bg-green-100" : "bg-red-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-4">
                {/* Placeholder for profile picture */}
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">
                {user.username}
              </h2>
              <p className="text-gray-600 text-center">{user.email}</p>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                to={`/skills/${user._id}`}
                className="text-blue-500 font-semibold transition duration-300 ease-in-out px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
              >
                Display Skills
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
