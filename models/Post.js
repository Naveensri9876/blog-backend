import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: String,
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
