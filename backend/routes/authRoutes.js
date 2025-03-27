import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Request from "../models/requestModel.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, address, contact } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, address, contact });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Users (Admin Only)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// router.get("/getUserRequestId", authMiddleware, async (req, res) => {
//     try {
//         console.log("Inside getUserRequestId API");

//         const userId = req.user?.userId;  
//         if (!userId) {
//             return res.status(400).json({ message: "User ID not found in token" });
//         }

//         const userRequest = await Request.findOne({ userId });

//         if (!userRequest) {
//             return res.status(404).json({ message: "No request found for this user" });
//         }

//         res.json({ requestId: userRequest._id });
//     } catch (error) {
//         console.error("Error fetching request ID:", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

export default router;
