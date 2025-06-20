import express from 'express';
import mongoose from "mongoose";

import Post from '../models/Post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// ✅ Create Post (requires auth)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      authorId: req.user.uid  // Save Firebase UID
    });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get One Post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Post (only by owner)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.authorId !== req.user.uid) {
      return res.status(403).json({ error: "You can only edit your own posts" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Post (only by owner) — FINAL FIXED VERSION
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.id); // ✅ force convert to ObjectId
    const post = await Post.findById(objectId);

    console.log("🧹 Deleting post:", objectId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.authorId !== req.user.uid) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(objectId);  // ✅ safer than .remove()
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("❌ Delete Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
