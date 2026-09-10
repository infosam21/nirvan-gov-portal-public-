import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function FindingMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/match-results");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-32 h-32 rounded-full border-4 border-green-100 flex items-center justify-center mb-8 animate-pulse">
        <Search size={48} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold mb-2">Finding your best matches...</h2>
      <p className="text-gray-500 text-center mb-6">
        Analyzing your skills, interests
        <br />
        and goals
      </p>
      <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
      </div>
      <p className="text-sm text-gray-400 mt-2">70%</p>
    </div>
  );
}

export default FindingMatch;