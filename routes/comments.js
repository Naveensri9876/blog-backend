import express from 'express';
import Comment from '../models/Comment.js';
import { verifyToken } from '../middleware/auth.js'; // ✅ Import the middleware

const router = express.Router();

// ✅ Secure Comment Creation Route
router.post('/', verifyToken, async (req, res) => {
  try {
    const { postId, text } = req.body;

    const newComment = new Comment({
      postId,
      text,
      authorId: req.user.uid  // ✅ From Firebase decoded token
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Public route to get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
