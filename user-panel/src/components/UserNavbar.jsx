import { Link, useNavigate } from "react-router-dom";

const UserNavbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("userAuth");

    // Update authentication state
    setIsAuthenticated(false); // Triggers UI update

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      <Link to="/request" style={{ margin: "10px", color: "white" }}>Request Box</Link>
      <Link to="/notifications" style={{ margin: "10px", color: "white" }}>Notifications</Link>
      <Link to="/help" style={{ margin: "10px", color: "white" }}>
      Help
      {/* <i class="fa-solid fa-circle-info"></i> */}
      </Link>
      <button onClick={handleLogout} style={{ marginLeft: "20px", background: "red", color: "white" }}>
      <i class="fa-solid fa-right-from-bracket"></i>  Logout  
      </button>
    </nav>
  );
};

export default UserNavbar;
