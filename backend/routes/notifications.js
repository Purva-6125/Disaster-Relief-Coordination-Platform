import express from "express";
const router = express.Router();

import Notification from "../models/Notification.js";
import sendEmail  from "../utils/sendEmail.js"; // Email utility function

// POST: Store Notification & Send Email
router.post("/", async (req, res) => {
    try {
        const { requestId, email, status, duration, adminNotes } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Create and save the notification
        const newNotification = new Notification({
            requestId,
            email,
            status,
            duration,
            adminNotes,
        });

        await newNotification.save();
        console.log("Notification saved:", newNotification);

        // Send Email Notification
        const emailText = `Hello,\n\nYour request status has been updated.\n\nStatus: ${status}\nDuration: ${duration}\nAdmin Notes: ${adminNotes}\n\nThank you.`;
        await sendEmail(email, "Request Status Update", emailText);

        console.log("Email sent successfully to:", email);
        res.json({ message: "Notification stored and email sent" });
    } catch (error) {
        console.error("Error storing notification:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Assuming Express.js & Mongoose
router.get("/user/:email", async (req, res) => {
    const userEmail = req.params.email;
    console.log("🔍 Searching notifications for:", userEmail);
    
    try {
        const notifications = await Notification.find({ userEmail }); // Ensure field name matches
        console.log("📢 Found Notifications:", notifications);

        if (notifications.length === 0) {
            return res.status(200).json([]); // No notifications found
        }

        res.json(notifications);
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;

