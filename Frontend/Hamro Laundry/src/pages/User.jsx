import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CCS/Auth.css";

function User({ user, onUserUpdate, goLogin }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      goLogin();
    }
  }, [goLogin, user]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !user) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onUserUpdate({ ...user, image: reader.result });
      setMessage("Profile picture updated.");
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="auth-page">
      <section className="auth-card profile-card">
        <button className="auth-close" onClick={() => navigate("/")} aria-label="Close profile">x</button>
        <div className="auth-panel-head">
          <div className="auth-avatar">
            {user.image ? <img src={user.image} alt={user.name} /> : user.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Profile</span>
          <p>Manage your account picture.</p>

          <form className="auth-form">
            <label>
              Change Profile Picture
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {message && <div className="auth-success">{message}</div>}
          </form>
        </div>
      </section>
    </main>
  );
}

export default User;
