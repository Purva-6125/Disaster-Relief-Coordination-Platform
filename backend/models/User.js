import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
}, { timestamps: true });

// Export Model
const User = mongoose.model("User", userSchema);
export default User;
