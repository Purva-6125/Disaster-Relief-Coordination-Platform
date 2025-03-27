import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    duration: { type: String },
    adminNotes: { type: String },
    timestamp: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Notification", notificationSchema);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;