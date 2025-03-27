import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("New");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [adminNotes, setAdminNotes] = useState(""); 

    const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
   };

  const handleDurationChange = (newDuration) => {
      setDuration(newDuration);
    };

  const handleAdminNotesChange = (newAdminNotes) => {
        setAdminNotes(newAdminNotes);
    };

    // Fetch Requests when selectedStatus changes
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/requests?status=${selectedStatus}`);
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [selectedStatus]); // Refetch data when selectedStatus changes


  // Fetch Users only once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Runs only on mount


  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  /*const handleRowClick = (request) => setSelectedRequest(request);
  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${selectedRequest._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, duration, adminNotes }),
      });
      if (!response.ok) throw new Error("Failed to update request");
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === selectedRequest._id ? { ...req, status, duration, adminNotes } : req))
      );
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };*/

   // Handle table row click to show request details
   const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) {
        console.error("No request selected!");
        return;
    }
  
    console.log("Updating request:", selectedRequest._id, "New Status:", status, "Duration:", duration, "Admin Notes:", adminNotes);
  
    try {
        const response = await fetch(`http://localhost:5000/api/requests/${selectedRequest._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                status: status,
                duration: duration,
                adminNotes: adminNotes
            }),
        });
  
        if (!response.ok) {
            throw new Error("Failed to update request");
        }
  
        const updatedRequest = await response.json();

         // Update requests state
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
            req._id === updatedRequest._id ? updatedRequest : req
        )
    );

    console.log("Request updated successfully!");

    console.log("Email being sent:", selectedRequest.email); // Debugging line

    // Store notification and send email
    await fetch(`http://localhost:5000/api/notifications/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            requestId: updatedRequest._id,
            email: selectedRequest.email,
            status: status,
            duration: duration,
            adminNotes: adminNotes
        }),
    });

    console.log("Notification stored and email sent");

} catch (error) {
    console.error("Error updating request:", error);
}
};


  

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>Requests</button>
        <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="admin-content">
        {/* Requests Section */}
        {activeTab === "requests" && (
          <div className="request-section">
              {/* Status Buttons */}
            <div className="request-status-buttons">
              {["New", "In Progress", "Completed"].map((status) => (
                <button key={status} onClick={() => setSelectedStatus(status)} className={`status-button ${selectedStatus === status ? "active" : ""}`}>
                  {status}</button>
              ))}
            </div>


            {/* Requests Table */}
            <div className="table-container">
            {requests.length > 0 ? (
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Full Name</th>
                      <th>City</th>
                      <th>Disaster Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {requests.map((req) => (
                      <tr key={req._id} onClick={() => handleRowClick(req)} className="clickable-row">
                        <td>{req._id}</td>
                        <td>{req.fullName}</td>
                        <td>{req.city}</td>
                        <td>{req.disasterType}</td>
                        <td>{req.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-requests">No requests found</p>
              )}
            </div>
          </div>
        )}



        {/* Users Section */}
        {activeTab === "users" && (
          <div>
            <h2>Registered Users</h2>
            <table className="users-table">
              <thead><tr><th>Name</th><th>Email</th><th>Address</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.address || "User"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>



      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <p><strong>Request ID:</strong> {selectedRequest._id}</p>
            <p><strong>Full Name:</strong> {selectedRequest.fullName}</p>
            <p><strong>Primary Contact Number:</strong> {selectedRequest.primaryContact}</p>
            <p><strong>Additional Contact Number:</strong> {selectedRequest.additionalContact || "N/A"}</p>
            <p><strong>Email Address:</strong> {selectedRequest.email}</p>
            <p><strong>Number of Family Members Affected:</strong> {selectedRequest.familyMembers}</p>
            <p><strong>Address:</strong> {selectedRequest.address}</p>
            <p><strong>City:</strong> {selectedRequest.city}</p>
            <p><strong>State:</strong> {selectedRequest.state}</p>
            <p><strong>Zip Code:</strong> {selectedRequest.zipCode}</p>
            <p><strong>Country:</strong> {selectedRequest.country}</p>
            <p><strong>Type of Disaster:</strong> {selectedRequest.disasterType}</p>
            <p><strong>Type of Help Needed:</strong> {selectedRequest.helpNeeded?.join(", ")}</p>
            <p><strong>Additional Information:</strong> {selectedRequest.additionalInfo || "N/A"}</p>
            <p><strong>Uploaded Document:</strong> {selectedRequest.supportingDocument ? <a href={selectedRequest.supportingDocument} target="_blank" rel="noopener noreferrer">View File</a> : "N/A"}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            
            
            
            
            <select onChange={(e) =>  handleStatusChange (e.target.value)} value={status}>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <p><strong>Duration:</strong> {duration || "N/A"}</p>
            <input type="text" placeholder="Enter duration" value={duration} onChange={(e) =>  handleDurationChange (e.target.value)} />

            <p><strong>Admin Notes:</strong> {adminNotes || "N/A"}</p>
            <textarea placeholder="Enter admin notes" value={adminNotes} onChange={(e) => handleAdminNotesChange (e.target.value)} />


            <button onClick={() => {
                    handleUpdateRequest();  // Call function to update request
                    setSelectedRequest(null);  // Clear the selected request
                }} className="save-button">Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
