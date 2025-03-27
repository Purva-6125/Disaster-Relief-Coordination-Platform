import { Link } from "react-router-dom";
import "../css/navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-container"> */}
        <h1 className="navbar-logo">Disaster Relief Co-ordination Platform</h1>
        <div className="navbar-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
