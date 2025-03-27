import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    primaryContact: { type: String, required: true },
    additionalContact: { type: String },
    email: { type: String },
    familyMembers: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    disasterType: { type: String, required: true },
    helpNeeded: { type: [String], required: true },
    additionalInfo: { type: String },
    document: { type: String }, // Base64 encoded document
    status: { type: String, enum: ["New", "In Progress", "Completed"], default: "New" } // Added status field
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);