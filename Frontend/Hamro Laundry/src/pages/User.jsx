import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CCS/Auth.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function User({ user, onUserUpdate, goLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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
      setProfileMessage("Please choose an image.");
      return;
    }

    setImage(file);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMessage("");

    if (name.trim().length < 3) {
      setProfileMessage("Name must be at least 3 characters.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("email", user.email);
      formData.append("address", address.trim());

      if (image instanceof File) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:5000/api/updateUser/${user.id}`,
        formData,
      );

      onUserUpdate(response.data.user);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setProfileMessage(error.response?.data?.message || "Update failed.");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("All password fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordMessage(
        "New password must be different from current password.",
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/updatePassword/${user.id}`,
        {
          currentPassword,
          newPassword,
        },
      );

      setPasswordMessage(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordMessage(
        error.response?.data?.message || "Password update failed.",
      );
    }
  };

  if (!user) return null;

  return (
    <main className="auth-page">
      <section className="auth-card profile-card">
        <button className="auth-close" onClick={() => navigate(-1)}>
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
            ) : name ? (
              name.charAt(0).toUpperCase()
            ) : (
              "U"
            )}
          </div>

          <div>
            <h1>{name}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="auth-panel-body">
          <span className="auth-eyebrow">Edit Profile</span>

          <p>Update your account information.</p>

          <form className="auth-form" onSubmit={saveProfile}>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Email
              <input value={user.email} readOnly />
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
              Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            {profileMessage && (
              <div className="auth-success">{profileMessage}</div>
            )}
            <button type="submit">Save Changes</button>
          </form>
          <hr />

          <form className="auth-form" onSubmit={changePassword}>
            <h3>Change Password 🔒</h3>
            <label>
              Current Password
              <div className="password-box">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <label>
              New Password
              <div className="password-box">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <label>
              Confirm New Password
              <div className="password-box">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <button type="submit">Change Password</button>
            {passwordMessage && (
              <div className="auth-success">{passwordMessage}</div>
            )}
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
