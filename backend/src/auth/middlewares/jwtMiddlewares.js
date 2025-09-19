const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔑 Verify token
    req.user = decoded; // Store decoded user info in req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
