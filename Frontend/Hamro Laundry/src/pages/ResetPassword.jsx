import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/CCS/Auth.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        {
          password: newPassword,
        },
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login", {
          state: {
            backgroundLocation: { pathname: "/" },
          },
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          className="auth-close"
          onClick={() =>
            navigate("/", {
              replace: true,
            })
          }
          aria-label="Close"
        >
          ×
        </button>

        <div className="auth-panel-head">
          <div className="auth-avatar">H</div>

          <div>
            <h1>Hamro Laundry</h1>
            <p>Create a new password</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Reset Password</span>

          <p>Enter your new password below.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {message && <div className="auth-success">{message}</div>}

            {error && <div className="auth-error">{error}</div>}

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
