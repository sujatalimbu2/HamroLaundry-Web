import { Link } from "react-router-dom";
import { MdLocalLaundryService } from "react-icons/md";
import "../assets/CCS/Navbar.css";

const Navbar = ({ basket, setShowBasket }) => {
  return (
    <header className="header">
      <div className="logo">Hamro Laundry</div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/book">Book</Link>
        <Link to="/price">Price</Link>
        <Link to="/about">About</Link>
      </nav>

        {/* BASKET ICON */}
        <button
          className="basket-btn"
          onClick={() => setShowBasket(true)}
        >
          <MdLocalLaundryService size={24} />

          {basket.length > 0 && (
            <span className="count">
              {basket.length}
            </span>
          )}
        </button>
    </header>
  );
};

export default Navbar;