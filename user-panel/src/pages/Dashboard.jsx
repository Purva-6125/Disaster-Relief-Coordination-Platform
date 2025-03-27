import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../css/dashboard.css"; // Import CSS file

const Dashboard = () => {
  const navigate = useNavigate(); // Define navigate

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <h2 className="welcome-message">Welcome! Stay safe and request help if needed.</h2>
      <p className="system-info">
        This platform allows you to request immediate assistance in case of disasters,  
        track the status of your requests, and receive real-time alerts on weather conditions  
        and emergency situations. Stay informed and take necessary precautions.
      </p>

      {/* Quick Access Buttons */}
      <div className="button-group">
        <button className="primary-button" onClick={() => navigate("/request")}>Request Assistance</button>
        <button className="secondary-button" onClick={() => navigate("/notifications")}>Recent Notifications </button>
        <button className="danger-button" onClick={() => navigate("/help")}>Help</button>
      </div>

      {/* Emergency Contact Info */}
      <div className="emergency-info">
        <h3>📞 Emergency Contacts</h3>
        <ul>
          <li>  🚑 Disaster Relief: <strong>+91-1234567890</strong></li>
          <li>  🚔 Police: <strong>100</strong></li>
          <li>  🏥 Hospital: <strong>+91-9876543210</strong></li>
        </ul>
      </div>

      {/* Weather Forecast Links */}
      <div className="weather-info">
        <h3>🌤 Important Weather Forecast Links</h3>
        <ul>
          <li><a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a></li>
          <li><a href="https://www.weather.com/" target="_blank" rel="noopener noreferrer">The Weather Channel</a></li>
          <li><a href="https://earth.nullschool.net/" target="_blank" rel="noopener noreferrer">Live Wind & Cyclone Tracker</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
