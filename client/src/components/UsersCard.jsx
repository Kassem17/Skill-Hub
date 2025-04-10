import React, { useContext } from "react";

const UsersCard = ({ user }) => {
  return (
    <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden transform translate-y-16 opacity-0 animate-slideUp">
    {/* Profile Image */}
    <div className="w-full h-48 overflow-hidden flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
      <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
    </div>

    {/* Profile Details */}
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 opacity-0 animate-fadeIn delay-200">{user.username}</h2>
      <p className="text-sm text-gray-600 opacity-0 animate-fadeIn delay-400">{user.email}</p>
    </div>
  </div>
  );
};

export default UsersCard;
