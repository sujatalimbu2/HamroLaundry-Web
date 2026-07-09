import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/CCS/Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState("");

  const login = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: email.trim().toLowerCase(),
        password: password,
      });

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save logged-in user
      if (onLogin) {
        onLogin(response.data.user);
      }
      setUserRole(response.data.user.role);

      // Show success popup
      setShowLoginSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <button
          className="auth-close"
          onClick={() => navigate("/")}
          aria-label="Close login"
        >
          ×
        </button>

        <div className="auth-panel-head">
          <div className="auth-avatar">U</div>

          <div>
            <h1>My Account</h1>
            <p>Sign in to manage bookings</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Welcome back</span>

          <p>Sign in to view your orders.</p>

          <form className="auth-form" onSubmit={login}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {message && <div className="auth-error">{message}</div>}

            <button type="submit">Sign In</button>
          </form>

          <div className="auth-switch">
            No account?{" "}
            <Link
              to="/register"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </section>
      {showLoginSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-check">✓</div>

            <h2>Welcome Back!</h2>

            <p>You have successfully logged in.</p>
            <button
              className="success-btn"
              onClick={() => {
                setShowLoginSuccess(false);

                if (userRole === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/book");
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;
