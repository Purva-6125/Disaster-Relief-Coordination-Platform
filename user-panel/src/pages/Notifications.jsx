import { useState, useEffect } from "react";

const Notifications = () => {
  const [status, setStatus] = useState("");
  const [requestId, setRequestId] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem("token");  // Ensure token is stored

    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    fetch("http://localhost:5000/api/auth/getUserRequestId", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("User Request ID:", data))
    .catch(error => console.error("Error fetching user request ID:", error));
}, []);

  useEffect(() => {
    if (!requestId) return;

    fetch(`http://localhost:5000/api/requests/${requestId}/status`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status || "No status found");
      })
      .catch((err) => console.error("Error fetching status:", err));
  }, [requestId]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Notifications</h2>
      <p>{status || "No status available"}</p>
    </div>
  );
};

export default Notifications;
