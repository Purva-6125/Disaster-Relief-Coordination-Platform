import React, { useState } from "react";
import axios from "axios";
import "../css/request.css"; // Import the CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Request = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        primaryContact: "",
        additionalContact: "",
        email: "",
        familyMembers: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
        disasterType: "Flood",
        helpNeeded: [],
        additionalInfo: "",
        document: null,
    });

    const statesOfIndia = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const helpOptions = [
        "Mental Health Support", "Legal Support", "Communication & Network Support",
        "Food & Water", "Medical Aid", "Shelter Assistance", "Other"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, document: e.target.files[0] });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            helpNeeded: checked
                ? [...prevData.helpNeeded, value]
                : prevData.helpNeeded.filter((item) => item !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            await axios.post("http://localhost:5000/api/requests/request", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Request Submitted Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Reset form after submission
            setFormData({
                fullName: "",
                primaryContact: "",
                additionalContact: "",
                email: "",
                familyMembers: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
                country: "India",
                disasterType: "Flood",
                helpNeeded: [],
                additionalInfo: "",
                document: null,
            });

        } catch (error) {
            console.error("Error submitting request:", error);
            toast.error("Submission Failed! Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="request-container">
            <h2>Disaster Relief Request</h2>
            <form onSubmit={handleSubmit}>
                
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

                <label>Primary Contact Number:</label>
                <input type="text" name="primaryContact" value={formData.primaryContact} onChange={handleChange} required />

                <label>Additional Contact Number (Optional):</label>
                <input type="text" name="additionalContact" value={formData.additionalContact} onChange={handleChange} />

                <label>Email Address (Optional):</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                <label>Number of Family Members Affected:</label>
                <input type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} required />

                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                <label>State:</label>
                <select name="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    {statesOfIndia.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>

                <label>Zip Code:</label>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />

                <label>Country:</label>
                <input type="text" name="country" value={formData.country} readOnly />

                <label>Type of Disaster:</label>
                <select name="disasterType" value={formData.disasterType} onChange={handleChange}>
                    <option value="Flood">Flood</option>
                    <option value="Earthquake">Earthquake</option>
                    <option value="Wildfire">Wildfire</option>
                    <option value="Hurricane">Hurricane</option>
                    <option value="Tornado">Tornado</option>
                    <option value="Other">Other</option>
                </select>

                <label>Type of Help Needed:</label>
                <div className="help-needed-options">
                    {helpOptions.map((help, index) => (
                        <div key={index}>
                            <input 
                                type="checkbox" 
                                name="helpNeeded" 
                                value={help} 
                                checked={formData.helpNeeded.includes(help)} 
                                onChange={handleCheckboxChange} 
                            />
                            <label>{help}</label>
                        </div>
                    ))}
                </div>

                <label>Additional Information:</label>
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange}></textarea>

                <label>Upload Supporting Documents or Photos:</label>
                <input type="file" name="document" onChange={handleFileChange} />

                <button type="submit">Submit Request</button>
            </form>

            {/* Toast Container for Notifications */}
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

export default Request;
