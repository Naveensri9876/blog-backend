import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: String,
  authorId: String,
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
