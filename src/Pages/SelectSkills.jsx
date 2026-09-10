import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search, Check } from "lucide-react";

const allSkills = [
  "Python", "Java", "C++", "HTML", "CSS", "JavaScript", "React",
  "SQL", "Machine Learning", "Data Analysis", "Problem Solving",
];

function SelectSkills() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(["Python", "Java", "SQL", "Machine Learning", "Data Analysis", "Problem Solving"]);

  const toggleSkill = (skill) => {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Top bar: back + progress */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex gap-2">
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-green-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-1">What are your skills?</h2>
      <p className="text-gray-500 mb-6">Select all that apply</p>

      {/* Search bar */}
      <div className="flex items-center border rounded-lg px-4 py-3 mb-6">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search skills"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
      </div>

      <p className="text-sm font-medium text-gray-500 mb-3">Recommended</p>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filteredSkills.map((skill) => {
          const isSelected = selected.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium ${
                isSelected
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {isSelected && <Check size={14} />}
              {skill}
            </button>
          );
        })}
      </div>

      {/* Continue button */}
      <button
        onClick={() => navigate("/select-interests")}
        className="bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-auto"
      >
        Continue ({selected.length}) <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default SelectSkills;