import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/CCS/Auth.css";

function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: email.trim().toLowerCase(),
          password: password,
        }
      );

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save logged-in user
      if (onLogin) {
        onLogin(response.data.user);
      }

      navigate("/book");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
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

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>

            {message && (
              <div className="auth-error">
                {message}
              </div>
            )}

            <button type="submit">
              Sign In
            </button>
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
    </main>
  );
}

export default Login;