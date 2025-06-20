import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Blogify Backend is Running");
});

// ✅ Use dynamic port for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
