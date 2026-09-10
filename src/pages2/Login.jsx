import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="logo">🌿 NIRVAN</div>

        <div className="left-content">
          <h2>Empowering</h2>
          <p>Government Employees</p>
          <p>Through Continuous</p>
          <p>Learning</p>
        </div>
      </div>

      <div className="login-card">

        <div className="language">
          Language
        </div>

        <h1>Welcome to NIRVAN</h1>

        <p className="subtitle">
          Learn • Assess • Grow
        </p>

        <div className="tabs">
          <button className="active-tab">
            Learner
          </button>

          <button>
            Admin
          </button>
        </div>

        <h3>Login with</h3>

        <button
          className="login-option"
          onClick={() => navigate("/aadhaar-login")}
        >
          🪪 Continue with Aadhaar
        </button>

        <button className="login-option">
          🛡️ Continue with SSO
        </button>

        <div className="or">
          <span></span>
          OR
          <span></span>
        </div>

        <input
          type="text"
          placeholder="Email or Phone Number"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <div className="forgot">
          Forgot Password?
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </button>

        <p className="signup">
          Don't have an account?
          <span> Sign Up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;