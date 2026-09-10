import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar (শুধুমাত্র ল্যাপটপ/পিসিতে দেখাবে) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6 space-y-6 min-h-screen">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <h1 className="text-xl font-bold text-gray-800">WEED</h1>
        </div>

        <nav className="flex flex-col space-y-2 font-medium text-sm">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-xl font-bold text-left"
          >
            <span>🏠</span> Dashboard
          </button>
          <button 
            onClick={() => navigate("/saved-jobs")} 
            className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-3 rounded-xl text-left transition"
          >
            <span>🔖</span> Saved Jobs
          </button>
          <button 
            onClick={() => navigate("/profile")} 
            className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-3 rounded-xl text-left transition"
          >
            <span>👤</span> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content Area (মোবাইল ও পিসি দুটোর জন্যই) */}
      <main className="flex-1 p-5 md:p-10 max-w-6xl mx-auto w-full pb-20 md:pb-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Hi, Arjun! 👋</h1>
            <p className="text-xs md:text-sm text-gray-500">Let's continue your journey</p>
          </div>
          <button className="text-xl bg-white p-2 rounded-full shadow-sm border border-gray-100">🔔</button>
        </div>

        {/* Top Section Grid (Profile Completion + Continue Learning) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Profile Completion Card */}
          <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Profile Completion</span>
                <span className="font-bold text-green-400">80%</span>
              </div>
              <div className="w-full bg-gray-700 h-2.5 rounded-full mb-4">
                <div className="bg-green-500 h-2.5 rounded-full w-[80%]"></div>
              </div>
            </div>
            <button className="bg-green-600 text-xs md:text-sm px-4 py-2 rounded-xl font-medium hover:bg-green-700 w-max">
              Complete Now
            </button>
          </div>

          {/* Continue Learning */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="font-bold text-gray-800 text-sm mb-2">Continue Learning</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
                🐍
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-800">Python for Beginners</h4>
                <p className="text-xs text-gray-400 mb-2">In Progress</p>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-500">60%</span>
            </div>
          </div>
        </div>

        {/* Your Overview Section */}
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-4">Your Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <span className="text-2xl md:text-3xl">💼</span>
              <h4 className="font-bold text-lg md:text-xl mt-2 text-gray-800">12</h4>
              <p className="text-xs text-gray-500">Saved Jobs</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <span className="text-2xl md:text-3xl">⭐</span>
              <h4 className="font-bold text-lg md:text-xl mt-2 text-gray-800">8</h4>
              <p className="text-xs text-gray-500">Skills Added</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <span className="text-2xl md:text-3xl">📚</span>
              <h4 className="font-bold text-lg md:text-xl mt-2 text-gray-800">2</h4>
              <p className="text-xs text-gray-500">Courses Enrolled</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation (শুধুমাত্র মোবাইলে দেখাবে) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center text-xs z-50">
        <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-green-600 font-bold">
          🏠 Home
        </button>
        <button className="flex flex-col items-center text-gray-400">🔍 Search</button>
        <button onClick={() => navigate("/saved-jobs")} className="flex flex-col items-center text-gray-400">🔖 Saved</button>
        <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-gray-400">👤 Profile</button>
      </div>
    </div>
  );
}

export default Dashboard;