import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.endsWith("@gmail.com")) {
      toast.error("Only Google ( @gmail.com ) emails are allowed.");
      return false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userAuth", "true");

      setIsAuthenticated(true);
      toast.success("Login Successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar">
          <div className="avatar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
              aria-label="User Avatar"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.758 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>
        </div>
        <h2>Sign in with Email</h2>

        <form onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
          
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-footer">
            {/* <a href="#">Forgot password?</a> */}
          </div>
          <button type="submit" className="btn-primary">
          Login  <i className="fas fa-sign-in-alt"></i></button>
        </form>
      </div>

      {/* Centered Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Login;
