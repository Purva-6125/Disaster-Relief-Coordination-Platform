import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Predefined Admin Credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "Admin@123";

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      // Store admin authentication in localStorage
      localStorage.setItem("adminAuth", true);
      localStorage.setItem("adminEmail", email);

      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="admin-login-container">
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleAdminLogin}>
          <div className="input-group">
            {/* <label htmlFor="email">Username</label> */}
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
      </div>
      {/* <div className="copyright">
        © 2017 Basic Login Form. All Rights Reserved | Design by W3layouts
      </div> */}
    </div>
  );
};

export default AdminLogin;