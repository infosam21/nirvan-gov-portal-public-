import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-6 py-10">
      {/* Top - Logo/Title */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-green-600">WEED</h1>
        <p className="text-center text-gray-800 font-medium mt-2">
          Discover Your Skills.
          <br />
          Find Your Perfect Career.
        </p>
      </div>

      {/* Middle - Illustration placeholder */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-56 h-56 bg-green-50 rounded-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Illustration</span>
        </div>
      </div>

      {/* Bottom - Text + Button */}
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-center text-gray-500 text-sm">
          Let's find the career that matches you best.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          Get Started <ArrowRight size={18} />
        </button>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-medium cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Welcome;