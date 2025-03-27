import { useState } from "react";
import "../css/register.css"; // Import CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "+91 ", // Fixed "+91 " (with space)
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    // Email validation (Only @gmail.com)
    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("Only Google ( @gmail.com ) emails are allowed.");
      return false;
    }

    // Password validation (8+ chars, alphanumeric, and symbol)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }

    // Contact validation (+91 followed by exactly 10 digits)
    const contactRegex = /^\+91\s[0-9]{10}$/;
    if (!contactRegex.test(formData.contact)) {
      toast.error("Invalid Number.");
      return false;
    }

    return true;
  };

  const handleContactChange = (e) => {
    let input = e.target.value;

    // Ensure it always starts with "+91 "
    if (!input.startsWith("+91 ")) {
      input = "+91 ";
    }

    // Remove any non-numeric characters (except space after +91)
    input = "+91 " + input.slice(4).replace(/[^0-9]/g, "");

    // Limit to 10 digits after "+91 "
    if (input.length > 14) {
      input = input.slice(0, 14);
    }

    setFormData({ ...formData, contact: input });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registered Successfully!");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input type="text" name="name" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <input type="text" name="address" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
        
        {/* Fixed +91 with space */}
        <input 
          type="text" 
          name="contact" 
          value={formData.contact} 
          onChange={handleContactChange} 
          maxLength="14" 
          required 
        />

        <button type="submit">Register</button>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-center"  // Centers the toast
        autoClose={3000}  // Closes after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Register;
