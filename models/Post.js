import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },  // Store Firebase UID
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
