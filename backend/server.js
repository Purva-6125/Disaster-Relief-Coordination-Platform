import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoute.js"; 
import notificationRoutes from "./routes/notifications.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes); 
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
    res.send("Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
