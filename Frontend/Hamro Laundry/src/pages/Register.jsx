import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/CCS/Auth.css";

const getUsers = () => JSON.parse(localStorage.getItem("hamro_users") || "[]");

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const register = (event) => {
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

    const users = getUsers();

    if (users.some((user) => user.email === cleanEmail)) {
      setMessage("An account with this email already exists.");
      return;
    }

    localStorage.setItem(
      "hamro_users",
      JSON.stringify([...users, { name: cleanName, email: cleanEmail, password, image }])
    );

    navigate("/login");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <button className="auth-close" onClick={() => navigate("/login")} aria-label="Close register">x</button>
        <div className="auth-panel-head">
          <div className="auth-avatar">{image ? <img src={image} alt="Profile preview" /> : "U"}</div>
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
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required />
            </label>
            <label>
              Profile Picture
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {message && <div className="auth-error">{message}</div>}
            <button type="submit">Register</button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
