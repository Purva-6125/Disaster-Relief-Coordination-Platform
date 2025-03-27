import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (Stored in localStorage)
    const userAuth = localStorage.getItem("userAuth");
    setIsAuthenticated(userAuth === "true"); // ✅ Convert properly
  }, []);

  return (
    <Router>
      {/* Show Navbar based on authentication status */}
      {isAuthenticated ? <UserNavbar setIsAuthenticated={setIsAuthenticated} /> : <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes (Redirect to login if not authenticated) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/request"
          element={isAuthenticated ? <Request /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />}
        />

        <Route
          path="/help"
          element={isAuthenticated ? <Help /> : <Navigate to="/login" />}
        />
        
        {/* Default Route (Redirect to dashboard if logged in, otherwise to login) */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
