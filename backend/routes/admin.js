const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Question = require("../models/question");

const ADMIN_USERNAME = "manish";
const ADMIN_PASSWORD = "manish@182005";

// Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.admin) return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

// Add question
router.post("/add-question", verifyAdmin, async (req, res) => {
  const { question, options, answer, chapter } = req.body;
  try {
    const newQ = new Question({ question, options, answer, chapter });
    await newQ.save();
    res.json({ message: "Question added" });
  } catch {
    res.status(500).json({ message: "Error adding question" });
  }
});

module.exports = router;
