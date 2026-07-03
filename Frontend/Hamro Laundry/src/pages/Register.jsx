import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/CCS/Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (cleanName.length < 3) {
      setMessage("Name must be at least 3 characters.");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setMessage("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
            await axios.post(
        "http://localhost:5000/api/create",
        {
          name: cleanName,
          email: cleanEmail,
          password,
          address,
        }
      );
      
      setShowSuccess(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card register-card">

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
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h1>Create Account</h1>
            <p>Join Hamro Laundry</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Register</span>

          <p>Create an account before confirming your booking.</p>

          <form className="auth-form" onSubmit={register}>

            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>

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
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  <FaEye /> : <FaEyeSlash /> }
                  </button>
                </div>
              </label>

              <label>
                  Confirm Password
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </label>

            

            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
              />
            </label>

            {message && (
              <div className="auth-error">
                {message}
              </div>
            )}

            <button type="submit">
              Register
            </button>

          </form>

          <div className="auth-switch">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
            >
              Sign In
            </Link>
          </div>

        </div>

      </section>
      {showSuccess && (
  <div className="success-overlay">
    <div className="success-modal">

      <div className="success-check">✓</div>

      <h2>Registration Successful</h2>

      <p>
        Your account has been created successfully.
        You can now sign in and book your laundry service.
      </p>

      <button
        className="success-btn"
        onClick={() => {
          setShowSuccess(false);
          navigate("/login", {
            state: {
              backgroundLocation:
                location.state?.backgroundLocation || location,
            },
          });
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

export default Register;