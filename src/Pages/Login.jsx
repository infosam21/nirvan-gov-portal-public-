import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <button className="text-2xl mb-4">←</button>

      <div className="flex gap-6 border-b mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`pb-2 font-semibold ${
            isLogin ? "text-green-600 border-b-2 border-green-600" : "text-gray-400"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`pb-2 font-semibold ${
            !isLogin ? "text-green-600 border-b-2 border-green-600" : "text-gray-400"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-1">Welcome back!</h2>
      <p className="text-gray-500 mb-6">Login to continue</p>

      <label className="text-sm font-medium mb-1">Email or Phone</label>
      <input
        type="text"
        placeholder="Enter email or phone"
        className="border rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600"
      />

      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium">Password</label>
        <span className="text-sm text-green-600">Forgot?</span>
      </div>
      <input
        type="password"
        placeholder="Enter password"
        className="border rounded-lg px-4 py-3 mb-6 outline-none focus:border-green-600"
      />

      <button
        onClick={() => navigate("/profile-setup")}
        className="bg-green-600 text-white font-semibold py-3 rounded-xl mb-4"
      >
        Login
      </button>

      <p className="text-center text-gray-400 text-sm mb-4">or continue with</p>

      <div className="flex justify-center gap-4 mb-6">
        <button className="border rounded-full w-12 h-12 flex items-center justify-center">G</button>
        <button className="border rounded-full w-12 h-12 flex items-center justify-center">f</button>
        <button className="border rounded-full w-12 h-12 flex items-center justify-center"></button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <span className="text-green-600 font-medium">Sign Up</span>
      </p>
    </div>
  );
}

export default Login;