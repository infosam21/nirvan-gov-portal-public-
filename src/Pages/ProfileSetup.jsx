import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Top bar: back + progress */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex gap-2">
          <div className="h-1 flex-1 bg-green-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-1">Let's know you better</h2>
      <p className="text-gray-500 mb-6">Fill in your details</p>

      {/* Photo upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <User size={40} className="text-gray-400" />
        </div>
        <span className="text-sm text-gray-500">Add Photo</span>
      </div>

      {/* Full Name */}
      <label className="text-sm font-medium mb-1">Full Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        className="border rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600"
      />

      {/* Education Level */}
      <label className="text-sm font-medium mb-1">Education Level</label>
      <select className="border rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600 text-gray-500">
        <option>Select education level</option>
        <option>High School</option>
        <option>Undergraduate</option>
        <option>Graduate</option>
      </select>

      {/* Branch/Stream */}
      <label className="text-sm font-medium mb-1">Branch / Stream</label>
      <select className="border rounded-lg px-4 py-3 mb-8 outline-none focus:border-green-600 text-gray-500">
        <option>Select your branch</option>
        <option>Science</option>
        <option>Commerce</option>
        <option>Arts</option>
      </select>

      {/* Continue button */}
      <button
  onClick={() => navigate("/select-skills")}
  className="bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-auto"
>
  Continue <ArrowRight size={18} />
</button>
    </div>
  );
}

export default ProfileSetup;