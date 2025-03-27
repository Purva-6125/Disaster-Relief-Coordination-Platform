import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
      {/* Display menu items in a single line */}
      <span>
        <NavLink to="/registeredUser">Registered Users</NavLink>
        <button onClick={() => setShowDropdown(!showDropdown)}>Requests</button>
        <NavLink to="/admin/logout">Logout</NavLink>
      </span>

      {/* Dropdown content for "Requests" */}
      {showDropdown && (
        <div>
          <NavLink to="/admin/logout/new">New</NavLink> |{" "}
          <NavLink to="/admin/logout/in-process">In Process</NavLink> |{" "}
          <NavLink to="/admin/logout/completed">Completed</NavLink>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
