import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  displayName: String,
  email: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
