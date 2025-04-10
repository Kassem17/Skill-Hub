import React from "react";

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{skill.name}</h2>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          {skill.progress}%
        </span>
      </div>

      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
        {skill.description}
      </p>

      <div className="mt-5">
        <div className="text-sm text-gray-700 font-medium mb-2">Goal</div>
        <div className="bg-gray-200 w-full h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${skill.progress}%` }}
          ></div>
          
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">{skill.goal}</p>
      </div>
    </div>
  );
};

export default SkillCard;
