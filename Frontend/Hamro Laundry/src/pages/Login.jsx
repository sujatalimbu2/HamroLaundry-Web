import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/CCS/Auth.css";

const getUsers = () => JSON.parse(localStorage.getItem("hamro_users") || "[]");

function Login({ onLogin }) {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setMessage("");

    const user = getUsers().find(
      (savedUser) => savedUser.email === email.trim().toLowerCase() && savedUser.password === password
    );

    if (!user) {
      setMessage("Invalid email or password.");
      return;
    }

    onLogin({ name: user.name, email: user.email, image: user.image || "" });
    navigate("/book");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <button className="auth-close" onClick={() => navigate("/")} aria-label="Close login">x</button>
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
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
            </label>
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
                }} >
                Register
              </Link>
            </div>
          
        </div>
      </section>
    </main>
  );
}

export default Login;
