// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/auth/controllers/userController");

const app = express();

// ✅ Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON request bodies

// ✅ Routes
app.get("/", (req, res) => {
  res.json({ message: "Express backend is up" });
});

app.use("/api/auth", authRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
