import { useState } from "react";
import "../assets/CCS/Auth.css";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email },
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login", {
          state: {
            backgroundLocation: location.state?.backgroundLocation || location,
          },
        });
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          className="auth-close"
          onClick={() =>
            navigate("/login", {
              state: {
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              },
            })
          }
        >
          ×
        </button>

        <div className="auth-panel-head">
          <div className="auth-avatar">
            <span>H</span>
          </div>

          <div>
            <h1>Hamro Laundry</h1>
            <p>Reset your account password</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Forgot Password</span>

          <p>
            Enter the email address associated with your account. We'll send you
            a password reset link.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email Address
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {message && <div className="auth-success">{message}</div>}
            {error && <div className="auth-error">{error}</div>}

            <button type="submit">Send Reset Link</button>
          </form>

          <div className="back-login">
            <Link
              to="/login"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
            >
              ⬅ Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
