import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../assets/CCS/Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={logo} alt="logo" className="logo-icon" />
          <span className="logo-text">Hamro Laundry</span>
        </div>

         <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/book">Book</Link>
          <Link to="/price">Price List</Link>
          <Link to="/about">About Us</Link>
        </nav>
         </div>
    </header>
    
  );
};

export default Navbar;