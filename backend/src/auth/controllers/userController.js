const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/jwtMiddlewares");

// ✅ FORGOT PASSWORD API
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }

    // In real apps → send reset email with token
    res.json({ message: "Password reset link sent to email (mock)" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 SIGNUP API
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // ✅ No manual hashing, model handles it
    const newUser = new User({ email, password });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // 4️⃣ Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  // ✅ Route to validate token
  router.get("/validate", authMiddleware, (req, res) => {
    res.json({
      valid: true,
      user: req.user, // contains { id, email }
    });
  });
});

module.exports = router;
