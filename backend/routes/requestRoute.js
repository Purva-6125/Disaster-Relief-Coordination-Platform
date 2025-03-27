
import express from "express";
import multer from "multer";
import Request from "../models/requestModel.js";
// import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "purvabakare04@gmail.com",  // Replace with your email
//         pass: "meac zqsr cgov jvpf",  // Use an app password, not your email password
//     },
// });

const router = express.Router();
const upload = multer();

// Submit a request
router.post("/request", upload.single("document"), async (req, res) => {
    try {
        console.log("Received request:", req.body);

        let helpNeededArray;
        try {
            helpNeededArray = JSON.parse(req.body.helpNeeded);
        } catch (error) {
            helpNeededArray = req.body.helpNeeded;
        }

        const newRequest = new Request({
            fullName: req.body.fullName,
            primaryContact: req.body.primaryContact,
            additionalContact: req.body.additionalContact,
            email: req.body.email,
            familyMembers: req.body.familyMembers,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,
            disasterType: req.body.disasterType,
            helpNeeded: helpNeededArray,
            additionalInfo: req.body.additionalInfo,
            document: req.file ? req.file.filename : "",
            status: "New", // Default status when submitting
            duration: req.body.duration || "", // Optional field
            adminNotes: req.body.adminNotes || "" // Optional field
        });

        await newRequest.save();
        res.status(201).json({ message: "Request submitted successfully!" });
    } catch (error) {
        console.error("Error saving request:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// Fetch requests based on status
router.get("/", async (req, res) => {
    try {
        const status = req.query.status || "New"; // Default to "New" if no status is provided
        const requests = await Request.find({ status });
        res.json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});




router.put("/:id", async (req, res) => {
    try {
        const { status, duration, adminNotes } = req.body;
        const requestId = req.params.id;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { 
                ...(status && { status }), 
                ...(duration && { duration }), 
                ...(adminNotes && { adminNotes }) 
            },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});





















router.put("/:id", async (req, res) => {
    try {
        const { status, duration, adminNotes, userEmail } = req.body;
        const requestId = req.params.id;

        // Find and update the request
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { 
                ...(status && { status }), 
                ...(duration && { duration }), 
                ...(adminNotes && { adminNotes }) 
            },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        // Send Email Notification if userEmail is provided
        if (userEmail) {
            const mailOptions = {
                from: "your-email@gmail.com",
                to: userEmail,
                subject: "Your Request Status has been Updated",
                text: `Hello, 

Your request has been updated.

Status: ${status || "Unchanged"}
Duration: ${duration || "Unchanged"}
Admin Notes: ${adminNotes || "No additional notes"}

Thank you!`,
            };

            await transporter.sendMail(mailOptions);
        }

        res.json(updatedRequest);
    } catch (error) {
        console.error("Error updating request or sending email:", error);
        res.status(500).json({ error: "Server error" });
    }
});






// Fetch request status, duration, and admin notes by ID
router.get("/:id/status", async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.json({ 
            status: request.status,
            duration: request.duration, 
            adminNotes: request.adminNotes 
        });
    } catch (error) {
        console.error("Error fetching request details:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;