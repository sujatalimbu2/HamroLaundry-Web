import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CCS/Auth.css";

function User({ user, onUserUpdate, goLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      goLogin();
      return;
    }
    setName(user.name);
    setImage(user.image || "");
  }, [user, goLogin]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setMessage("Name must be at least 3 characters.");
      return;
    }

    onUserUpdate({
      ...user,
      name: name.trim(),
      image,
    });

    setMessage("Profile updated successfully.");
  };

  if (!user) return null;

  return (
    <main className="auth-page">
      <section className="auth-card profile-card">

        <button
          className="auth-close"
          onClick={() => navigate(-1)}
        >
          ×
        </button>

        <div className="auth-panel-head">

          <div className="auth-avatar">
            {image ? (
              <img src={image} alt={name} />
            ) : (
             name ? name.charAt(0).toUpperCase() : "U"
            )}
          </div>

          <div>
            <h1>{name}</h1>
            <p>{user.email}</p>
          </div>

        </div>

        <div className="auth-panel-body">

          <span className="auth-eyebrow">
            Edit Profile
          </span>

          <p>
            Update your account information.
          </p>

          <form
            className="auth-form"
            onSubmit={saveProfile}
          >

            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Email
              <input
                value={user.email}
                readOnly
              />
            </label>

            <label>
              Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            {message && (
              <div className="auth-success">
                {message}
              </div>
            )}

            <button type="submit">
              Save Changes
            </button>

          </form>

        </div>

      </section>
    </main>
  );
}

export default User;