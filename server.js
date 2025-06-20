import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Naveensri:naveensri@cluster0.uxlks.mongodb.net/blogify?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Blogify Backend is Running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
