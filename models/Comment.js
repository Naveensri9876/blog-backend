import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  authorId: { type: String, required: true }, // Firebase UID
  text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
