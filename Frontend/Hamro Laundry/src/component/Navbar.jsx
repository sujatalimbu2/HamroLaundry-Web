import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/CCS/Navbar.css";


const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
const location = useLocation();
  return (
    <header className="header">
      <div className="logo">Hamro Laundry</div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/book">Book</Link>
        <Link to="/price">Price</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="auth-nav">
        {user ? (
          <>
           <Link
              className="profile-link"
              to="/profile"
              state={{ backgroundLocation: location }}
            >
              {user.image ? (
                <img className="profile-thumb" src={user.image} alt={user.name} />
              ) : (
                <span className="profile-thumb profile-initial">
                  {user.name?.charAt(0) || "U"}
                </span>
              )}
            </Link>
            <button className="auth-link" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button
            className="account-button"
            onClick={() =>
              navigate("/login", {
                state: { backgroundLocation: location },
              })
            }> Login
         </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
