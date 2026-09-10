import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Code, BarChart3, Sparkles, Shield, Palette, Briefcase, MoreHorizontal, Smartphone } from "lucide-react";

const interests = [
  { name: "Web Development", icon: Code },
  { name: "Data Science", icon: BarChart3 },
  { name: "Artificial Intelligence", icon: Sparkles },
  { name: "App Development", icon: Smartphone },
  { name: "Cyber Security", icon: Shield },
  { name: "Design", icon: Palette },
  { name: "Business", icon: Briefcase },
  { name: "Others", icon: MoreHorizontal },
];

function SelectInterests() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(["Web Development"]);

  const toggleInterest = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Top bar: back + progress */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex gap-2">
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-green-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-1">What are your interests?</h2>
      <p className="text-gray-500 mb-6">Choose your areas of interest</p>

      {/* Interest grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {interests.map(({ name, icon: Icon }) => {
          const isSelected = selected.includes(name);
          return (
            <button
              key={name}
              onClick={() => toggleInterest(name)}
              className={`relative flex flex-col items-start gap-3 p-4 rounded-xl border text-left ${
                isSelected
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-green-600 rounded-full p-0.5">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <Icon size={24} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-800">{name}</span>
            </button>
          );
        })}
      </div>

      {/* Continue button */}
      <button
        onClick={() => navigate("/finding-match")}
        className="bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-auto"
      >
        Continue ({selected.length}) <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default SelectInterests;