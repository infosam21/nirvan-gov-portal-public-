import { useNavigate } from "react-router-dom";
import { ArrowRight, Code, BarChart3, Globe } from "lucide-react";

const matches = [
  {
    title: "Software Developer",
    match: 92,
    demand: "High Demand",
    growth: "High Growth",
    icon: Code,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Data Analyst",
    match: 85,
    demand: "In Demand",
    growth: "High Growth",
    icon: BarChart3,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Web Developer",
    match: 78,
    demand: "In Demand",
    growth: "Medium Growth",
    icon: Globe,
    color: "bg-green-100 text-green-600",
  },
];

function MatchResults() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <h2 className="text-2xl font-bold mb-1">Your Top Career Matches</h2>
      <p className="text-gray-500 mb-6">Based on your skills and interests</p>

      <div className="flex flex-col gap-4 mb-8">
        {matches.map(({ title, match, demand, growth, icon: Icon, color }) => (
          <div
            key={title}
            className="border rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <span className="font-semibold text-gray-800">{title}</span>
              </div>
              <span className="text-green-600 font-bold">{match}% Match</span>
            </div>
            <div className="flex gap-2 ml-13">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {demand}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {growth}
              </span>
            </div>
            <button
              onClick={() => navigate("/career-details")}
              className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1"
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchResults;