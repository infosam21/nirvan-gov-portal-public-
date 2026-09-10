import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e?.preventDefault();
    // Saves demo session so inner dashboard screens load without network errors
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: identifier || "Officer",
        role: "Government Employee",
        portal: "NIRVAN"
      })
    );
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8 max-w-md mx-auto">
      <button 
        type="button"
        onClick={() => navigate(-1)} 
        className="text-2xl mb-4 text-left self-start hover:opacity-75 transition"
      >
        ←
      </button>

      <div className="flex gap-6 border-b mb-6">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`pb-2 font-semibold transition ${
            isLogin ? "text-green-600 border-b-2 border-green-600" : "text-gray-400"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`pb-2 font-semibold transition ${
            !isLogin ? "text-green-600 border-b-2 border-green-600" : "text-gray-400"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-1">
        {isLogin ? "Welcome back!" : "Create an Account"}
      </h2>
      <p className="text-gray-500 mb-6">
        {isLogin ? "Login to continue" : "Get started with NIRVAN Portal"}
      </p>

      <form onSubmit={handleAuth} className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email or Phone</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter email or phone"
          className="border rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600"
        />

        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium">Password</label>
          <span className="text-sm text-green-600 cursor-pointer">Forgot?</span>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border rounded-lg px-4 py-3 mb-6 outline-none focus:border-green-600"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl mb-4 transition shadow-md"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mb-4">or continue with</p>

      <div className="flex justify-center gap-4 mb-6">
        <button 
          type="button"
          onClick={handleAuth}
          className="border rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 transition"
        >
          G
        </button>
        <button 
          type="button"
          onClick={handleAuth}
          className="border rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 transition"
        >
          f
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-green-600 font-medium cursor-pointer"
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Login;