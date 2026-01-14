const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Question = require("../models/question");
const Result = require("../models/result");

// Middleware to verify student token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

// Get all questions
router.get("/", verifyToken, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ questions });
  } catch {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// Submit exam
router.post("/submit", verifyToken, async (req, res) => {
  const { answers, score } = req.body;
  try {
    const result = new Result({
      studentId: req.studentId,
      answers,
      score
    });
    await result.save();
    res.json({ message: "Exam submitted" });
  } catch {
    res.status(500).json({ message: "Error submitting exam" });
  }
});

module.exports = router;
