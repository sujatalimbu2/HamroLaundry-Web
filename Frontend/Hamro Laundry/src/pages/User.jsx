import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CCS/Auth.css";
import axios from "axios";

function User({ user, onUserUpdate, goLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user) {
      goLogin();
      return;
    }
    setName(user.name);
    setImage(user.image || "");
    setAddress(user.address || "");
  }, [user, goLogin]);

const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setMessage("Please choose an image.");
        return;
    }

    setImage(file);
};

 const saveProfile = async (e) => {
  e.preventDefault();
  setMessage("");

  if (name.trim().length < 3) {
    setMessage("Name must be at least 3 characters.");
    return;
  }

  if (password && password.length < 6) {
  setMessage("Password must be at least 6 characters.");
  return;
}

if (password !== confirmPassword) {
  setMessage("Passwords do not match.");
  return;
}

  try {
    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("email", user.email);
    formData.append("address", address.trim());

    // Only send password if you're allowing users to change it
  if (password) {
  formData.append("password", password);
  }

    if (image instanceof File) {
      formData.append("image", image);
    }

    const response = await axios.put(
      `http://localhost:5000/api/updateUser/${user.id}`,
      formData
    );

    onUserUpdate(response.data.user);
    setShowSuccess(true);

setTimeout(() => {
  navigate("/");
}, 1500);

  } catch (error) {
    setMessage(
      error.response?.data?.message || "Update failed."
    );
  }
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
            <img
              src={
                image instanceof File
                  ? URL.createObjectURL(image)
                  : `http://localhost:5000/uploads/${image}`
              }
              alt={name}
            />
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
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </label>

            <label>
                  New Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                  />
                </label>

                <label>
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
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
      {showSuccess && (
  <div className="success-overlay">
    <div className="success-popup">
      <div className="success-icon">✔</div>
      <h3>Profile Updated</h3>
      <p>Your profile was updated successfully.</p>
    </div>
  </div>
)}
      
    </main>
  );
}

export default User;