import React from "react";
import { useNavigate } from "react-router-dom";

function SkillsYouNeed() {
  const navigate = useNavigate();

  const skills = [
    { name: "Data Structures", level: "Beginner" },
    { name: "Algorithms", level: "Beginner" },
    { name: "Git & GitHub", level: "Beginner" },
    { name: "System Design", level: "Intermediate" },
    { name: "React.js", level: "Intermediate" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-5">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-xl font-bold">←</button>
          <h1 className="text-lg font-bold text-gray-800">Skills You Need to Learn</h1>
        </div>

        <p className="text-xs text-gray-500 mb-4">Improve your match by learning these skills</p>

        {/* Skills List */}
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
              <span className="font-semibold text-sm text-gray-800">{skill.name}</span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Courses Button -> Go to Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-green-600 text-white font-medium py-3 rounded-xl mt-6 shadow-md hover:bg-green-700 transition"
      >
        Explore Courses →
      </button>
    </div>
  );
}

export default SkillsYouNeed;